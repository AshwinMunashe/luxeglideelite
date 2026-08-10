"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Phone, MessageCircle, Car, ShieldCheck, Clock, User, ChevronDown, ChevronLeft, ChevronRight, MapPin, Star, Users, ArrowRight } from "lucide-react";
import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/examples/jsm/Addons.js";
 

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const PHONE = "+971562427288";
const WHATSAPP = "971562427288";

/* ─── CAR DATA — replace urls with your actual .glb paths ───── */
const CARS = [
  {
    name: "Mercedes S-Class",
    tagline: "The Pinnacle of Elegance",
    glb: "/models/mercedes-s-class.glb",   // replace with your GLB
    color: "#C9A84C",
    specs: ["V8 Biturbo", "496 HP", "Massage Seats"],
  },
  {
    name: "BMW 7 Series",
    tagline: "Driven by Excellence",
    glb: "/models/bmw-7-series.glb",        // replace with your GLB
    color: "#A0B4C8",
    specs: ["3.0L TwinPower", "375 HP", "Executive Lounge"],
  },
  {
    name: "Rolls-Royce Ghost",
    tagline: "Beyond Ordinary",
    glb: "/models/rolls-royce-ghost.glb",   // replace with your GLB
    color: "#D4C5B0",
    specs: ["6.75L V12", "563 HP", "Starlight Headliner"],
  },
];

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const LANG = {
  en: {
    dir: "ltr" as const,
    nav: ["Home", "About Us", "Services", "Contact Us"],
    tagline: "PREMIUM CHAUFFEUR SERVICES",
    headline1: "Seamless Journeys,",
    headline2: "Unmatched Comfort",
    sub: "Dubai's premier luxury chauffeur service — redefining travel with sophistication, comfort, and reliability.",
    call: "Call Now",
    whatsapp: "WhatsApp Us",
    features: [
      { icon: Car,        title: "Premium Fleet",        desc: "Top of the line vehicles for ultimate comfort." },
      { icon: User,       title: "Professional Drivers", desc: "Experienced, courteous, and always on time." },
      { icon: ShieldCheck,title: "Safety First",         desc: "Your safety is our top priority." },
      { icon: Clock,      title: "24/7 Availability",    desc: "Always here when you need us." },
    ],
    aboutTag: "ABOUT US",
    aboutTitle1: "Dubai's Premier Luxury",
    aboutTitle2: "Chauffeur Service",
    aboutP1: "LuxeGlide Elite is Dubai's premier luxury chauffeur service, redefining travel with sophistication, comfort, and reliability. Whether for business or leisure, we ensure seamless, stylish, and stress-free transportation.",
    aboutP2: "What sets us apart is our commitment to detail and passion for excellence. With a meticulously maintained fleet and professionally trained chauffeurs, we offer more than transportation — we create a calm, luxurious experience.",
    learnMore: "Learn More",
    stats: [
      { val: "100+", label: "Happy Clients" },
      { val: "24/7", label: "Availability" },
      { val: "100%", label: "Satisfaction" },
    ],
    servicesTag: "OUR SERVICES",
    servicesTitle: "Every Journey, Perfected",
    servicesIntro: "From airport transfers to VIP events, a comprehensive range of luxury chauffeur services tailored to your needs.",
    services: [
      { title: "Airport Transfers",  desc: "Seamless pickup and drop-off with flight tracking and meet & greet service." },
      { title: "Hourly Chauffeur",   desc: "Flexible hourly booking for business meetings, city tours, or special occasions." },
      { title: "City Tours",         desc: "Explore Dubai in ultimate comfort with curated luxury city tour experiences." },
      { title: "Corporate Travel",   desc: "Professional chauffeur services for executives and corporate events." },
      { title: "VIP Services",       desc: "Exclusive transportation for special events, weddings, and high-profile occasions." },
      { title: "Group Transport",    desc: "Premium fleet options for group travel with comfort and style." },
    ],
    scroll: "Scroll to Explore",
    ctaTitle: "Ready to Experience Elite Travel?",
    whyTag: "WHY CHOOSE US",
    whyTitle: "More Than Just a Ride",
    whyDesc: "We create a calm, luxurious experience with premium amenities and discreet, attentive service. From business meetings to weddings, every journey is handled with precision.",
    whyPoints: [
      "Flight tracking & personal meet and greet",
      "Meticulously maintained luxury fleet",
      "Professionally trained chauffeurs",
      "Premium amenities, discreet service",
    ],
  },
  ar: {
    dir: "rtl" as const,
    nav: ["الرئيسية", "من نحن", "خدماتنا", "تواصل معنا"],
    tagline: "خدمات السائق الفاخرة",
    headline1: "رحلات سلسة،",
    headline2: "راحة لا مثيل لها",
    sub: "خدمة السائق الفاخرة الأولى في دبي — تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    call: "اتصل الآن",
    whatsapp: "واتساب",
    features: [
      { icon: Car,        title: "أسطول فاخر",       desc: "أفضل السيارات لأقصى درجات الراحة." },
      { icon: User,       title: "سائقون محترفون",   desc: "متمرسون، مهذبون، دائماً في الموعد." },
      { icon: ShieldCheck,title: "السلامة أولاً",    desc: "سلامتك هي أولويتنا القصوى." },
      { icon: Clock,      title: "متوفرون ٢٤/٧",     desc: "في خدمتك دائماً وفي أي وقت." },
    ],
    aboutTag: "من نحن",
    aboutTitle1: "خدمة السائق الفاخرة",
    aboutTitle2: "الأولى في دبي",
    aboutP1: "لكس غلايد إيليت هي خدمة السائق الفاخرة الأولى في دبي، تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    aboutP2: "ما يميزنا هو التزامنا بالتفاصيل وشغفنا بالتميز. بأسطول مُصان بعناية وسائقين مدربين احترافياً، نقدم أكثر من مجرد نقل — نخلق تجربة هادئة وفاخرة.",
    learnMore: "اعرف المزيد",
    stats: [
      { val: "100+", label: "عميل سعيد" },
      { val: "٢٤/٧", label: "متوفرون دائماً" },
      { val: "100%", label: "رضا تام" },
    ],
    servicesTag: "خدماتنا",
    servicesTitle: "كل رحلة، مثالية",
    servicesIntro: "من خدمات المطار إلى فعاليات كبار الشخصيات، نقدم مجموعة شاملة من خدمات السائق الفاخرة.",
    services: [
      { title: "تحويلات المطار",   desc: "خدمة استقبال وتوصيل مع تتبع الرحلات والاستقبال الشخصي." },
      { title: "سائق بالساعة",    desc: "حجز مرن بالساعة لاجتماعات الأعمال أو جولات المدينة." },
      { title: "جولات المدينة",   desc: "استكشف دبي بأقصى راحة مع جولاتنا الفاخرة." },
      { title: "السفر المؤسسي",   desc: "خدمات احترافية للمديرين التنفيذيين والفعاليات المؤسسية." },
      { title: "خدمات VIP",       desc: "نقل حصري لكبار الشخصيات والأعراس والفعاليات الرفيعة." },
      { title: "النقل الجماعي",   desc: "خيارات أسطول متميزة للسفر الجماعي براحة وأناقة." },
    ],
    scroll: "استكشف المزيد",
    ctaTitle: "هل أنت مستعد لتجربة السفر النخبوي؟",
    whyTag: "لماذا تختارنا",
    whyTitle: "أكثر من مجرد رحلة",
    whyDesc: "نخلق تجربة هادئة وفاخرة مع وسائل راحة متميزة وخدمة متحفظة ومنتبهة. من اجتماعات الأعمال إلى حفلات الزفاف.",
    whyPoints: [
      "تتبع الرحلات والاستقبال الشخصي",
      "أسطول فاخر مُصان بعناية فائقة",
      "سائقون مدربون احترافياً",
      "وسائل راحة متميزة وخدمة متحفظة",
    ],
  },
};

/* ─── 3D CAR VIEWER COMPONENT ───────────────────────────────── */
function CarViewer3D({ glbUrl, isActive }: { glbUrl: string; isActive: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    animId: number;
    model: THREE.Group | null;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current || !isActive) return;
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // transparent

    // Camera — wide FOV, low angle so car dominates the canvas
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 6.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xC9A84C, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 6;   // allow looking down more
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    let model: THREE.Group | null = null;

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      glbUrl,
      (gltf) => {
        model = gltf.scene;

        // Auto-center and scale — fill the full canvas hero
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5.5 / maxDim; // larger to fill full screen
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y -= (box.min.y * scale); // sit on ground
        model.position.y -= 0.3; // slightly lower for dramatic low angle

        scene.add(model);
      },
      undefined,
      (err) => {
        // Fallback: show a styled placeholder box if GLB fails
        console.warn("GLB load failed, showing placeholder:", err);
        const geo = new THREE.BoxGeometry(2.5, 0.8, 1.2);
        const mat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = 0.4;
        scene.add(mesh);

        // Wheels
        for (const [x, z] of [[-1, 0.7],[1,0.7],[-1,-0.7],[1,-0.7]]) {
          const wg = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32);
          const wm = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.3 });
          const w = new THREE.Mesh(wg, wm);
          w.rotation.z = Math.PI / 2;
          w.position.set(x, 0.15, z);
          scene.add(w);
        }
      }
    );

    // Animate
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera, controls, animId, model };

    // Resize
    const handleResize = () => {
      if (!el) return;
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [glbUrl, isActive]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
export default function LuxeGlidePage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [carIdx, setCarIdx] = useState(0);
  const [carTransition, setCarTransition] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const t = LANG[lang];

  const prevCar = useCallback(() => {
    setCarTransition(true);
    setTimeout(() => {
      setCarIdx((p) => (p - 1 + CARS.length) % CARS.length);
      setCarTransition(false);
    }, 300);
  }, []);

  const nextCar = useCallback(() => {
    setCarTransition(true);
    setTimeout(() => {
      setCarIdx((p) => (p + 1) % CARS.length);
      setCarTransition(false);
    }, 300);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: rgba(201,168,76,0.18);
          --black: #070707;
          --off-white: #F5F0E8;
          --muted: rgba(245,240,232,0.5);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--black); color: var(--off-white); }

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'Montserrat', sans-serif; }
        .font-arabic  { font-family: 'Noto Naskh Arabic', serif; }

        .grain-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.035;
        }

        .gold-line { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, var(--gold-light) 0%, #fff 40%, var(--gold) 60%, var(--gold-light) 100%);
          background-size: 600px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s infinite linear;
        }

        .btn-gold {
          background: var(--gold); color: var(--black);
          font-family: 'Montserrat', sans-serif; font-weight: 500;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 13px 28px; border-radius: 999px; border: none; cursor: pointer;
          transition: background 0.3s, transform 0.2s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }

        .btn-outline {
          background: transparent; color: var(--gold);
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 12px 28px; border-radius: 999px; border: 1px solid var(--gold); cursor: pointer;
          transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-outline:hover { background: var(--gold-dim); transform: translateY(-2px); }

        .btn-dark {
          background: rgba(255,255,255,0.07); color: var(--off-white);
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 12px 28px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer;
          transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-dark:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
        .bounce { animation: bounce 2s ease-in-out infinite; }

        .car-arrow {
          width: 52px; height: 52px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.4);
          background: rgba(7,7,7,0.7);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--gold);
          transition: all 0.3s; flex-shrink: 0;
        }
        .car-arrow:hover { background: var(--gold-dim); border-color: var(--gold); transform: scale(1.08); }

        .feature-card {
          padding: 28px 24px;
          border-right: 1px solid rgba(201,168,76,0.1);
          display: flex; flex-direction: column; gap: 14px;
          transition: background 0.3s; cursor: default;
          background: rgba(7,7,7,0.6);
          backdrop-filter: blur(16px);
        }
        .feature-card:last-child { border-right: none; }
        .feature-card:hover { background: rgba(201,168,76,0.05); }

        .service-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 36px 28px;
          transition: all 0.3s; cursor: default;
        }
        .service-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-4px); background: rgba(201,168,76,0.04); }
        .service-card.featured { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.35); }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .why-grid   { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .feature-card { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.1); }
          .feature-card:last-child { border-bottom: none; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="grain-overlay" aria-hidden />

      <div style={{ background: "var(--black)", minHeight: "100vh" }}>

        {/* ═══════════ NAVBAR ═══════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          background: "rgba(7,7,7,0.75)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
        }}>
          <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }} dir={t.dir}>
            <div className="font-display" style={{ fontSize: 22, letterSpacing: "0.32em", color: "var(--off-white)", fontWeight: 300, userSelect: "none" }}>
              LUXEGLIDE
            </div>
            <div className="font-body nav-links" style={{ display: "flex", gap: 40, fontSize: 10, letterSpacing: "0.22em", color: "var(--muted)", textTransform: "uppercase" }}>
              {t.nav.map((item) => (
                <span key={item} style={{ cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >{item}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => setLang(lang === "en" ? "ar" : "en")}
                style={{
                  background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.25)",
                  color: "var(--gold)", borderRadius: 999, padding: "6px 16px",
                  fontSize: 11, letterSpacing: "0.08em", cursor: "pointer",
                  fontFamily: lang === "ar" ? "'Montserrat', sans-serif" : "'Noto Naskh Arabic', serif",
                  transition: "all 0.3s"
                }}
              >
                {lang === "en" ? "العربية" : "English"}
              </button>
              <a href={`https://wa.me/${WHATSAPP}`} className="btn-gold" style={{ fontSize: 10, padding: "10px 20px" }}>
                {t.call}
              </a>
            </div>
          </div>
        </nav>

        {/* ═══════════ HERO ═══════════ */}
        <section
          ref={heroRef}
          id="home"
          style={{ position: "relative", height: "100svh", minHeight: 700, overflow: "hidden", background: "#070707" }}
          dir={t.dir}
        >
          {/* ── LAYER 0: dark base gradient ── */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 80%, #120e05 0%, #070707 70%)", zIndex: 0 }} />

          {/* ── LAYER 1: 3D car — full hero canvas ── */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }} aria-hidden>
            {CARS.map((car, i) => (
              <div key={i} style={{
                display: i === carIdx ? "block" : "none",
                position: "absolute", inset: 0,
                opacity: carTransition ? 0 : 1,
                transition: "opacity 0.35s ease",
              }}>
                <CarViewer3D glbUrl={car.glb} isActive={i === carIdx} />
              </div>
            ))}
          </div>

          {/* ── LAYER 2: gradient vignette so text stays legible ── */}
          {/* top fade for navbar area */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(7,7,7,0.72) 0%, rgba(7,7,7,0.18) 28%, rgba(7,7,7,0) 55%, rgba(7,7,7,0.55) 78%, rgba(7,7,7,0.92) 100%)"
          }} />
          {/* side edge fades */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            background: "linear-gradient(90deg, rgba(7,7,7,0.18) 0%, rgba(7,7,7,0) 30%, rgba(7,7,7,0) 70%, rgba(7,7,7,0.18) 100%)"
          }} />

          {/* ── LAYER 3: TEXT OVERLAY — centered at top ── */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, paddingTop: 96, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={lang + "hero-text"}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{
                  fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase",
                  color: "var(--gold)", marginBottom: 18,
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <span style={{ width: 32, height: 1, background: "var(--gold)", display: "inline-block" }} />
                  {t.tagline}
                  <span style={{ width: 32, height: 1, background: "var(--gold)", display: "inline-block" }} />
                </div>

                <h1 className={lang === "ar" ? "font-arabic" : "font-display"} style={{
                  fontSize: "clamp(48px, 6.5vw, 92px)", fontWeight: lang === "ar" ? 600 : 300,
                  lineHeight: 1.0, color: "var(--off-white)", letterSpacing: lang === "ar" ? "0" : "-0.01em",
                  marginBottom: 2,
                }}>
                  {t.headline1}
                </h1>
                <h1 className={`${lang === "ar" ? "font-arabic" : "font-display"} shimmer-text`} style={{
                  fontSize: "clamp(48px, 6.5vw, 92px)", fontWeight: lang === "ar" ? 600 : 300,
                  lineHeight: 1.0, letterSpacing: lang === "ar" ? "0" : "-0.01em",
                  marginBottom: 20,
                }}>
                  {t.headline2}
                </h1>

                <p className={lang === "ar" ? "font-arabic" : "font-body"} style={{
                  fontSize: "clamp(13px, 1.1vw, 15px)", color: "var(--muted)", lineHeight: 1.8,
                  maxWidth: 480, marginBottom: 28, fontWeight: 300,
                }}>
                  {t.sub}
                </p>

                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={`tel:${PHONE}`} className="btn-gold"><Phone size={14} />{t.call}</a>
                  <a href={`https://wa.me/${WHATSAPP}`} className="btn-outline" target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />{t.whatsapp}</a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── LAYER 4: LEFT ARROW (edge-pinned) ── */}
          <button
            className="car-arrow"
            onClick={prevCar}
            aria-label="Previous car"
            style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* ── LAYER 4: RIGHT ARROW (edge-pinned) ── */}
          <button
            className="car-arrow"
            onClick={nextCar}
            aria-label="Next car"
            style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}
          >
            <ChevronRight size={22} />
          </button>

          {/* ── LAYER 5: BOTTOM HUD — car name + dots + hint ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
            {/* Car info strip */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 20 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={carIdx + "hud"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: carTransition ? 0 : 1, y: carTransition ? 6 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ textAlign: "center", marginBottom: 14 }}
                >
                  <div className="font-body" style={{ fontSize: 8, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 5 }}>
                    {CARS[carIdx].tagline}
                  </div>
                  <div className="font-display" style={{ fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 300, color: "var(--off-white)", letterSpacing: "0.04em", marginBottom: 10 }}>
                    {CARS[carIdx].name}
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    {CARS[carIdx].specs.map((s, i) => (
                      <span key={i} className="font-body" style={{
                        fontSize: 8, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase",
                        padding: "4px 12px", border: "1px solid rgba(201,168,76,0.22)", borderRadius: 99,
                        background: "rgba(7,7,7,0.5)", backdropFilter: "blur(8px)",
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {CARS.map((_, i) => (
                  <button key={i}
                    onClick={() => { setCarTransition(true); setTimeout(() => { setCarIdx(i); setCarTransition(false); }, 300); }}
                    style={{ width: i === carIdx ? 28 : 7, height: 7, borderRadius: 4, background: i === carIdx ? "var(--gold)" : "rgba(201,168,76,0.28)", border: "none", cursor: "pointer", transition: "all 0.35s", padding: 0 }}
                    aria-label={`Go to car ${i + 1}`}
                  />
                ))}
              </div>

              {/* Rotate hint */}
              <div className="font-body" style={{ fontSize: 8, letterSpacing: "0.22em", color: "rgba(201,168,76,0.32)", textTransform: "uppercase" }}>
                Drag to rotate · Use arrows to browse
              </div>
            </div>

            {/* Feature strip */}
            <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", background: "rgba(7,7,7,0.72)", backdropFilter: "blur(20px)" }}>
              <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: 1360, margin: "0 auto" }} dir={t.dir}>
                {t.features.map((f, i) => (
                  <motion.div
                    key={lang + i}
                    className="feature-card"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    style={{ textAlign: lang === "ar" ? "right" : "left" }}
                  >
                    <f.icon size={18} style={{ color: "var(--gold)" }} />
                    <div>
                      <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--off-white)", marginBottom: 5, fontWeight: 500 }}>
                        {f.title}
                      </div>
                      <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>
                        {f.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="gold-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }} />
        </section>

        {/* ═══════════ ABOUT US ═══════════ */}
        <section id="about" style={{ padding: "120px clamp(24px, 5vw, 80px)", background: "#faf8f4" }} dir={t.dir}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
            {/* Image panel */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ borderRadius: 24, overflow: "hidden", height: 520, background: "linear-gradient(135deg, #1a1209 0%, #0d0b07 100%)", position: "relative", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 55%, rgba(201,168,76,0.18) 0%, transparent 65%)" }} />
              <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                <div className="gold-line" style={{ marginBottom: 20 }} />
                <div className="font-display" style={{ fontSize: 36, fontWeight: 300, color: "var(--off-white)", letterSpacing: "0.05em", lineHeight: 1.2 }}>
                  Since<br /><span style={{ color: "var(--gold)" }}>20206</span>
                </div>
              </div>
              <div style={{ position: "absolute", top: 32, right: 32 }}>
                <div style={{ fontSize: 64, lineHeight: 1, color: "rgba(201,168,76,0.1)", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>"</div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ textAlign: lang === "ar" ? "right" : "left" }}
            >
              <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
                {t.aboutTag}
              </div>
              <h2 className={lang === "ar" ? "font-arabic" : "font-display"} style={{ fontSize: "clamp(30px, 3.5vw, 50px)", fontWeight: lang === "ar" ? 600 : 400, color: "#111", lineHeight: 1.1, marginBottom: 28 }}>
                {t.aboutTitle1} <span style={{ color: "var(--gold)" }}>{t.aboutTitle2}</span>
              </h2>
              <p className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 15, color: "#555", lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>{t.aboutP1}</p>
              <p className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 15, color: "#555", lineHeight: 1.9, fontWeight: 300, marginBottom: 44 }}>{t.aboutP2}</p>

              {/* Stats */}
              <div style={{ display: "flex", gap: 40, marginBottom: 44, justifyContent: lang === "ar" ? "flex-end" : "flex-start" }}>
                {t.stats.map((s, i) => (
                  <div key={i} style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                    <div className={lang === "ar" ? "font-arabic" : "font-display"} style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: "var(--gold)", lineHeight: 1 }}>{s.val}</div>
                    <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 10, color: "#888", marginTop: 6, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: lang === "ar" ? "flex-end" : "flex-start" }}>
                <a href="#services" className="btn-gold" style={{ background: "#111", color: "#fff" }}>
                  <ArrowRight size={14} />
                  {t.learnMore}
                </a>
                <a href={`tel:${PHONE}`} className="btn-outline" style={{ borderColor: "#111", color: "#111" }}>
                  <Phone size={14} />
                  {t.call}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ SERVICES ═══════════ */}
        <section id="services" style={{ padding: "120px clamp(24px, 5vw, 80px)", background: "#0d0d0d" }} dir={t.dir}>
          <div style={{ maxWidth: 1360, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}>
              <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{t.servicesTag}</div>
              <h2 className={lang === "ar" ? "font-arabic" : "font-display"} style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "var(--off-white)", lineHeight: 1.1, marginBottom: 20 }}>{t.servicesTitle}</h2>
              <p className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 14, color: "var(--muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.servicesIntro}</p>
            </motion.div>

            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {t.services.map((svc, i) => {
                const icons = [Car, Clock, MapPin, ShieldCheck, Star, Users];
                const Icon = icons[i] || Car;
                return (
                  <motion.div
                    key={lang + i}
                    className={`service-card${i === 1 ? " featured" : ""}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    style={{ textAlign: lang === "ar" ? "right" : "left" }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(201,168,76,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, marginLeft: lang === "ar" ? "auto" : 0 }}>
                      <Icon size={20} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 14, fontWeight: 500, color: "var(--off-white)", marginBottom: 10, letterSpacing: "0.03em" }}>{svc.title}</div>
                    <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{svc.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY CHOOSE US ═══════════ */}
        <section style={{ padding: "120px clamp(24px, 5vw, 80px)", background: "var(--black)", borderTop: "1px solid rgba(201,168,76,0.07)" }} dir={t.dir}>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ textAlign: lang === "ar" ? "right" : "left" }}
            >
              <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
                {t.whyTag}
              </div>
              <h2 className={lang === "ar" ? "font-arabic" : "font-display"} style={{ fontSize: "clamp(30px, 4vw, 54px)", fontWeight: 300, color: "var(--off-white)", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.01em" }}>
                {t.whyTitle}
              </h2>
              <p className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.9, fontWeight: 300, marginBottom: 40 }}>
                {t.whyDesc}
              </p>
              <a href={`https://wa.me/${WHATSAPP}`} className="btn-gold" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} />{t.whatsapp}
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 24, padding: "48px 40px" }}
            >
              <div className="gold-line" style={{ marginBottom: 36 }} />
              {t.whyPoints.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                  className={lang === "ar" ? "font-arabic" : "font-body"}
                  style={{ fontSize: 13, color: "var(--muted)", padding: "18px 0", borderBottom: i < t.whyPoints.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", display: "flex", alignItems: "center", gap: 16, letterSpacing: "0.04em", justifyContent: lang === "ar" ? "flex-end" : "flex-start" }}
                >
                  {lang !== "ar" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
                  {item}
                  {lang === "ar" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
                </motion.div>
              ))}
              <div className="gold-line" style={{ marginTop: 36 }} />
            </motion.div>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section id="contact" style={{ padding: "120px clamp(24px, 5vw, 80px)", textAlign: "center", background: "linear-gradient(180deg, var(--black) 0%, #100d03 50%, var(--black) 100%)", position: "relative", overflow: "hidden" }} dir={t.dir}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 1 }}>
            <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 24 }}>
              {lang === "en" ? "Contact Us" : "تواصل معنا"}
            </div>
            <h2 className={lang === "ar" ? "font-arabic" : "font-display"} style={{ fontSize: "clamp(36px, 5.5vw, 76px)", fontWeight: 300, color: "var(--off-white)", lineHeight: 1.05, marginBottom: 48, letterSpacing: "-0.01em" }}>
              {t.ctaTitle}
            </h2>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={`tel:${PHONE}`} className="btn-gold"><Phone size={14} />{t.call}</a>
              <a href={`https://wa.me/${WHATSAPP}`} className="btn-outline" target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />{t.whatsapp}</a>
            </div>
          </motion.div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer style={{ borderTop: "1px solid rgba(201,168,76,0.1)", padding: "32px clamp(24px, 5vw, 80px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }} dir={t.dir}>
          <div className="font-display" style={{ letterSpacing: "0.32em", fontSize: 14, color: "rgba(245,240,232,0.35)", fontWeight: 300 }}>LUXEGLIDE</div>
          <div className={lang === "ar" ? "font-arabic" : "font-body"} style={{ fontSize: 10, color: "rgba(245,240,232,0.22)", letterSpacing: "0.08em" }}>
            © {new Date().getFullYear()} LuxeGlide Dubai. {lang === "en" ? "Crafted for excellence." : "صُنع للتميّز."}
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href={`tel:${PHONE}`} style={{ color: "var(--gold)", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}><Phone size={16} /></a>
            <a href={`https://wa.me/${WHATSAPP}`} style={{ color: "var(--gold)", opacity: 0.6, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}><MessageCircle size={16} /></a>
          </div>
        </footer>

      </div>
    </>
  );
}

/*
─── NEXT.JS SETUP NOTES ────────────────────────────────────────

1. Install dependencies:
   npm install three @types/three framer-motion lucide-react

2. Place your GLB models at:
   /public/models/mercedes-s-class.glb
   /public/models/bmw-7-series.glb
   /public/models/rolls-royce-ghost.glb

3. The CARS array at the top lets you configure each car:
   - name: Display name
   - tagline: Subtitle under the name
   - glb: Path to your GLB file (relative to /public)
   - color: Accent color for the car (future use)
   - specs: Array of 3 spec badges shown below the car name

4. If a GLB fails to load (missing file), a 3D box placeholder
   renders so the viewer never breaks.

5. OrbitControls allow 360° drag-rotation. Arrows cycle cars.
   Auto-rotation is enabled at 0.6 rpm.

6. Recommended free GLB sources:
   - Sketchfab (search for car models, filter by license)
   - Google Poly archive
   - CGTrader (many free options)

─────────────────────────────────────────────────────────────── */