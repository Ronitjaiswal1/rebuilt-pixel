import { industriesPage } from "@/content/pages";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { IndustryGrid } from "@/components/sections/industry-cards";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = pageMeta({ ...industriesPage.meta, path: "/industries" });

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow={industriesPage.eyebrow} title={industriesPage.title} intro={industriesPage.intro} />
      <section aria-label="Industries" className="pb-[var(--section-y)]">
        <div className="container-x">
          <IndustryGrid showNeeds />
          <p className="mt-10 max-w-2xl text-step--1 text-muted">
            Don&apos;t see your business? Most of what we build works for any business that gets customers through
            enquiries. Message us and we&apos;ll tell you honestly whether we&apos;re a good fit.
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
