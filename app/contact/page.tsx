import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LuxeGlide Elite for airport transfers, corporate travel, or VIP chauffeur bookings in Dubai. Call, WhatsApp, or send an enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact LuxeGlide Elite", url: "https://luxeglideelite.ae/contact" },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
