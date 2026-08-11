"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, AREAS } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

export function AreasPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{t.areasTag}</div>
        <h1 className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{t.areasTitle}</h1>
        <p className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.areasSub}</p>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{t.areasTag}</span>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "80px clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div className="fleet-grid" style={{ maxWidth: 1360, margin: "0 auto" }}>
          {AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.div key={area.slug} className="fleet-card"
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .1, duration: .9 }}>
                <Link href={`/areas/${area.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div className="fleet-media">
                    <Image
                      src={area.image.src}
                      alt={area.name[lang]}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: area.image.position, transform: `scale(${area.image.scale})` }}
                    />
                    <div style={{
                      position: "absolute", top: 14, [isRTL ? "right" : "left"]: 14,
                      width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(7,7,7,.6)", border: "1px solid rgba(214,180,113,.3)",
                    }}>
                      <Icon size={15} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  <div className="fleet-body" style={{ textAlign: isRTL ? "right" : "left" }}>
                    <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{area.tagline[lang]}</div>
                    <div className={fd} style={{ fontSize: 24, fontWeight: 500, color: "var(--off)", marginBottom: 16 }}>{area.name[lang]}</div>
                    <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                      {t.viewArea} <ArrowRight size={11} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
