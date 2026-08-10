"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { TestimonialSpotlight } from "@/components/TestimonialSpotlight";
import { LANG, GALLERY_ITEMS } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";
import { staggerContainer, fadeUp } from "@/components/motionVariants";

const TILE_SPAN = ["wide tall", "", "tall", "", "tall", ""];

export function GalleryPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />

      <motion.section className="page-hero" variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{t.galleryTag}</motion.div>
        <motion.h1 variants={fadeUp} className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{t.galleryTitle}</motion.h1>
        <motion.p variants={fadeUp} className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.gallerySub}</motion.p>
        <motion.div variants={fadeUp} className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{t.galleryTag}</span>
        </motion.div>
      </motion.section>

      <section className="section-pad" style={{ padding: "80px clamp(24px,5vw,80px) 20px", background: "var(--black)" }} dir={t.dir}>
        <div className="gallery-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {GALLERY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} className={`gallery-tile ${TILE_SPAN[i]}`}
                initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .14, duration: .9 }}>
                <Image
                  src={item.image.src}
                  alt={item.label[lang]}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: item.image.position, transform: `scale(${item.image.scale})` }}
                />
                <div className="gallery-caption">
                  <Icon size={22} strokeWidth={1.3} style={{ color: "var(--gold)" }} />
                  <span className={fb} style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--off)" }}>{item.label[lang]}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-pad" style={{ padding: "80px clamp(24px,5vw,80px) 100px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ textAlign: "center", marginBottom: 48 }}>
            <motion.div variants={fadeUp} className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{t.testimonialsTag}</motion.div>
            <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)" }}>{t.testimonialsTitle}</motion.h2>
          </motion.div>
          <TestimonialSpotlight />
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
