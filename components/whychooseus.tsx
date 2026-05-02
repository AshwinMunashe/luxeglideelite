"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { LANG,PHONE,WHATSAPP } from "./lib/Constants";
 

interface WhyChooseUsProps {
  lang: "en" | "ar";
}

export function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
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
  );
}