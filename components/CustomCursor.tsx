"use client";

import { useEffect, useRef, useState } from "react";

/* replaces the native cursor with a gold dot + trailing ring, but only while a
   real mouse is actually driving the page. Everything here is written so the
   cursor can never end up frozen on screen:

   - it does not take over (and does not hide the native cursor) until the first
     genuine mouse movement — no dot parked at 0,0 on load
   - touch/pen input, window blur, tab switches, right-click menus and the
     pointer leaving the document all hand control straight back to the native
     cursor; the next mouse move takes it back
   - all DOM writes happen in one rAF tick that self-heals: it re-arms itself
     even if a frame throws, and parks itself when there is nothing to animate
   - the trail is delta-time based, so it moves identically at 60/120/144Hz */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    /* pointer coords + trail state */
    let x = 0, y = 0, ringX = 0, ringY = 0;
    let hasPosition = false;   // a real mouse move has landed
    let visible = false;       // custom cursor currently owns the pointer
    let hovering: Element | null = null;
    let ringActive = false;
    let raf = 0;
    let lastFrame = 0;
    let live = finePointer.matches; // listeners attached at all

    const HOVER_SELECTOR = "a, button, [role='button'], summary, label[for]";
    const NATIVE_SELECTOR = "input, textarea, select, [contenteditable=''], [contenteditable='true'], [data-native-cursor]";

    const show = () => {
      if (visible || !hasPosition || !live) return;
      visible = true;
      root.classList.add("custom-cursor-active");
      dotRef.current?.classList.add("cursor-visible");
      ringRef.current?.classList.add("cursor-visible");
      schedule();
    };

    /* hands the pointer back to the OS. Always safe to call twice. */
    const hide = () => {
      if (!visible) return;
      visible = false;
      root.classList.remove("custom-cursor-active");
      dotRef.current?.classList.remove("cursor-visible");
      ringRef.current?.classList.remove("cursor-visible");
      stop();
    };

    const setRingActive = (next: boolean) => {
      if (next === ringActive) return;
      ringActive = next;
      ringRef.current?.classList.toggle("cursor-ring-active", next);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      lastFrame = 0;
    };

    const schedule = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const frame = (now: number) => {
      raf = 0;
      let settled = true;
      try {
        const dt = lastFrame ? Math.min((now - lastFrame) / 16.667, 4) : 1; // clamp: tab-throttled frames must not teleport the ring
        lastFrame = now;

        /* the hovered node can be torn out of the DOM (route change, menu
           close) without ever firing mouseout — that used to leave the ring
           stuck open, so re-verify it every frame instead of trusting events */
        if (hovering && !hovering.isConnected) {
          hovering = null;
          setRingActive(false);
        }

        const ease = reducedMotion.matches ? 1 : 1 - Math.pow(1 - 0.18, dt);
        ringX += (x - ringX) * ease;
        ringY += (y - ringY) * ease;
        if (Math.abs(x - ringX) < 0.05 && Math.abs(y - ringY) < 0.05) {
          ringX = x;
          ringY = y;
        } else {
          settled = false;
        }

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      } catch {
        settled = true; // never let a bad frame kill the loop permanently
      }
      if (!settled) schedule();
    };

    /* a genuine mouse/trackpad move — the only thing that turns the cursor on */
    const onMouseMove = (clientX: number, clientY: number, target: EventTarget | null) => {
      x = clientX;
      y = clientY;
      hasPosition = true;

      const el = target instanceof Element ? target : null;

      /* text fields keep the native I-beam: hiding it makes inputs unusable */
      if (el?.closest(NATIVE_SELECTOR)) {
        hide();
        return;
      }

      hovering = el?.closest(HOVER_SELECTOR) ?? null;
      setRingActive(!!hovering);

      if (!visible) {
        // snap the trail to the pointer on (re)entry so it never streaks in
        ringX = x;
        ringY = y;
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (ring) ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        show();
        return;
      }
      schedule();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // touch/pen must never move the dot
      onMouseMove(e.clientX, e.clientY, e.target);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") hide(); // finger or stylus takes over
    };

    /* legacy path for the (rare) engine without Pointer Events */
    const onLegacyMove = (e: MouseEvent) => onMouseMove(e.clientX, e.clientY, e.target);
    const onTouchStart = () => hide();

    /* a native drag suppresses mousemove entirely — keep following via dragover */
    const onDragOver = (e: DragEvent) => onMouseMove(e.clientX, e.clientY, e.target);

    /* every way the pointer can stop reporting while still on screen.
       pointerleave on the document only fires when the pointer genuinely
       leaves the page, so a node being removed under the cursor can't
       false-trigger it the way pointerout would */
    const onLeave = () => hide();
    const onVisibility = () => {
      if (document.hidden) hide();
    };

    const supportsPointer = typeof window !== "undefined" && "PointerEvent" in window;

    const attach = () => {
      if (supportsPointer) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true });
        document.addEventListener("pointerleave", onLeave, { passive: true });
      } else {
        window.addEventListener("mousemove", onLegacyMove, { passive: true });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        document.addEventListener("mouseleave", onLeave, { passive: true });
      }
      window.addEventListener("dragover", onDragOver, { passive: true });
      window.addEventListener("blur", hide);
      window.addEventListener("contextmenu", hide);
      document.addEventListener("visibilitychange", onVisibility);
    };

    const detach = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("mousemove", onLegacyMove);
      window.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("blur", hide);
      window.removeEventListener("contextmenu", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    /* mouse plugged in or unplugged mid-session (hybrid laptops, docks) */
    const onPointerCapabilityChange = () => {
      if (finePointer.matches && !live) {
        live = true;
        attach();
      } else if (!finePointer.matches && live) {
        live = false;
        hide();
        hasPosition = false;
        detach();
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount gate, mirrors LangContext's hydration-safe pattern
    setMounted(true);
    if (live) attach();
    finePointer.addEventListener("change", onPointerCapabilityChange);

    return () => {
      finePointer.removeEventListener("change", onPointerCapabilityChange);
      detach();
      stop();
      root.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
