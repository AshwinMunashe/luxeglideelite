import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "LuxeGlide Elite Services";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Our Services",
      title: "Every Journey, Perfected",
      subtitle: "From airport transfers to VIP events — a full range of luxury chauffeur services in Dubai.",
    }),
    { ...size }
  );
}
