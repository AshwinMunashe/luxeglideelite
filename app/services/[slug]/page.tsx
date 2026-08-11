import type { Metadata } from "next";
import { SERVICES } from "@/components/lib/Constants";
import { ServiceDetailClient } from "./ServiceDetailClient";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return { title: "Service Not Found" };

  return {
    title: svc.title.en,
    description: svc.desc.en,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: { title: `${svc.title.en} | LuxeGlide Elite`, description: svc.desc.en, url: `https://luxeglideelite.ae/services/${svc.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);

  const serviceJsonLd = svc && {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title.en,
    description: svc.desc.en,
    url: `https://luxeglideelite.ae/services/${svc.slug}`,
    provider: { "@id": "https://luxeglideelite.ae/#business" },
    areaServed: { "@type": "City", name: "Dubai" },
  };

  return (
    <>
      {serviceJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      )}
      <ServiceDetailClient slug={slug} />
    </>
  );
}
