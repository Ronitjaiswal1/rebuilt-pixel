import { qrPath } from "@/lib/qr";

/** Server-rendered QR code with a quiet zone, always dark-on-white for scanners. */
export function QrCode({ value, label, size = 160 }: { value: string; label: string; size?: number }) {
  const { size: n, d } = qrPath(value);
  const pad = 2;
  return (
    <svg
      role="img"
      aria-label={label}
      width={size}
      height={size}
      viewBox={`${-pad} ${-pad} ${n + pad * 2} ${n + pad * 2}`}
      shapeRendering="crispEdges"
      className="rounded-md bg-white"
    >
      <rect x={-pad} y={-pad} width={n + pad * 2} height={n + pad * 2} fill="#ffffff" />
      <path d={d} fill="#0e1830" />
    </svg>
  );
}
