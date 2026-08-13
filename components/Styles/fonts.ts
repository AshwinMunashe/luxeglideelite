import { Cormorant_Garamond, Montserrat, Noto_Naskh_Arabic } from "next/font/google";

/* self-hosted at build time by next/font — no runtime request to Google Fonts,
   no render-blocking @import, no duplicate downloads across pages */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-montserrat",
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-noto-naskh",
});

export const fontVariables = `${cormorant.variable} ${montserrat.variable} ${notoNaskhArabic.variable}`;
