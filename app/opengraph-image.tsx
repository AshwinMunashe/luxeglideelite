import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "LuxeGlide Elite — Premium Chauffeur Services in Dubai";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Premium Chauffeur Services",
      title: "Seamless Journeys, Unmatched Comfort",
      subtitle: "Dubai's premier luxury chauffeur service — airport transfers, corporate travel, and VIP transport.",
    }),
    { ...size }
  );
}
