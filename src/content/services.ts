/** The seven services. Order here is the order on the site. */
export type ServiceId =
  | "websites"
  | "redesign"
  | "landing-pages"
  | "seo-gbp"
  | "care"
  | "branding"
  | "custom";

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  body: string;
  includes: string[];
  pricing: string;
  /** Icon key from components/ui/icons */
  icon: "browser" | "refresh" | "target" | "pin" | "shield" | "palette" | "puzzle";
  cta: { label: string; kind: "plans" | "whatsapp" };
};

export const services: Service[] = [
  {
    id: "websites",
    name: "Website design and development",
    short: "Your full business website on a fixed-price plan.",
    body: "Pick a plan, send us your content, and get a fast, mobile-first website in 7 to 25 days. Fixed price, agreed upfront.",
    includes: ["Design and build", "WhatsApp and enquiry form", "Search-ready setup", "Support after launch"],
    pricing: "₹7,999, ₹13,999 or ₹25,000",
    icon: "browser",
    cta: { label: "Compare the plans", kind: "plans" },
  },
  {
    id: "redesign",
    name: "Website redesign",
    short: "Turn a slow, dated site into one you're proud to share.",
    body: "We rebuild your existing site on a modern, fast setup, keep what works, and carry over your content and search rankings carefully.",
    includes: ["Audit of the current site", "New design and build", "Content moved across", "Redirects so links keep working"],
    pricing: "Priced on the plan that fits",
    icon: "refresh",
    cta: { label: "Ask about a redesign", kind: "whatsapp" },
  },
  {
    id: "landing-pages",
    name: "Landing pages",
    short: "One focused page for a campaign, offer or ad.",
    body: "A single page with one job: turn ad clicks into WhatsApp chats or form enquiries. Built to load fast on mobile data.",
    includes: ["Conversion-focused layout", "WhatsApp and form", "Analytics events", "Ad-ready speed"],
    pricing: "Quoted on WhatsApp",
    icon: "target",
    cta: { label: "Plan a landing page", kind: "whatsapp" },
  },
  {
    id: "seo-gbp",
    name: "SEO and Google Business Profile",
    short: "Show up when people nearby search for what you do.",
    body: "We set up and tune your Google Business Profile and the local search basics on your site, so you appear for searches like \"salon near me\".",
    includes: ["Google Business Profile setup", "Local keywords and page titles", "Search Console setup", "Map and listing checks"],
    pricing: "Included from Growth, or quoted separately",
    icon: "pin",
    cta: { label: "Get found locally", kind: "whatsapp" },
  },
  {
    id: "care",
    name: "Website care and maintenance",
    short: "Updates, backups, security and small edits, every month.",
    body: "We keep your site updated, backed up and secure, and make small changes when you need them. You message us; we handle it.",
    includes: ["Monthly updates", "Backups", "Security checks", "Small content edits"],
    pricing: "Monthly plan, quoted on WhatsApp",
    icon: "shield",
    cta: { label: "Ask about care plans", kind: "whatsapp" },
  },
  {
    id: "branding",
    name: "Branding basics",
    short: "A tidy logo and a simple brand kit for your website.",
    body: "We refine your existing logo and set your colours and fonts, so your website, WhatsApp profile and Instagram look like one business.",
    includes: ["Logo refinement", "Colour palette", "Font pairing", "Simple brand kit file"],
    pricing: "Quoted on WhatsApp",
    icon: "palette",
    cta: { label: "Talk about branding", kind: "whatsapp" },
  },
  {
    id: "custom",
    name: "Custom projects",
    short: "Online stores, booking systems and web apps.",
    body: "Need something bigger than a website? Tell us what you have in mind and we'll send a clear, written quote before any work starts.",
    includes: ["Online stores", "Booking systems", "Web apps", "Integrations"],
    pricing: "Custom quote",
    icon: "puzzle",
    cta: { label: "Get a custom quote", kind: "whatsapp" },
  },
];
