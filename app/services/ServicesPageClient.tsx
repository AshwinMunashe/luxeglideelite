"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, SERVICES, HOW_IT_WORKS } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

export function ServicesPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{t.servicesTag}</div>
        <h1 className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{t.servicesTitle}</h1>
        <p className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.servicesIntro}</p>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{t.servicesTag}</span>
        </div>
      </section>

      <section style={{ padding: "80px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 1360, margin: "0 auto" }}>
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.slug}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .16, duration: .9 }}>
                <Link href={`/services/${svc.slug}`} className="svc-card has-media" style={{ display: "block", textDecoration: "none" }}>
                  <div className="svc-media">
                    <Image src={svc.image.src} alt={svc.title[lang]} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: svc.image.position, transform: `scale(${svc.image.scale})` }} />
                  </div>
                  <div className="svc-body-pad" style={{ textAlign: isRTL ? "right" : "left" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 11, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, marginLeft: isRTL ? "auto" : 0 }}>
                      <Icon size={19} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className={fd} style={{ fontSize: 19, fontWeight: 500, color: "var(--off)", marginBottom: 8 }}>{svc.title[lang]}</div>
                    <div className={fb} style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>{svc.desc[lang]}</div>
                    <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                      {t.viewDetails} <ArrowRight size={12} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "90px clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{t.howTag}</div>
            <h2 className={fd} style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)" }}>{t.howTitle}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="values-grid">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * .2, duration: .9 }}
                  style={{ textAlign: "center", padding: "0 12px" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%", margin: "0 auto 16px",
                    background: "rgba(214,180,113,.14)", border: "1px solid rgba(214,180,113,.25)",
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                  }}>
                    <Icon size={22} style={{ color: "var(--gold)" }} />
                    <span className={fd} style={{ position: "absolute", top: -8, [isRTL ? "left" : "right"]: -8, width: 22, height: 22, borderRadius: "50%", background: "var(--gold)", color: "var(--black)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                  </div>
                  <div className={fb} style={{ fontSize: 14, fontWeight: 600, color: "var(--off)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".04em" }}>{step.title[lang]}</div>
                  <div className={fb} style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{step.desc[lang]}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
