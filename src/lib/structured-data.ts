import { site } from "@/content/site";
import { plans } from "@/content/plans";
import { services } from "@/content/services";
import type { Faq } from "@/content/faq";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

const orgId = `${siteUrl}/#organization`;

/** Organization + ProfessionalService (a LocalBusiness subtype). */
export function organizationLd() {
  const sameAs = Object.values(site.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.tagline,
    areaServed: { "@type": "Country", name: "India" },
    priceRange: "₹7,999 – ₹25,000",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Bank transfer",
    ...(site.email ? { email: site.email } : {}),
    ...(site.whatsappNumber ? { telephone: `+${site.whatsappNumber}` } : {}),
    ...(site.city
      ? { address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IN" } }
      : { address: { "@type": "PostalAddress", addressCountry: "IN" } }),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

/** One Service with an Offer per plan, priced in INR. */
export function plansLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Website design and development",
    serviceType: "Website design and development",
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "India" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website plans",
      itemListElement: plans.map((p) => ({
        "@type": "Offer",
        name: `${p.name} website plan`,
        description: `${p.summary} ${p.pages}, ${p.deliveryDays}-day delivery. Excludes domain and hosting.`,
        price: p.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/pricing#${p.id}`),
        itemOffered: { "@type": "Service", name: `${p.name} website` },
      })),
    },
  };
}

export function servicesLd() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.body,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "India" },
    url: absoluteUrl(`/services#${s.id}`),
  }));
}

export function faqLd(items: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}
