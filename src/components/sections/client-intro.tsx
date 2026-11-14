"use client";

import { useClientName } from "@/hooks/use-client-name";

/** Pricing intro line shown only when a prospect's name is set (?client=). */
export function ClientIntro() {
  const client = useClientName();
  if (!client) return null;
  return (
    <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-step--1">
      <span aria-hidden className="inline-block size-2 rounded-full bg-accent" />
      <span>
        <span className="text-muted">Prepared for </span>
        <strong className="font-semibold">{client}</strong>
      </span>
    </p>
  );
}
