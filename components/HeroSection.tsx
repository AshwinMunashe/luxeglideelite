"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { LANG, CARS, PHONE, WHATSAPP } from "./lib/Constants";
import { CarViewer3D } from "./CarViewer3d";
 

interface HeroSectionProps {
  lang: "en" | "ar";
}

export function HeroSection({ lang }: HeroSectionProps) {
  const [carIdx, setCarIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [mobileCardIdx, setMobileCardIdx] = useState(0);
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  const changeCar = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => { setCarIdx(next); setFading(false); }, 280);
  }, []);
  useEffect(() => {
  const interval = setInterval(() => {
    setMobileCardIdx((prev) => (prev + 1) % t.features.length);
  }, 5000); // Swipes every 5 seconds
  return () => clearInterval(interval);
}, [t.features.length]);

  return (
    /* ══════════════════ HERO ══════════════════
        ONE unified block. Nothing is divided.
        ─ Layer 0: radial bg glow (z:0)
        ─ Layer 1: 3D car, inset:0 (z:1)
        ─ Layer 2: "طريق" watermark (z:2)
        ─ Layer 3: bottom gradient vignette for card blending (z:3)
        ─ Layer 10: left text overlay
        ─ Layer 10: right car-info overlay
        ─ Layer 20: prev/next arrows
        ─ Layer 30: feature cards strip (position:absolute, bottom:0)
    ══════════════════════════════════════════ */
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
        position: "absolute", zIndex: 0, pointerEvents: "none",
        top: "50%", left: "50%",
        transform: "translate(-50%, -59%)",
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
            maxWidth: "none",
            overflow: "visible",
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
      </AnimatePresence>

      <div style={{
        position: "absolute",
        bottom: "calc(var(--cards-h) + 20px)",
        left: "clamp(20px,5vw,72px)",
        zIndex: 10,
        display: "flex", gap: 10
      }}>
        <a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a>
        <a href={`https://wa.me/${WHATSAPP}`} className="btn-o" target="_blank"><MessageCircle size={12} />{t.whatsapp}</a>
      </div>
      

      {/* L10b — RIGHT overlay: car name + specs + dots */}
      <AnimatePresence mode="wait">
       {/* Replace your L10b motion.div with this structure */}
<motion.div
  key={carIdx + lang + "R"}
  className="h-right"
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: fading ? 0 : 1, x: fading ? 14 : 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: .3 }}
  style={{
    right: isRTL ? "auto" : "clamp(20px, 5vw, 64px)",
    left: isRTL ? "clamp(20px, 5vw, 64px)" : "auto",
    alignItems: isRTL ? "flex-start" : "flex-end",
    textAlign: isRTL ? "left" : "right",
  }}
>
  {/* Inner content remains the same */}
 <div
  className={lang === "ar" ? "fa" : "fb"}
 style={{
  fontSize: "clamp(7px,.65vw,9px)",
  letterSpacing: ".3em",
  color: "var(--gold)",
  textTransform: lang === "ar" ? "none" : "uppercase",
  marginBottom: 6,
}}
>
  {CARS[carIdx].tagline[lang]}
</div>

<div
  className={lang === "ar" ? "fa" : "fd"}
  style={{
    fontSize: "clamp(14px,1.6vw,22px)",
    fontWeight: lang === "ar" ? 500 : 300,
    color: "var(--off)",
    letterSpacing: lang === "ar" ? "normal" : ".04em",
    marginBottom: 12,
    textAlign: isRTL ? "left" : "right",
  }}
>
  {CARS[carIdx].name[lang]}

</div>
<div className="specs-row">
  <div className="spec-item">
    <span className="spec-label">
      {lang === "ar" ? "المحرك" : "ENGINE"}
    </span>
    <span className="spec-value">
      {CARS[carIdx].specs.engine[lang]}
    </span>
  </div>

  <div className="spec-item">
    <span className="spec-label">
      {lang === "ar" ? "القوة" : "POWER"}
    </span>
    <span className="spec-value">
      {CARS[carIdx].specs.power[lang]}
    </span>
  </div>

  <div className="spec-item">
    <span className="spec-label">
      {lang === "ar" ? "المقاعد" : "SEATS"}
    </span>
    <span className="spec-value">
      {CARS[carIdx].specs.seats[lang]}
    </span>
  </div>
</div>

  {/* Simplified dots for mobile */}
  <div style={{ display: "flex", gap: 8 }}>
    {CARS.map((_, i) => (
      <button key={i} onClick={() => changeCar(i)} style={{
        width: i === carIdx ? 20 : 6, height: 6, borderRadius: 3,
        border: "none", background: i === carIdx ? "var(--gold)" : "rgba(201,168,76,.3)",
      }} />
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
  );
}