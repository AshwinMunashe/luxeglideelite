"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const minTime = new Promise<void>((resolve) => setTimeout(resolve, 900));
    const pageReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
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
