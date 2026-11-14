import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon generated from the placeholder pixel mark. */
export default function AppleIcon() {
  const px = (left: number, top: number, color: string) => (
    <div style={{ position: "absolute", left, top, width: 50, height: 50, background: color, borderRadius: 8 }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0e1830", position: "relative" }}>
        {px(36, 44, "#f6f3ec")}
        {px(36, 100, "#f6f3ec")}
        {px(92, 100, "#f6f3ec")}
        {px(100, 36, "#f2a516")}
      </div>
    ),
    size,
  );
}
