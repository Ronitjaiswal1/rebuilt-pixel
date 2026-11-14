import { pricingPage } from "@/content/pages";
import { domainHostingExplainer } from "@/content/plans";
import { faqs } from "@/content/faq";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbLd, faqLd, plansLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { PlanCards } from "@/components/sections/plan-cards";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { FaqList } from "@/components/sections/faq-list";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ClientIntro } from "@/components/sections/client-intro";
import { FinalCta } from "@/components/sections/final-cta";
import { PlanSummaryDownload } from "@/components/pitch/plan-summary-download";

export const metadata = pageMeta({ ...pricingPage.meta, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[plansLd(), faqLd(faqs), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]}
      />
      <PageHero eyebrow={pricingPage.eyebrow} title={pricingPage.title} intro={pricingPage.intro} />

      <section aria-labelledby="plans-heading" className="pb-[var(--section-y)]">
        <div className="container-x">
          <h2 id="plans-heading" className="sr-only">
            Plans
          </h2>
          <ClientIntro />
          <PlanCards />
          <div className="mt-8">
            <PlanSummaryDownload variant="link" />
          </div>
        </div>
      </section>

      <section id="compare" aria-labelledby="compare-title" className="section scroll-mt-24 border-t border-line">
        <div className="container-x">
          <SectionHeader eyebrow="Compare" title={pricingPage.compareTitle} id="compare-title" />
          <div className="mt-12">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section aria-labelledby="domain-title" className="section bg-sunken">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Domain and hosting"
              title={pricingPage.domainTitle}
              intro="All prices exclude domain and hosting. Here's what that means, in plain words."
              id="domain-title"
            />
          </div>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-7" data-reveal-stagger>
            {domainHostingExplainer.map((d) => (
              <div key={d.q} className="bg-surface p-6">
                <dt className="heading text-step-2">{d.q}</dt>
                <dd className="mt-3 text-step--1 text-muted">{d.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="custom-title" className="section">
        <div className="container-x">
          <div className="band-ink grid gap-8 rounded-lg p-8 sm:p-12 lg:grid-cols-12 lg:items-center" data-reveal>
            <div className="lg:col-span-8">
              <p className="eyebrow">Custom projects</p>
              <h2 id="custom-title" className="display mt-4 text-step-5">
                {pricingPage.customTitle}
              </h2>
              <p className="lede mt-4">{pricingPage.customBody}</p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <WhatsAppButton size="lg" variant="accent" intent={{ type: "custom" }}>
                Get a custom quote
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pricing-faq-title" className="section bg-sunken">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Questions" title="About pricing and payments" id="pricing-faq-title" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} name="pricing-faq" />
          </div>
        </div>
      </section>

      <FinalCta defaultInterest="Growth plan (₹13,999)" />
    </>
  );
}
