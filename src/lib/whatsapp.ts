import { site } from "@/content/site";
import { planById, type PlanId } from "@/content/plans";
import { formatINR } from "@/lib/format";

/**
 * Build a click-to-chat link with a prefilled, URL-encoded message.
 * With no number configured, wa.me opens WhatsApp and lets the visitor choose a
 * chat, which keeps the link working instead of pointing at a fake number.
 */
export function waHref(message: string): string {
  const number = site.whatsappNumber.replace(/\D/g, "");
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

const hello = (client?: string) => (client ? `Hi Rebuilt Pixel, this is ${client}.` : "Hi Rebuilt Pixel,");

export const waMessages = {
  general: (client?: string) => `${hello(client)} I'd like to talk about a website for my business.`,
  plan: (id: PlanId, client?: string) => {
    const plan = planById(id);
    return `${hello(client)} I'm interested in the ${plan.name} plan (${formatINR(plan.price)}). Can we talk?`;
  },
  service: (serviceName: string, client?: string) =>
    `${hello(client)} I'd like to know more about ${serviceName.toLowerCase()}.`,
  custom: (client?: string) => `${hello(client)} I'd like a custom quote for a project.`,
  page: (pageName: string, client?: string) =>
    `${hello(client)} I was looking at your ${pageName} page and I'd like to talk about a website.`,
  photographers: (client?: string) => `${hello(client)} I run a photo/video studio and I'd like a website.`,
  demo: (client?: string) => `${hello(client)} I just saw the studio demo. I'd like something like this for my business.`,
};

/** Page name used by the floating button, keyed by pathname. */
export const pageNames: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/pricing": "pricing",
  "/work": "work",
  "/industries": "industries",
  "/process": "process",
  "/about": "about",
  "/contact": "contact",
};

export function messageForPath(pathname: string, client?: string): string {
  if (pathname.startsWith("/for/photographers")) return waMessages.photographers(client);
  if (pathname.startsWith("/demo")) return waMessages.demo(client);
  const name = pageNames[pathname];
  return name && name !== "home" ? waMessages.page(name, client) : waMessages.general(client);
}
