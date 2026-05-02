"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/examples/jsm/Addons.js";

/* ═══════════════════════════════════════════════════════════════
   CarViewer3D — Split scene architecture
   ─ environmentGlb  → static GLB: floor + backdrop buildings
                        loaded ONCE, never moves
   ─ glbUrl          → car GLB: spins on its own pivot
   ─ Camera orbits freely; environment is always frozen
   ─ Car is precisely floor-placed (bounding-box math, no sinking)
   ─ Full touch support (1-finger orbit, 2-finger pinch-zoom)

   Props
   ─────
   glbUrl          : string   – path to the car .glb
   isActive        : boolean  – mount/unmount when switching cars
   environmentGlb? : string   – path to your static environment .glb
                                If omitted → canvas skyline + procedural floor

   HOW TO CREATE THE ENVIRONMENT GLB
   ──────────────────────────────────
   Option A — Blender (recommended, free)
     1. Download a Dubai night panorama from Unsplash/Pexels (2:1 ratio)
     2. Create a large open cylinder (r=80m) and apply the photo as
        an emissive texture on the INSIDE face
     3. Create a plane (100×100 m) for the floor with a dark PBR material
     4. Export as .glb  →  /public/models/environment.glb

   Option B — Ready-made free assets
     • Sketchfab: search "night city stage" → download .glb
     • Poly Haven: studio scenes work as backdrops

   Option C — No modelling
     Leave environmentGlb empty; the component uses a canvas-drawn
     Dubai skyline + reflective procedural floor as a fallback.
═══════════════════════════════════════════════════════════════ */

interface CarViewer3DProps {
  glbUrl: string;
  isActive: boolean;
  /**
   * Optional path to a static environment .glb.
   * This model is loaded once and NEVER rotates.
   * Use it for the backdrop buildings + floor stage.
   * Example: "/models/environment.glb"
   */
  environmentGlb?: string;
}

export function CarViewer3D({ glbUrl, isActive, environmentGlb }: CarViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;
    const el = mountRef.current;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace  = THREE.SRGBColorSpace;
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    el.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060504);
    scene.fog = new THREE.FogExp2(0x060504, 0.018);

    /* ── Camera — 3/4 front-left editorial ── */
    const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 300);
    camera.position.set(-5, 2.6, 8.5);
    camera.lookAt(0, 0.7, 0);

    /* ── Controls ── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.7, 0);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.06;
    controls.enableZoom     = true;
    controls.zoomSpeed      = 0.5;
    controls.minDistance    = 4;
    controls.maxDistance    = 18;
    controls.enablePan      = false;
    controls.minPolarAngle  = Math.PI / 10;
    controls.maxPolarAngle  = Math.PI / 2.15;
    // autoRotate is OFF — the car pivot rotates, not OrbitControls
    // so the environment (floor/buildings) stays completely still
    controls.autoRotate     = false;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    renderer.domElement.style.touchAction = "none";

    /* ── Car Pivot ──
       The car sits inside this group.
       We increment carPivot.rotation.y each frame.
       The environment is NOT a child of this group → it never moves. */
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    let isDragging = false;
    const SPIN = 0.003; // radians / frame
    const onDragStart = () => { isDragging = true; };
    const onDragEnd   = () => { isDragging = false; };
    renderer.domElement.addEventListener("mousedown",  onDragStart);
    renderer.domElement.addEventListener("mouseup",    onDragEnd);
    renderer.domElement.addEventListener("touchstart", onDragStart, { passive: true });
    renderer.domElement.addEventListener("touchend",   onDragEnd,   { passive: true });

    /* ── Static Environment ── */
    if (environmentGlb) {
      loadEnvironmentGlb(scene, environmentGlb);
    } else {
      buildCanvasSkyline(scene);
      buildProceduralFloor(scene);
      buildRing(scene);
    }

    buildLights(scene);
    buildEnvMap(scene, renderer);

    /* ── Car Model ── */
    new GLTFLoader().load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = true;
            mesh.receiveShadow = true;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat?.isMeshStandardMaterial) {
              mat.envMapIntensity = 2.0;
              if (mat.roughness > 0.55) mat.roughness = 0.4;
              if (mat.metalness < 0.25) mat.metalness = 0.18;
            }
          }
        });

        // Compute bounding box BEFORE attaching to pivot
        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale  = 5.5 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);

        // Centre horizontally
        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;

        // ── FLOOR FIX ──
        // Recompute box after scale is applied so we get the real min.y
        model.updateMatrixWorld(true);
        const scaledBox = new THREE.Box3().setFromObject(model);
        // Lift the model so its lowest point is exactly at y = 0
        model.position.y = -scaledBox.min.y;

        carPivot.add(model);
      },
      undefined,
      () => {
        // Fallback placeholder — a box whose bottom face is at y = 0
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(3, 1, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1a3a6e, metalness: 0.9, roughness: 0.15 })
        );
        mesh.position.y = 0.5; // half-height so bottom = 0
        mesh.castShadow = true;
        carPivot.add(mesh);
      }
    );

    /* ── Render loop ── */
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) carPivot.rotation.y += SPIN;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown",  onDragStart);
      renderer.domElement.removeEventListener("mouseup",    onDragEnd);
      renderer.domElement.removeEventListener("touchstart", onDragStart);
      renderer.domElement.removeEventListener("touchend",   onDragEnd);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [glbUrl, isActive, environmentGlb]);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENVIRONMENT GLB LOADER
   Adds the static scene to the root scene (NOT to carPivot).
   Environment receives shadows but never casts or rotates.
═══════════════════════════════════════════════════════════════ */
function loadEnvironmentGlb(scene: THREE.Scene, url: string) {
  new GLTFLoader().load(
    url,
    (gltf) => {
      const env = gltf.scene;

      env.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow    = false; // env doesn't cast shadows on itself
          mesh.receiveShadow = true;  // car shadow falls onto floor
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat?.isMeshStandardMaterial) mat.envMapIntensity = 1.2;
        }
      });

      // Auto-fit so environment spans ~120 units wide
      const box = new THREE.Box3().setFromObject(env);
      const size = box.getSize(new THREE.Vector3());
      const s = 120 / Math.max(size.x, size.z);
      env.scale.setScalar(s);

      // Sit the environment floor at y = 0
      env.updateMatrixWorld(true);
      const fitBox = new THREE.Box3().setFromObject(env);
      env.position.y = -fitBox.min.y;

      scene.add(env); // ← NOT carPivot; environment never rotates
    },
    undefined,
    (err) => {
      console.warn("Environment GLB failed, using procedural fallback:", err);
      buildCanvasSkyline(scene);
      buildProceduralFloor(scene);
      buildRing(scene);
    }
  );
}

/* ═══════════════════════════════════════════════════════════════
   CANVAS SKYLINE (procedural fallback)
═══════════════════════════════════════════════════════════════ */
function buildCanvasSkyline(scene: THREE.Scene) {
  const W = 2048, H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0,    "#010101");
  sky.addColorStop(0.45, "#080602");
  sky.addColorStop(0.72, "#1c1105");
  sky.addColorStop(0.88, "#2e1c07");
  sky.addColorStop(1,    "#3a2208");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.85);
  glow.addColorStop(0,    "rgba(201,168,76,0.28)");
  glow.addColorStop(0.35, "rgba(201,110,20,0.10)");
  glow.addColorStop(1,    "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  drawBurjKhalifa(ctx, W * 0.5, H);

  const buildings = [
    { x: 0.43, w: 0.022, h: 0.48, lit: 0.50 },
    { x: 0.58, w: 0.020, h: 0.42, lit: 0.45 },
    { x: 0.36, w: 0.032, h: 0.34, lit: 0.40 },
    { x: 0.64, w: 0.028, h: 0.36, lit: 0.38 },
    { x: 0.29, w: 0.038, h: 0.26, lit: 0.32 },
    { x: 0.71, w: 0.034, h: 0.28, lit: 0.30 },
    { x: 0.22, w: 0.044, h: 0.20, lit: 0.25 },
    { x: 0.78, w: 0.040, h: 0.22, lit: 0.23 },
    { x: 0.14, w: 0.052, h: 0.15, lit: 0.20 },
    { x: 0.86, w: 0.048, h: 0.17, lit: 0.19 },
    { x: 0.07, w: 0.058, h: 0.12, lit: 0.16 },
    { x: 0.93, w: 0.054, h: 0.13, lit: 0.15 },
  ];

  for (const b of buildings) {
    const bx = b.x * W, bw = b.w * W, bh = b.h * H, by = H - bh;
    ctx.beginPath(); ctx.rect(bx - bw / 2, by, bw, bh);
    const bg = ctx.createLinearGradient(bx, by, bx, H);
    bg.addColorStop(0, `rgba(22,14,5,${0.88 + b.lit * 0.10})`);
    bg.addColorStop(1, "rgba(8,5,2,0.98)");
    ctx.fillStyle = bg; ctx.fill();
    drawWindows(ctx, bx - bw / 2, by, bw, bh, b.lit);
    ctx.strokeStyle = `rgba(201,168,76,${b.lit * 0.30})`; ctx.lineWidth = 0.7; ctx.stroke();
  }

  const wy = H * 0.82;
  const wg = ctx.createLinearGradient(0, wy, 0, H);
  wg.addColorStop(0, "rgba(201,168,76,0.12)"); wg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = wg; ctx.fillRect(0, wy, W, H - wy);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(80, 80, 46, 64, 1, true),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false })
  );
  cyl.position.y = 14;
  scene.add(cyl);
}

function drawBurjKhalifa(ctx: CanvasRenderingContext2D, cx: number, H: number) {
  const tH = H * 0.78, bW = H * 0.055;
  ctx.beginPath();
  ctx.moveTo(cx - bW / 2, H);
  ctx.lineTo(cx - bW / 2, H - tH * 0.25);
  ctx.lineTo(cx - bW * 0.38, H - tH * 0.45);
  ctx.lineTo(cx - bW * 0.22, H - tH * 0.62);
  ctx.lineTo(cx - bW * 0.10, H - tH * 0.80);
  ctx.lineTo(cx - bW * 0.025, H - tH * 0.92);
  ctx.lineTo(cx, H - tH);
  ctx.lineTo(cx + bW * 0.025, H - tH * 0.92);
  ctx.lineTo(cx + bW * 0.10, H - tH * 0.80);
  ctx.lineTo(cx + bW * 0.22, H - tH * 0.62);
  ctx.lineTo(cx + bW * 0.38, H - tH * 0.45);
  ctx.lineTo(cx + bW / 2, H - tH * 0.25);
  ctx.lineTo(cx + bW / 2, H);
  ctx.closePath();
  const bg = ctx.createLinearGradient(cx, H - tH, cx, H);
  bg.addColorStop(0, "rgba(16,10,4,0.95)"); bg.addColorStop(1, "rgba(8,5,2,0.99)");
  ctx.fillStyle = bg; ctx.fill();
  ctx.strokeStyle = "rgba(201,168,76,0.35)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, H - tH - 4, 3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,50,50,0.85)"; ctx.fill();
}

function drawWindows(
  ctx: CanvasRenderingContext2D,
  bx: number, by: number, bw: number, bh: number, density: number
) {
  const cols = Math.max(2, Math.floor(bw / 7));
  const rows = Math.max(3, Math.floor(bh / 9));
  const ww = (bw / cols) * 0.42, wh = (bh / rows) * 0.38;
  for (let r = 1; r < rows - 1; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.random() > density) continue;
      const wx = bx + (c / cols) * bw + (bw / cols) * 0.22;
      const wy = by + (r / rows) * bh + (bh / rows) * 0.2;
      ctx.fillStyle = Math.random() > 0.35
        ? `rgba(255,210,100,${0.55 + Math.random() * 0.35})`
        : `rgba(160,200,255,${0.35 + Math.random() * 0.25})`;
      ctx.fillRect(wx, wy, ww, wh);
    }
  }
}

/* ═══════════════════════════════════════════════════════════════
   PROCEDURAL FLOOR (fallback)
   Floor plane is at y = 0 — the car bounding box math above
   ensures the car's lowest point also lands at exactly y = 0.
═══════════════════════════════════════════════════════════════ */
function buildProceduralFloor(scene: THREE.Scene) {
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(32, 80),
    new THREE.MeshStandardMaterial({ color: 0x0a0806, metalness: 0.92, roughness: 0.20, envMapIntensity: 1.4 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0; // explicit ground level
  floor.receiveShadow = true;
  scene.add(floor);

  // Radial gold glow
  const gc = document.createElement("canvas");
  gc.width = gc.height = 512;
  const gctx = gc.getContext("2d")!;
  const rg = gctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  rg.addColorStop(0,   "rgba(201,168,76,0.28)");
  rg.addColorStop(0.4, "rgba(201,120,30,0.08)");
  rg.addColorStop(1,   "rgba(0,0,0,0)");
  gctx.fillStyle = rg; gctx.fillRect(0, 0, 512, 512);
  const glow = new THREE.Mesh(
    new THREE.CircleGeometry(14, 64),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gc), transparent: true, opacity: 0.95, depthWrite: false })
  );
  glow.rotation.x = -Math.PI / 2; glow.position.y = 0.005;
  scene.add(glow);

  // Edge vignette
  const vc = document.createElement("canvas");
  vc.width = vc.height = 512;
  const vctx = vc.getContext("2d")!;
  const vg = vctx.createRadialGradient(256, 256, 140, 256, 256, 256);
  vg.addColorStop(0,   "rgba(0,0,0,0)");
  vg.addColorStop(0.7, "rgba(4,3,2,0.4)");
  vg.addColorStop(1,   "rgba(4,3,2,0.96)");
  vctx.fillStyle = vg; vctx.fillRect(0, 0, 512, 512);
  const vig = new THREE.Mesh(
    new THREE.CircleGeometry(32, 64),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(vc), transparent: true, opacity: 1, depthWrite: false })
  );
  vig.rotation.x = -Math.PI / 2; vig.position.y = 0.006;
  scene.add(vig);
}

/* ═══════════════════════════════════════════════════════════════
   GOLD RINGS + SPOTLIGHT PUDDLES
═══════════════════════════════════════════════════════════════ */
function buildRing(scene: THREE.Scene) {
  const mkRing = (inner: number, outer: number, color: number, opacity: number, y: number) => {
    const r = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, 128),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
    );
    r.rotation.x = -Math.PI / 2; r.position.y = y;
    scene.add(r);
  };
  mkRing(5.8, 5.96, 0xC9A84C, 0.22, 0.008);
  mkRing(4.9, 5.04, 0xE8C97A, 0.65, 0.009);

  for (const [sx, sz] of [[0, -4], [4, 0], [-4, 0], [0, 4]] as [number, number][]) {
    const sc = document.createElement("canvas");
    sc.width = sc.height = 128;
    const sctx = sc.getContext("2d")!;
    const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sg.addColorStop(0,   "rgba(255,220,120,0.65)");
    sg.addColorStop(0.4, "rgba(201,168,76,0.15)");
    sg.addColorStop(1,   "rgba(0,0,0,0)");
    sctx.fillStyle = sg; sctx.fillRect(0, 0, 128, 128);
    const spot = new THREE.Mesh(
      new THREE.CircleGeometry(2.0, 32),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, opacity: 0.75, depthWrite: false })
    );
    spot.rotation.x = -Math.PI / 2; spot.position.set(sx, 0.007, sz);
    scene.add(spot);
  }
}

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC LIGHTS
═══════════════════════════════════════════════════════════════ */
function buildLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0x1a1005, 0.75));

  const key = new THREE.SpotLight(0xfff0c8, 10.0, 40, Math.PI / 5.5, 0.28, 1.1);
  key.position.set(7, 16, 10);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1; key.shadow.camera.far = 50;
  key.shadow.bias = -0.0015; key.shadow.radius = 3;
  scene.add(key); scene.add(key.target);

  const fill = new THREE.DirectionalLight(0xC9A84C, 1.6);
  fill.position.set(-10, 6, -3); scene.add(fill);

  const rim = new THREE.DirectionalLight(0xd0e8ff, 2.4);
  rim.position.set(-3, 8, -14); scene.add(rim);

  const rim2 = new THREE.DirectionalLight(0xffe4b0, 1.2);
  rim2.position.set(6, 5, -10); scene.add(rim2);

  const bounce = new THREE.PointLight(0xC9A84C, 1.2, 12, 2);
  bounce.position.set(0, 0.4, 0); scene.add(bounce);

  const top = new THREE.SpotLight(0xfff8ee, 4.0, 20, Math.PI / 6.5, 0.45, 1.4);
  top.position.set(0, 14, 1); scene.add(top);

  const front = new THREE.DirectionalLight(0xffeedd, 0.8);
  front.position.set(-4, 3, 8); scene.add(front);
}

/* ═══════════════════════════════════════════════════════════════
   PROCEDURAL ENVIRONMENT MAP (reflection on car body)
   Swap this for a real HDRI for best results:
     import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
     new RGBELoader().load("/models/studio.hdr", (hdr) => {
       scene.environment = pmrem.fromEquirectangular(hdr).texture;
     });
═══════════════════════════════════════════════════════════════ */
function buildEnvMap(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const ec = document.createElement("canvas");
  ec.width = 256; ec.height = 128;
  const ectx = ec.getContext("2d")!;
  ectx.fillStyle = "#050303"; ectx.fillRect(0, 0, 256, 128);
  const k = ectx.createRadialGradient(200, 30, 0, 200, 30, 90);
  k.addColorStop(0, "rgba(255,240,180,0.9)"); k.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = k; ectx.fillRect(0, 0, 256, 128);
  const f = ectx.createRadialGradient(30, 60, 0, 30, 60, 70);
  f.addColorStop(0, "rgba(201,168,76,0.6)"); f.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = f; ectx.fillRect(0, 0, 256, 128);
  const r = ectx.createRadialGradient(128, 110, 0, 128, 110, 60);
  r.addColorStop(0, "rgba(180,210,255,0.35)"); r.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = r; ectx.fillRect(0, 0, 256, 128);
  const envTex = new THREE.CanvasTexture(ec);
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  envTex.colorSpace = THREE.SRGBColorSpace;
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose(); pmrem.dispose();
}