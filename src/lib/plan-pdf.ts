/**
 * One-page A4 plan summary, generated in the browser so it works offline in a
 * meeting. pdf-lib, fontkit and qrcode load only when this module is imported
 * (on click). Prices are set in Fraunces because the body font has no ₹ glyph.
 */
import { plans, domainHostingNote } from "@/content/plans";
import { site } from "@/content/site";
import { groupINR } from "@/lib/format";
import { waHref, waMessages } from "@/lib/whatsapp";

type RGB = readonly [number, number, number];
const INK: RGB = [14 / 255, 24 / 255, 48 / 255];
const MUTED: RGB = [75 / 255, 85 / 255, 104 / 255];
const ACCENT: RGB = [242 / 255, 165 / 255, 22 / 255];
const PAPER: RGB = [246 / 255, 243 / 255, 236 / 255];
const LINE: RGB = [217 / 255, 210 / 255, 195 / 255];
const ON_INK_MUTED: RGB = [0.78, 0.8, 0.85];

export async function buildPlanPdf({ client, siteUrl }: { client: string; siteUrl: string }): Promise<Blob> {
  const [{ PDFDocument, rgb }, fontkitMod, QR] = await Promise.all([
    import("pdf-lib"),
    import("@pdf-lib/fontkit"),
    import("qrcode"),
  ]);
  const fontkit = (fontkitMod as { default?: unknown }).default ?? fontkitMod;
  const [display, regular, semibold] = await Promise.all(
    ["/fonts/Fraunces-Display.ttf", "/fonts/InstrumentSans-Regular.ttf", "/fonts/InstrumentSans-SemiBold.ttf"].map(
      (u) =>
        fetch(u).then((r) => {
          if (!r.ok) throw new Error(`Font failed: ${u}`);
          return r.arrayBuffer();
        }),
    ),
  );

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit as Parameters<typeof pdf.registerFontkit>[0]);
  pdf.setTitle(`${site.name}: website plans${client ? ` for ${client}` : ""}`);
  pdf.setAuthor(site.name);
  const fDisplay = await pdf.embedFont(display, { subset: true });
  const fBody = await pdf.embedFont(regular, { subset: true });
  const fBold = await pdf.embedFont(semibold, { subset: true });
  type Font = typeof fBody;

  const W = 595.28;
  const H = 841.89;
  const M = 40;
  const page = pdf.addPage([W, H]);
  const c = (v: RGB) => rgb(v[0], v[1], v[2]);

  const wrap = (text: string, font: Font, size: number, width: number) => {
    const lines: string[] = [];
    let line = "";
    for (const w of text.split(" ")) {
      const next = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(next, size) > width && line) {
        lines.push(line);
        line = w;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };
  const right = (text: string, y: number, size: number, font: Font = fBody, color: RGB = MUTED) =>
    page.drawText(text, { x: W - M - font.widthOfTextAtSize(text, size), y, size, font, color: c(color) });

  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: c(PAPER) });

  // Wordmark (placeholder mark, same as the site)
  page.drawRectangle({ x: M, y: H - M - 14, width: 6, height: 6, color: c(INK) });
  page.drawRectangle({ x: M, y: H - M - 21, width: 6, height: 6, color: c(INK) });
  page.drawRectangle({ x: M + 7, y: H - M - 21, width: 6, height: 6, color: c(INK) });
  page.drawRectangle({ x: M + 8, y: H - M - 13, width: 6, height: 6, color: c(ACCENT) });
  page.drawText(site.name, { x: M + 22, y: H - M - 20, size: 15, font: fDisplay, color: c(INK) });

  const dateText = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  if (client) {
    right(`Prepared for ${client}`, H - M - 14, 10, fBold, INK);
    right(dateText, H - M - 27, 9);
  } else {
    right(dateText, H - M - 18, 9);
  }

  let y = H - M - 78;
  page.drawText("Website plans", { x: M, y, size: 34, font: fDisplay, color: c(INK) });
  y -= 22;
  page.drawText(site.tagline, { x: M, y, size: 12, font: fBody, color: c(MUTED) });

  // Plan columns
  const gap = 12;
  const colW = (W - M * 2 - gap * 2) / 3;
  const top = y - 26;
  const colH = 500;

  plans.forEach((p, i) => {
    const x = M + i * (colW + gap);
    const featured = Boolean(p.featured);
    const fg = featured ? PAPER : INK;
    const sub = featured ? ON_INK_MUTED : MUTED;
    page.drawRectangle({
      x,
      y: top - colH,
      width: colW,
      height: colH,
      color: featured ? c(INK) : rgb(1, 1, 1),
      ...(featured ? {} : { borderColor: c(LINE), borderWidth: 0.8 }),
    });
    const px = x + 14;
    const inner = colW - 28;
    let cy = top - 26;
    if (featured) {
      page.drawRectangle({ x: px, y: cy + 2, width: 74, height: 14, color: c(ACCENT) });
      page.drawText("MOST CHOSEN", { x: px + 6, y: cy + 6, size: 7, font: fBold, color: c(INK) });
      cy -= 22;
    }
    page.drawText(p.name, { x: px, y: cy, size: 18, font: fDisplay, color: c(fg) });
    cy -= 14;
    for (const l of wrap(p.forWho, fBody, 8.5, inner)) {
      page.drawText(l, { x: px, y: cy, size: 8.5, font: fBody, color: c(sub) });
      cy -= 11;
    }
    cy -= 22;
    page.drawText(`₹${groupINR(p.price)}`, { x: px, y: cy, size: 28, font: fDisplay, color: c(fg) });
    cy -= 16;
    page.drawText(`One-time · ${p.deliveryDays}-day delivery`, { x: px, y: cy, size: 8.5, font: fBody, color: c(sub) });
    cy -= 14;
    page.drawLine({
      start: { x: px, y: cy },
      end: { x: px + inner, y: cy },
      thickness: 0.6,
      color: c(featured ? [0.25, 0.3, 0.42] : LINE),
    });
    cy -= 16;
    const prev = p.includesPrevious ? plans.find((q) => q.id === p.includesPrevious) : undefined;
    if (prev) {
      page.drawText(`Everything in ${prev.name}, plus:`, { x: px, y: cy, size: 8.5, font: fBold, color: c(fg) });
      cy -= 16;
    }
    for (const h of p.highlights) {
      const lines = wrap(h, fBody, 8.5, inner - 10);
      page.drawRectangle({ x: px, y: cy + 2, width: 3.5, height: 3.5, color: c(ACCENT) });
      lines.forEach((l, li) => page.drawText(l, { x: px + 10, y: cy - li * 11, size: 8.5, font: fBody, color: c(fg) }));
      cy -= lines.length * 11 + 5;
    }
    page.drawText(p.revisionsShort, { x: px, y: top - colH + 30, size: 7.5, font: fBold, color: c(sub) });
    page.drawText(p.supportShort + " support", { x: px, y: top - colH + 18, size: 7.5, font: fBold, color: c(sub) });
  });

  // Notes
  let ny = top - colH - 22;
  for (const l of wrap(domainHostingNote, fBold, 9, W - M * 2 - 150)) {
    page.drawText(l, { x: M, y: ny, size: 9, font: fBold, color: c(INK) });
    ny -= 12;
  }
  ny -= 4;
  for (const l of wrap("* Unlimited revisions within the agreed scope. Payment in milestones by UPI or bank transfer, with an invoice for every payment.", fBody, 8, W - M * 2 - 150)) {
    page.drawText(l, { x: M, y: ny, size: 8, font: fBody, color: c(MUTED) });
    ny -= 11;
  }
  ny -= 22;
  page.drawText("Next step: message us on WhatsApp.", { x: M, y: ny, size: 14, font: fDisplay, color: c(INK) });
  ny -= 16;
  const contact = [siteUrl.replace(/^https?:\/\//, ""), site.whatsappNumber ? `WhatsApp +${site.whatsappNumber}` : "", site.email]
    .filter(Boolean)
    .join("   ·   ");
  page.drawText(contact, { x: M, y: ny, size: 9, font: fBody, color: c(MUTED) });

  // QR to WhatsApp
  const qr = QR.create(waHref(waMessages.general(client || undefined)), { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const qs = 96;
  const cell = qs / n;
  const qx = W - M - qs;
  const qy = M + 16;
  page.drawRectangle({ x: qx - 6, y: qy - 6, width: qs + 12, height: qs + 12, color: rgb(1, 1, 1) });
  for (let r = 0; r < n; r++)
    for (let col = 0; col < n; col++)
      if (qr.modules.data[r * n + col])
        page.drawRectangle({
          x: qx + col * cell,
          y: qy + qs - (r + 1) * cell,
          width: cell + 0.05,
          height: cell + 0.05,
          color: c(INK),
        });
  const cap = "Scan to chat on WhatsApp";
  page.drawText(cap, { x: qx + qs / 2 - fBody.widthOfTextAtSize(cap, 7.5) / 2, y: qy - 18, size: 7.5, font: fBody, color: c(MUTED) });

  const bytes = await pdf.save();
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}
