"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { pitch } from "@/content/pitch";
import { plans, domainHostingShort } from "@/content/plans";
import { steps } from "@/content/process";
import { groupINR } from "@/lib/format";
import { CLIENT_NAME_MAX, setClientName } from "@/lib/client-name";
import { useClientName } from "@/hooks/use-client-name";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Close, Expand } from "@/components/ui/icons";
import { LogoMark } from "@/components/brand/logo";
import { PlanSummaryDownload } from "./plan-summary-download";

type Props = {
  qrSite: ReactNode;
  qrWhatsApp: ReactNode;
  demoLaptop: StaticImageData;
  demoPhone: StaticImageData;
};

const SLIDES = ["Cover", "The problem", "What we build", "Demo", "Plans", "How we work", "Next step"] as const;

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen?.().catch(() => {});
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="eyebrow fade-up">{children}</p>;
}

function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`display fade-up mt-5 text-step-7 ${className}`} style={{ ["--delay" as string]: "60ms" }}>
      {children}
    </h2>
  );
}

export function PitchDeck({ qrSite, qrWhatsApp, demoLaptop, demoPhone }: Props) {
  const [index, setIndex] = useState(0);
  const client = useClientName();
  const total = SLIDES.length;
  const touch = useRef<{ x: number; y: number } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);

  // Restore position from the hash (#3) so a refresh keeps your place.
  useEffect(() => {
    const n = Number(window.location.hash.replace("#", ""));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from URL hash once on mount
    if (Number.isInteger(n) && n >= 1 && n <= total) setIndex(n - 1);
  }, [total]);

  const go = useCallback(
    (next: number) => {
      const i = Math.max(0, Math.min(total - 1, next));
      setIndex(i);
      history.replaceState(null, "", `${location.pathname}${location.search}#${i + 1}`);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(total - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
  };

  const slideContent = (i: number): ReactNode => {
    switch (i) {
      case 0:
        return (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Kicker>{pitch.cover.kicker}</Kicker>
              <Title>{pitch.cover.title}</Title>
            </div>
            <div className="fade-up lg:col-span-4" style={{ ["--delay" as string]: "160ms" }}>
              <label htmlFor="prepared-for" className="field-label text-muted">
                {pitch.cover.preparedFor}
              </label>
              <input
                id="prepared-for"
                className="field font-display text-step-2"
                placeholder={pitch.cover.placeholder}
                defaultValue={client}
                key={client ? "set" : "empty"}
                maxLength={CLIENT_NAME_MAX}
                autoComplete="off"
                onChange={(e) => setClientName(e.target.value)}
              />
              <p className="field-hint">Shown on every slide, the pricing page and the PDF.</p>
            </div>
          </div>
        );
      case 1:
        return (
          <>
            <Kicker>{pitch.problem.kicker}</Kicker>
            <Title className="max-w-[18ch]">{pitch.problem.title}</Title>
            <ul className="mt-14 grid gap-8 md:grid-cols-3">
              {pitch.problem.points.map((p, k) => (
                <li key={p.big} className="fade-up border-t border-line pt-6" style={{ ["--delay" as string]: `${160 + k * 90}ms` }}>
                  <p className="display text-step-6 text-accent-text">{p.big}</p>
                  <p className="mt-3 text-step-1 text-muted">{p.small}</p>
                </li>
              ))}
            </ul>
          </>
        );
      case 2:
        return (
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Kicker>{pitch.build.kicker}</Kicker>
              <Title className="text-step-6">{pitch.build.title}</Title>
            </div>
            <ul className="space-y-5 lg:col-span-5 lg:col-start-8 lg:pt-10">
              {pitch.build.points.map((p, k) => (
                <li key={p} className="fade-up flex gap-4 text-step-2" style={{ ["--delay" as string]: `${140 + k * 70}ms` }}>
                  <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                    <Check size={18} />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 3:
        return (
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Kicker>{pitch.demo.kicker}</Kicker>
              <Title className="text-step-6">{pitch.demo.title}</Title>
              <p className="lede fade-up mt-6" style={{ ["--delay" as string]: "140ms" }}>
                {pitch.demo.body}
              </p>
              {/* Plain <a>: a full navigation is served from the offline cache. */}
              <a href="/demo/studio" className="btn btn-accent btn-lg fade-up mt-10" style={{ ["--delay" as string]: "220ms" }}>
                <span>{pitch.demo.cta}</span>
                <ArrowUpRight />
              </a>
              <p className="mt-4 text-step--1 text-muted">
                <span className="tag-concept mr-2 align-middle">Concept design</span>Fictional studio
              </p>
            </div>
            <a href="/demo/studio" className="fade-up relative block lg:col-span-7" style={{ ["--delay" as string]: "160ms" }} aria-label="Open the live demo">
              <div className="rounded-t-[16px] bg-[#05080f] p-[2%] ring-1 ring-white/10">
                <Image src={demoLaptop} alt="Studio concept on a laptop" sizes="(min-width:1024px) 55vw, 90vw" quality={70} placeholder="blur" className="h-auto w-full rounded-[3px]" />
              </div>
              <div className="mx-[-5%] h-3 rounded-b-xl bg-gradient-to-b from-[#cfd2d8] to-[#9aa0aa]" />
              <div className="absolute -bottom-6 -left-4 w-[26%] rounded-[22px] bg-[#05080f] p-[1.2%] ring-1 ring-white/10">
                <Image src={demoPhone} alt="Studio concept on a phone" sizes="200px" quality={70} placeholder="blur" className="h-auto w-full rounded-[18px]" />
              </div>
            </a>
          </div>
        );
      case 4:
        return (
          <>
            <Kicker>{client ? `${pitch.plans.kicker} · Prepared for ${client}` : pitch.plans.kicker}</Kicker>
            <Title>{pitch.plans.title}</Title>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {plans.map((p, k) => (
                <li
                  key={p.id}
                  className={`fade-up rounded-lg p-6 sm:p-8 ${p.featured ? "bg-accent text-on-accent" : "border border-line bg-surface"}`}
                  style={{ ["--delay" as string]: `${140 + k * 90}ms` }}
                >
                  <p className="font-display text-step-3">{p.name}</p>
                  <p className={`mt-1 text-step--1 ${p.featured ? "" : "text-muted"}`}>{p.forWho}</p>
                  <p className="num mt-8 font-display text-step-7 leading-none tracking-[-0.03em]">
                    <span className="mr-1 align-top text-step-3">₹</span>
                    {groupINR(p.price)}
                  </p>
                  <p className={`mt-4 text-step-0 ${p.featured ? "" : "text-muted"}`}>
                    {p.pages} · {p.deliveryDays} days · {p.supportShort} support
                  </p>
                </li>
              ))}
            </ul>
            <p className="fade-up mt-8 text-step-0 text-muted" style={{ ["--delay" as string]: "420ms" }}>
              One-time price. {domainHostingShort}, invoice shown.
            </p>
          </>
        );
      case 5:
        return (
          <>
            <Kicker>{pitch.process.kicker}</Kicker>
            <Title>{pitch.process.title}</Title>
            <ol className="mt-14 grid gap-8 md:grid-cols-4">
              {steps.map((s, k) => (
                <li key={s.n} className="fade-up border-t-2 border-accent pt-5" style={{ ["--delay" as string]: `${140 + k * 90}ms` }}>
                  <p className="num text-step--1 text-muted">
                    {s.n} · {s.when}
                  </p>
                  <p className="display mt-3 text-step-4">{s.title}</p>
                  <p className="mt-3 text-step-0 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </>
        );
      default:
        return (
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Kicker>{pitch.close.kicker}</Kicker>
              <Title className="text-step-6">{pitch.close.title}</Title>
              <p className="lede fade-up mt-6" style={{ ["--delay" as string]: "120ms" }}>
                {pitch.close.body}
              </p>
              <ul className="fade-up mt-8 grid grid-cols-3 gap-3" style={{ ["--delay" as string]: "180ms" }}>
                {plans.map((p) => (
                  <li key={p.id} className={`rounded-md p-4 ${p.featured ? "bg-accent text-on-accent" : "border border-line"}`}>
                    <p className="text-step--1">{p.name}</p>
                    <p className="num font-display text-step-3">₹{groupINR(p.price)}</p>
                  </li>
                ))}
              </ul>
              <div className="fade-up mt-10 flex flex-wrap items-center gap-4" style={{ ["--delay" as string]: "240ms" }}>
                <WhatsAppButton size="lg">Chat on WhatsApp</WhatsAppButton>
                <PlanSummaryDownload variant="ghost" />
              </div>
            </div>
            <div className="fade-up flex flex-wrap items-start gap-8 lg:col-span-4 lg:col-start-9 lg:justify-end" style={{ ["--delay" as string]: "200ms" }}>
              <figure className="m-0 text-center">
                <div className="inline-block rounded-lg bg-white p-2">{qrWhatsApp}</div>
                <figcaption className="mt-2 text-step--1 font-semibold">Scan to chat on WhatsApp</figcaption>
              </figure>
              <figure className="m-0 text-center">
                <div className="inline-block rounded-lg bg-white p-2">{qrSite}</div>
                <figcaption className="mt-2 text-step--1 font-semibold">Scan to open the website</figcaption>
              </figure>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    if (liveRef.current) liveRef.current.textContent = `Slide ${index + 1} of ${total}: ${SLIDES[index]}`;
  }, [index, total]);

  return (
    <div
      className="band-ink fixed inset-0 flex flex-col overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress */}
      <div className="h-1 w-full bg-line" aria-hidden>
        <div
          className="h-full origin-left bg-accent transition-transform duration-500 ease-[var(--e-out)]"
          style={{ transform: `scaleX(${(index + 1) / total})` }}
        />
      </div>

      <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <LogoMark size={22} />
          <p className="truncate text-step--1 text-muted">
            {client ? (
              <>
                Prepared for <span className="font-semibold text-ink">{client}</span>
              </>
            ) : (
              "Rebuilt Pixel"
            )}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="num mr-2 text-step--1 text-muted" aria-hidden>
            {index + 1} / {total}
          </p>
          <button type="button" onClick={toggleFullscreen} className="grid size-11 place-items-center rounded-full hover:bg-surface" aria-label="Toggle full screen (F)">
            <Expand />
          </button>
          <Link href="/" className="grid size-11 place-items-center rounded-full hover:bg-surface" aria-label="Exit Pitch mode">
            <Close />
          </Link>
        </div>
      </header>

      <main className="relative min-h-0 flex-1">
        <h1 className="sr-only">Rebuilt Pixel pitch</h1>
        <p ref={liveRef} className="sr-only" aria-live="polite" />
        {SLIDES.map((name, i) => (
          <section
            key={name}
            aria-label={`${name}, slide ${i + 1} of ${total}`}
            aria-hidden={i !== index}
            inert={i !== index}
            hidden={i !== index}
            className="absolute inset-0 overflow-y-auto overscroll-contain"
          >
            <div className="mx-auto flex min-h-full max-w-[90rem] flex-col justify-center px-5 py-10 sm:px-12 lg:px-20">
              {i === index ? <div key={index}>{slideContent(i)}</div> : null}
            </div>
          </section>
        ))}
      </main>

      <nav aria-label="Slides" className="flex items-center justify-between gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="grid size-12 place-items-center rounded-full border border-line transition-opacity hover:bg-surface disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ArrowLeft />
        </button>
        <ol className="flex items-center gap-1.5">
          {SLIDES.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}: ${name}`}
                aria-current={i === index ? "step" : undefined}
                className="grid h-11 w-6 place-items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-accent" : "w-1.5 bg-line-strong"}`} />
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          className="grid size-12 place-items-center rounded-full bg-accent text-on-accent transition-opacity disabled:opacity-30"
          aria-label="Next slide"
        >
          <ArrowRight />
        </button>
      </nav>
    </div>
  );
}
