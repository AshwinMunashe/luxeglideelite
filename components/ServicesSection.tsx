"use client";

import { motion } from "framer-motion";
import { Car, Clock, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import { LANG } from "./lib/Constants";
 

interface ServicesSectionProps {
  lang: "en" | "ar";
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  return (
    <section id="services" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{t.servicesTag}</div>
          <h2 className={lang === "ar" ? "fa" : "fd"} style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.1, marginBottom: 14 }}>{t.servicesTitle}</h2>
          <p className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, color: "var(--muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{t.servicesIntro}</p>
        </motion.div>
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {t.services.map((svc, i) => {
            const icons = [Car, Clock, MapPin, ShieldCheck, Star, Users];
            const Icon = icons[i] || Car;
            return (
              <motion.div key={lang + i} className={`svc-card${i === 1 ? " ft" : ""}`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * .09, duration: .5 }}
                style={{ textAlign: isRTL ? "right" : "left" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(201,168,76,.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginLeft: isRTL ? "auto" : 0 }}>
                  <Icon size={17} style={{ color: "var(--gold)" }} />
                </div>
                <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)", marginBottom: 7 }}>{svc.title}</div>
                <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>{svc.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}