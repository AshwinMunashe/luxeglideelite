"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

/* counts up from 0 to the leading number in `value` once it scrolls into
   view, then appends whatever trailing text follows (e.g. "+", "%", "/7").
   Non-numeric values (rare) just render as-is, no animation. */
export function AnimatedStat({ value, className, style }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (!inView || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only skip of the count-up, not a render loop
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, value]);

  return <span ref={ref} className={className} style={style}>{display}</span>;
}
