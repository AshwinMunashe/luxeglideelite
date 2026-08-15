"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, ChevronDown } from "lucide-react";
import { LANG, SERVICES, AREAS, PHONE, WHATSAPP, EMAIL, ADDRESS, MAPS_URL } from "./lib/Constants";
import { useLang } from "./LangContext";

type AccordionKey = "explore" | "services" | "areas";

export function Footer() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fb = lang === "ar" ? "fa" : "fb";

  const [open, setOpen] = useState<Record<AccordionKey, boolean>>({ explore: false, services: false, areas: false });
  const toggle = (key: AccordionKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const linkStyle: React.CSSProperties = {
    display: "block", color: "rgba(245,240,232,.45)", textDecoration: "none",
    fontSize: 12, lineHeight: 2.1, transition: "color .2s",
  };

  const accordionBtnStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
    background: "none", border: "none", padding: 0, font: "inherit",
    fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14,
    flexDirection: isRTL ? "row-reverse" : "row", textAlign: isRTL ? "right" : "left",
  };

  return (
    <footer style={{ position: "relative", overflow: "hidden", background: "var(--black)", borderTop: "1px solid rgba(214,180,113,.14)" }} dir={t.dir}>
      {/* ambient glow, echoes the contact CTA above it */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 500, background: "radial-gradient(circle, rgba(214,180,113,.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px clamp(16px,4vw,80px) 36px", position: "relative" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr .85fr .85fr .85fr 1.05fr", gap: 32, marginBottom: 48 }}>
          {/* brand */}
          <div className="footer-brand" style={{ textAlign: isRTL ? "right" : "left" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Image src="/images/logo.png" alt="LuxeGlide" width={100} height={30} style={{ height: 26, width: "auto" }} />
            </Link>
            <p className={fb} style={{ fontSize: 12, color: "rgba(245,240,232,.4)", lineHeight: 1.85, fontWeight: 300, maxWidth: 280 }}>
              {lang === "en"
                ? "Dubai's newest standard for chauffeur-driven luxury — precision, discretion, and craft in every journey."
                : "المعيار الأحدث للفخامة في دبي بسائق خاص — دقة وتكتم وحرفية في كل رحلة."}
            </p>
          </div>

          {/* explore */}
          <div className="footer-explore footer-accordion" data-open={open.explore} style={{ textAlign: isRTL ? "right" : "left" }}>
            <button type="button" className={`${fb} footer-accordion-btn`} style={accordionBtnStyle}
              onClick={() => toggle("explore")} aria-expanded={open.explore}>
              {lang === "en" ? "Explore" : "استكشف"}
              <ChevronDown size={13} className="footer-toggle-icon" style={{ color: "var(--gold)" }} />
            </button>
            <div className="footer-panel-wrap">
              <div className="footer-panel-inner">
                {t.nav.map((n) => (
                  <Link key={n.href} href={n.href} className={fb} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.45)")}>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* services */}
          <div className="footer-services footer-accordion" data-open={open.services} style={{ textAlign: isRTL ? "right" : "left" }}>
            <button type="button" className={`${fb} footer-accordion-btn`} style={accordionBtnStyle}
              onClick={() => toggle("services")} aria-expanded={open.services}>
              {t.servicesTag}
              <ChevronDown size={13} className="footer-toggle-icon" style={{ color: "var(--gold)" }} />
            </button>
            <div className="footer-panel-wrap">
              <div className="footer-panel-inner">
                {SERVICES.map((svc) => (
                  <Link key={svc.slug} href={`/services/${svc.slug}`} className={fb} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.45)")}>
                    {svc.title[lang]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* areas */}
          <div className="footer-areas footer-accordion" data-open={open.areas} style={{ textAlign: isRTL ? "right" : "left" }}>
            <button type="button" className={`${fb} footer-accordion-btn`} style={accordionBtnStyle}
              onClick={() => toggle("areas")} aria-expanded={open.areas}>
              {t.areasFooterLabel}
              <ChevronDown size={13} className="footer-toggle-icon" style={{ color: "var(--gold)" }} />
            </button>
            <div className="footer-panel-wrap">
              <div className="footer-panel-inner">
                {AREAS.map((area) => (
                  <Link key={area.slug} href={`/areas/${area.slug}`} className={fb} style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,.45)")}>
                    {area.name[lang]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* contact */}
          <div className="footer-contact" style={{ textAlign: isRTL ? "right" : "left" }}>
            <div className={fb} style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
              {lang === "en" ? "Contact" : "تواصل"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={`tel:${PHONE}`} className={fb}
                style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "rgba(245,240,232,.55)", textDecoration: "none", flexDirection: isRTL ? "row-reverse" : "row" }}>
                <Phone size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />{PHONE}
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className={fb}
                style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "rgba(245,240,232,.55)", textDecoration: "none", flexDirection: isRTL ? "row-reverse" : "row" }}>
                <MessageCircle size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />{t.whatsapp}
              </a>
              <a href={`mailto:${EMAIL}`} className={fb}
                style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "rgba(245,240,232,.55)", textDecoration: "none", wordBreak: "break-all", flexDirection: isRTL ? "row-reverse" : "row" }}>
                <Mail size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />{EMAIL}
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={fb}
                style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12, color: "rgba(245,240,232,.55)", lineHeight: 1.6, textDecoration: "none", flexDirection: isRTL ? "row-reverse" : "row" }}>
                <MapPin size={13} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />{ADDRESS[lang]}
              </a>
            </div>
          </div>
        </div>

        <div className="gline" />

        <div style={{
          paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "space-between", alignItems: "center",
        }}>
          <div className={fb} style={{ fontSize: 9, color: "rgba(245,240,232,.28)", letterSpacing: ".06em" }}>
            {lang === "en"
              ? `© ${new Date().getFullYear()} LuxeGlide Elite Chauffeur Services. All rights reserved.`
              : `© ${new Date().getFullYear()} لوكسي جلايد إيليت لخدمات السائق الخاص. جميع الحقوق محفوظة.`}
          </div>
          <div className={fb} style={{ fontSize: 9, color: "rgba(245,240,232,.28)", letterSpacing: ".06em" }}>
            {lang === "en" ? "Business Bay, Dubai, UAE" : "الخليج التجاري، دبي، الإمارات"}
          </div>
        </div>
      </div>
    </footer>
  );
}
