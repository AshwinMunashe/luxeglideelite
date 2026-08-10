"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";
import { staggerContainer, fadeUp } from "./motionVariants";
import { Magnetic } from "./Magnetic";

export function ContactSection() {
  const { lang } = useLang();
  const t = LANG[lang];

  return (
    <section id="contact" className="section-pad" style={{
      padding: "100px clamp(24px,5vw,80px)", textAlign: "center",
      background: "linear-gradient(180deg,var(--black) 0%,#100d03 50%,var(--black) 100%)",
      position: "relative", overflow: "hidden",
    }} dir={t.dir}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 640, height: 640, background: "radial-gradient(circle,rgba(214,180,113,.06) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ position: "relative", zIndex: 1 }}>
        <motion.div variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
          {lang === "en" ? "Contact Us" : "تواصل معنا"}
        </motion.div>
        <motion.h2 variants={fadeUp} className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(28px,5vw,64px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.06, marginBottom: 40 }}>
          {t.ctaTitle}
        </motion.h2>
        <motion.div variants={fadeUp} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Magnetic><a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a></Magnetic>
          <Magnetic><a href={`https://wa.me/${WHATSAPP}`} className="btn-o" target="_blank" rel="noopener noreferrer"><MessageCircle size={12} />{t.whatsapp}</a></Magnetic>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Link href="/contact" className={lang === "ar" ? "fa" : "fb"}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 22, fontSize: 11, letterSpacing: ".06em", color: "var(--muted)", textDecoration: "none" }}>
            {lang === "en" ? "Or send a detailed enquiry" : "أو أرسل استفساراً مفصلاً"}
            <ArrowRight size={12} style={{ transform: lang === "ar" ? "scaleX(-1)" : "none" }} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}