import Image from "next/image";
import Link from "next/link";
import { workPage } from "@/content/pages";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/page-hero";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { FinalCta } from "@/components/sections/final-cta";
import { TestimonialPlaceholder } from "@/components/sections/testimonial-placeholder";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import phoneShot from "@/assets/screens/studio-phone.jpg";

export const metadata = pageMeta({ ...workPage.meta, path: "/work" });

const whatsInside = [
  "Full-bleed hero that loads fast on 4G",
  "Gallery with category filters and a swipeable full-screen viewer",
  "Packages with a WhatsApp button that names the package",
  "Booking enquiry form that asks for date, city and type of shoot",
  "Works on any phone; switch frames to see it on a laptop",
];

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={workPage.eyebrow} title={workPage.title} intro={workPage.intro} />
      <section aria-label="Concept projects" className="pb-[var(--section-y)]">
        <div className="container-x">
          <WorkShowcase />
        </div>
      </section>

      <section aria-labelledby="inside-title" className="section bg-sunken">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <p className="eyebrow">Inside the concept</p>
            <h2 id="inside-title" className="display mt-4 text-step-5">
              Built like a real client site, because it is one.
            </h2>
            <ul className="mt-8 space-y-3">
              {whatsInside.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-accent-text" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/demo/studio" className="btn btn-primary">
                <span>Open the demo</span>
                <ArrowUpRight />
              </Link>
              <Link href="/for/photographers" className="btn btn-secondary">
                <span>Websites for studios</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal>
            <div className="mx-auto max-w-[300px] rounded-[44px] bg-[#0b0f18] p-3 shadow-lg">
              <div className="relative overflow-hidden rounded-[34px]">
                <Image
                  src={phoneShot}
                  alt="The Aangan Studio concept home page on a phone"
                  sizes="300px"
                  quality={75}
                  placeholder="blur"
                  className="h-auto w-full"
                />
              </div>
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
