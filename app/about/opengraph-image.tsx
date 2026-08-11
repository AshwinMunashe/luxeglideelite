import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "About LuxeGlide Elite";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Our Story",
      title: "Crafted for the Discerning",
      subtitle: "Dubai's newest standard for chauffeur-driven luxury — precision, discretion, and craft in every journey.",
    }),
    { ...size }
  );
}
