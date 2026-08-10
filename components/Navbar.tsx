"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";
import { staggerContainer, fadeUp } from "./motionVariants";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  const { lang, setLang } = useLang();
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "var(--nav-h)",
          background: "rgba(7,7,7,.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(214,180,113,.12)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 clamp(16px,4vw,40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          dir={t.dir}
        >
          {/* ✅ LOGO IMAGE */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/images/logo.png"
              alt="LuxeGlide"
              width={94}
              height={28}
              priority
              style={{ height: 28, width: "auto" }}
            />
          </Link>

          {/* ✅ DESKTOP NAV */}
          <div
            className="fb nav-links"
            style={{
              display: "flex",
              gap: 30,
              fontSize: 9,
              letterSpacing: ".22em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            {t.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  cursor: "pointer",
                  transition: "color .2s",
                  color: isActive(n.href) ? "var(--gold)" : "var(--muted)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive(n.href) ? "var(--gold)" : "var(--muted)")}
              >
                {n.label}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* LANG SWITCH */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              style={{
                background: "var(--gold-dim)",
                border: "1px solid rgba(214,180,113,.25)",
                color: "var(--gold)",
                borderRadius: 999,
                padding: "5px 14px",
                fontSize: 10,
                cursor: "pointer",
              }}
            >
              {lang === "en" ? "العربية" : "English"}
            </button>

            {/* CALL BUTTON (HIDE ON SMALL) */}
            <Magnetic strength={22}>
              <a
                href={`tel:${PHONE}`}
                className="btn-g hide-xs"
                style={{ padding: "9px 18px", fontSize: 9 }}
              >
                {t.call}
              </a>
            </Magnetic>

            {/* ✅ MOBILE MENU BUTTON */}
            <button
              className="menu-btn"
              onClick={() => setOpen(true)}
              aria-label={lang === "en" ? "Open menu" : "افتح القائمة"}
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                color: "var(--gold)",
                cursor: "pointer",
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(4,4,4,.78)",
                backdropFilter: "blur(10px)",
                zIndex: 199,
              }}
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ duration: .65, ease: [.22, 1, .36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                [isRTL ? "left" : "right"]: 0,
                width: "82%",
                maxWidth: 340,
                height: "100dvh",
                background: "#0a0a0a",
                [isRTL ? "borderRight" : "borderLeft"]: "1px solid rgba(214,180,113,.25)",
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* ambient gold glow, echoes the rest of the site */}
              <div style={{
                position: "absolute", top: -80, [isRTL ? "left" : "right"]: -80,
                width: 280, height: 280, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(214,180,113,.14) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                aria-label={lang === "en" ? "Close menu" : "أغلق القائمة"}
                className="arr arr-sm"
                style={{ position: "absolute", top: 20, [isRTL ? "left" : "right"]: 20, zIndex: 1 }}
              >
                <X size={16} />
              </button>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                style={{ position: "relative", padding: "76px 28px 32px", display: "flex", flexDirection: "column", flex: 1, textAlign: isRTL ? "right" : "left" }}
                dir={t.dir}
              >
                {/* brand mark */}
                <motion.div variants={fadeUp} style={{ marginBottom: 36 }}>
                  <Image src="/images/logo.png" alt="LuxeGlide" width={100} height={30} style={{ height: 26, width: "auto" }} />
                </motion.div>

                {/* LINKS */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
                  {t.nav.map((n, i) => (
                    <motion.div key={n.href} variants={fadeUp}>
                      <Link
                        href={n.href}
                        className="fd"
                        style={{
                          display: "flex", alignItems: "baseline", gap: 12,
                          flexDirection: isRTL ? "row-reverse" : "row",
                          padding: "9px 0",
                          fontSize: 21, fontWeight: 400, fontStyle: "italic",
                          color: isActive(n.href) ? "var(--gold)" : "var(--off)",
                          textDecoration: "none",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        <span className="fb" style={{ fontSize: 10, fontStyle: "normal", color: "var(--gold)", opacity: .6 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {n.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div variants={fadeUp} className="gline" style={{ marginBottom: 24 }} />

                {/* CTAs */}
                <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  <a href={`tel:${PHONE}`} className="btn-g" style={{ justifyContent: "center" }}>
                    <Phone size={14} />{t.call}
                  </a>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-o" style={{ justifyContent: "center" }}>
                    <MessageCircle size={14} />{t.whatsapp}
                  </a>
                </motion.div>

                <motion.div variants={fadeUp} style={{ marginTop: "auto" }}>
                  <button
                    onClick={() => setLang(lang === "en" ? "ar" : "en")}
                    className="fb"
                    style={{
                      background: "transparent", border: "1px solid rgba(214,180,113,.3)",
                      color: "var(--gold)", borderRadius: 999, padding: "8px 18px",
                      fontSize: 11, letterSpacing: ".08em", cursor: "pointer",
                    }}
                  >
                    {lang === "en" ? "العربية" : "English"}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
