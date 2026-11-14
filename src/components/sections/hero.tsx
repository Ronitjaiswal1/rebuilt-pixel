import Link from "next/link";
import { home } from "@/content/pages";
import { site } from "@/content/site";
import { SplitHeadline } from "@/components/ui/split-headline";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PreparedFor } from "@/components/ui/prepared-for";
import { ArrowRight } from "@/components/ui/icons";
import { DeviceMockup } from "./device-mockup";

export function Hero() {
  const h = home.hero;
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pb-24 lg:pt-[calc(var(--header-h)+4rem)]">
      {/* Background grid device */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 bg-[linear-gradient(var(--c-line)_1px,transparent_1px),linear-gradient(90deg,var(--c-line)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]"
      />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="flex min-h-[calc(100svh-var(--header-h)-3.5rem)] flex-col justify-center lg:col-span-7 lg:block lg:min-h-0">
          <PreparedFor fallback={h.eyebrow} className="rise" />
          <SplitHeadline
            text={h.headline}
            className="display mt-5 text-[clamp(2.75rem,1.5rem+4.2vw,5.25rem)]"
            accentWords={["WhatsApp"]}
          />
          <p className="lede rise mt-6" style={{ ["--delay" as string]: "420ms" }}>
            {h.promise}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ ["--delay" as string]: "520ms" }}>
            <WhatsAppButton size="lg" magnetic>
              {h.primaryCta}
            </WhatsAppButton>
            <Link href="/pricing" className="btn btn-secondary btn-lg" data-magnetic>
              <span>{h.secondaryCta}</span>
              <ArrowRight />
            </Link>
          </div>
          <ul
            className="rise mt-8 flex flex-wrap gap-x-5 gap-y-2 text-step--1 text-muted"
            style={{ ["--delay" as string]: "620ms" }}
            aria-label="At a glance"
          >
            {site.tagline
              .split(".")
              .map((s) => s.trim())
              .filter(Boolean)
              .map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span aria-hidden className="inline-block size-1.5 rotate-45 bg-accent" />
                  {s}
                </li>
              ))}
            <li className="flex items-center gap-2">
              <span aria-hidden className="inline-block size-1.5 rotate-45 bg-accent" />
              {h.note}
            </li>
          </ul>
        </div>
        <div className="rise lg:col-span-5" style={{ ["--delay" as string]: "200ms" }}>
          <div data-parallax="0.06">
            <DeviceMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
