"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LANG, SERVICES } from "./lib/Constants";
import { useLang } from "./LangContext";
import { SectionTag } from "./SectionTag";
import { staggerContainer, fadeUp } from "./motionVariants";

export function ServicesSection() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section id="services" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ textAlign: "center", marginBottom: 56 }}>
          <motion.div variants={fadeUp}><SectionTag index="02" label={t.servicesTag} /></motion.div>
          <motion.h2 variants={fadeUp} className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(30px,4vw,54px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", lineHeight: 1.1, marginBottom: 14 }}>{t.servicesTitle}</motion.h2>
          <motion.p variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.servicesIntro}</motion.p>
        </motion.div>
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.slug} className={`svc-card has-media${i === 1 ? " ft" : ""}`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .18, duration: .9 }}>
                <div className="svc-media">
                  <Image src={svc.image.src} alt={svc.title[lang]} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: svc.image.position, transform: `scale(${svc.image.scale})` }} />
                </div>
                <div className="svc-body-pad" style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginLeft: isRTL ? "auto" : 0 }}>
                    <Icon size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)", marginBottom: 7 }}>{svc.title[lang]}</div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>{svc.desc[lang]}</div>
                  <Link href={`/services/${svc.slug}`} className={lang === "ar" ? "fa" : "fb"}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none" }}>
                    {t.viewDetails} <ArrowRight size={12} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link href="/services" className="btn-o"><ArrowRight size={12} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />{t.viewAll}</Link>
        </div>
      </div>
    </section>
  );
}
