import Link from "next/link";
import { notFoundCopy } from "@/content/pages";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export const metadata = { title: "Page not found", robots: { index: false } };

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/services", label: "Services" },
  { href: "/for/photographers", label: "For studios" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden pb-[var(--section-y)] pt-[calc(var(--header-h)+4rem)]">
        <div className="container-x">
          <p aria-hidden className="display select-none text-[clamp(7rem,30vw,22rem)] leading-[0.8] tracking-[-0.06em]">
            4<span className="inline-block -translate-y-[0.06em] rotate-[8deg] text-accent">0</span>4
          </p>
          <h1 className="display mt-8 text-step-5">{notFoundCopy.title}</h1>
          <p className="lede mt-4">{notFoundCopy.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="btn btn-secondary btn-sm">
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <WhatsAppButton>Ask us on WhatsApp</WhatsAppButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
