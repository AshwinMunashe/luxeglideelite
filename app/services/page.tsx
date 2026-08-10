import type { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From airport transfers to VIP events — explore LuxeGlide Elite's full range of luxury chauffeur services in Dubai.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | LuxeGlide Elite", url: "https://luxeglideelite.ae/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
