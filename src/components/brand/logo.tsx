/**
 * PLACEHOLDER brand mark — no logo was supplied in /assets/brand.
 * Three ink pixels and one marigold pixel nudged out of the grid: a pixel being
 * rebuilt. Replace with the real logo when available (see docs/TODO.md).
 */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden
      focusable={false}
      className={className}
    >
      <rect x="3" y="3" width="12" height="12" rx="2" fill="currentColor" />
      <rect x="3" y="17" width="12" height="12" rx="2" fill="currentColor" />
      <rect x="17" y="17" width="12" height="12" rx="2" fill="currentColor" />
      <rect x="19" y="1" width="12" height="12" rx="2" fill="var(--c-accent)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-[1.28rem] font-semibold leading-none tracking-[-0.03em]">
        Rebuilt Pixel
      </span>
    </span>
  );
}
