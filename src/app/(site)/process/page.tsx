import { processPage } from "@/content/pages";
import { paymentTerms, whatWeNeed } from "@/content/process";
import { plans } from "@/content/plans";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { SectionHeader } from "@/components/ui/section-header";
import { FinalCta } from "@/components/sections/final-cta";
import { Check } from "@/components/ui/icons";

export const metadata = pageMeta({ ...processPage.meta, path: "/process" });

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow={processPage.eyebrow} title={processPage.title} intro={processPage.intro} />
      <section aria-label="Steps" className="pb-[var(--section-y)]">
        <div className="container-x">
          <ProcessSteps />
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader
            eyebrow="Timeline"
            title="How long it takes, by plan."
            intro="Counted in days from when we have your content."
            id="timeline-title"
          />
          <ol className="mt-12 space-y-6" data-reveal-stagger>
            {plans.map((p) => (
              <li key={p.id} className="grid items-center gap-3 sm:grid-cols-[10rem_1fr]">
                <p className="font-display text-step-2">{p.name}</p>
                <div className="relative h-12 overflow-hidden rounded-pill bg-surface ring-1 ring-line">
                  <div
                    className={`flex h-full items-center justify-end rounded-pill pr-4 font-semibold ${p.featured ? "bg-accent text-on-accent" : "bg-ink text-bg"}`}
                    style={{ width: `${Math.max(28, (p.deliveryDays / 25) * 100)}%` }}
                  >
                    <span className="num">{p.deliveryDays} days</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="What we need and payments" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <h2 className="display text-step-4">What we need from you</h2>
            <ul className="mt-8 space-y-3">
              {whatWeNeed.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-accent-text" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <h2 className="display text-step-4">How payments work</h2>
            <ul className="mt-8 space-y-3">
              {paymentTerms.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-accent-text" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <h2 className="display mt-14 text-step-4">After launch</h2>
            <p className="mt-6 measure text-muted">
              Your support period starts on launch day: 1, 3 or 6 months depending on your plan. During it, we fix
              anything that breaks and make small edits you send on WhatsApp. After that, you can take a monthly care
              plan or ask for changes when you need them.
            </p>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
