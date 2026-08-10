import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangContext";
import { FloatingActions } from "@/components/FloatingActions";
import { PageLoader } from "@/components/PageLoader";
import { globalStyles } from "@/components/Styles/Styles";

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
    images: [{ url: "/images/logo.png", alt: "LuxeGlide Elite — Luxury Chauffeur Services in Dubai" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <style>{globalStyles}</style>
        <div className="grain" aria-hidden />
        <LangProvider>
          {children}
          <FloatingActions />
          <PageLoader />
        </LangProvider>
      </body>
    </html>
  );
}