/**
 * Site-wide facts. Edit here — components read from this file.
 *
 * Values marked `TODO` were not supplied in the brief. While they are empty the
 * site hides the related UI (e.g. no email row) instead of showing fake data.
 * WhatsApp falls back to a generic wa.me link that lets the visitor pick a chat.
 */
export const site = {
  name: "Rebuilt Pixel",
  legalName: "Rebuilt Pixel", // TODO: registered business name, if different
  tagline: "Fixed price. Built in days. Yours to keep.",
  description:
    "Websites for small and growing businesses in India. Three fixed-price plans from ₹7,999, delivered in 7 to 25 days, with WhatsApp enquiries built in.",
  founder: "", // TODO: [NAME]
  /** Digits only, with country code, no plus sign. Example: "919876543210". */
  whatsappNumber: "", // TODO: [+91XXXXXXXXXX]
  email: "", // TODO: [EMAIL]
  city: "", // TODO: [CITY]
  country: "India",
  // TODO: confirm this promise (and add your working hours if you want them shown).
  responseTime: "We reply on WhatsApp within a few hours on working days.",
  responseTimeShort: "Replies within a few hours",
  socials: {
    instagram: "", // TODO: [URL]
    linkedin: "", // TODO: [URL]
  },
  locale: "en_IN",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/work", label: "Work" },
  { href: "/industries", label: "Industries" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  Explore: [
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/work", label: "Work" },
    { href: "/process", label: "Process" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  "For your business": [
    { href: "/for/photographers", label: "Photo and video studios" },
    { href: "/industries", label: "All industries" },
    { href: "/demo/studio", label: "Live demo: studio concept" },
    { href: "/pitch", label: "Pitch mode" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms" },
    { href: "/credits", label: "Image credits" },
  ],
} as const;

/** Honest "what you get" strip, used until there is real proof (reviews, logos). */
export const whatYouGet = [
  "Looks right on every phone",
  "Enquiries straight to WhatsApp",
  "Set up for Google search",
  "Fixed price, no surprises",
  "Delivered in days, not months",
  "Domain in your name",
] as const;
