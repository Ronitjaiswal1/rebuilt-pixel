"use client";

import { usePathname } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { businessTypes, interests, parseEnquiry, type FieldErrors } from "@/lib/enquiry-schema";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Check } from "@/components/ui/icons";
import { toast } from "@/components/ui/toast";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Enquiry form. Labelled fields with stable ids, inline errors linked by
 * aria-describedby, a honeypot, and a WhatsApp fallback when sending fails
 * (including when the device is offline mid-pitch).
 */
export function EnquiryForm({
  defaultInterest = "",
  compact = false,
  idPrefix = "enquiry",
}: {
  defaultInterest?: string;
  compact?: boolean;
  idPrefix?: string;
}) {
  const pathname = usePathname();
  const uid = useId();
  const id = (f: string) => `${idPrefix}-${f}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const { errors: errs } = parseEnquiry(raw);
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      form.querySelector<HTMLElement>(`#${id(first)}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, page: pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? {});
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
      toast("Thanks! Your enquiry is in. We'll reply soon.", "success");
    } catch (err) {
      const offline = typeof navigator !== "undefined" && !navigator.onLine;
      const message = offline
        ? "You're offline right now. Send us a WhatsApp message instead and it'll go through when you're back online."
        : err instanceof Error
          ? err.message
          : "Something went wrong.";
      setServerError(message);
      setStatus("error");
      toast(message, "error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-line bg-surface p-8" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-success text-white">
          <Check size={24} />
        </span>
        <h3 className="heading mt-6 text-step-3">Thanks, we&apos;ve got it.</h3>
        <p className="mt-2 text-muted">
          We&apos;ll reply on WhatsApp or email soon. If it&apos;s urgent, message us directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WhatsAppButton size="sm">Chat on WhatsApp</WhatsAppButton>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus("idle")}>
            <span>Send another</span>
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (f: keyof FieldErrors, hint?: boolean) =>
    [errors[f] ? id(`${f}-error`) : "", hint ? id(`${f}-hint`) : ""].filter(Boolean).join(" ") || undefined;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5" aria-describedby={serverError ? `${uid}-server` : undefined}>
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={id("name")} className="field-label">
            Your name
          </label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            required
            className="field"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
          />
          {errors.name ? (
            <p id={id("name-error")} className="field-error">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={id("phone")} className="field-label">
            WhatsApp number
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="98765 43210"
            className="field num"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
          />
          {errors.phone ? (
            <p id={id("phone-error")} className="field-error">
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      {!compact ? (
        <div>
          <label htmlFor={id("email")} className="field-label">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
          />
          {errors.email ? (
            <p id={id("email-error")} className="field-error">
              {errors.email}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={id("business")} className="field-label">
            Type of business
          </label>
          <select id={id("business")} name="business" className="field" defaultValue="">
            <option value="">Choose one</option>
            {businessTypes.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={id("interest")} className="field-label">
            Interested in
          </label>
          <select id={id("interest")} name="interest" className="field" defaultValue={defaultInterest}>
            <option value="">Choose one</option>
            {interests.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="field-label">
          Tell us a little <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={compact ? 3 : 4}
          className="field"
          placeholder="What does your business do, and what do you need the website to do?"
          aria-describedby={id("message-hint")}
        />
        <p id={id("message-hint")} className="field-hint">
          A rough idea is enough. We&apos;ll ask the rest.
        </p>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("company_website")}>Company website</label>
        <input id={id("company_website")} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError ? (
        <div id={`${uid}-server`} role="alert" className="rounded-md border border-error/40 bg-error/5 p-4 text-step--1">
          <p className="font-semibold text-error">{serverError}</p>
          <div className="mt-3">
            <WhatsAppButton size="sm">Send on WhatsApp instead</WhatsAppButton>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"} aria-busy={status === "sending"}>
          <span>{status === "sending" ? "Sending…" : "Send enquiry"}</span>
        </button>
        <p className="text-step--1 text-muted">We&apos;ll never share your number.</p>
      </div>
    </form>
  );
}
