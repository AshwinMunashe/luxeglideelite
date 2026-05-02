"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/examples/jsm/Addons.js";

/* ═══════════════════════════════════════════════════════════════
   CarViewer3D — Static photo background + transparent 3D car

   ARCHITECTURE
   ─────────────
   • Background photo  → plain CSS backgroundImage on the wrapper div
                          zero GPU cost, never moves, pixel-perfect
   • Three.js canvas   → alpha:true (transparent), renders ONLY the car
                          sits on top of the CSS layer
   • Car pivot         → rotates each frame; camera stays fixed
                          so the background photo never shifts

   SETUP
   ──────
   1. Save your Dubai showroom image to /public/images/dubai-showroom.jpg
   2. Pass backgroundUrl="/images/dubai-showroom.jpg" (or use the default)
   3. Adjust CAMERA_* and FLOOR_TUNE constants below if the car
      floats above or sinks into the photo's floor line.

   Props
   ──────
   glbUrl        : string   car .glb path
   isActive      : boolean  mount/unmount flag (for car-switching)
   backgroundUrl : string   path/URL to the static background image
═══════════════════════════════════════════════════════════════ */

// ── Tune these to match your background photo's perspective ──
const CAMERA_FOV  = 38;              // match photo's focal length feel
const CAMERA_POS  = [-2.5, 1.6, 7.5] as const; // x,y,z  (neg-x = left of car)
const CAMERA_TGT  = [0, 0.9, 0]     as const; // where camera looks
const CAR_SCALE   = 5.5;             // longest axis in Three.js units
const SPIN_SPEED  = 0.0022;          // radians per frame

interface CarViewer3DProps {
  glbUrl: string;
  isActive: boolean;
  /** Path to the static background photo. Put it in /public/images/ */
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

    /* ────────────────────────────────────────
       RENDERER — transparent background
    ──────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled   = true;
    renderer.shadowMap.type      = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace    = THREE.SRGBColorSpace;
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    el.appendChild(renderer.domElement);

    /* ────────────────────────────────────────
       SCENE — no background, no fog
       (background comes from CSS, not Three.js)
    ──────────────────────────────────────── */
    const scene = new THREE.Scene();

    /* ────────────────────────────────────────
       CAMERA
    ──────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      el.clientWidth / el.clientHeight,
      0.1,
      200
    );
    camera.position.set(...CAMERA_POS);
    camera.lookAt(...CAMERA_TGT);

    /* ────────────────────────────────────────
       CONTROLS
       autoRotate = false — car pivot handles spin
       so the background image stays perfectly still
    ──────────────────────────────────────── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_TGT);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.07;
    controls.enableZoom     = true;
    controls.zoomSpeed      = 0.45;
    controls.minDistance    = 3.5;
    controls.maxDistance    = 16;
    controls.enablePan      = false;
    controls.minPolarAngle  = Math.PI / 12;
    controls.maxPolarAngle  = Math.PI / 2.05;
    controls.autoRotate     = false;
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
    renderer.domElement.style.touchAction = "none";

    /* ────────────────────────────────────────
       CAR PIVOT
       Only this group rotates — lights, floor,
       and the CSS background all stay frozen.
    ──────────────────────────────────────── */
    const carPivot = new THREE.Group();
    scene.add(carPivot);

    let isDragging = false;
    const onDragStart = () => { isDragging = true; };
    const onDragEnd   = () => { isDragging = false; };
    renderer.domElement.addEventListener("mousedown",  onDragStart);
    renderer.domElement.addEventListener("mouseup",    onDragEnd);
    renderer.domElement.addEventListener("touchstart", onDragStart, { passive: true });
    renderer.domElement.addEventListener("touchend",   onDragEnd,   { passive: true });

    /* ────────────────────────────────────────
       SHADOW CATCHER
       Invisible plane at y=0 receives car shadows.
       ShadowMaterial is fully transparent to color
       but shows shadows — blends onto photo floor.
    ──────────────────────────────────────── */
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 28),
      new THREE.ShadowMaterial({ opacity: 0.5 })
    );
    catcher.rotation.x    = -Math.PI / 2;
    catcher.position.y    = 0;
    catcher.receiveShadow = true;
    scene.add(catcher);

    /* ────────────────────────────────────────
       CONTACT SHADOW BLOB
       Soft dark ellipse under the car for grounding.
       Stays centred (not in carPivot) so it doesn't spin.
    ──────────────────────────────────────── */
    const blobC = document.createElement("canvas");
    blobC.width = blobC.height = 256;
    const bctx = blobC.getContext("2d")!;
    const bGrad = bctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    bGrad.addColorStop(0,   "rgba(0,0,0,0.80)");
    bGrad.addColorStop(0.35,"rgba(0,0,0,0.35)");
    bGrad.addColorStop(1,   "rgba(0,0,0,0)");
    bctx.fillStyle = bGrad;
    bctx.fillRect(0, 0, 256, 256);

    const blob = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 3.2),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(blobC),
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      })
    );
    blob.rotation.x = -Math.PI / 2;
    blob.position.y = 0.005;
    scene.add(blob); // NOT in carPivot — stays centred

    /* ────────────────────────────────────────
       GOLD ORBIT RINGS + GLOW PUDDLES
    ──────────────────────────────────────── */
    buildRings(scene);

    /* ────────────────────────────────────────
       LIGHTS + ENV MAP
    ──────────────────────────────────────── */
    buildLights(scene);
    buildEnvMap(scene, renderer);

    /* ────────────────────────────────────────
       CAR MODEL
    ──────────────────────────────────────── */
    new GLTFLoader().load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        // Shadows + material boost
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow    = true;
            mesh.receiveShadow = false;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat?.isMeshStandardMaterial) {
              mat.envMapIntensity = 2.2;
              if (mat.roughness > 0.55) mat.roughness = 0.38;
              if (mat.metalness < 0.2)  mat.metalness = 0.15;
            }
          }
        });

        // Scale
        const box    = new THREE.Box3().setFromObject(model);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale  = CAR_SCALE / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);

        // Centre on pivot (horizontal)
        model.position.x = -center.x * scale;
        model.position.z = -center.z * scale;

        // ── FLOOR FIX ──
        // After applying scale, recompute world bounding box.
        // Lift model so its lowest vertex is exactly at y = 0.
        model.updateMatrixWorld(true);
        const scaledBox = new THREE.Box3().setFromObject(model);
        model.position.y = -scaledBox.min.y; // no sinking, no floating

        carPivot.add(model);

        // Size the contact blob to the car's footprint
        const w = (box.max.x - box.min.x) * scale;
        const l = (box.max.z - box.min.z) * scale;
        blob.scale.set(w / 6.5, 1, l / 3.2);
      },
      undefined,
      () => {
        // Fallback box — bottom at y=0
        const fb = new THREE.Mesh(
          new THREE.BoxGeometry(3, 1, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1a3a6e, metalness: 0.9, roughness: 0.15 })
        );
        fb.position.y = 0.5;
        fb.castShadow = true;
        carPivot.add(fb);
      }
    );

    /* ────────────────────────────────────────
       RENDER LOOP
    ──────────────────────────────────────── */
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) carPivot.rotation.y += SPIN_SPEED;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ────────────────────────────────────────
       RESIZE
    ──────────────────────────────────────── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ────────────────────────────────────────
       CLEANUP
    ──────────────────────────────────────── */
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
  }, [glbUrl, isActive, backgroundUrl]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        /* ── THE STATIC BACKGROUND ──
           The photo never moves. The Three.js canvas
           (transparent) floats on top of it.
           backgroundPosition "center 55%" shifts the image
           so the floor line sits in the lower half where the
           car will be rendered. Adjust the % to taste. */
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOLD RINGS + GLOW PUDDLES
═══════════════════════════════════════════════════════════════ */
function buildRings(scene: THREE.Scene) {
  const ring = (r1: number, r2: number, col: number, op: number, y: number) => {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(r1, r2, 128),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, side: THREE.DoubleSide, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.y = y;
    scene.add(m);
  };
  ring(5.5, 5.65, 0xC9A84C, 0.35, 0.01);
  ring(4.75, 4.88, 0xE8C97A, 0.75, 0.012);

  for (const [sx, sz] of [[0, -4.2], [4.2, 0], [-4.2, 0], [0, 4.2]] as [number,number][]) {
    const sc = document.createElement("canvas");
    sc.width = sc.height = 128;
    const sctx = sc.getContext("2d")!;
    const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sg.addColorStop(0,   "rgba(255,215,100,0.60)");
    sg.addColorStop(0.5, "rgba(201,168,76,0.14)");
    sg.addColorStop(1,   "rgba(0,0,0,0)");
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 128, 128);
    const spot = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 32),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, opacity: 0.75, depthWrite: false })
    );
    spot.rotation.x = -Math.PI / 2;
    spot.position.set(sx, 0.013, sz);
    scene.add(spot);
  }
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTS — tuned to match the photo's gold columns + city glow
═══════════════════════════════════════════════════════════════ */
function buildLights(scene: THREE.Scene) {
  // Low ambient — photo provides the scene's overall light
  scene.add(new THREE.AmbientLight(0x1a1005, 0.45));

  // Key — warm, front-right, high angle (matches gold column in photo)
  const key = new THREE.SpotLight(0xfff0c8, 12.0, 45, Math.PI / 5.5, 0.24, 1.1);
  key.position.set(7, 18, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1;
  key.shadow.camera.far  = 55;
  key.shadow.bias        = -0.0012;
  key.shadow.radius      = 4;
  scene.add(key);
  scene.add(key.target);

  // Gold fill from left (left gold column in photo)
  const fill = new THREE.DirectionalLight(0xC9A84C, 2.0);
  fill.position.set(-10, 5, 2);
  scene.add(fill);

  // Cool-blue city glow from behind
  const rim = new THREE.DirectionalLight(0xc8e0ff, 2.8);
  rim.position.set(1, 7, -14);
  scene.add(rim);

  // Warm rim from behind-right
  const rim2 = new THREE.DirectionalLight(0xffe0a0, 1.5);
  rim2.position.set(8, 4, -10);
  scene.add(rim2);

  // Floor bounce (gold ring)
  const bounce = new THREE.PointLight(0xC9A84C, 1.6, 10, 2);
  bounce.position.set(0, 0.3, 0);
  scene.add(bounce);

  // Top — roof sheen
  const top = new THREE.SpotLight(0xfff8ee, 4.5, 22, Math.PI / 7, 0.4, 1.3);
  top.position.set(0, 16, 1);
  scene.add(top);
}

/* ═══════════════════════════════════════════════════════════════
   PROCEDURAL ENV MAP — warm/gold/cool reflections on car paint
═══════════════════════════════════════════════════════════════ */
function buildEnvMap(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const ec = document.createElement("canvas");
  ec.width = 256; ec.height = 128;
  const ectx = ec.getContext("2d")!;
  ectx.fillStyle = "#050302";
  ectx.fillRect(0, 0, 256, 128);

  const k = ectx.createRadialGradient(210, 25, 0, 210, 25, 100);
  k.addColorStop(0, "rgba(255,235,160,0.95)");
  k.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = k; ectx.fillRect(0, 0, 256, 128);

  const f = ectx.createRadialGradient(20, 55, 0, 20, 55, 80);
  f.addColorStop(0, "rgba(201,168,76,0.7)");
  f.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = f; ectx.fillRect(0, 0, 256, 128);

  const r = ectx.createRadialGradient(128, 115, 0, 128, 115, 70);
  r.addColorStop(0, "rgba(160,200,255,0.45)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  ectx.fillStyle = r; ectx.fillRect(0, 0, 256, 128);

  const envTex = new THREE.CanvasTexture(ec);
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  envTex.colorSpace = THREE.SRGBColorSpace;
  scene.environment = pmrem.fromEquirectangular(envTex).texture;
  envTex.dispose();
  pmrem.dispose();
}