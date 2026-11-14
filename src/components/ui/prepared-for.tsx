"use client";

import { useClientName } from "@/hooks/use-client-name";

/**
 * Eyebrow line that becomes "Prepared for [Name]" when ?client= is set.
 * Same height either way, so personalising never shifts the layout.
 */
export function PreparedFor({ fallback, className = "" }: { fallback: string; className?: string }) {
  const client = useClientName();
  return (
    <p className={`eyebrow ${className}`}>
      {client ? (
        <>
          <span className="text-muted">Prepared for </span>
          <span className="text-ink">{client}</span>
        </>
      ) : (
        fallback
      )}
    </p>
  );
}
