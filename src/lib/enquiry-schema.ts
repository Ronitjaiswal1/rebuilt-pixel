/**
 * Enquiry validation, shared by the form (client) and the API route (server).
 * Hand-written to avoid a schema library for six fields.
 */
export const businessTypes = [
  "Photo or video studio",
  "Clinic or dentist",
  "Salon or spa",
  "Restaurant or café",
  "Coach or trainer",
  "Local shop",
  "Startup",
  "Other",
] as const;

export const interests = [
  "Launch plan (₹7,999)",
  "Growth plan (₹13,999)",
  "Signature plan (₹25,000)",
  "Website redesign",
  "Landing page",
  "SEO and Google Business Profile",
  "Website care",
  "Branding basics",
  "Custom project",
  "Not sure yet",
] as const;

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  business: string;
  interest: string;
  message: string;
  page: string;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

export function parseEnquiry(input: Record<string, unknown>): { data: Enquiry; errors: FieldErrors } {
  const data: Enquiry = {
    name: clean(input.name, 80),
    phone: clean(input.phone, 20),
    email: clean(input.email, 120),
    business: clean(input.business, 60),
    interest: clean(input.interest, 60),
    message: clean(input.message, 2000),
    page: clean(input.page, 120),
  };
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a 10-digit mobile number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = "That email doesn't look right.";
  if (data.business && !(businessTypes as readonly string[]).includes(data.business)) data.business = "Other";
  if (data.interest && !(interests as readonly string[]).includes(data.interest)) data.interest = "Not sure yet";
  return { data, errors };
}
