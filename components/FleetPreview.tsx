"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LANG, FLEET } from "./lib/Constants";
import { useLang } from "./LangContext";
import { SectionTag } from "./SectionTag";
import { staggerContainer, fadeUp } from "./motionVariants";

export function FleetPreview() {
  const { lang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";
  const preview = FLEET.slice(0, 3);

  return (
    <section className="section-pad" style={{ padding: "100px clamp(24px,5vw,80px)", background: "#0d0d0d" }} dir={t.dir}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.div variants={fadeUp}><SectionTag index="03" label={t.fleetPreviewTag} /></motion.div>
          <motion.h2 variants={fadeUp} className={fd} style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 400, fontStyle: lang === "ar" ? "normal" : "italic", color: "var(--off)", lineHeight: 1.1 }}>{t.fleetPreviewTitle}</motion.h2>
        </motion.div>

        <div className="fleet-grid">
          {preview.map((car, i) => (
            <motion.div key={car.slug} className="fleet-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * .18, duration: .9 }}>
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
                <div className="fleet-body" style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div className={fb} style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{car.tagline[lang]}</div>
                  <div className={fd} style={{ fontSize: 20, fontWeight: 500, color: "var(--off)" }}>{car.name[lang]}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/fleet" className="btn-o"><ArrowRight size={12} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />{t.viewFleet}</Link>
        </div>
      </div>
    </section>
  );
}
