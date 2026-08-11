"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LANG, FLEET, SERVICES, PHONE, WHATSAPP } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

const RELATED_SERVICES: Record<string, string[]> = {
  "mercedes-s-class": ["airport-transfers", "corporate-travel"],
  "bmw-7-series": ["corporate-travel", "vip-services"],
  "rolls-royce-ghost": ["vip-services", "city-tours"],
  "range-rover-autobiography": ["vip-services", "group-transport"],
  "cadillac-escalade": ["group-transport", "airport-transfers"],
  "mercedes-v-class": ["corporate-travel", "group-transport"],
};

export function FleetDetailClient({ slug }: { slug: string }) {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  const car = FLEET.find((c) => c.slug === slug);
  const others = FLEET.filter((c) => c.slug !== slug).slice(0, 3);
  const related = SERVICES.filter((s) => (RELATED_SERVICES[slug] || []).includes(s.slug));

  if (!car) {
    return (
      <>
        <Navbar />
        <section className="page-hero">
          <h1 className={fd} style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--off)" }}>
            {lang === "en" ? "Vehicle Not Found" : "السيارة غير موجودة"}
          </h1>
          <Link href="/fleet" className="btn-o" style={{ display: "inline-flex", marginTop: 24 }}>
            {t.viewFleet}
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{car.category[lang]}</div>
        <h1 className={fd} style={{ fontSize: "clamp(32px,4.6vw,58px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{car.name[lang]}</h1>
        <p className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{car.tagline[lang]}</p>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span>
          <Link href="/fleet">{t.fleetTag}</Link><span>/</span>
          <span style={{ color: "var(--gold)" }}>{car.name[lang]}</span>
        </div>
      </section>

      <section style={{ padding: "0 clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", height: 320, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(214,180,113,.2)" }}>
          <Image
            src={car.image.src}
            alt={car.name[lang]}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: "cover", objectPosition: car.image.position, transform: `scale(${car.image.scale})` }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,6,3,.1) 0%, rgba(7,6,3,.55) 100%)" }} />
        </div>
      </section>

      <section className="section-pad" style={{ padding: "56px clamp(24px,5vw,80px) 80px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 56, maxWidth: 1200, margin: "0 auto", alignItems: "start" }} className="svc-detail-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} style={{ textAlign: isRTL ? "right" : "left" }}>
            <p className={fb} style={{ fontSize: 15, color: "rgba(245,240,232,.75)", lineHeight: 1.95, fontWeight: 300, whiteSpace: "pre-line", marginBottom: 24 }}>{car.long[lang]}</p>
            <div style={{ borderInlineStart: "2px solid var(--gold)", paddingInlineStart: 16 }}>
              <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{t.idealForLabel}</div>
              <p className={fb} style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{car.idealFor[lang]}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: .1 }}
            style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(214,180,113,.18)", borderRadius: 16, padding: "28px 26px" }}>
            <div className="specs-row" style={{ marginBottom: 22 }}>
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
            <div className="gline" style={{ marginBottom: 22 }} />
            {car.highlights[lang].map((h, i) => (
              <div key={i} className={fb} style={{
                display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12.5, color: "var(--muted)",
                padding: "10px 0", borderBottom: i < car.highlights[lang].length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                flexDirection: isRTL ? "row-reverse" : "row", textAlign: isRTL ? "right" : "left",
              }}>
                <Check size={14} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                {h}
              </div>
            ))}
            <div className="gline" style={{ margin: "22px 0" }} />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`tel:${PHONE}`} className="btn-g" style={{ flex: 1, justifyContent: "center" }}><Phone size={12} />{t.call}</a>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                lang === "en" ? `Hi, I'd like to enquire about the ${car.name.en}.` : `مرحباً، أرغب بالاستفسار عن ${car.name.ar}.`
              )}`} target="_blank" rel="noopener noreferrer" className="btn-o" style={{ flex: 1, justifyContent: "center" }}>
                <MessageCircle size={12} />{t.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad-b" style={{ padding: "0 clamp(24px,5vw,80px) 90px", background: "var(--black)" }} dir={t.dir}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="gline" style={{ marginBottom: 40 }} />
            <div className={fb} style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, textAlign: isRTL ? "right" : "left" }}>
              {lang === "en" ? "Pairs Well With" : "يتماشى مع"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${related.length},1fr)`, gap: 14 }} className="svc-grid">
              {related.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} href={`/services/${o.slug}`} className="svc-card" style={{ display: "block", textDecoration: "none", textAlign: isRTL ? "right" : "left" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(214,180,113,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, marginLeft: isRTL ? "auto" : 0 }}>
                      <OIcon size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className={fd} style={{ fontSize: 16, fontWeight: 500, color: "var(--off)", marginBottom: 8 }}>{o.title[lang]}</div>
                    <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                      {t.viewDetails} <ArrowRight size={11} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad-b" style={{ padding: "0 clamp(24px,5vw,80px) 90px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={fb} style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, textAlign: isRTL ? "right" : "left" }}>
            {lang === "en" ? "Other Vehicles" : "سيارات أخرى"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="svc-grid">
            {others.map((o) => (
              <Link key={o.slug} href={`/fleet/${o.slug}`} className="svc-card" style={{ display: "block", textDecoration: "none", textAlign: isRTL ? "right" : "left" }}>
                <div className={fd} style={{ fontSize: 16, fontWeight: 500, color: "var(--off)", marginBottom: 8 }}>{o.name[lang]}</div>
                <span className={fb} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gold)" }}>
                  {t.viewDetails} <ArrowRight size={11} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
