import type { Metadata } from "next";
import { FLEET } from "@/components/lib/Constants";
import { FleetDetailClient } from "./FleetDetailClient";

export function generateStaticParams() {
  return FLEET.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = FLEET.find((c) => c.slug === slug);
  if (!car) return { title: "Vehicle Not Found" };

  const description = `Book the ${car.name.en} with a professional chauffeur in Dubai. ${car.tagline.en} — ${car.category.en}.`;

  return {
    title: car.name.en,
    description,
    alternates: { canonical: `/fleet/${car.slug}` },
    openGraph: { title: `${car.name.en} | LuxeGlide Elite`, description, url: `https://luxeglideelite.ae/fleet/${car.slug}` },
  };
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = FLEET.find((c) => c.slug === slug);

  const vehicleJsonLd = car && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: car.name.en,
    category: car.category.en,
    description: `${car.tagline.en} — ${car.category.en}, available with a professional chauffeur in Dubai.`,
    image: `https://luxeglideelite.ae${car.image.src}`,
    brand: { "@type": "Brand", name: car.name.en.split(" ")[0] },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "City", name: "Dubai" },
      seller: { "@id": "https://luxeglideelite.ae/#business" },
    },
  };

  return (
    <>
      {vehicleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
        />
      )}
      <FleetDetailClient slug={slug} />
    </>
  );
}
