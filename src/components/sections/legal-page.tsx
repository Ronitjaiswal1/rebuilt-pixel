import type { ReactNode } from "react";

/** Shell for Privacy and Terms, with a visible draft notice until legal review. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="pb-[var(--section-y)] pt-[calc(var(--header-h)+3.5rem)]">
      <div className="container-x">
        <p className="eyebrow">Legal</p>
        <h1 className="display mt-4 text-step-6">{title}</h1>
        <p className="mt-4 text-step--1 text-muted">Last updated: {updated}</p>
        <div
          role="note"
          className="mt-8 max-w-[65ch] rounded-md border border-dashed border-line-strong bg-surface p-4 text-step--1"
        >
          <strong>Draft for legal review.</strong> This page is written in plain language and has not yet been checked by
          a lawyer. It will be reviewed before launch.
        </div>
        <div className="prose-rp mt-12">{children}</div>
      </div>
    </article>
  );
}
