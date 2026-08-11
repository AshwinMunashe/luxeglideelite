import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "LuxeGlide Elite Fleet";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Our Fleet",
      title: "A Fleet Fit for Every Occasion",
      subtitle: "Six vehicle classes, one uncompromising standard of care and presentation.",
    }),
    { ...size }
  );
}
