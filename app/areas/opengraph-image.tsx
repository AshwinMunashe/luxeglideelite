import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";

export const alt = "Areas LuxeGlide Elite Serves in Dubai";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      tag: "Areas We Serve",
      title: "Local Knowledge, Citywide",
      subtitle: "Dedicated chauffeur coverage across Dubai's key districts — from Business Bay to the Palm.",
    }),
    { ...size }
  );
}
