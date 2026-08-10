import type { Metadata } from "next";
import { FleetPageClient } from "./FleetPageClient";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Explore LuxeGlide Elite's curated fleet of luxury vehicles in Dubai — executive sedans, VIP saloons, luxury SUVs, and chauffeured MPVs.",
  alternates: { canonical: "/fleet" },
  openGraph: { title: "Our Fleet | LuxeGlide Elite", url: "https://luxeglideelite.ae/fleet" },
};

export default function FleetPage() {
  return <FleetPageClient />;
}
