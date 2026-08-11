import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";
import { SERVICES } from "@/components/lib/Constants";

export const alt = "LuxeGlide Elite Service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);

  return new ImageResponse(
    ogTemplate({
      tag: "Our Services",
      title: svc?.title.en ?? "Our Services",
      subtitle: svc?.desc.en,
    }),
    { ...size }
  );
}
