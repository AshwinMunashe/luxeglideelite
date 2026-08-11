import { ImageResponse } from "next/og";
import { ogSize, ogContentType, ogTemplate } from "@/lib/og";
import { AREAS } from "@/components/lib/Constants";

export const alt = "LuxeGlide Elite Area Coverage";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  return new ImageResponse(
    ogTemplate({
      tag: "Areas We Serve",
      title: area ? `Chauffeur Service in ${area.name.en}` : "Areas We Serve",
      subtitle: area?.tagline.en,
    }),
    { ...size }
  );
}
