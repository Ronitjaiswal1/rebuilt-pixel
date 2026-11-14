import Image from "next/image";
import Link from "next/link";
import { photographers as c } from "@/content/photographers";
import { planById, type PlanId } from "@/content/plans";
import { formatINR } from "@/lib/format";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbLd, faqLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { SplitHeadline } from "@/components/ui/split-headline";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { FaqList } from "@/components/sections/faq-list";
import { FinalCta } from "@/components/sections/final-cta";
import { PreparedFor } from "@/components/ui/prepared-for";
import { ArrowUpRight } from "@/components/ui/icons";
import brideRed from "@/assets/photos/bride-red.jpg";
import hennaHands from "@/assets/photos/henna-hands.jpg";
import maternitySunset from "@/assets/photos/maternity-sunset.jpg";
import galleryPhone from "@/assets/screens/studio-gallery-phone.jpg";
import packagesShot from "@/assets/screens/studio-packages.jpg";

export const metadata = pageMeta({ ...c.meta, path: "/for/photographers" });

export default function PhotographersPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(c.faq),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: "Photo and video studios", path: "/for/photographers" },
          ]),
        ]}
      />

      {/* Hero: editorial photo collage */}
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24 md:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <PreparedFor fallback={c.eyebrow} className="rise" />
            <SplitHeadline text={c.title} className="display mt-5 text-step-7" accentWords={["beautiful"]} />
            <p className="lede rise mt-6" style={{ ["--delay" as string]: "420ms" }}>
              {c.intro}
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "520ms" }}>
              <WhatsAppButton size="lg" intent={{ type: "photographers" }} magnetic>
                Chat on WhatsApp
              </WhatsAppButton>
              <Link href="/demo/studio" className="btn btn-secondary btn-lg">
                <span>Try the studio demo</span>
                <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="relative lg:col-span-6" aria-hidden="false">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 [height:clamp(22rem,58vw,36rem)]">
              <div className="relative col-span-4 row-span-6 overflow-hidden rounded-lg rise" style={{ ["--delay" as string]: "200ms" }}>
                <div className="absolute inset-0" data-parallax="0.05">
                  <Image
                    src={brideRed}
                    alt="Bride in a red lehenga with gold jewellery"
                    fill
                    preload
                    sizes="(min-width: 1024px) 400px, 66vw"
                    quality={70}
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg rise" style={{ ["--delay" as string]: "300ms" }}>
                <Image src={hennaHands} alt="Bridal henna and bangles" fill sizes="(min-width: 1024px) 200px, 33vw" quality={70} placeholder="blur" className="object-cover" />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-lg rise" style={{ ["--delay" as string]: "400ms" }}>
                <Image src={maternitySunset} alt="Maternity portrait at sunset" fill sizes="(min-width: 1024px) 200px, 33vw" quality={70} placeholder="blur" className="object-cover" />
              </div>
            </div>
            <p className="mt-3 text-step--2 text-muted">Photos: Unsplash, used in our concept designs. See credits.</p>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section aria-labelledby="pains-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader eyebrow="Sound familiar?" title="Great photos don't book shoots on their own." id="pains-title" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3" data-reveal-stagger>
            {c.pains.map((p) => (
              <li key={p.title} className="bg-surface p-6 sm:p-8">
                <h3 className="heading text-step-3">{p.title}</h3>
                <p className="mt-3 text-step--1 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features with concept screenshots */}
      <section aria-labelledby="features-title" className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="What we build for studios"
                title="Everything a couple checks before they message you."
                id="features-title"
              />
              <div className="mt-10 grid grid-cols-2 gap-4" data-reveal>
                <div className="overflow-hidden rounded-lg border border-line">
                  <Image src={galleryPhone} alt="Concept gallery with filters on a phone" sizes="(min-width:1024px) 220px, 45vw" quality={70} placeholder="blur" className="h-auto w-full" />
                </div>
                <div className="self-end overflow-hidden rounded-lg border border-line">
                  <Image src={packagesShot} alt="Concept packages page with four packages and prices" sizes="(min-width:1024px) 220px, 45vw" quality={70} placeholder="blur" className="h-auto w-full" />
                </div>
              </div>
              <p className="mt-3 text-step--2 text-muted">
                <span className="tag-concept mr-2 align-middle">Concept design</span>
                From our Aangan Studio demo.
              </p>
            </div>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-7" data-reveal-stagger>
            {c.features.map((f, i) => (
              <li key={f.title} className="bg-surface p-6 sm:p-8">
                <span className="num text-step--1 text-accent-text">0{i + 1}</span>
                <h3 className="heading mt-4 text-step-2">{f.title}</h3>
                <p className="mt-2 text-step--1 text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plan fit */}
      <section aria-labelledby="fit-title" className="section bg-sunken">
        <div className="container-x">
          <SectionHeader
            eyebrow="Which plan fits your studio"
            title="Start simple. Add bookings when you're ready."
            id="fit-title"
            intro="Same fixed prices as every plan. Domain and hosting extra, at actuals."
          />
          <ul className="mt-14 grid gap-5 lg:grid-cols-3" data-reveal-stagger>
            {c.fit.map((f) => {
              const plan = planById(f.plan as PlanId);
              return (
                <li key={f.plan} className={`flex flex-col rounded-lg p-6 sm:p-8 ${plan.featured ? "band-ink" : "border border-line bg-surface"}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="heading text-step-3">{plan.name}</h3>
                    <p className="num font-display text-step-4">{formatINR(plan.price)}</p>
                  </div>
                  <p className="mt-4 flex-1 text-step-0">{f.line}</p>
                  <p className="mt-4 text-step--1 text-muted">
                    {plan.deliveryDays}-day delivery · {plan.supportShort} support
                  </p>
                  <WhatsAppButton
                    intent={{ type: "plan", plan: plan.id }}
                    variant={plan.featured ? "accent" : "secondary"}
                    size="sm"
                    className="mt-6 self-start"
                  >
                    {`Ask about ${plan.name}`}
                  </WhatsAppButton>
                </li>
              );
            })}
          </ul>
          <Link href="/pricing#compare" className="link-arrow mt-8 text-step--1">
            Compare every feature <ArrowUpRight />
          </Link>
        </div>
      </section>

      <section aria-labelledby="ph-faq-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Studio questions" title="Asked by photographers" id="ph-faq-title" />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={c.faq} name="ph-faq" />
          </div>
        </div>
      </section>

      <FinalCta
        title="Let's build the website your work deserves."
        body="Send us your Instagram handle on WhatsApp. We'll suggest a plan and show you how your galleries could look."
        defaultInterest="Growth plan (₹13,999)"
        intent={{ type: "photographers" }}
      />
    </>
  );
}
