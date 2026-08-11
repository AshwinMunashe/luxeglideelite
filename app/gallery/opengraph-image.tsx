import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "LuxeGlide Elite Gallery & Testimonials";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Gallery & Clients",
      title: "Moments, Curated",
      subtitle: "A glimpse into the fleet, the events, and the journeys we're trusted with.",
    }),
    { ...size }
  );
}
