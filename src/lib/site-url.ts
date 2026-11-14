/**
 * Absolute site URL for canonical links, sitemap, OG images and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production. On Vercel previews we fall back to
 * the deployment URL so OG images still resolve.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const absoluteUrl = (path = "/"): string => new URL(path, `${siteUrl}/`).toString();
