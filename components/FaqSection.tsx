"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LANG, HOME_FAQ } from "./lib/Constants";
import { useLang } from "./LangContext";
import { SectionTag } from "./SectionTag";

export function FaqSection() {
  const { lang } = useLang();
  const t = LANG[lang];
  const f = HOME_FAQ[lang];
  const isRTL = t.dir === "rtl";
  const fd = lang === "ar" ? "fa" : "fd";
  const fb = lang === "ar" ? "fa" : "fb";

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.en.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="section-pad" style={{ padding: "100px clamp(24px,5vw,80px)", background: "var(--black)", borderTop: "1px solid rgba(214,180,113,.07)" }} dir={t.dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionTag index="05" label={f.tag} />
          <h2 className={fd} style={{ fontSize: "clamp(26px,3.5vw,48px)", fontWeight: 300, color: "var(--off)", lineHeight: 1.1 }}>{f.title}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {f.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * .1, duration: .8 }}
                style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={fd}
                  style={{
                    width: "100%", background: "transparent", border: "none", cursor: "pointer",
                    padding: "20px 22px", fontSize: 16, fontWeight: 500, color: "var(--gold-lt)",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                    textAlign: isRTL ? "right" : "left", flexDirection: isRTL ? "row-reverse" : "row",
                  }}
                >
                  {item.q}
                  <ChevronDown
                    size={16}
                    style={{
                      flexShrink: 0, color: "var(--gold)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform .3s ease",
                    }}
                  />
                </button>
                <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows .35s ease" }}>
                  <div style={{ overflow: "hidden" }}>
                    <div className={fb} style={{
                      fontSize: 12.5, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300,
                      padding: "0 22px 20px", textAlign: isRTL ? "right" : "left",
                    }}>{item.a}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
