import type { Metadata } from "next";
import { AREAS } from "@/components/lib/Constants";
import { AreaDetailClient } from "./AreaDetailClient";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);
  if (!area) return { title: "Area Not Found" };

  const description = `Luxury chauffeur service in ${area.name.en}, Dubai. ${area.tagline.en} — airport transfers, hourly bookings, and VIP transport with local knowledge.`;

  return {
    title: `Chauffeur Service in ${area.name.en}`,
    description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { title: `Chauffeur Service in ${area.name.en} | LuxeGlide Elite`, description, url: `https://luxeglideelite.ae/areas/${area.slug}` },
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = AREAS.find((a) => a.slug === slug);

  const areaJsonLd = area && {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Chauffeur Service in ${area.name.en}`,
    description: `Luxury chauffeur transport covering ${area.name.en}, Dubai.`,
    url: `https://luxeglideelite.ae/areas/${area.slug}`,
    provider: { "@id": "https://luxeglideelite.ae/#business" },
    areaServed: { "@type": "Place", name: `${area.name.en}, Dubai` },
  };

  return (
    <>
      {areaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
        />
      )}
      <AreaDetailClient slug={slug} />
    </>
  );
}
