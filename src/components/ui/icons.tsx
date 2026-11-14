import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const ArrowRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const Check = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Minus = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M7 12h10" />
  </svg>
);

export const Plus = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = ({ size = 20, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = ({ size = 22, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const Sun = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Moon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);

export const Download = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);

export const Expand = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);

export const Phone = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);

export const Laptop = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
    <path d="M2 19.5h20" />
  </svg>
);

export const Mail = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const MapPin = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const Clock = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const QrIcon = ({ size = 18, ...p }: IconProps) => (
  <svg {...base(size, p)}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" />
  </svg>
);

/** Service icons */
const serviceIcons = {
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.3-4.5L4 8.5" />
      <path d="M4 4v4.5h4.5M4 13a8 8 0 0 0 14.3 4.5l1.7-2" />
      <path d="M20 20v-4.5h-4.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </>
  ),
  puzzle: (
    <>
      <path d="M9 4h3.5v2a1.75 1.75 0 1 0 3.5 0V4H19a1 1 0 0 1 1 1v3.5h-2a1.75 1.75 0 1 0 0 3.5h2V19a1 1 0 0 1-1 1h-3.5v-2a1.75 1.75 0 1 0-3.5 0v2H5a1 1 0 0 1-1-1v-3.5h2A1.75 1.75 0 1 0 6 12H4V5a1 1 0 0 1 1-1h4Z" />
    </>
  ),
} as const;

export type ServiceIconName = keyof typeof serviceIcons;

export const ServiceIcon = ({ name, size = 28, ...p }: IconProps & { name: ServiceIconName }) => (
  <svg {...base(size, { strokeWidth: 1.4, ...p })}>{serviceIcons[name]}</svg>
);

/** WhatsApp glyph (brand mark, used only to label WhatsApp actions). */
export const WhatsAppGlyph = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable={false} {...p}>
    <path
      fill="currentColor"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
    />
  </svg>
);
