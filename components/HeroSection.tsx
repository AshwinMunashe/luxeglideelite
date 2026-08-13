"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { LANG, PHONE, WHATSAPP } from "./lib/Constants";
import { useLang } from "./LangContext";
import { staggerContainer, fadeUp } from "./motionVariants";
import { AnimatedStat } from "./AnimatedStat";
import { Magnetic } from "./Magnetic";

/* deterministic pseudo-random — integer-only LCG, not Math.sin.
   Math.sin() is only spec'd as an "implementation-approximation", so
   different JS engines (server Node vs a client browser) can return
   results that diverge in the last few digits, which React's hydration
   check treats as a mismatch. Plain +,*,% integer arithmetic is exact
   and identical across every engine, so this can never drift. Values
   are also rounded to 2dp so the rendered strings are short and stable. */
function seeded(i: number, salt: number) {
  const x = (i * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}
const round2 = (n: number) => Math.round(n * 100) / 100;

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: round2(seeded(i, 1) * 100),
  top: round2(seeded(i, 2) * 100),
  size: round2(1.5 + seeded(i, 3) * 2.5),
  dur: round2(5 + seeded(i, 4) * 8),
  delay: round2(seeded(i, 5) * -10),
}));

/* four clips, always playing in the background — the "cut" is a
   pure opacity crossfade (see .hero-video transition), never a hard
   swap, so there's no visible loading/black-frame moment mid-fade */
const HERO_VIDEOS = ["/hero.mp4", "/hero1.mp4", "/hero3.mp4", "/hero4.mp4"];
const HERO_CLIP_SECONDS = 8;

export function HeroSection() {
  const { lang } = useLang();
  const [mobileCardIdx, setMobileCardIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  // both start "unresolved" so SSR/hydration markup matches (no video
  // rendered yet either way) — the media-query check only runs client-side
  // after mount, same pattern as LangContext. videoModeReady gates the
  // whole block so the heavy desktop (3-video) branch can't even briefly
  // mount on mobile while isSmallScreen is still settling
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [videoModeReady, setVideoModeReady] = useState(false);
  const t = LANG[lang];
  const isRTL = t.dir === "rtl";
  const particles = useMemo(() => PARTICLES, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileCardIdx((prev) => (prev + 1) % t.features.length);
    }, 5000); // Swipes every 5 seconds
    return () => clearInterval(interval);
  }, [t.features.length]);

  useEffect(() => {
    // on desktop all three clips preload + play at once so the crossfade
    // is a pure opacity dissolve with nothing to wait on. On mobile that's
    // ~39MB downloading simultaneously — real data/battery cost — so
    // there we mount one <video> at a time instead (see render below)
    const mq = window.matchMedia("(max-width: 768px)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only read, mirrors LangContext's hydration-safe pattern
    setIsSmallScreen(mq.matches);
    setVideoModeReady(true);
    const handler = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, HERO_CLIP_SECONDS * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    /* ══════════════════ HERO ══════════════════
        ONE unified block.
        ─ Layer 0: luxury video backdrop
        ─ Layer 1: warm gold colour grade (over the footage)
        ─ Layer 2: drifting gold orbs (blurred, slow motion, screen-blend)
        ─ Layer 3: fine twinkling particle field
        ─ Layer 4: legibility scrim (heavier toward the text side)
        ─ Layer 5: "LuxeGlide" watermark
        ─ Layer 10: left-aligned text overlay + CTAs (plain flexbox — no
                     transform, so Framer Motion's own animation transform
                     never fights the positioning)
        ─ Layer 30: feature cards strip (position:absolute, bottom:0)
    ══════════════════════════════════════════ */
    <section className="hero" id="home" dir={t.dir}>

      {/* L0 — luxury video backdrop.
          Poster is plain, server-rendered markup — no client JS gate — so it
          paints on first load before hydration even runs, and became the LCP
          element in place of the video (Lighthouse traced 84% of mobile LCP
          to the browser waiting on video decode with nothing to paint in the
          meantime). It sits behind the video layer and stays as the fallback
          whenever a clip is between (re)loads.
          Desktop: all three clips mounted + playing at once, crossfade is
          a pure opacity dissolve (nothing to (re)load mid-transition).
          Mobile: only the active clip is ever mounted, so just one file
          downloads/plays at a time instead of all three simultaneously —
          same three-clip rotation, a fraction of the data/battery cost. */}
      <Image
        src={`${HERO_VIDEOS[0].slice(0, -4)}-poster.webp`}
        alt=""
        aria-hidden
        fill
        priority
        quality={70}
        sizes="100vw"
        className="hero-video"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />

      {videoModeReady && (isSmallScreen ? (
        <AnimatePresence>
          <motion.video
            key={HERO_VIDEOS[activeVideo]}
            className="hero-video"
            autoPlay muted loop playsInline
            poster={`${HERO_VIDEOS[activeVideo].slice(0, -4)}-poster.webp`}
            src={HERO_VIDEOS[activeVideo]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          />
        </AnimatePresence>
      ) : (
        /* only the active clip + the one queued up next are ever mounted —
           not all four at once. The crossfade still relies on the .hero-video
           opacity transition and stable `key`s: when activeVideo advances,
           the element that WAS "next" keeps its DOM node (same key) and just
           flips to opacity 1, so the fade is still instant and un-reloaded.
           Only the new "next" slot mounts fresh, with a full clip's length
           (HERO_CLIP_SECONDS) to load before its turn comes around. */
        [activeVideo, (activeVideo + 1) % HERO_VIDEOS.length].map((i) => (
          <video
            key={HERO_VIDEOS[i]}
            className="hero-video"
            autoPlay muted loop playsInline
            poster={`${HERO_VIDEOS[i].slice(0, -4)}-poster.webp`}
            src={HERO_VIDEOS[i]}
            style={{ opacity: i === activeVideo ? 1 : 0 }}
          />
        ))
      ))}

      {/* L1 — warm gold colour grade */}
      <div className="hero-grade" aria-hidden />

      {/* L2 — drifting gold light orbs */}
      <div className="hero-orb hero-orb-a" aria-hidden />
      <div className="hero-orb hero-orb-b" aria-hidden />
      <div className="hero-orb hero-orb-c" aria-hidden />

      {/* L3 — particle field */}
      <div className="hero-particles" aria-hidden>
        {particles.map((p, i) => (
          <span key={i} style={{
            left: `${p.left}%`, top: `${p.top}%`,
            width: p.size, height: p.size,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* L4 — legibility scrim, heavier on the text side + bottom */}
      <div className="hero-scrim" aria-hidden />

      {/* L5 — watermark text */}
      <div className="wm" style={{
        position: "absolute", zIndex: 2, pointerEvents: "none",
        top: "50%", left: "50%",
        transform: "translate(-50%, -59%)",
        fontFamily: "var(--font-cormorant),serif", fontWeight: 500, fontStyle: "italic",
        fontSize: "clamp(90px,19vw,280px)",
        color: "var(--gold)", lineHeight: 1,
        userSelect: "none", whiteSpace: "nowrap",
        mixBlendMode: "overlay",
      }}>LuxeGlide</div>

      {/* L10 — left-aligned overlay: tagline + headline + sub + CTAs.
          Plain flex wrapper handles positioning; the motion.div inside
          only ever animates opacity/y, so it never needs its own
          translate() and can't clobber the layout transform. */}
      <div className="h-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            className="h-content"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
          >
            {/* tagline line */}
            <motion.div variants={fadeUp} className={lang === "ar" ? "fa" : "fb"} style={{
              fontSize: "clamp(9px,.8vw,11px)", letterSpacing: ".4em",
              textTransform: "uppercase", color: "var(--gold)",
              display: "flex", alignItems: "center", gap: 12, marginBottom: 22,
            }}>
              <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
              {t.tagline}
            </motion.div>

            <motion.h1 variants={fadeUp} className={`h-hl ${lang === "ar" ? "fa" : "fd"}`} style={{
              fontSize: "clamp(28px,4.4vw,60px)",
              fontWeight: lang === "ar" ? 600 : 400,
              lineHeight: 1.1, color: "var(--off)",
              marginBottom: 2, maxWidth: "100%",
            }}>{t.headline1}</motion.h1>

            <motion.h1 variants={fadeUp} className={`h-hl shimmer ${lang === "ar" ? "fa" : "fd"}`} style={{
              fontSize: "clamp(28px,4.4vw,60px)",
              fontWeight: 600, fontStyle: lang === "ar" ? "normal" : "italic",
              lineHeight: 1.1,
              marginBottom: "clamp(18px,2.4vh,28px)", maxWidth: "100%",
            }}>{t.headline2}</motion.h1>

            <motion.p variants={fadeUp} className={`h-sub ${lang === "ar" ? "fa" : "fb"}`} style={{
              fontSize: "clamp(11px,.95vw,15px)", color: "var(--muted)",
              lineHeight: 1.85, marginBottom: "clamp(26px,3.6vh,40px)",
              fontWeight: 300, maxWidth: 480,
            }}>{t.sub}</motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Magnetic><a href={`tel:${PHONE}`} className="btn-g"><Phone size={12} />{t.call}</a></Magnetic>
              <Magnetic>
                <a href={`https://wa.me/${WHATSAPP}`} className="btn-o hide-xs" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={12} />{t.whatsapp}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* opposite-side stats — keeps the far side of the hero from
            reading as dead space, and mirrors correctly in RTL since
            it's just the second flex child in a space-between row */}
        <motion.div
          key={lang + "-stats"}
          className="h-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7, delay: .15, ease: [.22, 1, .36, 1] }}
        >
          {t.stats.map((s, i) => (
            <div key={i} className="h-stat">
              <AnimatedStat value={s.val} className={`h-stat-val ${lang === "ar" ? "fa" : "fd"}`} />
              <div className={`h-stat-label ${lang === "ar" ? "fa" : "fb"}`}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="scroll-cue" aria-hidden>
        <span />
        <ChevronDown size={14} />
      </div>

      {/* L30 — DESKTOP: 4-col feature cards strip, anchored to very bottom */}
      <div className="cards-desk" dir={t.dir}>
        {t.features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={lang + i} className="c-cell" style={{ textAlign: isRTL ? "right" : "left" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 7,
                background: "rgba(214,180,113,.13)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginLeft: isRTL ? "auto" : 0,
              }}>
                <Icon size={14} style={{ color: "var(--gold)" }} />
              </div>
              <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 12, fontWeight: 500, color: "var(--off)" }}>{f.title}</div>
              <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</div>
            </div>
          );
        })}
      </div>

      {/* L30 — MOBILE: carousel strip, anchored to very bottom */}
      <div className="cards-mob" dir={t.dir}>
        <div style={{ overflow: "hidden" }}>
          <div className="m-track" style={{ transform: `translateX(${isRTL ? mobileCardIdx * 100 : -mobileCardIdx * 100}%)` }}>
            {t.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="m-slide" style={{ textAlign: isRTL ? "right" : "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: isRTL ? "flex-end" : "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 7, background: "rgba(214,180,113,.13)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 13, fontWeight: 500, color: "var(--off)" }}>{f.title}</div>
                  </div>
                  <div className={lang === "ar" ? "fa" : "fb"} style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* dots + mini arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "6px 0 12px" }}>
          <button className="arr arr-sm" aria-label={lang === "en" ? "Previous" : "السابق"} onClick={() => setMobileCardIdx(p => (p - 1 + t.features.length) % t.features.length)}>
            <ChevronLeft size={14} />
          </button>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {t.features.map((_, i) => (
              <button key={i} onClick={() => setMobileCardIdx(i)} style={{
                width: i === mobileCardIdx ? 20 : 6, height: 6, borderRadius: 4,
                border: "none", cursor: "pointer", transition: "all .35s", padding: 0,
                background: i === mobileCardIdx ? "var(--gold)" : "rgba(214,180,113,.3)",
              }} aria-label={`Card ${i + 1}`} />
            ))}
          </div>
          <button className="arr arr-sm" aria-label={lang === "en" ? "Next" : "التالي"} onClick={() => setMobileCardIdx(p => (p + 1) % t.features.length)}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </section>
  );
}
