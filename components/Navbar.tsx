"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { LANG, PHONE } from "./lib/Constants";

interface NavbarProps {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
}

export function Navbar({ lang, setLang }: NavbarProps) {
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";

  const [open, setOpen] = useState(false);

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
          borderBottom: "1px solid rgba(201,168,76,.12)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/images/logo.png" // 🔁 replace with your logo path
              alt="LuxeGlide"
              style={{
                height: 28,
                objectFit: "contain",
              }}
            />
          </div>

          {/* ✅ DESKTOP NAV */}
          <div
            className="fb nav-links"
            style={{
              display: "flex",
              gap: 32,
              fontSize: 9,
              letterSpacing: ".22em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            {t.nav.map((n) => (
              <span
                key={n}
                style={{ cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {n}
              </span>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* LANG SWITCH */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              style={{
                background: "var(--gold-dim)",
                border: "1px solid rgba(201,168,76,.25)",
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
            <a
              href={`tel:${PHONE}`}
              className="btn-g hide-xs"
              style={{ padding: "9px 18px", fontSize: 9 }}
            >
              {t.call}
            </a>

            {/* ✅ MOBILE MENU BUTTON */}
            <button
              className="menu-btn"
              onClick={() => setOpen(true)}
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
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.6)",
                backdropFilter: "blur(8px)",
                zIndex: 199,
              }}
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              style={{
                position: "fixed",
                top: 0,
                [isRTL ? "left" : "right"]: 0,
                width: "80%",
                maxWidth: 320,
                height: "100vh",
                background: "rgba(10,10,10,.95)",
                backdropFilter: "blur(20px)",
                zIndex: 200,
                padding: "80px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              {/* CLOSE */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "none",
                  border: "none",
                  color: "var(--gold)",
                }}
              >
                <X size={22} />
              </button>

              {/* LINKS */}
              {t.nav.map((n) => (
                <span
                  key={n}
                  style={{
                    fontSize: 14,
                    letterSpacing: ".2em",
                    color: "var(--off)",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {n}
                </span>
              ))}

              {/* CALL BUTTON */}
              <a href={`tel:${PHONE}`} className="btn-g">
                <Phone size={14} />
                {t.call}
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}