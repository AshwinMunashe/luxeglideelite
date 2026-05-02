"use client";

import { Phone, MessageCircle } from "lucide-react";
import { LANG,PHONE,WHATSAPP } from "./lib/Constants";
 

interface FooterProps {
  lang: "en" | "ar";
}

export function Footer({ lang }: FooterProps) {
  const t = LANG[lang];
  

  return (
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
  );
}