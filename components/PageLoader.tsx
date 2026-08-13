"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    /* previously waited on window.load, which only fires once EVERY
       resource on the page — including the multi-megabyte hero videos —
       has finished downloading. That held this opaque overlay over the
       hero section for 3+ seconds on mobile, which is what was actually
       showing up as the hero video's "LCP render delay": the video was
       ready underneath the whole time, just visually hidden behind this.
       DOMContentLoaded (markup + synchronous scripts parsed) is the right
       signal — the hero doesn't need every video byte to be visible. */
    const minTime = new Promise<void>((resolve) => setTimeout(resolve, 900));
    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState !== "loading") resolve();
      else document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
    });

    Promise.all([minTime, pageReady]).then(() => {
      setLoading(false);
      document.body.style.overflow = "";
      setTimeout(() => setHidden(true), 750);
    });
  }, []);

  if (hidden) return null;

  return (
    <div className={`page-loader${loading ? "" : " page-loader-out"}`} aria-hidden>
      <div className="page-loader-mark">
        <Image src="/images/logo.png" alt="" width={160} height={48} priority style={{ width: 120, height: "auto" }} />
        <span className="page-loader-line" />
      </div>
    </div>
  );
}
