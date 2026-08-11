import type { Metadata } from "next";
import { AreasPageClient } from "./AreasPageClient";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "LuxeGlide Elite provides chauffeur-driven luxury across Dubai — Business Bay, Downtown Dubai, DIFC, Palm Jumeirah, Dubai Marina, and Dubai Airport.",
  alternates: { canonical: "/areas" },
  openGraph: { title: "Areas We Serve | LuxeGlide Elite", url: "https://luxeglideelite.ae/areas" },
};

export default function AreasPage() {
  return <AreasPageClient />;
}
