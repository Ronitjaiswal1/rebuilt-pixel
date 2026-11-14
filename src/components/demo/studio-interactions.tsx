"use client";

import { useState, type FormEvent } from "react";
import { eventTypes, studio } from "@/content/demo-studio";
import { toast } from "@/components/ui/toast";
import { WhatsAppGlyph } from "@/components/ui/icons";

/**
 * In the concept, WhatsApp buttons don't message anyone (the studio is
 * fictional). They show the prefilled message a real client's site would send.
 */
export function DemoWhatsApp({
  message,
  label = "Enquire on WhatsApp",
  variant = "solid",
  className = "",
}: {
  message: string;
  label?: string;
  variant?: "solid" | "ghost" | "icon";
  className?: string;
}) {
  const show = () =>
    toast(`Concept demo: on your site this opens WhatsApp with "${message}" ready to send.`, "info");
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={show}
        aria-label="WhatsApp (demo)"
        className={`grid size-11 place-items-center rounded-full bg-[#1f7a3d] text-white ${className}`}
      >
        <WhatsAppGlyph size={22} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={show}
      className={`studio-btn ${variant === "solid" ? "studio-btn-solid" : "studio-btn-ghost"} ${className}`}
    >
      <WhatsAppGlyph size={18} />
      {label}
    </button>
  );
}

/** Booking enquiry: date, city and shoot type. Never submits anywhere. */
export function DemoEnquiryForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setSent(true);
  };
  if (sent) {
    return (
      <div role="status" className="border border-[var(--s-line)] bg-[var(--s-paper)] p-8">
        <p className="studio-kicker text-[var(--s-gold-text)]">Concept demo</p>
        <p className="studio-display mt-3 text-4xl">Thank you. We&apos;ll check the date.</p>
        <p className="mt-4 text-[var(--s-muted)]">
          On a real studio site, this enquiry lands in the owner&apos;s WhatsApp and email with the date, city and
          shoot type, so they can reply with availability straight away. Nothing was sent.
        </p>
        <button type="button" className="studio-btn studio-btn-ghost mt-6" onClick={() => setSent(false)}>
          Try again
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="d-name" className="field-label">
          Your name
        </label>
        <input id="d-name" name="name" required autoComplete="name" className="field" />
      </div>
      <div>
        <label htmlFor="d-phone" className="field-label">
          WhatsApp number
        </label>
        <input id="d-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className="field" />
      </div>
      <div>
        <label htmlFor="d-date" className="field-label">
          Event date
        </label>
        <input id="d-date" name="date" type="date" required className="field" />
      </div>
      <div>
        <label htmlFor="d-city" className="field-label">
          City
        </label>
        <input id="d-city" name="city" required autoComplete="address-level2" className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="d-type" className="field-label">
          Type of shoot
        </label>
        <select id="d-type" name="type" required className="field" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {eventTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="d-msg" className="field-label">
          Tell us about your day <span className="font-normal opacity-70">(optional)</span>
        </label>
        <textarea id="d-msg" name="message" rows={3} className="field" />
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="studio-btn studio-btn-solid">
          Check availability
        </button>
        <p className="text-sm text-[var(--s-muted)]">Demo form. Nothing is sent. {studio.name} is fictional.</p>
      </div>
    </form>
  );
}
