"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, AREAS, SERVICES, PHONE, WHATSAPP } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

export function AreaDetailClient({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  const area = AREAS.find((a) => a.slug === slug);
  const others = AREAS.filter((a) => a.slug !== slug).slice(0, 3);
  const related = area ? SERVICES.filter((s) => area.relatedServices.includes(s.slug)) : [];

  if (!area) {
    return (
      <>
        <Navbar />
        <section className="page-hero">
          <h1 className={fd} style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--off)" }}>
            {lang === "en" ? "Area Not Found" : "المنطقة غير موجودة"}
          </h1>
          <Link href="/areas" className="btn-o" style={{ display: "inline-flex", marginTop: 24 }}>
            {t.areasTag}
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  const Icon = area.icon;
  const heroTitle = lang === "en" ? `Chauffeur Service in ${area.name.en}` : `خدمة سائق خاص في ${area.name.ar}`;

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div style={{
          width: 56, height: 56, borderRadius: 14, margin: "0 auto 20px",
          background: "rgba(214,180,113,.14)", border: "1px solid rgba(214,180,113,.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={24} style={{ color: "var(--gold)" }} />
        </div>
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{area.tagline[lang]}</div>
        <h1 className={fd} style={{ fontSize: "clamp(30px,4.4vw,54px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{heroTitle}</h1>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span>
          <Link href="/areas">{t.areasTag}</Link><span>/</span>
          <span style={{ color: "var(--gold)" }}>{area.name[lang]}</span>
        </div>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", height: 320, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(214,180,113,.2)" }}>
          <Image
            src={area.image.src}
            alt={area.name[lang]}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: "cover", objectPosition: area.image.position, transform: `scale(${area.image.scale})` }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,6,3,.1) 0%, rgba(7,6,3,.55) 100%)" }} />
        </div>
      </section>

      <section className="section-pad" style={{ padding: "56px clamp(24px,5vw,80px) 80px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, maxWidth: 1200, margin: "0 auto", alignItems: "start" }} className="svc-detail-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} style={{ textAlign: isRTL ? "right" : "left" }}>
            <p className={fb} style={{ fontSize: 15, color: "rgba(245,240,232,.75)", lineHeight: 1.95, fontWeight: 300, whiteSpace: "pre-line", marginBottom: 24 }}>{area.intro[lang]}</p>
            <div style={{ borderInlineStart: "2px solid var(--gold)", paddingInlineStart: 16 }}>
              <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{t.landmarksLabel}</div>
              <p className={fb} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, fontWeight: 300 }}>{area.landmarks[lang].join(" · ")}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: .1 }}
            style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(214,180,113,.18)", borderRadius: 16, padding: "28px 26px" }}>
            <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{t.popularServicesLabel}</div>
            {related.map((svc, i) => {
              const SIcon = svc.icon;
              return (
                <Link key={svc.slug} href={`/services/${svc.slug}`} className={fb} style={{
                  display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--off)",
                  padding: "12px 0", borderBottom: i < related.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                  textDecoration: "none", flexDirection: isRTL ? "row-reverse" : "row",
                }}>
                  <SIcon size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  {svc.title[lang]}
                  <ArrowRight size={12} style={{ color: "var(--gold)", marginInlineStart: "auto", transform: isRTL ? "scaleX(-1)" : "none" }} />
                </Link>
              );
            })}
            <div className="gline" style={{ margin: "22px 0" }} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`tel:${PHONE}`} className="btn-g" style={{ flex: 1, justifyContent: "center" }}><Phone size={12} />{t.call}</a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                lang === "en" ? `Hi, I'd like to book a chauffeur in ${area.name.en}.` : `مرحباً، أرغب بحجز سائق في ${area.name.ar}.`
              )}`} target="_blank" rel="noopener noreferrer" className="btn-o" style={{ flex: 1, justifyContent: "center" }}>
                <MessageCircle size={12} />{t.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad-b" style={{ padding: "0 clamp(24px,5vw,80px) 90px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="gline" style={{ marginBottom: 40 }} />
          <div className={fb} style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, textAlign: isRTL ? "right" : "left" }}>
            {lang === "en" ? "Other Areas We Serve" : "مناطق أخرى نغطيها"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="svc-grid">
            {others.map((o) => {
              const OIcon = o.icon;
              return (
                <Link key={o.slug} href={`/areas/${o.slug}`} className="svc-card" style={{ display: "block", textDecoration: "none", textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, marginLeft: isRTL ? "auto" : 0 }}>
                    <OIcon size={16} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className={fd} style={{ fontSize: 16, fontWeight: 500, color: "var(--off)", marginBottom: 8 }}>{o.name[lang]}</div>
                  <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                    {t.viewArea} <ArrowRight size={11} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                  </span>
                </Link>
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
