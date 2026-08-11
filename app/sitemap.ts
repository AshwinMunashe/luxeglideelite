import type { MetadataRoute } from "next";
import { SERVICES, FLEET, AREAS } from "@/components/lib/Constants";

const BASE_URL = "https://luxeglideelite.ae";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/fleet`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/areas`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const fleetRoutes: MetadataRoute.Sitemap = FLEET.map((c) => ({
    url: `${BASE_URL}/fleet/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const areaRoutes: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${BASE_URL}/areas/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...fleetRoutes, ...areaRoutes];
}
