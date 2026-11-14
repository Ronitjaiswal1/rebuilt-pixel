import type { Faq } from "@/content/faq";
import { Plus } from "@/components/ui/icons";

/**
 * FAQ accordion built on <details>/<summary>: keyboard accessible, works
 * without JS, and every answer stays in the HTML for search engines.
 */
export function FaqList({ items, name = "faq" }: { items: readonly Faq[]; name?: string }) {
  return (
    <div className="border-t border-line" data-reveal-stagger>
      {items.map((f) => (
        <details key={f.q} name={name} className="rp-faq group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-step-1 font-semibold [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-on-accent group-open:border-accent"
            >
              <Plus />
            </span>
          </summary>
          <div className="rp-faq-body pb-6 pr-14">
            <p className="measure text-step-0 text-muted">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
