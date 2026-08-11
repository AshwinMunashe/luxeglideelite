import type { Metadata } from "next";
import { CONTACT_PAGE } from "@/components/lib/Constants";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LuxeGlide Elite for airport transfers, corporate travel, or VIP chauffeur bookings in Dubai. Call, WhatsApp, or send an enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact LuxeGlide Elite", url: "https://luxeglideelite.ae/contact" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CONTACT_PAGE.en.faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
