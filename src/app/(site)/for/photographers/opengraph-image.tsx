import { renderOg, ogSize } from "@/lib/og";

export const alt = "Websites for photo and video studios by Rebuilt Pixel.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    kicker: "For photo and video studios",
    title: "Your work is beautiful. Your website should be too.",
    footer: "Galleries · packages · booking enquiries",
  });
}
