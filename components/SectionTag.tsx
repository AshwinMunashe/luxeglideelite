"use client";

import { useLang } from "./LangContext";

interface SectionTagProps {
  index: string;
  label: string;
  align?: "center" | "start";
}

export function SectionTag({ index, label, align = "center" }: SectionTagProps) {
  const { lang } = useLang();
  const isRTL = lang === "ar";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      justifyContent: align === "center" ? "center" : (isRTL ? "flex-end" : "flex-start"),
      marginBottom: 12,
    }}>
      <span className="fd" style={{
        fontSize: 15, fontStyle: "italic", fontWeight: 500, color: "var(--gold)",
        opacity: .8, lineHeight: 1,
      }}>{index}</span>
      <span style={{ width: 14, height: 1, background: "rgba(214,180,113,.5)", display: "inline-block", flexShrink: 0 }} />
      <span className={isRTL ? "fa" : "fb"} style={{
        fontSize: 9, letterSpacing: ".32em", textTransform: "uppercase", color: "var(--gold)",
      }}>{label}</span>
    </div>
  );
}
