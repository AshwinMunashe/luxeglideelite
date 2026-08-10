"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LANG, SERVICES, CONTACT_PAGE, PHONE, WHATSAPP, EMAIL, ADDRESS, MAPS_URL } from "@/components/lib/Constants";
import { useLang } from "@/components/LangContext";

export function ContactPageClient() {
  const { lang } = useLang();
  const t = LANG[lang];
  const c = CONTACT_PAGE[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.12)",
    color: "var(--off)", fontSize: 13, fontFamily: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)",
    marginBottom: 8, display: "block",
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const svcTitle = SERVICES.find((s) => s.slug === service)?.title[lang];
    const lines = lang === "en"
      ? [
          `New enquiry from the website:`,
          `Name: ${name}`,
          `Phone: ${phone}`,
          svcTitle ? `Service: ${svcTitle}` : null,
          date ? `Preferred date: ${date}` : null,
          message ? `Message: ${message}` : null,
        ]
      : [
          `استفسار جديد من الموقع:`,
          `الاسم: ${name}`,
          `الهاتف: ${phone}`,
          svcTitle ? `الخدمة: ${svcTitle}` : null,
          date ? `التاريخ المفضل: ${date}` : null,
          message ? `الرسالة: ${message}` : null,
        ];
    const text = lines.filter(Boolean).join("\n");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />

      <section className="page-hero">
        <div className={fb} style={{ fontSize: 10, letterSpacing: ".38em", textTransform: "uppercase", color: "var(--gold)" }}>{c.heroTag}</div>
        <h1 className={fd} style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", margin: "16px 0 14px" }}>{c.heroTitle}</h1>
        <p className={fb} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{c.heroSub}</p>
        <div className="breadcrumb" dir={t.dir}>
          <Link href="/">{lang === "en" ? "Home" : "الرئيسية"}</Link><span>/</span><span style={{ color: "var(--gold)" }}>{c.heroTag}</span>
        </div>
      </section>

      <section style={{ padding: "80px clamp(24px,5vw,80px)", background: "var(--black)" }} dir={t.dir}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, maxWidth: 1160, margin: "0 auto", alignItems: "start" }} className="svc-detail-grid">
          {/* form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
            style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(214,180,113,.18)", borderRadius: 18, padding: "32px 28px" }}>
            <div className={fd} style={{ fontSize: 22, fontWeight: 500, color: "var(--off)", marginBottom: 22, textAlign: isRTL ? "right" : "left" }}>{c.formTitle}</div>

            <div style={{ marginBottom: 16, textAlign: isRTL ? "right" : "left" }}>
              <label className={fb} style={labelStyle}>{c.formName}</label>
              <input className={fb} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div style={{ marginBottom: 16, textAlign: isRTL ? "right" : "left" }}>
              <label className={fb} style={labelStyle}>{c.formPhone}</label>
              <input className={fb} type="tel" style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              <div style={{ textAlign: isRTL ? "right" : "left" }}>
                <label className={fb} style={labelStyle}>{c.formService}</label>
                <select className={fb} style={inputStyle} value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="">{c.formServicePlaceholder}</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.title[lang]}</option>
                  ))}
                </select>
              </div>
              <div style={{ textAlign: isRTL ? "right" : "left" }}>
                <label className={fb} style={labelStyle}>{c.formDate}</label>
                <input className={fb} type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 20, textAlign: isRTL ? "right" : "left" }}>
              <label className={fb} style={labelStyle}>{c.formMessage}</label>
              <textarea className={fb} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={c.formMessagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            <button type="submit" className="btn-g" style={{ width: "100%", justifyContent: "center", padding: "13px 22px" }}>
              <MessageCircle size={14} />{c.formSubmit}
            </button>
            <p className={fb} style={{ fontSize: 10, color: "var(--muted)", marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>{c.formNote}</p>
          </motion.form>

          {/* details */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: .1 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "26px 24px" }}>
              <div className={fd} style={{ fontSize: 18, fontWeight: 500, color: "var(--off)", marginBottom: 18, textAlign: isRTL ? "right" : "left" }}>{c.detailsTitle}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <a href={`tel:${PHONE}`} className={fb} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--off)", textDecoration: "none", fontSize: 13 }}>
                  <Phone size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />{PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className={fb} style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--off)", textDecoration: "none", fontSize: 13 }}>
                  <Mail size={16} style={{ color: "var(--gold)", flexShrink: 0 }} />{EMAIL}
                </a>
                <div className={fb} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "var(--off)", fontSize: 13, lineHeight: 1.6 }}>
                  <MapPin size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />{ADDRESS[lang]}
                </div>
                <div className={fb} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: "var(--off)", fontSize: 13, lineHeight: 1.6 }}>
                  <Clock size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                  <span><strong style={{ fontWeight: 500 }}>{c.officeHoursLabel}:</strong> {c.officeHoursValue}</span>
                </div>
              </div>

              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-o" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                <MapPin size={12} />{c.directions}
              </a>
            </div>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="map-card" style={{ textDecoration: "none", cursor: "pointer" }}>
              <Image src="/images/showroom.png" alt="" fill sizes="400px" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,8,4,.35) 0%, rgba(10,8,4,.75) 100%)" }} />
              <MapPin size={30} strokeWidth={1.2} style={{ color: "var(--gold)", position: "relative" }} />
              <span className={fb} style={{ position: "relative" }}>{ADDRESS[lang]}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 clamp(24px,5vw,80px) 100px", background: "var(--black)" }} dir={t.dir}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className={fb} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{c.faqTag}</div>
            <h2 className={fd} style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)" }}>{c.faqTitle}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="testimonial-grid">
            {c.faq.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .14, duration: .8 }}
                style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: "20px 22px", textAlign: isRTL ? "right" : "left" }}>
                <div className={fd} style={{ fontSize: 16, fontWeight: 500, color: "var(--gold-lt)", marginBottom: 8 }}>{f.q}</div>
                <div className={fb} style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{f.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
