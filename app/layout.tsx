import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { FloatingActions } from "@/components/FloatingActions";
import { PageLoader } from "@/components/PageLoader";
import { PageTransition } from "@/components/PageTransition";
import { CustomCursor } from "@/components/CustomCursor";
import { globalStyles } from "@/components/Styles/Styles";
import { fontVariables } from "@/components/Styles/fonts";
import { PHONE, EMAIL, ADDRESS, SOCIAL_LINKS, TESTIMONIALS } from "@/components/lib/Constants";

const siteTitle = "LuxeGlide Elite | Premium Chauffeur Services in Dubai";
const siteDescription =
  "Dubai's premier luxury chauffeur service — seamless journeys, unmatched comfort. Book your premium airport transfer, corporate ride, or private tour today.";

export const metadata: Metadata = {
  metadataBase: new URL("https://luxeglideelite.ae"),
  title: { default: siteTitle, template: "%s | LuxeGlide Elite" },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://luxeglideelite.ae/",
    siteName: "LuxeGlide Elite",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": "https://luxeglideelite.ae/#business",
  name: "LuxeGlide Elite",
  image: "https://luxeglideelite.ae/images/logo.png",
  url: "https://luxeglideelite.ae/",
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.en,
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.1857, longitude: 55.262 },
  areaServed: { "@type": "City", name: "Dubai" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: Object.values(SOCIAL_LINKS),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(TESTIMONIALS.length),
  },
  review: TESTIMONIALS.map((tm) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    author: { "@type": "Person", name: tm.name.en },
    reviewBody: tm.quote.en,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body>
        <style>{globalStyles}</style>
        <div className="grain" aria-hidden />
        <LangProvider>
          <PageTransition>{children}</PageTransition>
          <FloatingActions />
          <PageLoader />
          <CustomCursor />
        </LangProvider>
      </body>
    </html>
  );
}