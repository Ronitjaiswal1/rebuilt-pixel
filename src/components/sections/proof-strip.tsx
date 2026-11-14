import { whatYouGet } from "@/content/site";

/**
 * "What you get" strip. Used instead of a proof strip because there are no
 * real reviews or client logos yet (see docs/TODO.md). A CSS marquee, paused
 * on hover and stopped under reduced motion; the list is readable either way.
 */
export function ProofStrip() {
  const items = [...whatYouGet, ...whatYouGet];
  return (
    <section aria-label="What every website includes" className="marquee-pause overflow-hidden border-y border-line bg-surface py-5">
      <ul className="sr-only">
        {whatYouGet.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div aria-hidden className="flex w-max animate-marquee">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-6 pr-6 font-display text-step-2 whitespace-nowrap">
            {t}
            <span className="inline-block size-2.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
