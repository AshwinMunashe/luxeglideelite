"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Phone, MessageCircle, Car, ShieldCheck, Clock, User,
  ChevronLeft, ChevronRight, MapPin, Star, Users, ArrowRight,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/examples/jsm/Addons.js";

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const PHONE = "+971562427288";
const WHATSAPP = "971562427288";

/* ─── CAR DATA ───────────────────────────────────────────────── */
const CARS = [
  { name: "Mercedes S-Class", tagline: "Luxury Comfort",      glb: "/models/truck_new.glb", specs: ["V8 Biturbo", "496 HP", "Massage Seats"] },
  { name: "BMW 7 Series",     tagline: "Driven by Excellence", glb: "/models/1970_dodge_challenger_rt/scene.gltf", specs: ["3.0L TwinPower", "375 HP", "Executive Lounge"] },
  { name: "Rolls-Royce Ghost",tagline: "Beyond Ordinary",     glb: "/models/truck_new.glb", specs: ["6.75L V12", "563 HP", "Starlight Headliner"] },
];

/* ─── TRANSLATIONS ───────────────────────────────────────────── */
const LANG = {
  en: {
    dir: "ltr" as const,
    nav: ["Home", "About Us", "Services", "Contact Us"],
    tagline: "PREMIUM CHAUFFEUR SERVICES",
    headline1: "Seamless Journeys,",
    headline2: "Unmatched Comfort",
    sub: "Dubai's premier luxury chauffeur service — redefining travel with sophistication and reliability.",
    call: "Call Now",
    whatsapp: "WhatsApp Us",
    features: [
      { icon: Car,         title: "Premium Fleet",        desc: "Top of the line vehicles for ultimate comfort." },
      { icon: User,        title: "Professional Drivers", desc: "Experienced, courteous, and always on time." },
      { icon: ShieldCheck, title: "Safety First",         desc: "Your safety is our top priority." },
      { icon: Clock,       title: "24/7 Availability",    desc: "Always here when you need us." },
    ],
    aboutTag: "ABOUT US",
    aboutTitle1: "Dubai's Premier Luxury",
    aboutTitle2: "Chauffeur Service",
    aboutP1: "LuxeGlide Elite is Dubai's premier luxury chauffeur service, redefining travel with sophistication, comfort, and reliability. Whether for business or leisure, we ensure seamless, stylish, and stress-free transportation.",
    aboutP2: "What sets us apart is our commitment to detail and passion for excellence. With a meticulously maintained fleet and professionally trained chauffeurs, we offer more than transportation — we create a calm, luxurious experience.",
    learnMore: "Learn More",
    stats: [{ val: "500+", label: "Happy Clients" }, { val: "24/7", label: "Availability" }, { val: "100%", label: "Satisfaction" }],
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
    ctaTitle: "Ready to Experience Elite Travel?",
    whyTag: "WHY CHOOSE US",
    whyTitle: "More Than Just a Ride",
    whyDesc: "We create a calm, luxurious experience with premium amenities and discreet, attentive service. From business meetings to weddings, every journey is handled with precision.",
    whyPoints: ["Flight tracking & personal meet and greet", "Meticulously maintained luxury fleet", "Professionally trained chauffeurs", "Premium amenities, discreet service"],
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
      { icon: Car,         title: "أسطول فاخر",      desc: "أفضل السيارات لأقصى درجات الراحة." },
      { icon: User,        title: "سائقون محترفون",  desc: "متمرسون، مهذبون، دائماً في الموعد." },
      { icon: ShieldCheck, title: "السلامة أولاً",   desc: "سلامتك هي أولويتنا القصوى." },
      { icon: Clock,       title: "متوفرون ٢٤/٧",    desc: "في خدمتك دائماً وفي أي وقت." },
    ],
    aboutTag: "من نحن",
    aboutTitle1: "خدمة السائق الفاخرة",
    aboutTitle2: "الأولى في دبي",
    aboutP1: "لكس غلايد إيليت هي خدمة السائق الفاخرة الأولى في دبي، تُعيد تعريف السفر بالرقي والراحة والموثوقية.",
    aboutP2: "ما يميزنا هو التزامنا بالتفاصيل وشغفنا بالتميز. بأسطول مُصان بعناية وسائقين مدربين احترافياً، نقدم أكثر من مجرد نقل — نخلق تجربة هادئة وفاخرة.",
    learnMore: "اعرف المزيد",
    stats: [{ val: "500+", label: "عميل سعيد" }, { val: "٢٤/٧", label: "متوفرون دائماً" }, { val: "100%", label: "رضا تام" }],
    servicesTag: "خدماتنا",
    servicesTitle: "كل رحلة، مثالية",
    servicesIntro: "من خدمات المطار إلى فعاليات كبار الشخصيات، نقدم مجموعة شاملة من خدمات السائق الفاخرة.",
    services: [
      { title: "تحويلات المطار",  desc: "خدمة استقبال وتوصيل مع تتبع الرحلات والاستقبال الشخصي." },
      { title: "سائق بالساعة",   desc: "حجز مرن بالساعة لاجتماعات الأعمال أو جولات المدينة." },
      { title: "جولات المدينة",  desc: "استكشف دبي بأقصى راحة مع جولاتنا الفاخرة." },
      { title: "السفر المؤسسي",  desc: "خدمات احترافية للمديرين التنفيذيين والفعاليات المؤسسية." },
      { title: "خدمات VIP",      desc: "نقل حصري لكبار الشخصيات والأعراس والفعاليات الرفيعة." },
      { title: "النقل الجماعي", desc: "خيارات أسطول متميزة للسفر الجماعي براحة وأناقة." },
    ],
    ctaTitle: "هل أنت مستعد لتجربة السفر النخبوي؟",
    whyTag: "لماذا تختارنا",
    whyTitle: "أكثر من مجرد رحلة",
    whyDesc: "نخلق تجربة هادئة وفاخرة مع وسائل راحة متميزة وخدمة متحفظة ومنتبهة. من اجتماعات الأعمال إلى حفلات الزفاف.",
    whyPoints: ["تتبع الرحلات والاستقبال الشخصي", "أسطول فاخر مُصان بعناية فائقة", "سائقون مدربون احترافياً", "وسائل راحة متميزة وخدمة متحفظة"],
  },
};

/* ─── 3D VIEWER ─────────────────────────────────────────────── */
function CarViewer3D({ glbUrl, isActive }: { glbUrl: string; isActive: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current || !isActive) return;
    const el = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(48, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 1.6, 7.5);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xfff8ee, 2.8); key.position.set(6, 10, 6); scene.add(key);
    const fill = new THREE.DirectionalLight(0xC9A84C, 0.5); fill.position.set(-6, 3, -4); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(0, 6, -10); scene.add(rim);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.05;
    controls.enableZoom = false; controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 6; controls.maxPolarAngle = Math.PI / 2.2;
    controls.autoRotate = true; controls.autoRotateSpeed = 0.6;
    new GLTFLoader().load(glbUrl, (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale = 5.5 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.position.y -= box.min.y * scale + 0.2;
      scene.add(model);
    }, undefined, () => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.8, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 })
      );
      mesh.position.y = 0.4; scene.add(mesh);
    });
    let id = 0;
    const animate = () => { id = requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
    animate();
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(id);
      controls.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [glbUrl, isActive]);
  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

/* ─── PAGE ───────────────────────────────────────────────────── */
export default function LuxeGlidePage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [carIdx, setCarIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [mobileCardIdx, setMobileCardIdx] = useState(0);
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  const changeCar = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => { setCarIdx(next); setFading(false); }, 280);
  }, []);

  /* ── CSS-VAR heights ─────────────────────────────────────────
     --nav-h:   fixed navbar
     --cards-h: feature strip at hero bottom (desktop 128px, mobile 140px)
     The 3D car canvas fills hero top to bottom; cards overlay it at bottom.
  ────────────────────────────────────────────────────────────── */

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-lt: #E8C97A;
          --gold-dim: rgba(201,168,76,0.18);
          --black: #070707;
          --off: #F5F0E8;
          --muted: rgba(245,240,232,0.52);
          --nav-h: 60px;
          --cards-h: 128px;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--black); color: var(--off); overflow-x: hidden; }
        .fd { font-family: 'Poppins', sans-serif; }
        .fb { font-family: 'Montserrat', sans-serif; }
        .fa { font-family: 'Noto Naskh Arabic', serif; }

        /* grain overlay */
        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.032;
        }

        /* shimmer headline */
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        .shimmer {
          background: linear-gradient(90deg, var(--gold-lt) 0%, #fff 40%, var(--gold) 60%, var(--gold-lt) 100%);
          background-size: 600px 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 5s linear infinite;
        }

        /* watermark pulse */
        @keyframes wmpulse { 0%,100%{opacity:.05} 50%{opacity:.09} }
        .wm { animation: wmpulse 8s ease-in-out infinite; }

        /* gold line */
        .gline { height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

        /* buttons */
      .btn-g {
  background: var(--gold); 
  color: var(--black);
  opacity: 1 !important; /* Force full opacity */
  font-family: 'Montserrat', sans-serif; 
  font-weight: 600; /* Increased weight for visibility */
  font-size: 11px; 
  letter-spacing: .14em; 
  text-transform: uppercase;
  padding: 12px 24px; 
  border-radius: 999px; 
  border: none; 
  cursor: pointer;
  transition: all .3s ease;
  display: inline-flex; 
  align-items: center; 
  gap: 7px;
  text-decoration: none; 
  white-space: nowrap;
}
        .btn-g:hover { background: var(--gold-lt); transform: translateY(-2px); }
        .btn-o {
          background: transparent; color: var(--gold);
          font-family: 'Montserrat', sans-serif; font-weight: 400;
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          padding: 10px 22px; border-radius: 999px; border: 1px solid var(--gold); cursor: pointer;
          transition: all .3s;
          display: inline-flex; align-items: center; gap: 7px;
          text-decoration: none; white-space: nowrap;
        }
        .btn-o:hover { background: var(--gold-dim); transform: translateY(-2px); }

        /* carousel arrow */
        .arr {
          width: 46px; height: 46px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,.4);
          background: rgba(7,7,7,.65); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--gold);
          transition: all .3s; flex-shrink: 0; outline: none;
        }
        .arr:hover { background: var(--gold-dim); border-color: var(--gold); transform: scale(1.08); }
        .arr-sm { width: 34px; height: 34px; }

        /* ════════════════════════════════════════════
           HERO — one unified full-viewport block.
           3D car is layer 1 spanning 100% w/h.
           All overlays are position:absolute on top.
           Cards strip is pinned to bottom:0 inside.
           NO side panels. NO background divisions.
        ════════════════════════════════════════════ */
        .hero {
          position: relative;
          width: 100%;
          height: 100dvh;
          min-height: 620px;
          overflow: hidden;
          background: #070707;
        }
          /* Container for the buttons on mobile */
.mobile-btn-container {
  position: absolute;
  bottom: calc(var(--cards-h) + 20px);
  left: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  z-index: 10;
}

        /* desktop 4-col cards strip */
        .cards-desk {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: var(--cards-h);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(4,4,4,0.86);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(201,168,76,.2);
          z-index: 30;
        }
        .c-cell {
          padding: 18px 22px;
          border-right: 1px solid rgba(201,168,76,.1);
          display: flex; flex-direction: column; gap: 7px;
          transition: background .3s;
        }
        .c-cell:last-child { border-right: none; }
        .c-cell:hover { background: rgba(201,168,76,.06); }

        /* mobile carousel cards strip */
        .cards-mob {
          display: none;
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(4,4,4,.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(201,168,76,.2);
          z-index: 30;
          overflow: hidden;
        }
        .m-track {
          display: flex;
          transition: transform .38s cubic-bezier(.22,1,.36,1);
        }
        .m-slide {
          min-width: 100%;
          padding: 16px 24px 10px;
          display: flex; flex-direction: column; gap: 7px;
        }

        /* service cards */
        .svc-card {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px; padding: 26px 22px;
          transition: all .3s;
        }
        .svc-card:hover { border-color: rgba(201,168,76,.3); transform: translateY(-4px); background: rgba(201,168,76,.04); }
        .svc-card.ft { background: rgba(201,168,76,.06); border-color: rgba(201,168,76,.35); }

        /* ── RESPONSIVE ── */
 @media (max-width: 900px) {
  :root { --cards-h: 148px; }
  
  /* 1. Reset hero layout for mobile */
  .hero { height: 100dvh !important; }
  
  /* 2. Resize 3D Model: Shrink and center it so text doesn't overlap */
  .hero > div:nth-child(2) {
    height: 50% !important;
    top: 25% !important; /* Vertically center the model */
    pointer-events: none; /* Let clicks pass through to text/buttons */
  }

  /* 3. Text Overlay: Move to top, scale down */
  .h-left { 
    top: calc(var(--nav-h) + 20px) !important; 
    max-width: 90% !important; 
    left: 20px !important;
  }
  .h-hl { font-size: clamp(22px, 6vw, 32px) !important; }
  
  /* 4. Car Details: Re-enable and position in top-right */
  .h-right {
    display: flex !important;
    top: calc(var(--nav-h) + 10px) !important;
    right: 15px !important;
    transform: none !important;
    align-items: flex-end;
  }
  .specs-row { display: none !important; } /* Hide specs on mobile to save space */

  /* 5. Cleanup */
  .cards-desk { display: none !important; }
  .cards-mob  { display: block !important; }
  .nav-links  { display: none !important; }
  .btn-o.hide-xs { display: none !important; }
}
        @media (max-width: 540px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .h-hl { font-size: clamp(18px, 7vw, 28px) !important; }
          .h-left { max-width: 70vw !important; }
          .btn-o.hide-xs { display: none !important; }
        }
      `}</style>

      <div className="grain" aria-hidden />

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "var(--nav-h)",
        background: "rgba(7,7,7,.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,.12)",
        display: "flex", alignItems: "center",
      }}>
        <div style={{
          width: "100%", maxWidth: 1400, margin: "0 auto",
          padding: "0 clamp(16px,4vw,40px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }} dir={t.dir}>
          <div className="fd" style={{ fontSize: 19, letterSpacing: ".32em", color: "var(--off)", fontWeight: 300, userSelect: "none" }}>
            LUXEGLIDE
          </div>
          <div className="fb nav-links" style={{ display: "flex", gap: 32, fontSize: 9, letterSpacing: ".22em", color: "var(--muted)", textTransform: "uppercase" }}>
            {t.nav.map(n => (
              <span key={n} style={{ cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>{n}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setLang(l => l === "en" ? "ar" : "en")} style={{
              background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,.25)",
              color: "var(--gold)", borderRadius: 999, padding: "5px 14px",
              fontSize: 10, cursor: "pointer", transition: "all .3s",
              fontFamily: lang === "ar" ? "'Montserrat',sans-serif" : "'Noto Naskh Arabic',serif",
            }}>{lang === "en" ? "العربية" : "English"}</button>
            <a href={`tel:${PHONE}`} className="btn-g" style={{ padding: "9px 18px", fontSize: 9 }}>{t.call}</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════
          ONE unified block. Nothing is divided.
          ─ Layer 0: radial bg glow (z:0)
          ─ Layer 1: 3D car, inset:0 (z:1)
          ─ Layer 2: "طريق" watermark (z:2)
          ─ Layer 3: bottom gradient vignette for card blending (z:3)
          ─ Layer 10: left text overlay
          ─ Layer 10: right car-info overlay
          ─ Layer 20: prev/next arrows
          ─ Layer 30: feature cards strip (position:absolute, bottom:0)
      ══════════════════════════════════════════ */}
      <section className="hero" id="home">

        {/* L0 — ambient glow */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 55% 50%, #130f04 0%, #070707 68%)",
        }} />

        {/* L1 — 3D car canvas, full-bleed */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          {CARS.map((car, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              display: i === carIdx ? "block" : "none",
              opacity: fading ? 0 : 1,
              transition: "opacity .3s ease",
            }}>
              <CarViewer3D glbUrl={car.glb} isActive={i === carIdx} />
            </div>
          ))}
        </div>

        {/* L2 — watermark text */}
        <div className="wm" style={{
          position: "absolute", zIndex: 2, pointerEvents: "none",
          top: "50%", left: "50%",
          transform: "translate(-50%, -52%)",
          fontFamily: "'Noto Naskh Arabic',serif", fontWeight: 600,
          fontSize: "clamp(90px,19vw,280px)",
          color: "var(--gold)", lineHeight: 1,
          userSelect: "none", whiteSpace: "nowrap",
        }}>LuxeGlide</div>

        {/* L3 — bottom vignette so car fades into cards seamlessly */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "calc(var(--cards-h) + 100px)",
          background: "linear-gradient(to bottom, transparent 0%, rgba(4,4,4,.65) 45%, rgba(4,4,4,.92) 100%)",
          zIndex: 25, pointerEvents: "none",
        }} />

        {/* L10a — LEFT overlay: tagline + headline + sub + CTAs
            No background. Text sits directly over the car.
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lang + "L"}
            className="h-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
            style={{
              position: "absolute",
              left: isRTL ? "auto" : "clamp(20px,5vw,72px)",
              right: isRTL ? "clamp(20px,5vw,72px)" : "auto",
              /* vertically centered in the area above the cards strip */
              top: `calc(var(--nav-h) + 60px)`,
              transform: "translateY(-50%)",
              zIndex: 10,
              maxWidth: "clamp(220px,26vw,360px)",
              display: "flex", flexDirection: "column",
              alignItems: isRTL ? "flex-end" : "flex-start",
            }}
          >
            {/* tagline line */}
            <div className={lang === "ar" ? "fa" : "fb"} style={{
              fontSize: "clamp(7px,.7vw,9px)", letterSpacing: ".38em",
              textTransform: "uppercase", color: "var(--gold)",
              display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
            }}>
              <span style={{ width: 22, height: 1, background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
              {t.tagline}
              <span style={{ width: 22, height: 1, background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
            </div>

            <h1 className={`h-hl ${lang === "ar" ? "fa" : "fd"}`} style={{
              fontSize: "clamp(24px,3.2vw,54px)",
              fontWeight: lang === "ar" ? 600 : 300,
              lineHeight: 1.06, color: "var(--off)",
              marginBottom: 2,
              textAlign: isRTL ? "right" : "left",
            }}>{t.headline1}</h1>

            <h1 className={`h-hl shimmer ${lang === "ar" ? "fa" : "fd"}`} style={{
              fontSize: "clamp(24px,3.2vw,54px)",
              fontWeight: 700, lineHeight: 1.06,
              marginBottom: "clamp(10px,1.6vh,20px)",
              textAlign: isRTL ? "right" : "left",
            }}>{t.headline2}</h1>

            <p className={`h-sub ${lang === "ar" ? "fa" : "fb"}`} style={{
              fontSize: "clamp(10px,.85vw,13px)", color: "var(--muted)",
              lineHeight: 1.78, marginBottom: "clamp(14px,2vh,26px)",
              fontWeight: 300, textAlign: isRTL ? "right" : "left",
            }}>{t.sub}</p>

            {/* <div style={{ display: "flex", gap: 9, flexWrap: "wrap", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              <a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a>
              <a href={`https://wa.me/${WHATSAPP}`} className="btn-o hide-xs" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={12} />{t.whatsapp}
              </a>
            </div> */}
          </motion.div>
          <div style={{
  position: "absolute",
  bottom: "calc(var(--cards-h) + 20px)", // Sits just above the cards strip
  left: "clamp(20px,5vw,72px)",
  zIndex: 10,
  display: "flex", gap: 10
}}>
  <a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a>
  <a href={`https://wa.me/${WHATSAPP}`} className="btn-o" target="_blank"><MessageCircle size={12} />{t.whatsapp}</a>
</div>
        </AnimatePresence>
        

        {/* L10b — RIGHT overlay: car name + specs + dots */}
        <AnimatePresence mode="wait">
          <motion.div
            key={carIdx + lang + "R"}
            className="h-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: fading ? 0 : 1, x: fading ? 14 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}
            style={{
              position: "absolute",
              right: isRTL ? "auto" : "clamp(20px,5vw,64px)",
              left: isRTL ? "clamp(20px,5vw,64px)" : "auto",
             top: `calc(var(--nav-h) + 120px)`,
            
              zIndex: 10,
              display: "flex", flexDirection: "column", alignItems: "flex-end",
            }}
          >
            <div className="fb" style={{
              fontSize: "clamp(7px,.65vw,9px)", letterSpacing: ".3em",
              color: "var(--gold)", textTransform: "uppercase", marginBottom: 6, textAlign: "right",
            }}>{CARS[carIdx].tagline}</div>

            <div className="fd" style={{
              fontSize: "clamp(14px,1.6vw,22px)", fontWeight: 300,
              color: "var(--off)", letterSpacing: ".04em", marginBottom: 12, textAlign: "right",
            }}>{CARS[carIdx].name}</div>

            <div className="specs-row" style={{ display: "flex", gap: 6, justifyContent: "flex-end", flexWrap: "wrap", marginBottom: 14 }}>
              {CARS[carIdx].specs.map((s, i) => (
                <span key={i} className="fb" style={{
                  fontSize: "clamp(7px,.6vw,8px)", color: "var(--muted)",
                  letterSpacing: ".12em", textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid rgba(201,168,76,.22)",
                  borderRadius: 99,
                  background: "rgba(7,7,7,.55)", backdropFilter: "blur(8px)",
                }}>{s}</span>
              ))}
            </div>

            {/* dot indicators */}
            <div style={{ display: "flex", gap: 7, justifyContent: "flex-end" }}>
              {CARS.map((_, i) => (
                <button key={i} onClick={() => changeCar(i)} style={{
                  width: i === carIdx ? 26 : 6, height: 6, borderRadius: 4,
                  border: "none", cursor: "pointer", transition: "all .35s", padding: 0,
                  background: i === carIdx ? "var(--gold)" : "rgba(201,168,76,.3)",
                }} aria-label={`Car ${i + 1}`} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* L20 — prev/next arrows, vertically centred in car zone (above cards) */}
        <button className="arr" onClick={() => changeCar((carIdx - 1 + CARS.length) % CARS.length)} aria-label="Prev"
          style={{
            position: "absolute",
            left: "clamp(8px,1.8vw,24px)",
            top: `calc(var(--nav-h) + (100dvh - var(--nav-h) - var(--cards-h)) / 2)`,
            transform: "translateY(-50%)",
            zIndex: 20,
          }}>
          <ChevronLeft size={20} />
        </button>
        <button className="arr" onClick={() => changeCar((carIdx + 1) % CARS.length)} aria-label="Next"
          style={{
            position: "absolute",
            right: "clamp(8px,1.8vw,24px)",
            top: `calc(var(--nav-h) + (100dvh - var(--nav-h) - var(--cards-h)) / 2)`,
            transform: "translateY(-50%)",
            zIndex: 20,
          }}>
          <ChevronRight size={20} />
        </button>

        {/* L30 — DESKTOP: 4-col feature cards strip, anchored to very bottom */}
        <div className="cards-desk" dir={t.dir}>
          {t.features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={lang + i} className="c-cell" style={{ textAlign: isRTL ? "right" : "left" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 7,
                  background: "rgba(201,168,76,.13)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginLeft: isRTL ? "auto" : 0,
                }}>
                  <Icon size={14} style={{ color: "var(--gold)" }} />
                </div>
                <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 12, fontWeight: 500, color: "var(--off)" }}>{f.title}</div>
                <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</div>
              </div>
            );
          })}
        </div>

        {/* L30 — MOBILE: carousel strip, anchored to very bottom */}
        <div className="cards-mob" dir={t.dir}>
          <div style={{ overflow: "hidden" }}>
            <div className="m-track" style={{ transform: `translateX(${isRTL ? mobileCardIdx * 100 : -mobileCardIdx * 100}%)` }}>
              {t.features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="m-slide" style={{ textAlign: isRTL ? "right" : "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: isRTL ? "flex-end" : "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(201,168,76,.13)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={14} style={{ color: "var(--gold)" }} />
                      </div>
                      <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)" }}>{f.title}</div>
                    </div>
                    <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* dots + mini arrows */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "6px 0 12px" }}>
            <button className="arr arr-sm" onClick={() => setMobileCardIdx(p => (p - 1 + t.features.length) % t.features.length)}>
              <ChevronLeft size={14} />
            </button>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {t.features.map((_, i) => (
                <button key={i} onClick={() => setMobileCardIdx(i)} style={{
                  width: i === mobileCardIdx ? 20 : 6, height: 6, borderRadius: 4,
                  border: "none", cursor: "pointer", transition: "all .35s", padding: 0,
                  background: i === mobileCardIdx ? "var(--gold)" : "rgba(201,168,76,.3)",
                }} aria-label={`Card ${i + 1}`} />
              ))}
            </div>
            <button className="arr arr-sm" onClick={() => setMobileCardIdx(p => (p + 1) % t.features.length)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </section>
      {/* ══ END HERO ══ */}


      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#faf8f4" }} dir={t.dir}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: isRTL ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}
            style={{ borderRadius: 22, overflow: "hidden", height: 460, background: "linear-gradient(135deg,#1a1209 0%,#0d0b07 100%)", position: "relative", border: "1px solid rgba(201,168,76,.2)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 55%,rgba(201,168,76,.18) 0%,transparent 65%)" }} />
            <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
              <div className="gline" style={{ marginBottom: 16 }} />
              <div className="fd" style={{ fontSize: 30, fontWeight: 300, color: "var(--off)", letterSpacing: ".05em", lineHeight: 1.2 }}>
                Since<br /><span style={{ color: "var(--gold)" }}>20206</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: isRTL ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .1 }}
            style={{ textAlign: isRTL ? "right" : "left" }}>
            <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{t.aboutTag}</div>
            <h2 className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(26px,3vw,44px)", fontWeight: lang === "ar" ? 600 : 400, color: "#111", lineHeight: 1.1, marginBottom: 22 }}>
              {t.aboutTitle1} <span style={{ color: "var(--gold)" }}>{t.aboutTitle2}</span>
            </h2>
            <p className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: 16 }}>{t.aboutP1}</p>
            <p className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>{t.aboutP2}</p>
            <div style={{ display: "flex", gap: 32, marginBottom: 32, justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 400, color: "var(--gold)", lineHeight: 1 }}>{s.val}</div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, color: "#888", marginTop: 4, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              <a href="#services" className="btn-g" style={{ background: "#111", color: "#fff" }}><ArrowRight size={12} />{t.learnMore}</a>
              <a href={`tel:${PHONE}`} className="btn-o" style={{ borderColor: "#111", color: "#111" }}><Phone size={12} />{t.call}</a>
              <a href={`https://wa.me/${WHATSAPP}`} className="btn-o" style={{ borderColor: "#111", color: "#111" }} target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
            <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{t.servicesTag}</div>
            <h2 className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.1, marginBottom: 14 }}>{t.servicesTitle}</h2>
            <p className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.servicesIntro}</p>
          </motion.div>
          <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {t.services.map((svc, i) => {
              const icons = [Car, Clock, MapPin, ShieldCheck, Star, Users];
              const Icon = icons[i] || Car;
              return (
                <motion.div key={lang + i} className={`svc-card${i === 1 ? " ft" : ""}`}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * .09, duration: .5 }}
                  style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(201,168,76,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginLeft: isRTL ? "auto" : 0 }}>
                    <Icon size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)", marginBottom: 7 }}>{svc.title}</div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{svc.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section style={{ padding: "100px clamp(24px,5vw,80px)", background: "var(--black)", borderTop: "1px solid rgba(201,168,76,.07)" }} dir={t.dir}>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}
            style={{ textAlign: isRTL ? "right" : "left" }}>
            <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{t.whyTag}</div>
            <h2 className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.1, marginBottom: 18 }}>{t.whyTitle}</h2>
            <p className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>{t.whyDesc}</p>
            <a href={`https://wa.me/${WHATSAPP}`} className="btn-g" target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8, delay: .2 }}
            style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(201,168,76,.15)", borderRadius: 20, padding: "40px 32px" }}>
            <div className="gline" style={{ marginBottom: 28 }} />
            {t.whyPoints.map((item, i) => (
              <div key={i} className={lang === "ar" ? "fa" : "fb"}
                style={{
                  fontSize: 12, color: "var(--muted)", padding: "14px 0",
                  borderBottom: i < t.whyPoints.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                  display: "flex", alignItems: "center", gap: 12, letterSpacing: ".04em",
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                }}>
                {!isRTL && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
                {item}
                {isRTL && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
              </div>
            ))}
            <div className="gline" style={{ marginTop: 28 }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section id="contact" style={{
        padding: "100px clamp(24px,5vw,80px)", textAlign: "center",
        background: "linear-gradient(180deg,var(--black) 0%,#100d03 50%,var(--black) 100%)",
        position: "relative", overflow: "hidden",
      }} dir={t.dir}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 640, height: 640, background: "radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 1 }}>
          <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
            {lang === "en" ? "Contact Us" : "تواصل معنا"}
          </div>
          <h2 className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(28px,5vw,64px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.06, marginBottom: 40 }}>
            {t.ctaTitle}
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a>
            <a href={`https://wa.me/${WHATSAPP}`} className="btn-o" target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(201,168,76,.1)",
        padding: "24px clamp(16px,4vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }} dir={t.dir}>
        <div className="fd" style={{ letterSpacing: ".32em", fontSize: 13, color: "rgba(245,240,232,.35)", fontWeight: 300 }}>LUXEGLIDE</div>
        <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, color: "rgba(245,240,232,.22)", letterSpacing: ".08em" }}>
          © {new Date().getFullYear()} LuxeGlide Dubai. {lang === "en" ? "Crafted for excellence." : "صُنع للتميّز."}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <a href={`tel:${PHONE}`} style={{ color: "var(--gold)", opacity: .6, transition: "opacity .2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = ".6")}><Phone size={14} /></a>
          <a href={`https://wa.me/${WHATSAPP}`} style={{ color: "var(--gold)", opacity: .6, transition: "opacity .2s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = ".6")}><MessageCircle size={14} /></a>
        </div>
      </footer>
    </>
  );
}

/*
─── SETUP NOTES ──────────────────────────────────────────────────
  npm install three @types/three framer-motion lucide-react
  Place GLB at /public/models/truck_new.glb (update CARS array as needed)

  HERO ARCHITECTURE:
    <section class="hero">  ← position:relative, height:100dvh, overflow:hidden
      div z:0  — radial glow background
      div z:1  — THREE.js canvas (position:absolute, inset:0, full bleed)
      div z:2  — watermark "طريق"
      div z:3  — bottom vignette gradient (car → cards)
      div z:10 — left text overlay  (no background)
      div z:10 — right car-info overlay (no background)
      btn z:20 — prev / next arrows
      div z:30 — feature cards strip (position:absolute, bottom:0)
    </section>

  The previous split-panel look is completely gone. The 3D car canvas
  covers the entire hero width and the text overlays float on top of it
  with no background panels. The feature cards strip is INSIDE the hero
  at bottom:0 so everything is visible on a single screen.
─────────────────────────────────────────────────────────────────
*/