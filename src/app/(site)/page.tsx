import Link from "next/link";
import { home } from "@/content/pages";
import { faqs } from "@/content/faq";
import { pageMeta } from "@/lib/metadata";
import { faqLd, organizationLd, plansLd, websiteLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceGrid } from "@/components/sections/service-cards";
import { PlanCards } from "@/components/sections/plan-cards";
import { IndustryGrid } from "@/components/sections/industry-cards";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FaqList } from "@/components/sections/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { ClientIntro } from "@/components/sections/client-intro";
import { ArrowRight } from "@/components/ui/icons";

export const metadata = pageMeta({
  title: home.meta.title,
  description: home.meta.description,
  path: "/",
});

export default function HomePage() {
  const p = home.problem;
  return (
    <>
      <JsonLd data={[organizationLd(), websiteLd(), plansLd(), faqLd(faqs)]} />
      <Hero />
      <ProofStrip />

      {/* The problem */}
      <section aria-labelledby="problem-title" className="section">
        <div className="container-x">
          <SectionHeader eyebrow={p.eyebrow} title={p.title} intro={p.intro} id="problem-title" align="split" />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3" data-reveal-stagger>
            {p.points.map((pt, i) => (
              <li key={pt.title} className="bg-bg p-6 sm:p-8">
                <span className="num font-display text-step-2 text-accent-text">0{i + 1}</span>
                <h3 className="heading mt-6 text-step-3">{pt.title}</h3>
                <p className="mt-3 text-step--1 text-muted">{pt.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader
            eyebrow={home.services.eyebrow}
            title={home.services.title}
            intro={home.services.intro}
            id="services-title"
            align="split"
            action={
              <Link href="/services" className="link-arrow">
                All services <ArrowRight />
              </Link>
            }
          />
          <div className="mt-14">
            <ServiceGrid />
          </div>
        </div>
      </section>

      {/* Plans */}
      <section aria-labelledby="plans-title" className="section" id="plans">
        <div className="container-x">
          <ClientIntro />
          <SectionHeader
            eyebrow={home.plans.eyebrow}
            title={home.plans.title}
            intro={home.plans.intro}
            id="plans-title"
            align="split"
          />
          <div className="mt-16">
            <PlanCards compact />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/pricing#compare" className="btn btn-secondary">
              <span>Compare every feature</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section aria-labelledby="industries-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader eyebrow={home.industries.eyebrow} title={home.industries.title} id="industries-title" />
          <div className="mt-14">
            <IndustryGrid />
          </div>
        </div>
      </section>

      {/* Work */}
      <section aria-labelledby="work-title" className="section">
        <div className="container-x">
          <SectionHeader
            eyebrow={home.work.eyebrow}
            title={home.work.title}
            intro={home.work.intro}
            id="work-title"
            align="split"
          />
          <div className="mt-14">
            <WorkShowcase />
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader eyebrow={home.process.eyebrow} title={home.process.title} id="process-title" />
          <div className="mt-14">
            <ProcessSteps />
          </div>
          <Link href="/process" className="link-arrow mt-6 text-step--1">
            The full process: timeline, what we need, payments <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow={home.faq.eyebrow} title={home.faq.title} id="faq-title" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
