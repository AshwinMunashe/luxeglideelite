import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";
import { FLEET } from "@/components/lib/Constants";

export const alt = "LuxeGlide Elite Vehicle";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return FLEET.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = FLEET.find((c) => c.slug === slug);

  return new ImageResponse(
    ogTemplate({
      tag: car?.category.en ?? "Our Fleet",
      title: car?.name.en ?? "Our Fleet",
      subtitle: car?.tagline.en,
    }),
    { ...size }
  );
}
