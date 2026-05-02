"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

/* ═══════════════════════════════════════════════════════════════
   CarViewer3D — LOCKED Y-AXIS ROTATION, NO FLOOR REFLECTION

   Interaction: drag left/right spins the car on its Y axis only.
   Camera is completely fixed — no orbit, no zoom, no tilt.
   The car stays flat on the floor at all times.
═══════════════════════════════════════════════════════════════ */

const CAMERA_FOV  = 38;
const CAMERA_POS  = [-2.5, 1.6, 7.5] as const;
const CAMERA_TGT  = [0, 0.9, 0] as const;
const CAR_SCALE   = 5.5;
const SPIN_SPEED  = 0.0022;

interface CarViewer3DProps {
  glbUrl: string;
  isActive: boolean;
  backgroundUrl?: string;
}

export function CarViewer3D({
  glbUrl,
  isActive,
  backgroundUrl = "/images/showroom.png",
}: CarViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;
    const el = mountRef.current;

    /* ── RENDERER ────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace    = THREE.SRGBColorSpace;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── SCENE ───────────────────────────────────────────────── */
    const scene = new THREE.Scene();

    /* ── CAMERA ──────────────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      el.clientWidth / el.clientHeight,
      0.1,
      200
    );
    camera.position.set(...CAMERA_POS);
    camera.lookAt(...CAMERA_TGT);

    /* ── CAR PIVOT — Y-axis only ─────────────────────────────── */
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    /* ── Y-AXIS DRAG INTERACTION ─────────────────────────────── 
       Camera is completely fixed. Only carPivot.rotation.y changes.
       Pointer/touch horizontal delta → Y rotation. No tilt ever.
    ─────────────────────────────────────────────────────────── */
    let isPointerDown  = false;
    let lastPointerX   = 0;
    let dragVelocity   = 0;   // inertia: carries spin after release
    let autoSpinActive = true;

    const getClientX = (e: MouseEvent | TouchEvent) =>
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isPointerDown  = true;
      autoSpinActive = false;
      lastPointerX   = getClientX(e);
      dragVelocity   = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isPointerDown) return;
      const x     = getClientX(e);
      const delta = x - lastPointerX;
      lastPointerX = x;
      // Scale drag pixels → radians (wider viewport = same feel)
      const sensitivity = (2 * Math.PI) / el.clientWidth;
      carPivot.rotation.y += delta * sensitivity * 1.4;
      dragVelocity = delta * sensitivity * 1.4;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      // Re-enable auto-spin only after inertia settles
    };

    renderer.domElement.addEventListener("mousedown",  onPointerDown);
    renderer.domElement.addEventListener("mousemove",  onPointerMove);
    renderer.domElement.addEventListener("mouseup",    onPointerUp);
    renderer.domElement.addEventListener("mouseleave", onPointerUp);
    renderer.domElement.addEventListener("touchstart", onPointerDown as EventListener, { passive: true });
    renderer.domElement.addEventListener("touchmove",  onPointerMove as EventListener, { passive: true });
    renderer.domElement.addEventListener("touchend",   onPointerUp);
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";

    /* ── SHADOW CATCHER ──────────────────────────────────────── */
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 28),
      new THREE.ShadowMaterial({ opacity: 0.75 })
    );
    catcher.rotation.x    = -Math.PI / 2;
    catcher.position.y    = 0.001;
    catcher.receiveShadow = true;
    scene.add(catcher);

    /* ── TYRE CONTACT SHADOWS ────────────────────────────────── 
       4 sharp prints — one per tyre — much more convincing
       than a single centred soft blob.
    ─────────────────────────────────────────────────────────── */
    const makeTyreShadow = (x: number, z: number) => {
      const tc = document.createElement("canvas");
      tc.width = 128; tc.height = 64;
      const tctx = tc.getContext("2d")!;
      const tg = tctx.createRadialGradient(64, 32, 0, 64, 32, 50);
      tg.addColorStop(0,    "rgba(0,0,0,0.95)");
      tg.addColorStop(0.22, "rgba(0,0,0,0.70)");
      tg.addColorStop(0.55, "rgba(0,0,0,0.20)");
      tg.addColorStop(1,    "rgba(0,0,0,0)");
      tctx.fillStyle = tg;
      tctx.fillRect(0, 0, 128, 64);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 0.6),
        new THREE.MeshBasicMaterial({
          map: new THREE.CanvasTexture(tc),
          transparent: true,
          depthWrite: false,
          opacity: 1.0,
        })
      );
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.002, z);
      scene.add(m);
      return m;
    };

    const tyreShadows = [
      makeTyreShadow(-1.1, -1.5),
      makeTyreShadow( 1.1, -1.5),
      makeTyreShadow(-1.1,  1.5),
      makeTyreShadow( 1.1,  1.5),
    ];

    /* ── CHASSIS OCCLUSION ───────────────────────────────────── 
       Deep dark ellipse directly under body — eliminates any gap
       between undercarriage and floor. This is the #1 trick for
       making a 3D car look grounded.
    ─────────────────────────────────────────────────────────── */
    const occC = document.createElement("canvas");
    occC.width = 512; occC.height = 256;
    const occtx = occC.getContext("2d")!;
    const occG = occtx.createRadialGradient(256, 128, 0, 256, 128, 220);
    occG.addColorStop(0,    "rgba(0,0,0,0.97)");
    occG.addColorStop(0.28, "rgba(0,0,0,0.85)");
    occG.addColorStop(0.58, "rgba(0,0,0,0.35)");
    occG.addColorStop(1,    "rgba(0,0,0,0)");
    occtx.fillStyle = occG;
    occtx.fillRect(0, 0, 512, 256);

    const occMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.5, 2.4),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(occC),
        transparent: true,
        depthWrite: false,
        opacity: 0.90,
      })
    );
    occMesh.rotation.x = -Math.PI / 2;
    occMesh.position.y = 0.003;
    scene.add(occMesh);

    /* ── RING GLOW PUDDLE ────────────────────────────────────── 
       Gold radial at the ring radius — annular glow on the floor,
       not filled in the centre. Ties the car to the glowing rings.
    ─────────────────────────────────────────────────────────── */
    const glowC = document.createElement("canvas");
    glowC.width = glowC.height = 512;
    const gctx = glowC.getContext("2d")!;
    const gg = gctx.createRadialGradient(256, 256, 55, 256, 256, 256);
    gg.addColorStop(0,    "rgba(0,0,0,0)");
    gg.addColorStop(0.52, "rgba(201,168,76,0.10)");
    gg.addColorStop(0.70, "rgba(230,195,90,0.32)");
    gg.addColorStop(0.83, "rgba(201,168,76,0.14)");
    gg.addColorStop(1,    "rgba(0,0,0,0)");
    gctx.fillStyle = gg;
    gctx.fillRect(0, 0, 512, 512);

    const glowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 13),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(glowC),
        transparent: true,
        depthWrite: false,
        opacity: 1.0,
      })
    );
    glowMesh.rotation.x = -Math.PI / 2;
    glowMesh.position.y = 0.004;
    scene.add(glowMesh);

    /* ── RINGS ───────────────────────────────────────────────── */
    buildRings(scene);

    /* ── LIGHTS + ENV ────────────────────────────────────────── */
    buildLights(scene);
    buildEnvMap(scene, renderer);

    /* ── CAR MODEL ───────────────────────────────────────────── */
    new GLTFLoader().load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        // Premium material boost on main car
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = true;
            mesh.receiveShadow = false;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat?.isMeshStandardMaterial) {
              mat.envMapIntensity = 2.8;
              if (mat.roughness > 0.55) mat.roughness = 0.28;
              if (mat.metalness < 0.2)  mat.metalness = 0.22;
            }
          }
        });

        // Scale + centre
        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale  = CAR_SCALE / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;

        model.updateMatrixWorld(true);
        const scaledBox = new THREE.Box3().setFromObject(model);
        model.position.y = -scaledBox.min.y;
        carPivot.add(model);

        /* ── REPOSITION TYRE SHADOWS ─────────────────────────── */
        const cw = (box.max.x - box.min.x) * scale * 0.38;
        const cl = (box.max.z - box.min.z) * scale * 0.33;
        tyreShadows[0].position.set(-cw, 0.002, -cl);
        tyreShadows[1].position.set( cw, 0.002, -cl);
        tyreShadows[2].position.set(-cw, 0.002,  cl);
        tyreShadows[3].position.set( cw, 0.002,  cl);

        // Resize occlusion to car footprint
        const fw = (box.max.x - box.min.x) * scale;
        const fl = (box.max.z - box.min.z) * scale;
        occMesh.scale.set(fw / 5.5, 1, fl / 2.4);
      },
      undefined,
      () => {
        const fb = new THREE.Mesh(
          new THREE.BoxGeometry(3, 1, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1a3a6e, metalness: 0.9, roughness: 0.15 })
        );
        fb.position.y = 0.5;
        fb.castShadow = true;
        carPivot.add(fb);
      }
    );

    /* ── RENDER LOOP ─────────────────────────────────────────── */
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isPointerDown) {
        // actively dragging — pivot already updated in onPointerMove
      } else if (Math.abs(dragVelocity) > 0.0001) {
        // inertia — decay drag velocity
        carPivot.rotation.y += dragVelocity;
        dragVelocity *= 0.88;
        if (Math.abs(dragVelocity) < 0.0001) {
          dragVelocity   = 0;
          autoSpinActive = true; // resume auto-spin after inertia settles
        }
      } else if (autoSpinActive) {
        carPivot.rotation.y += SPIN_SPEED;
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ── RESIZE ──────────────────────────────────────────────── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── CLEANUP ─────────────────────────────────────────────── */
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown",  onPointerDown);
      renderer.domElement.removeEventListener("mousemove",  onPointerMove);
      renderer.domElement.removeEventListener("mouseup",    onPointerUp);
      renderer.domElement.removeEventListener("mouseleave", onPointerUp);
      renderer.domElement.removeEventListener("touchstart", onPointerDown as EventListener);
      renderer.domElement.removeEventListener("touchmove",  onPointerMove as EventListener);
      renderer.domElement.removeEventListener("touchend",   onPointerUp);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [glbUrl, isActive, backgroundUrl]);

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      {/* Background + Three.js canvas */}
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          backgroundImage:    `url('${backgroundUrl}')`,
          backgroundSize:     "cover",
          backgroundPosition: "center 55%",
          backgroundRepeat:   "no-repeat",
        }}
      />

      {/* ── SOFT EDGE VIGNETTES ───────────────────────────────────
          Four gradient overlays — left, right, top, bottom.
          Each fades from the parent background colour (black) to
          transparent so the scene bleeds softly into the page.
          pointerEvents:none so drag interaction still works.
      ──────────────────────────────────────────────────────────── */}

      {/* LEFT */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 12%, transparent 28%)",
        pointerEvents: "none",
      }} />

      {/* RIGHT */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 12%, transparent 28%)",
        pointerEvents: "none",
      }} />

      {/* TOP */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 10%, transparent 24%)",
        pointerEvents: "none",
      }} />

      {/* BOTTOM */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.18) 12%, transparent 26%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOLD RINGS + GLOW PUDDLES
═══════════════════════════════════════════════════════════════ */
function buildRings(scene: THREE.Scene) {
  const ring = (r1: number, r2: number, col: number, op: number, y: number) => {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(r1, r2, 128),
      new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: op,
        side: THREE.DoubleSide, depthWrite: false,
      })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.y = y;
    scene.add(m);
  };
  ring(5.50, 5.65, 0xC9A84C, 0.35, 0.01);
  ring(4.75, 4.88, 0xE8C97A, 0.78, 0.012);

  for (const [sx, sz] of [[0,-4.2],[4.2,0],[-4.2,0],[0,4.2]] as [number,number][]) {
    const sc = document.createElement("canvas");
    sc.width = sc.height = 128;
    const sctx = sc.getContext("2d")!;
    const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sg.addColorStop(0,   "rgba(255,215,100,0.72)");
    sg.addColorStop(0.4, "rgba(201,168,76,0.24)");
    sg.addColorStop(1,   "rgba(0,0,0,0)");
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 128, 128);
    const spot = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 32),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(sc),
        transparent: true, opacity: 0.88, depthWrite: false,
      })
    );
    spot.rotation.x = -Math.PI / 2;
    spot.position.set(sx, 0.013, sz);
    scene.add(spot);
  }
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTS
═══════════════════════════════════════════════════════════════ */
function buildLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0x100a04, 0.6));

  // PRIMARY KEY
  const key = new THREE.SpotLight(0xfff2d0, 16.0, 55, Math.PI / 5.5, 0.20, 1.0);
  key.position.set(7, 20, 10);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far  = 60;
  key.shadow.bias        = -0.0008;
  key.shadow.radius      = 3;
  scene.add(key); scene.add(key.target);

  // LEFT GOLD RIM
  const lr = new THREE.SpotLight(0xFFCC44, 10.0, 50, Math.PI / 5, 0.28, 1.1);
  lr.position.set(-12, 9, 4);
  lr.target.position.set(0, 0.5, 0);
  scene.add(lr); scene.add(lr.target);

  // RIGHT GOLD RIM
  const rr = new THREE.SpotLight(0xFFCC44, 7.0, 45, Math.PI / 5.5, 0.28, 1.1);
  rr.position.set(13, 7, 3);
  rr.target.position.set(0, 0.5, 0);
  scene.add(rr); scene.add(rr.target);

  // CITY BLUE BACK
  const city = new THREE.DirectionalLight(0xaac8f0, 2.2);
  city.position.set(0, 12, -18);
  scene.add(city);

  // BACK WARM
  const bw = new THREE.DirectionalLight(0xffe090, 1.8);
  bw.position.set(9, 5, -11);
  scene.add(bw);

  // RING BOUNCE — upward gold from floor, fills undercarriage
  const rb = new THREE.PointLight(0xC9A84C, 3.8, 7, 1.8);
  rb.position.set(0, 0.05, 0);
  scene.add(rb);

  const rb2 = new THREE.PointLight(0xE8C060, 2.2, 5, 2.0);
  rb2.position.set(-1.5, 0.08, 1.0);
  scene.add(rb2);

  // ROOF
  const roof = new THREE.SpotLight(0xfff8f0, 5.0, 24, Math.PI / 7, 0.38, 1.2);
  roof.position.set(0, 18, 2);
  scene.add(roof); scene.add(roof.target);
}

/* ═══════════════════════════════════════════════════════════════
   ENV MAP
═══════════════════════════════════════════════════════════════ */
function buildEnvMap(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const ec = document.createElement("canvas");
  ec.width = 512; ec.height = 256;
  const ectx = ec.getContext("2d")!;
  ectx.fillStyle = "#030201";
  ectx.fillRect(0, 0, 512, 256);

  const k = ectx.createRadialGradient(380, 35, 0, 380, 35, 180);
  k.addColorStop(0, "rgba(255,240,170,1.0)");
  k.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = k; ectx.fillRect(0, 0, 512, 256);

  const l = ectx.createRadialGradient(18, 90, 0, 18, 90, 130);
  l.addColorStop(0, "rgba(255,200,50,1.0)");
  l.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = l; ectx.fillRect(0, 0, 512, 256);

  const r = ectx.createRadialGradient(494, 80, 0, 494, 80, 120);
  r.addColorStop(0, "rgba(255,195,45,0.9)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = r; ectx.fillRect(0, 0, 512, 256);

  const c = ectx.createRadialGradient(256, 18, 0, 256, 18, 110);
  c.addColorStop(0, "rgba(140,190,255,0.60)");
  c.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = c; ectx.fillRect(0, 0, 512, 256);

  const f = ectx.createRadialGradient(256, 248, 0, 256, 248, 100);
  f.addColorStop(0, "rgba(201,168,76,0.65)");
  f.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = f; ectx.fillRect(0, 0, 512, 256);

  const envTex = new THREE.CanvasTexture(ec);
  envTex.mapping    = THREE.EquirectangularReflectionMapping;
  envTex.colorSpace = THREE.SRGBColorSpace;
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose();
  pmrem.dispose();
}