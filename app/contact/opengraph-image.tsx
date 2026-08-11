import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "Contact LuxeGlide Elite";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Get In Touch",
      title: "Let's Plan Your Journey",
      subtitle: "Tell us what you need and we'll arrange your chauffeur — usually within minutes.",
    }),
    { ...size }
  );
}
