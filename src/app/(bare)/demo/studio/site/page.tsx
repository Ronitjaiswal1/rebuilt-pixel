import Image from "next/image";
import Link from "next/link";
import { aboutImage, heroImage, heroImageAlt, packages, studio } from "@/content/demo-studio";
import { StudioGallery } from "@/components/demo/studio-gallery";
import { DemoEnquiryForm, DemoWhatsApp } from "@/components/demo/studio-interactions";
import { formatINR } from "@/lib/format";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Aangan Studio (concept design)",
  description: "A concept photography studio website designed and built by Rebuilt Pixel. Fictional studio.",
  path: "/demo/studio/site",
  noindex: true,
});

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#packages", label: "Packages" },
  { href: "#about", label: "About" },
  { href: "#enquire", label: "Enquire" },
];

export default function StudioSite() {
  return (
    <>
      {/* Concept label: always visible, never removable. */}
      <div className="bg-[var(--s-ink)] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[var(--s-paper)]">
        <span className="mr-2 rounded-sm bg-[#f2a516] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0e1830]">
          Concept design
        </span>
        Fictional studio by{" "}
        <Link href="/" target="_top" className="underline underline-offset-2">
          Rebuilt Pixel
        </Link>
      </div>

      <header className="sticky top-0 z-30 border-b border-[var(--s-line)] bg-[var(--s-bg)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="studio-display text-2xl">
            Aangan <span className="italic text-[var(--s-maroon)]">Studio</span>
          </a>
          <nav aria-label="Studio" className="hidden md:block">
            <ul className="flex gap-8 text-sm font-semibold">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center hover:text-[var(--s-maroon)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#enquire" className="studio-btn studio-btn-solid hidden min-h-11 px-4 text-sm sm:inline-flex">
              Check your date
            </a>
            <DemoWhatsApp variant="icon" message="Hi Aangan Studio, I'd like to check your availability." />
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            preload
            sizes="100vw"
            quality={75}
            placeholder="blur"
            className="-z-10 object-cover object-[50%_15%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a0c0b]/85 via-[#1a0c0b]/25 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 text-[#fbf8f3] sm:px-6 sm:pb-16">
            <p className="studio-kicker fade-up">{studio.kicker}</p>
            <h1 className="studio-display fade-up mt-4 max-w-[14ch] text-[clamp(3rem,8vw,6.5rem)]" style={{ ["--delay" as string]: "80ms" }}>
              {studio.heroLine}
            </h1>
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "180ms" }}>
              <a href="#enquire" className="studio-btn studio-btn-solid">
                Check your date
              </a>
              <a href="#packages" className="studio-btn studio-btn-ghost">
                View packages
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-8 md:grid-cols-12">
            <p className="studio-kicker text-[var(--s-gold-text)] md:col-span-3">The studio</p>
            <p className="studio-display text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.12] md:col-span-9">
              {studio.intro}
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section id="work" className="scroll-mt-20 bg-[var(--s-paper)] py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="studio-kicker text-[var(--s-gold-text)]">Selected work</p>
                <h2 className="studio-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">Stories we&apos;ve told</h2>
              </div>
              <p className="max-w-sm text-[var(--s-muted)]">Tap any photo to see it full screen. Swipe or use the arrow keys.</p>
            </div>
            <div className="mt-10">
              <StudioGallery />
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="studio-kicker text-[var(--s-gold-text)]">Packages</p>
            <h2 className="studio-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">Simple, clear pricing</h2>
            <p className="mt-4 max-w-xl text-[var(--s-muted)]">
              Sample prices for a fictional studio, to show how a packages page works. Travel outside the city is
              quoted separately.
            </p>
            <div className="mt-12 grid gap-px border border-[var(--s-line)] bg-[var(--s-line)] sm:grid-cols-2 lg:grid-cols-4">
              {packages.map((p) => (
                <article
                  key={p.id}
                  className={`flex flex-col p-6 ${p.popular ? "bg-[var(--s-maroon)] text-[var(--s-maroon-ink)]" : "bg-[var(--s-bg)]"}`}
                >
                  <p className="studio-kicker opacity-80">{p.popular ? "Most booked" : p.unit}</p>
                  <h3 className="studio-display mt-4 text-3xl sm:min-h-[2em]">{p.name}</h3>
                  <p className="num mt-4 text-3xl font-semibold tracking-tight">{formatINR(p.price)}</p>
                  <p className="text-sm opacity-80">{p.popular ? p.unit : " "}</p>
                  <p className="mt-4 text-sm opacity-90">{p.blurb}</p>
                  <ul className="mt-5 space-y-2 border-t border-current/20 pt-5 text-sm">
                    {p.includes.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden>·</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <DemoWhatsApp
                      message={`Hi Aangan Studio, I'm interested in the ${p.name} package (${formatINR(p.price)}).`}
                      label="Enquire"
                      variant={p.popular ? "ghost" : "solid"}
                      className="w-full"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 bg-[var(--s-ink)] text-[var(--s-paper)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={aboutImage}
                alt="Couple in red and gold wedding outfits standing by a river"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                quality={70}
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <div>
              <p className="studio-kicker text-[#d9b46c]">About us</p>
              <h2 className="studio-display mt-3 text-[clamp(2.3rem,5vw,4rem)]">Quiet, honest, and always on time.</h2>
              <p className="mt-6 text-[#e9dfd3]">
                A small team of photographers and filmmakers. We stay out of the way, notice the little things, and
                deliver your gallery when we say we will.
              </p>
              <p className="mt-4 text-[#e9dfd3]">
                Every couple gets a private online gallery to choose their album photos. Families get gentle, unhurried
                sessions at home or in our studio.
              </p>
            </div>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquire" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="studio-kicker text-[var(--s-gold-text)]">Enquire</p>
              <h2 className="studio-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)]">Is your date free?</h2>
              <p className="mt-4 text-[var(--s-muted)]">
                Tell us the date and city. We usually reply on WhatsApp the same day.
              </p>
              <div className="mt-8">
                <DemoWhatsApp message="Hi Aangan Studio, I'd like to check your availability." label="Ask on WhatsApp" variant="ghost" />
              </div>
            </div>
            <div className="md:col-span-7">
              <DemoEnquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--s-line)] px-4 py-10 text-center text-sm text-[var(--s-muted)] sm:px-6">
        <p className="studio-display text-2xl text-[var(--s-ink)]">Aangan Studio</p>
        <p className="mx-auto mt-3 max-w-xl">{studio.disclaimer}</p>
        <p className="mt-3">
          <Link href="/credits" target="_top" className="underline underline-offset-2">
            Photo credits
          </Link>
          {" · "}
          <Link href="/" target="_top" className="underline underline-offset-2">
            Made by Rebuilt Pixel
          </Link>
        </p>
      </footer>
    </>
  );
}
