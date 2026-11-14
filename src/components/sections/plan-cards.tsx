import Link from "next/link";
import { Check } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { domainHostingNote, planById, plans, type Plan } from "@/content/plans";
import { groupINR } from "@/lib/format";

function Price({ plan, large = false }: { plan: Plan; large?: boolean }) {
  return (
    <p className="flex items-start gap-1 leading-none">
      <span className="sr-only">₹{groupINR(plan.price)}</span>
      <span aria-hidden className="mt-[0.35em] font-display text-step-2 text-muted">
        ₹
      </span>
      <span aria-hidden className={`num font-display font-semibold tracking-[-0.03em] ${large ? "text-step-7" : "text-step-6"}`}>
        {groupINR(plan.price)}
      </span>
    </p>
  );
}

export function PlanCard({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  const featured = Boolean(plan.featured);
  const prev = plan.includesPrevious ? planById(plan.includesPrevious) : null;
  return (
    <article
      id={plan.id}
      aria-labelledby={`${plan.id}-name`}
      className={`relative flex scroll-mt-28 flex-col rounded-lg border p-6 sm:p-8 ${
        featured ? "band-ink border-transparent shadow-lg lg:-my-6 lg:py-14" : "border-line bg-surface"
      }`}
    >
      {featured ? (
        <p className="absolute -top-3.5 left-6 rounded-full bg-accent px-3 py-1 text-step--2 font-bold uppercase tracking-[0.1em] text-on-accent sm:left-8">
          Most chosen
        </p>
      ) : null}
      <header>
        <h3 id={`${plan.id}-name`} className="heading text-step-3">
          {plan.name}
        </h3>
        <p className="mt-1 text-step--1 text-muted">{plan.forWho}</p>
      </header>

      <div className="mt-8">
        <Price plan={plan} large={featured} />
        <p className="mt-3 text-step--1 text-muted">One-time · {plan.deliveryDays}-day delivery</p>
      </div>

      {!compact ? <p className="mt-6 text-step-0">{plan.summary}</p> : null}

      <ul className="mt-6 space-y-2.5 text-step--1">
        {prev ? (
          <li className="flex gap-3 font-semibold">
            <Check className="mt-0.5 shrink-0 text-accent-text" />
            <span>Everything in {prev.name}, plus:</span>
          </li>
        ) : null}
        {(compact ? plan.highlights.slice(0, 6) : plan.highlights).map((h) => (
          <li key={h} className="flex gap-3">
            <Check className="mt-0.5 shrink-0 text-accent-text" />
            <span>{h}</span>
          </li>
        ))}
        {compact && plan.highlights.length > 6 ? (
          <li className="pl-[30px] text-muted">and {plan.highlights.length - 6} more</li>
        ) : null}
      </ul>

      <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 text-step--2">
        <div>
          <dt className="text-muted">Delivery</dt>
          <dd className="num mt-0.5 font-semibold">{plan.deliveryDays} days</dd>
        </div>
        <div>
          <dt className="text-muted">Revisions</dt>
          <dd className="mt-0.5 font-semibold">{plan.revisionsShort}</dd>
        </div>
        <div>
          <dt className="text-muted">Support</dt>
          <dd className="mt-0.5 font-semibold">{plan.supportShort}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-1 flex-col justify-end gap-3">
        <WhatsAppButton
          intent={{ type: "plan", plan: plan.id }}
          variant={featured ? "accent" : "primary"}
          className="w-full"
        >
          {`Choose ${plan.name}`}
        </WhatsAppButton>
        {compact ? (
          <Link href={`/pricing#${plan.id}`} className="link-arrow justify-center text-step--1">
            See everything in {plan.name}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function PlanCards({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-5" data-reveal-stagger>
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} compact={compact} />
        ))}
      </div>
      <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 text-muted">
        <span className="inline-block size-2 rounded-full bg-accent" aria-hidden />
        <span>
          <strong className="font-semibold text-ink">{domainHostingNote.split(".")[0]}.</strong>
          {domainHostingNote.slice(domainHostingNote.indexOf(".") + 1)}
        </span>
      </p>
      <p className="mt-2 text-step--2 text-muted">* Unlimited revisions within the agreed scope.</p>
    </div>
  );
}
