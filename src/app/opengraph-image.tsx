import { renderOg, ogSize } from "@/lib/og";

export const alt = "Rebuilt Pixel: websites that bring customers to your WhatsApp. Plans from ₹7,999.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "Web design studio · India",
    title: "Websites that bring customers to your WhatsApp.",
    footer: "₹7,999 · ₹13,999 · ₹25,000 · fixed prices",
  });
}
