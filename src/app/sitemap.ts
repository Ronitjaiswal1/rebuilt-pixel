import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

/** Public, indexable pages. /styleguide, /pitch and /demo/studio/site are excluded. */
const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/services", priority: 0.8 },
  { path: "/for/photographers", priority: 0.8 },
  { path: "/industries", priority: 0.7 },
  { path: "/work", priority: 0.7 },
  { path: "/demo/studio", priority: 0.6 },
  { path: "/process", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/credits", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absoluteUrl(r.path),
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
