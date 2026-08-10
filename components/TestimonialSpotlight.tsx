"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "./lib/Constants";
import { useLang } from "./LangContext";

const ROTATE_SECONDS = 7;

export function TestimonialSpotlight() {
  const { lang } = useLang();
  const isRTL = lang === "ar";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), ROTATE_SECONDS * 1000);
    return () => clearInterval(id);
  }, []);

  const tm = TESTIMONIALS[idx];

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      <div style={{ minHeight: 260, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
          >
            <div className="quote-mark" style={{ fontSize: 64 }}>&ldquo;</div>
            <div className="stars" style={{ justifyContent: "center" }}>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={14} fill="var(--gold)" style={{ color: "var(--gold)" }} />
              ))}
            </div>
            <p className={fb} style={{ fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(245,240,232,.85)", lineHeight: 1.75, fontWeight: 300, fontStyle: "italic", marginBottom: 26 }}>
              {tm.quote[lang]}
            </p>
            <div className="gline" style={{ maxWidth: 60, margin: "0 auto 16px" }} />
            <div className={fd} style={{ fontSize: 19, fontWeight: 500, color: "var(--off)" }}>{tm.name[lang]}</div>
            <div className={fb} style={{ fontSize: 10, color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>{tm.role[lang]}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 32 }}>
        <button className="arr arr-sm" aria-label={lang === "en" ? "Previous" : "السابق"}
          onClick={() => setIdx((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
          {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        <div style={{ display: "flex", gap: 7 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`${i + 1}`} style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 4, border: "none", cursor: "pointer",
              transition: "all .35s", padding: 0,
              background: i === idx ? "var(--gold)" : "rgba(214,180,113,.3)",
            }} />
          ))}
        </div>
        <button className="arr arr-sm" aria-label={lang === "en" ? "Next" : "التالي"}
          onClick={() => setIdx((p) => (p + 1) % TESTIMONIALS.length)}>
          {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </div>
  );
}
