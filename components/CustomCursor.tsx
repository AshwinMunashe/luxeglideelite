"use client";

import { useEffect, useRef, useState } from "react";

/* replaces the native cursor with a gold dot + trailing ring on desktop
   only (matchMedia gates out touch devices). Progressive enhancement:
   the native cursor is only hidden once this confirms a fine pointer is
   present and the effect is actually running, so nothing breaks if JS
   is slow, disabled, or the user is on a device this shouldn't touch. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only pointer-type check, mirrors LangContext's hydration-safe pattern
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animateRing);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) ringRef.current?.classList.add("cursor-ring-active");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) ringRef.current?.classList.remove("cursor-ring-active");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
