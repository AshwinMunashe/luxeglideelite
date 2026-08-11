"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, FLEET, WHATSAPP } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

export function FleetPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{t.fleetTag}</div>
        <h1 className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{t.fleetTitle}</h1>
        <p className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.fleetSub}</p>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{t.fleetTag}</span>
        </div>
      </section>

      <section className="section-pad" style={{ padding: "80px clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div className="fleet-grid" style={{ maxWidth: 1360, margin: "0 auto" }}>
          {FLEET.map((car, i) => (
            <motion.div key={car.slug} className="fleet-card"
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * .14, duration: .9 }}>
              <Link href={`/fleet/${car.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="fleet-media">
                  <Image
                    src={car.image.src}
                    alt={car.name[lang]}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: car.image.position, transform: `scale(${car.image.scale})` }}
                  />
                  <div className={fb} style={{
                    position: "absolute", top: 14, [isRTL ? "right" : "left"]: 14,
                    fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)",
                    background: "rgba(7,7,7,.6)", border: "1px solid rgba(214,180,113,.3)", borderRadius: 999, padding: "4px 10px",
                  }}>{car.category[lang]}</div>
                </div>
                <div className="fleet-body" style={{ textAlign: isRTL ? "right" : "left", paddingBottom: 0 }}>
                  <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{car.tagline[lang]}</div>
                  <div className={fd} style={{ fontSize: 24, fontWeight: 500, color: "var(--off)", marginBottom: 16 }}>{car.name[lang]}</div>
                  <div className="specs-row">
                    <div className="spec-item">
                      <span className="spec-label">{lang === "ar" ? "المحرك" : "ENGINE"}</span>
                      <span className="spec-value">{car.specs.engine[lang]}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">{lang === "ar" ? "القوة" : "POWER"}</span>
                      <span className="spec-value">{car.specs.power[lang]}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">{lang === "ar" ? "المقاعد" : "SEATS"}</span>
                      <span className="spec-value">{car.specs.seats[lang]}</span>
                    </div>
                  </div>
                  <div className={fb} style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20 }}>{car.specs.feature[lang]}</div>
                  <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                    {t.viewDetails} <ArrowRight size={11} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                  </span>
                </div>
              </Link>
              <div className="fleet-body" style={{ paddingTop: 16 }}>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    lang === "en" ? `Hi, I'd like to enquire about the ${car.name.en}.` : `مرحباً، أرغب بالاستفسار عن ${car.name.ar}.`
                  )}`}
                  target="_blank" rel="noopener noreferrer" className="btn-o" style={{ width: "100%", justifyContent: "center" }}
                >
                  <MessageCircle size={12} />{t.enquire}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
