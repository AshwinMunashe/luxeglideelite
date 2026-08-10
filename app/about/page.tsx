import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind LuxeGlide Elite — Dubai's newest luxury chauffeur service, founded in 2026. Discretion, precision, and craft in every journey.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About LuxeGlide Elite", url: "https://luxeglideelite.ae/about" },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
