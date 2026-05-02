"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
 

interface ContactSectionProps {
  lang: "en" | "ar";
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = LANG[lang];

  return (
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
  );
}