"use client";

import { FLEET, SERVICES } from "./lib/Constants";
import { useLang } from "./LangContext";

export function Marquee() {
  const { lang } = useLang();
  const items = [
    ...SERVICES.map((s) => s.title[lang]),
    ...FLEET.map((c) => c.name[lang]),
  ];
  const track = [...items, ...items];

  return (
    <div className="marquee" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className={lang === "ar" ? "fa marquee-item" : "fd marquee-item"}>
            {item}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
