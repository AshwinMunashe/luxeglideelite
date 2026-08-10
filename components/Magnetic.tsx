"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

/* wraps a CTA so it drifts gently toward the cursor on hover — desktop-only
   in effect (touch devices never fire mousemove on hover), and fully inert
   when reduced motion is requested */
export function Magnetic({ children, strength = 16 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-block", transition: "transform .4s cubic-bezier(.22,1,.36,1)" }}
    >
      {children}
    </div>
  );
}
