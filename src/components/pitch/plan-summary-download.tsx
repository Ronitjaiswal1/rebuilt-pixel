"use client";

import { useState } from "react";
import { useClientName } from "@/hooks/use-client-name";
import { Download } from "@/components/ui/icons";
import { toast } from "@/components/ui/toast";

/** "Download as PDF": a one-page plan summary, personalised when ?client= is set. */
export function PlanSummaryDownload({
  variant = "button",
  className = "",
}: {
  variant?: "button" | "link" | "ghost";
  className?: string;
}) {
  const client = useClientName();
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const { buildPlanPdf } = await import("@/lib/plan-pdf");
      const blob = await buildPlanPdf({ client, siteUrl: window.location.origin });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = client ? `-${client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}` : "";
      a.href = url;
      a.download = `rebuilt-pixel-plans${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      toast("Plan summary downloaded.", "success");
    } catch {
      toast("Couldn't create the PDF. Please try again.", "error");
    } finally {
      setBusy(false);
    }
  }

  const label = busy ? "Preparing PDF…" : client ? `Download plans PDF for ${client}` : "Download plans as PDF";
  const cls =
    variant === "link" ? "link-arrow text-step--1" : variant === "ghost" ? "btn btn-secondary btn-sm" : "btn btn-primary";
  return (
    <button type="button" onClick={download} disabled={busy} aria-busy={busy} className={`${cls} ${className}`}>
      <Download />
      <span>{label}</span>
    </button>
  );
}
