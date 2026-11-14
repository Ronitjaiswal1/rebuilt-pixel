/**
 * The three fixed-price plans. Prices are in rupees (integers).
 * Rename plans freely; `id` is used in URLs (#growth) and must stay stable.
 * Every price on the site, in JSON-LD, the PDF and Pitch mode reads from here.
 */
export type PlanId = "launch" | "growth" | "signature";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  forWho: string;
  summary: string;
  deliveryDays: number;
  revisions: string;
  revisionsShort: string;
  support: string;
  supportShort: string;
  pages: string;
  featured?: boolean;
  /** Short list for cards. The full matrix lives in `comparison` below. */
  highlights: string[];
  includesPrevious?: PlanId;
};

export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    price: 7999,
    forWho: "Getting online fast",
    summary: "A clean, mobile-friendly site with everything a customer needs to find you and message you.",
    deliveryDays: 7,
    revisions: "1 revision round",
    revisionsShort: "1 round",
    support: "1 month support",
    supportShort: "1 month",
    pages: "Up to 5 pages",
    highlights: [
      "Up to 5 pages: Home, About, Services, Gallery or Portfolio, Contact",
      "Mobile-friendly design",
      "WhatsApp chat button",
      "Enquiry form and Google Maps",
      "Social links",
      "Basic search setup",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 13999,
    forWho: "Businesses that want more enquiries",
    summary: "Custom design in your colours, built to turn visitors into enquiries and to show up in local search.",
    deliveryDays: 12,
    revisions: "3 revision rounds",
    revisionsShort: "3 rounds",
    support: "3 months support",
    supportShort: "3 months",
    pages: "Up to 10 pages",
    featured: true,
    includesPrevious: "launch",
    highlights: [
      "Up to 10 pages",
      "Custom design in your brand colours",
      "Multiple galleries or service pages",
      "Video section",
      "Packages and price list page",
      "Lead enquiry form with email notifications",
      "Testimonials section",
      "Instagram feed",
      "Local SEO and Google Business Profile setup",
      "Visitor analytics",
      "Speed optimisation",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    price: 25000,
    forWho: "Businesses that run on their website",
    summary: "A fully custom site with bookings, payments and an admin panel, so the website does real work for you.",
    deliveryDays: 25,
    revisions: "Unlimited revisions within scope",
    revisionsShort: "Unlimited*",
    support: "6 months priority support",
    supportShort: "6 months, priority",
    pages: "Unlimited pages",
    includesPrevious: "growth",
    highlights: [
      "Unlimited pages",
      "Fully custom design with advanced animation",
      "Admin panel to update the site yourself",
      "Online booking or appointment calendar with advance payment (UPI and cards)",
      "Private client area or login where needed, for example a photographer's proofing gallery",
      "Blog",
      "Advanced SEO",
      "Third-party integrations",
      "Training session",
    ],
  },
];

export const planById = (id: PlanId): Plan => {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
};

export const domainHostingNote =
  "All prices exclude domain and hosting. We set both up for you and charge them at actuals, with the invoice shown.";

export const domainHostingShort = "Domain and hosting extra, at actuals";

/** Feature comparison. `true` = included, `false` = not included, string = included with detail. */
export type Cell = boolean | string;
export type ComparisonRow = { label: string; values: Record<PlanId, Cell>; note?: string };
export type ComparisonGroup = { group: string; rows: ComparisonRow[] };

export const comparison: ComparisonGroup[] = [
  {
    group: "The basics",
    rows: [
      { label: "Pages", values: { launch: "Up to 5", growth: "Up to 10", signature: "Unlimited" } },
      { label: "Delivery", values: { launch: "7 days", growth: "12 days", signature: "25 days" } },
      {
        label: "Revision rounds",
        values: { launch: "1", growth: "3", signature: "Unlimited, within scope" },
      },
      {
        label: "Support after launch",
        values: { launch: "1 month", growth: "3 months", signature: "6 months, priority" },
      },
    ],
  },
  {
    group: "Design",
    rows: [
      { label: "Mobile-friendly design", values: { launch: true, growth: true, signature: true } },
      {
        label: "Custom design in your brand colours",
        values: { launch: false, growth: true, signature: "Fully custom" },
      },
      { label: "Advanced animation", values: { launch: false, growth: false, signature: true } },
      {
        label: "Multiple galleries or service pages",
        values: { launch: false, growth: true, signature: true },
      },
      { label: "Video section", values: { launch: false, growth: true, signature: true } },
      { label: "Packages and price list page", values: { launch: false, growth: true, signature: true } },
      { label: "Testimonials section", values: { launch: false, growth: true, signature: true } },
      { label: "Instagram feed", values: { launch: false, growth: true, signature: true } },
      { label: "Blog", values: { launch: false, growth: false, signature: true } },
    ],
  },
  {
    group: "Enquiries and bookings",
    rows: [
      { label: "WhatsApp chat button", values: { launch: true, growth: true, signature: true } },
      { label: "Enquiry form and Google Maps", values: { launch: true, growth: true, signature: true } },
      { label: "Social links", values: { launch: true, growth: true, signature: true } },
      {
        label: "Lead form with email notifications",
        values: { launch: false, growth: true, signature: true },
      },
      {
        label: "Online booking with advance payment (UPI and cards)",
        values: { launch: false, growth: false, signature: true },
      },
      {
        label: "Private client area or login",
        values: { launch: false, growth: false, signature: "Where needed" },
      },
    ],
  },
  {
    group: "Getting found",
    rows: [
      { label: "Basic search setup", values: { launch: true, growth: true, signature: true } },
      {
        label: "Local SEO and Google Business Profile setup",
        values: { launch: false, growth: true, signature: true },
      },
      { label: "Advanced SEO", values: { launch: false, growth: false, signature: true } },
      { label: "Visitor analytics", values: { launch: false, growth: true, signature: true } },
      { label: "Speed optimisation", values: { launch: false, growth: true, signature: true } },
    ],
  },
  {
    group: "Running it yourself",
    rows: [
      {
        label: "Admin panel to update the site",
        values: { launch: false, growth: false, signature: true },
      },
      { label: "Third-party integrations", values: { launch: false, growth: false, signature: true } },
      { label: "Training session", values: { launch: false, growth: false, signature: true } },
    ],
  },
];

export const domainHostingExplainer = [
  {
    q: "What is a domain?",
    a: "Your address on the internet, like yourstudio.in. It renews every year. A .in or .com usually costs between a few hundred and about fifteen hundred rupees a year, depending on the registrar.",
  },
  {
    q: "What is hosting?",
    a: "The server your website lives on. Cost depends on the plan you need. We recommend the right option for your site and show you the price before buying.",
  },
  {
    q: "Why are they not included?",
    a: "Because they are yours. We register the domain in your name and set up hosting on your account, so you own both and never depend on us to keep the site online.",
  },
  {
    q: "Do you add a margin?",
    a: "No. You pay what the provider charges. We show you the invoice.",
  },
];
