import type { Metadata } from "next";
import { GalleryPageClient } from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery & Testimonials",
  description:
    "See LuxeGlide Elite's fleet and hear from clients who trust us for airport transfers, corporate travel, and VIP events across Dubai.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery & Testimonials | LuxeGlide Elite", url: "https://luxeglideelite.ae/gallery" },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
