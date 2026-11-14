import { renderOg, ogSize } from "@/lib/og";

export const alt = "Rebuilt Pixel website plans: ₹7,999, ₹13,999 and ₹25,000.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Pricing",
    title: "Three plans. Fixed prices. No surprises.",
    footer: "Launch ₹7,999 · Growth ₹13,999 · Signature ₹25,000",
  });
}
