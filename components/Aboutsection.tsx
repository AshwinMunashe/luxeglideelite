"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";
import { SectionTag } from "./SectionTag";
import { staggerContainer, fadeUp } from "./motionVariants";

export function AboutSection() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section id="about" className="section-pad" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#faf8f4" }} dir={t.dir}>
      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1360, margin: "0 auto", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: isRTL ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: .8 }}
          style={{ borderRadius: 22, overflow: "hidden", height: 460, position: "relative", border: "1px solid rgba(214,180,113,.2)" }}>
          <Image src="/images/about-interior.webp" alt="LuxeGlide chauffeured interior" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,.15) 0%, rgba(10,8,4,.15) 55%, rgba(10,8,4,.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
            <div className="gline" style={{ marginBottom: 16 }} />
            <div className="fd" style={{ fontSize: 30, fontWeight: 300, color: "var(--off)", letterSpacing: ".05em", lineHeight: 1.2 }}>
              Since<br /><span style={{ color: "var(--gold)" }}>2026</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
          style={{ textAlign: isRTL ? "right" : "left" }}>
          <motion.div variants={fadeUp}><SectionTag index="01" label={t.aboutTag} align="start" /></motion.div>
          <motion.h2 variants={fadeUp} className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(26px,3vw,44px)", fontWeight: lang === "ar" ? 600 : 400, color: "#111", lineHeight: 1.1, marginBottom: 22 }}>
            {t.aboutTitle1} <span style={{ color: "var(--gold)" }}>{t.aboutTitle2}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: 16 }}>{t.aboutP1}</motion.p>
          <motion.p variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 14, color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: 32 }}>{t.aboutP2}</motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 32, marginBottom: 32, justifyContent: isRTL ? "flex-end" : "flex-start" }}>
            {t.stats.map((s, i) => (
              <div key={i} style={{ textAlign: isRTL ? "right" : "left" }}>
                <div className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(24px,2.5vw,36px)", fontWeight: 400, color: "var(--gold)", lineHeight: 1 }}>{s.val}</div>
                <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, color: "#888", marginTop: 4, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
            <a href="#services" className="btn-g" style={{ background: "#111", color: "#fff" }}><ArrowRight size={12} />{t.learnMore}</a>
            <a href={`tel:${PHONE}`} className="btn-o" style={{ borderColor: "#111", color: "#111" }}><Phone size={12} />{t.call}</a>
            <a href={`https://wa.me/${WHATSAPP}`} className="btn-o" style={{ borderColor: "#111", color: "#111" }} target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}