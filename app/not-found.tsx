"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Magnetic } from "@/components/Magnetic";
import { LANG, PHONE, WHATSAPP } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";
import { staggerContainer, fadeUp } from "@/components/motionVariants";

export default function NotFound() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />
      <section style={{
        minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "calc(var(--nav-h) + 40px) clamp(24px,5vw,80px) 60px",
        background: "radial-gradient(ellipse at 50% 30%, #171104 0%, var(--black) 62%)",
        textAlign: "center", position: "relative", overflow: "hidden",
      }} dir={t.dir}>
        <div className="wm" style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          fontFamily: "var(--font-cormorant),serif", fontWeight: 500, fontStyle: "italic",
          fontSize: "clamp(160px,32vw,440px)", color: "var(--gold)", lineHeight: 1,
          userSelect: "none", pointerEvents: "none", mixBlendMode: "overlay",
        }}>404</div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ position: "relative", maxWidth: 520 }}>
          <motion.div variants={fadeUp} className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
            {t.notFoundTag}
          </motion.div>
          <motion.h1 variants={fadeUp} className={fd} style={{ fontSize: "clamp(30px,4.4vw,52px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", marginBottom: 18, lineHeight: 1.15 }}>
            {t.notFoundTitle}
          </motion.h1>
          <motion.p variants={fadeUp} className={fb} style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.85, fontWeight: 300, marginBottom: 36 }}>
            {t.notFoundSub}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 28 }}>
            <Magnetic>
              <Link href="/" className="btn-g">
                <ArrowLeft size={12} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />{t.notFoundCta}
              </Link>
            </Magnetic>
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            <a href={`tel:${PHONE}`} aria-label={t.call} style={{ color: "var(--gold)", opacity: .7 }}><Phone size={16} /></a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp} style={{ color: "var(--gold)", opacity: .7 }}><MessageCircle size={16} /></a>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
