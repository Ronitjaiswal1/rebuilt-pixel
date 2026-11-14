"use client";

import type { ReactNode } from "react";
import { useClientName } from "@/hooks/use-client-name";
import { waHref, waMessages } from "@/lib/whatsapp";
import type { PlanId } from "@/content/plans";
import { WhatsAppGlyph } from "./icons";

export type WaIntent =
  | { type: "general" }
  | { type: "plan"; plan: PlanId }
  | { type: "service"; service: string }
  | { type: "custom" }
  | { type: "page"; page: string }
  | { type: "photographers" }
  | { type: "demo" };

export function waMessageFor(intent: WaIntent, client?: string): string {
  switch (intent.type) {
    case "plan":
      return waMessages.plan(intent.plan, client);
    case "service":
      return waMessages.service(intent.service, client);
    case "custom":
      return waMessages.custom(client);
    case "page":
      return waMessages.page(intent.page, client);
    case "photographers":
      return waMessages.photographers(client);
    case "demo":
      return waMessages.demo(client);
    default:
      return waMessages.general(client);
  }
}

type Props = {
  intent?: WaIntent;
  children?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "whatsapp" | "primary" | "secondary" | "accent" | "link";
  icon?: boolean;
  magnetic?: boolean;
};

/**
 * WhatsApp click-to-chat. The prefilled message names the plan, service or
 * page, and the prospect's name in Pitch mode.
 */
export function WhatsAppButton({
  intent = { type: "general" },
  children = "Chat on WhatsApp",
  className = "",
  size = "md",
  variant = "whatsapp",
  icon = true,
  magnetic = false,
}: Props) {
  const client = useClientName();
  const href = waHref(waMessageFor(intent, client || undefined));
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const cls = variant === "link" ? `link-arrow ${className}` : `btn btn-${variant} ${sizeClass} ${className}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      data-magnetic={magnetic ? "" : undefined}
      data-cursor="link"
    >
      {icon ? <WhatsAppGlyph size={size === "lg" ? 22 : 20} /> : null}
      <span>{children}</span>
      <span className="sr-only"> (opens WhatsApp)</span>
    </a>
  );
}
