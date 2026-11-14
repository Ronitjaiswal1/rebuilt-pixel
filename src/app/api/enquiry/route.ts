import { parseEnquiry, type Enquiry } from "@/lib/enquiry-schema";

/**
 * POST /api/enquiry
 * 1. Honeypot: bots that fill `company_website` get a fake success.
 * 2. Rate limit: 5 submissions per 10 minutes per IP (in-memory, per instance;
 *    good enough to stop casual abuse — see docs/DECISIONS.md for upgrades).
 * 3. Validate, then deliver: email via Resend and/or a webhook (e.g. Google Sheets).
 * 4. Log a structured line so every lead is visible in the hosting logs.
 */

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

async function sendEmail(lead: Enquiry): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !to) return false;
  const from = process.env.ENQUIRY_FROM_EMAIL || "Rebuilt Pixel <onboarding@resend.dev>";
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Phone / WhatsApp", lead.phone],
    ["Email", lead.email || "—"],
    ["Business", lead.business || "—"],
    ["Interested in", lead.interest || "—"],
    ["Sent from", lead.page || "—"],
  ];
  const html = `<h2 style="font-family:Georgia,serif">New enquiry</h2><table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#4b5568">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(
    lead.message || "(no message)",
  )}</p>`;
  const phoneDigits = lead.phone.replace(/\D/g, "");
  const waNumber = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: lead.email || undefined,
      subject: `New enquiry: ${lead.name}${lead.interest ? ` · ${lead.interest}` : ""}`,
      html: `${html}<p style="font-family:Arial,sans-serif;font-size:14px"><a href="https://wa.me/${waNumber}">Reply on WhatsApp</a></p>`,
    }),
  });
  if (!res.ok) {
    console.error("[enquiry] resend failed", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

async function sendWebhook(lead: Enquiry): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  }).catch(() => null);
  if (!res?.ok) console.error("[enquiry] webhook failed", res?.status);
  return Boolean(res?.ok);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many messages in a short time. Please try again in a few minutes, or WhatsApp us." },
      { status: 429 },
    );
  }

  const { data, errors } = parseEnquiry(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  // Structured log: the lead is never lost even if email delivery fails.
  console.info("[enquiry] lead", JSON.stringify({ ...data, receivedAt: new Date().toISOString() }));

  const [emailed, hooked] = await Promise.all([sendEmail(data), sendWebhook(data)]);
  const configured = Boolean(process.env.RESEND_API_KEY || process.env.LEAD_WEBHOOK_URL);

  if (!emailed && !hooked && (configured || process.env.NODE_ENV === "production")) {
    return Response.json(
      { ok: false, error: "We couldn't send your message right now. Please WhatsApp us instead." },
      { status: 503 },
    );
  }
  return Response.json({ ok: true });
}
