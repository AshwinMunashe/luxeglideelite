"use client";

import { AboutSection } from "@/components/Aboutsection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { globalStyles } from "@/components/Styles/Styles";
import { WhyChooseUs } from "@/components/whychooseus";
import { useState } from "react";
 
export default function LuxeGlidePage() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <>
      <style>{globalStyles}</style>

      <div className="grain" aria-hidden />

      <Navbar lang={lang} setLang={setLang} />

      <HeroSection lang={lang} />

      {/* ══ END HERO ══ */}

      <AboutSection lang={lang} />

      <ServicesSection lang={lang} />

      <WhyChooseUs lang={lang} />

      <ContactSection lang={lang} />

      <Footer lang={lang} />
    </>
  );
}

