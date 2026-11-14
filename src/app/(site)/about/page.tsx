import { aboutPage } from "@/content/pages";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { TestimonialPlaceholder } from "@/components/sections/testimonial-placeholder";

export const metadata = pageMeta({ ...aboutPage.meta, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} intro={aboutPage.intro} />

      <section aria-labelledby="beliefs-title" className="pb-[var(--section-y)]">
        <div className="container-x">
          <h2 id="beliefs-title" className="sr-only">
            What we believe
          </h2>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2" data-reveal-stagger>
            {aboutPage.beliefs.map((b, i) => (
              <li key={b.title} className="bg-surface p-6 sm:p-10">
                <span className="num font-display text-step-2 text-accent-text">0{i + 1}</span>
                <h3 className="heading mt-6 text-step-3">{b.title}</h3>
                <p className="mt-3 measure text-muted">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="who-title" className="section bg-sunken">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2 id="who-title" className="display mt-4 text-step-5">
              {site.founder ? `Hi, I'm ${site.founder}.` : "One team, start to finish."}
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-7" data-reveal>
            {/* TODO: replace with the founder's own story and photo (docs/TODO.md). */}
            <p className="measure text-step-1">
              The person you chat with on WhatsApp is the person designing and building your site. No account
              managers, no hand-offs, no waiting for someone to pass on your message.
            </p>
            <p className="measure text-muted">{aboutPage.honesty}</p>
            <div className="rounded-md border border-dashed border-line-strong p-5 text-step--1 text-muted">
              Placeholder: founder photo and short story go here.
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Client feedback" className="section">
        <div className="container-x max-w-3xl">
          <TestimonialPlaceholder />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
