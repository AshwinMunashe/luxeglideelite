"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, ABOUT_EXTRA, ADDRESS, MAPS_URL } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";
import { staggerContainer, fadeUp } from "@/components/motionVariants";
import { AnimatedStat } from "@/components/AnimatedStat";

export function AboutPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const a = ABOUT_EXTRA[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />

      <motion.section className="page-hero" variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{a.heroTag}</motion.div>
        <motion.h1 variants={fadeUp} className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{a.heroTitle}</motion.h1>
        <motion.p variants={fadeUp} className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 600, margin: "0 auto", lineHeight: 1.85, fontWeight: 300 }}>{a.heroSub}</motion.p>
        <motion.div variants={fadeUp} className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{a.heroTag}</span>
        </motion.div>
      </motion.section>

      {/* story */}
      <section className="section-pad" style={{ padding: "90px clamp(24px,5vw,80px)", background: "#faf8f4" }} dir={t.dir}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, maxWidth: 1200, margin: "0 auto", alignItems: "center" }}>
          <motion.div className="pin-media" initial={{ opacity: 0, x: isRTL ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: .8 }}
            style={{ borderRadius: 22, overflow: "hidden", height: 420, border: "1px solid rgba(214,180,113,.2)" }}>
            <Image src="/images/cars.png" alt="LuxeGlide luxury fleet in Dubai" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 42%", transform: "scale(1.08)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,.1) 0%, rgba(10,8,4,.2) 55%, rgba(10,8,4,.88) 100%)" }} />
            <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
              <div className="gline" style={{ marginBottom: 16 }} />
              <div className="fd" style={{ fontSize: 30, fontWeight: 400, fontStyle: "italic", color: "var(--off)", letterSpacing: ".02em", lineHeight: 1.2 }}>
                Since<br /><span style={{ color: "var(--gold)" }}>2026</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
            style={{ textAlign: isRTL ? "right" : "left" }}>
            <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: lang === "ar" ? 600 : 500, color: "#111", lineHeight: 1.15, marginBottom: 20 }}>{a.storyTitle}</motion.h2>
            <motion.p variants={fadeUp} className={fb} style={{ fontSize: 14, color: "#555", lineHeight: 1.9, fontWeight: 300, marginBottom: 16 }}>{a.storyP1}</motion.p>
            <motion.p variants={fadeUp} className={fb} style={{ fontSize: 14, color: "#555", lineHeight: 1.9, fontWeight: 300 }}>{a.storyP2}</motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 32, marginTop: 32, justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{ textAlign: isRTL ? "right" : "left" }}>
                  <AnimatedStat value={s.val} className={fd} style={{ fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 500, color: "var(--gold)", lineHeight: 1 }} />
                  <div className={fb} style={{ fontSize: 9, color: "#888", marginTop: 4, letterSpacing: ".1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* values */}
      <section className="section-pad" style={{ padding: "90px clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.div variants={fadeUp} className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{a.valuesTag}</motion.div>
            <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)" }}>{a.valuesTitle}</motion.h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="values-grid">
            {a.values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} className="svc-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * .18, duration: .9 }} style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginLeft: isRTL ? "auto" : 0 }}>
                    <Icon size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className={fb} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)", marginBottom: 7 }}>{v.title}</div>
                  <div className={fb} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* standards */}
      <section className="section-pad" style={{ padding: "90px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.div variants={fadeUp} className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{a.standardsTag}</motion.div>
            <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)" }}>{a.standardsTitle}</motion.h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="values-grid">
            {a.standards.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} className="svc-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * .18, duration: .9 }} style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginLeft: isRTL ? "auto" : 0 }}>
                    <Icon size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className={fb} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)", marginBottom: 7 }}>{v.title}</div>
                  <div className={fb} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* milestones */}
      <section className="section-pad-b" style={{ padding: "0 clamp(24px,5vw,80px) 100px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 32, textAlign: "center" }}>{a.milestonesTag}</div>
          <div className="timeline">
            {a.milestones.map((m, i) => (
              <motion.div key={i} className="timeline-item" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .2, duration: .9 }}>
                <div className={fd} style={{ fontSize: 22, fontWeight: 500, color: "var(--gold)" }}>{m.year}</div>
                <div className={fb} style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* visit us */}
      <section className="section-pad-b" style={{ padding: "0 clamp(24px,5vw,80px) 100px", background: "var(--black)" }} dir={t.dir}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div variants={fadeUp} className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{t.visitTag}</motion.div>
          <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", marginBottom: 28 }}>{t.visitTitle}</motion.h2>
          <motion.a
            variants={fadeUp}
            href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            className="map-card" style={{ maxWidth: 480, margin: "0 auto", textDecoration: "none", cursor: "pointer" }}
          >
            <Image src="/images/showroom.png" alt="" fill sizes="480px" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,.35) 0%, rgba(10,8,4,.75) 100%)" }} />
            <MapPin size={30} strokeWidth={1.2} style={{ color: "var(--gold)", position: "relative" }} />
            <span className={fb} style={{ position: "relative" }}>{ADDRESS[lang]}</span>
          </motion.a>
        </motion.div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
