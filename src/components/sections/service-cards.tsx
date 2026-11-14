import Link from "next/link";
import { ArrowRight, ServiceIcon } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { services } from "@/content/services";

/** Compact grid for the Home page. The first service spans wider. */
export function ServiceGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
      {services.map((s, i) => (
        <li
          key={s.id}
          className={`group relative flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-sunken sm:p-7 ${
            i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
          } ${i === services.length - 1 ? "lg:col-span-1" : ""}`}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-12 place-items-center rounded-md bg-sunken text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
              <ServiceIcon name={s.icon} size={26} />
            </span>
            <span className="num text-step--2 text-muted">0{i + 1}</span>
          </div>
          <h3 className={`heading mt-6 ${i === 0 ? "text-step-4" : "text-step-2"}`}>{s.name}</h3>
          <p className="mt-3 text-step--1 text-muted">{i === 0 ? s.body : s.short}</p>
          {i === 0 ? (
            <p className="num mt-6 font-display text-step-2">{s.pricing}</p>
          ) : null}
          <Link
            href={`/services#${s.id}`}
            className="link-arrow mt-auto pt-6 text-step--1 after:absolute after:inset-0"
          >
            <span>
              Learn more<span className="sr-only"> about {s.name.toLowerCase()}</span>
            </span>
            <ArrowRight size={16} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Detailed list for the Services page. */
export function ServiceDetailList() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="grid scroll-mt-28 gap-6 py-12 md:grid-cols-12 md:gap-10 md:py-16"
          data-reveal
        >
          <div className="md:col-span-5">
            <p className="num text-step--1 text-muted">0{i + 1}</p>
            <h2 id={`${s.id}-title`} className="display mt-3 text-step-4">
              {s.name}
            </h2>
            <p className="mt-4 text-step-1 text-muted">{s.short}</p>
          </div>
          <div className="md:col-span-7 md:pt-8">
            <p className="measure text-step-0">{s.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.includes.map((x) => (
                <li key={x} className="chip">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="text-step--1">
                <span className="text-muted">Price: </span>
                <span className="font-semibold">{s.pricing}</span>
              </p>
              {s.cta.kind === "plans" ? (
                <Link href="/pricing" className="btn btn-primary btn-sm">
                  <span>{s.cta.label}</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <WhatsAppButton
                  size="sm"
                  variant="secondary"
                  intent={s.id === "custom" ? { type: "custom" } : { type: "service", service: s.name }}
                >
                  {s.cta.label}
                </WhatsAppButton>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
