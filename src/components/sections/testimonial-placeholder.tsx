/**
 * Clearly labelled placeholder for real client testimonials. Replace with real,
 * permissioned quotes only (see docs/TODO.md). Never fill with invented text.
 */
export function TestimonialPlaceholder() {
  return (
    <figure className="rounded-lg border border-dashed border-line-strong p-6 sm:p-8">
      <p className="eyebrow">Client words</p>
      <blockquote className="mt-4 font-display text-step-2 text-muted">
        Real feedback from our first clients will appear here, with their name and permission.
      </blockquote>
      <figcaption className="mt-4 text-step--1 text-muted">
        We don&apos;t publish made-up reviews. Ask us on WhatsApp and we&apos;ll put you in touch with past clients
        as soon as we have them.
      </figcaption>
    </figure>
  );
}
