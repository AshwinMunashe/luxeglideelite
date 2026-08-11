"use client";

import { AboutSection } from "@/components/Aboutsection";
import { ContactSection } from "@/components/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { FleetPreview } from "@/components/FleetPreview";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/whychooseus";

export default function LuxeGlidePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      {/* ══ END HERO ══ */}

      <Marquee />

      <AboutSection />

      <ServicesSection />

      <FleetPreview />

      <WhyChooseUs />

      <FaqSection />

      <ContactSection />

      <Footer />
    </>
  );
}
