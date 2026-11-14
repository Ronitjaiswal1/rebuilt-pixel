import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { footerNav, site } from "@/content/site";
import { domainHostingShort, plans } from "@/content/plans";
import { formatINR } from "@/lib/format";

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => Boolean(url));
  return (
    <footer className="band-ink relative overflow-hidden border-t border-line pb-28 pt-20 md:pb-12" data-footer>
      <div className="container-x">
        <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo />
            <p className="display mt-8 max-w-[16ch] text-step-5">{site.tagline}</p>
          </div>
          <div className="lg:col-span-6 lg:pt-2">
            <p className="text-step-1 text-muted">Three plans, priced upfront:</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {plans.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/pricing#${p.id}`}
                    className="card card-interactive flex min-h-11 flex-col p-4 no-underline"
                  >
                    <span className="text-step--1 text-muted">{p.name}</span>
                    <span className="num font-display text-step-3">{formatINR(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-step--1 text-muted">{domainHostingShort}.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WhatsAppButton size="lg">Chat on WhatsApp</WhatsAppButton>
              <span className="text-step--1 text-muted">{site.responseTimeShort}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(footerNav).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <h2 className="text-step--1 font-semibold uppercase tracking-[0.12em] text-muted">{group}</h2>
              <ul className="mt-4 space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline inline-flex min-h-11 items-center">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="text-step--1 font-semibold uppercase tracking-[0.12em] text-muted">Contact</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link href="/contact" className="link-underline inline-flex min-h-11 items-center">
                  Contact page
                </Link>
              </li>
              {site.email ? (
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline inline-flex min-h-11 items-center">
                    {site.email}
                  </a>
                </li>
              ) : null}
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex min-h-11 items-center capitalize"
                  >
                    {name}
                  </a>
                </li>
              ))}
              <li className="pt-2 text-step--1 text-muted">
                {site.city ? `${site.city}, ${site.country}` : `Serving businesses across ${site.country}`}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-8 text-step--1 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.name}. Designed and built in-house.
          </p>
          <p>Prices in Indian rupees. {domainHostingShort}.</p>
        </div>
      </div>
      {/* Decorative watermark drawn with CSS content so it is not read or contrast-checked as text. */}
      <div aria-hidden className="rp-watermark" data-text="Rebuilt Pixel" />
    </footer>
  );
}
