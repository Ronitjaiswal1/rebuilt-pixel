import type { ReactNode } from "react";
import { pageMeta } from "@/lib/metadata";
import { plans } from "@/content/plans";
import { faqs } from "@/content/faq";
import { SplitHeadline } from "@/components/ui/split-headline";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PlanCard } from "@/components/sections/plan-cards";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { FaqList } from "@/components/sections/faq-list";
import { ServiceGrid } from "@/components/sections/service-cards";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TestimonialPlaceholder } from "@/components/sections/testimonial-placeholder";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ArrowRight } from "@/components/ui/icons";
import { ToastDemo, MotionDemo } from "@/components/styleguide/demos";

export const metadata = pageMeta({
  title: "Style guide",
  description: "Rebuilt Pixel design system: colour, type, components and motion.",
  path: "/styleguide",
  noindex: true,
});

const colours = [
  { token: "--c-bg", name: "Paper / Ink-navy", use: "Page background" },
  { token: "--c-surface", name: "Surface", use: "Cards, raised" },
  { token: "--c-sunken", name: "Sunken", use: "Alternate bands" },
  { token: "--c-ink", name: "Ink", use: "Text, primary button" },
  { token: "--c-muted", name: "Muted", use: "Secondary text" },
  { token: "--c-line", name: "Line", use: "Hairlines (decorative)" },
  { token: "--c-line-strong", name: "Line strong", use: "Form borders (3:1)" },
  { token: "--c-accent", name: "Marigold", use: "Fills, highlights" },
  { token: "--c-accent-text", name: "Marigold text", use: "Accent text (AA)" },
  { token: "--c-accent-2", name: "Slate", use: "Links, focus" },
  { token: "--c-success", name: "Success", use: "Semantic" },
  { token: "--c-error", name: "Error", use: "Semantic" },
  { token: "--c-whatsapp", name: "WhatsApp", use: "WhatsApp actions only" },
];

const typeScale = [
  { cls: "text-step-8", label: "step-8 · Pitch numbers", sample: "₹13,999" },
  { cls: "text-step-7", label: "step-7 · Hero", sample: "Built in days." },
  { cls: "text-step-6", label: "step-6 · Page title", sample: "Fixed prices you can plan around." },
  { cls: "text-step-5", label: "step-5 · Section title", sample: "Three plans. No surprises." },
  { cls: "text-step-4", label: "step-4", sample: "Website redesign" },
  { cls: "text-step-3", label: "step-3 · Card title", sample: "Growth" },
  { cls: "text-step-2", label: "step-2", sample: "Galleries by shoot type" },
];

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-16">
      <h2 id={id} className="eyebrow">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-x pb-[var(--section-y)] pt-[calc(var(--header-h)+3rem)]">
      <p className="eyebrow">Design system · internal</p>
      <SplitHeadline text="Rebuilt Pixel style guide" className="display mt-4 text-step-6" />
      <p className="lede mt-4">
        Tokens live in <code>src/styles/tokens</code>. Toggle the theme in the header to check dark mode. Full notes in{" "}
        <code>docs/DESIGN_SYSTEM.md</code>.
      </p>

      <Block id="sg-colour" title="Colour">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colours.map((c) => (
            <li key={c.token} className="card overflow-hidden">
              <div className="h-20 border-b border-line" style={{ background: `var(${c.token})` }} />
              <div className="p-4">
                <p className="font-semibold">{c.name}</p>
                <p className="font-mono text-step--2 text-muted">{c.token}</p>
                <p className="mt-1 text-step--1 text-muted">{c.use}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="band-ink mt-6 rounded-lg p-6">
          <p className="font-semibold">.band-ink</p>
          <p className="text-muted">Dark band inside a light page: final CTA, featured plan, footer.</p>
        </div>
      </Block>

      <Block id="sg-type" title="Typography">
        <p className="text-step--1 text-muted">Display: Fraunces (variable, optical size). Body: Instrument Sans. ₹ via a 2 KB Noto Sans subset.</p>
        <ul className="mt-6 space-y-6">
          {typeScale.map((t) => (
            <li key={t.cls} className="grid gap-2 md:grid-cols-[14rem_1fr] md:items-baseline">
              <span className="font-mono text-step--2 text-muted">{t.label}</span>
              <span className={`display num ${t.cls}`}>{t.sample}</span>
            </li>
          ))}
          <li className="grid gap-2 md:grid-cols-[14rem_1fr]">
            <span className="font-mono text-step--2 text-muted">step-1 · Lede</span>
            <span className="lede">Fast, beautiful sites for small businesses. Three fixed prices, delivered in days.</span>
          </li>
          <li className="grid gap-2 md:grid-cols-[14rem_1fr]">
            <span className="font-mono text-step--2 text-muted">step-0 · Body (65ch)</span>
            <p className="measure">
              Body copy is set at 16–18px with a 1.6 line height and a 65 character measure. Prices use tabular numerals
              and Indian grouping: ₹7,999 · ₹13,999 · ₹1,20,000.
            </p>
          </li>
          <li className="grid gap-2 md:grid-cols-[14rem_1fr]">
            <span className="font-mono text-step--2 text-muted">Eyebrow</span>
            <span className="eyebrow">What we do</span>
          </li>
        </ul>
      </Block>

      <Block id="sg-buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">
            <span>Primary</span>
            <ArrowRight />
          </button>
          <button type="button" className="btn btn-secondary">
            <span>Secondary</span>
          </button>
          <button type="button" className="btn btn-accent">
            <span>Accent</span>
          </button>
          <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
          <WhatsAppButton size="sm" variant="secondary">
            Small secondary
          </WhatsAppButton>
          <a href="#sg-buttons" className="link-arrow">
            Text link <ArrowRight />
          </a>
        </div>
        <p className="mt-4 text-step--1 text-muted">All controls are at least 44px tall. Hover: marigold fill rises from below.</p>
      </Block>

      <Block id="sg-cards" title="Pricing cards">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} compact />
          ))}
        </div>
      </Block>

      <Block id="sg-table" title="Comparison table">
        <ComparisonTable />
      </Block>

      <Block id="sg-services" title="Service cards">
        <ServiceGrid />
      </Block>

      <Block id="sg-process" title="Process steps">
        <ProcessSteps />
      </Block>

      <Block id="sg-faq" title="FAQ accordion">
        <FaqList items={faqs.slice(0, 3)} name="sg-faq" />
      </Block>

      <Block id="sg-form" title="Enquiry form and toast">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card p-6">
            <EnquiryForm idPrefix="sg" />
          </div>
          <div className="space-y-6">
            <ToastDemo />
            <TestimonialPlaceholder />
          </div>
        </div>
      </Block>

      <Block id="sg-motion" title="Motion">
        <MotionDemo />
      </Block>
    </div>
  );
}
