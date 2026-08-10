"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { LANG,WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";
import { SectionTag } from "./SectionTag";
import { staggerContainer, fadeUp } from "./motionVariants";

export function WhyChooseUs() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section className="section-pad" style={{ padding: "100px clamp(24px,5vw,80px)", background: "var(--black)", borderTop: "1px solid rgba(214,180,113,.07)" }} dir={t.dir}>
      <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
          style={{ textAlign: isRTL ? "right" : "left" }}>
          <motion.div variants={fadeUp}><SectionTag index="04" label={t.whyTag} align="start" /></motion.div>
          <motion.h2 variants={fadeUp} className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.1, marginBottom: 18 }}>{t.whyTitle}</motion.h2>
          <motion.p variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>{t.whyDesc}</motion.p>
          <motion.a variants={fadeUp} href={`https://wa.me/${WHATSAPP}`} className="btn-g" target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</motion.a>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
          style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(214,180,113,.15)", borderRadius: 20, padding: "40px 32px" }}>
          <div className="gline" style={{ marginBottom: 28 }} />
          {t.whyPoints.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className={lang === "ar" ? "fa" : "fb"}
              style={{
                fontSize: 12, color: "var(--muted)", padding: "14px 0",
                borderBottom: i < t.whyPoints.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                display: "flex", alignItems: "center", gap: 12, letterSpacing: ".04em",
                justifyContent: isRTL ? "flex-end" : "flex-start",
              }}>
              {!isRTL && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
              {item}
              {isRTL && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
            </motion.div>
          ))}
          <div className="gline" style={{ marginTop: 28 }} />
        </motion.div>
      </div>
    </section>
  );
}