"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Close, Menu } from "@/components/ui/icons";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { nav, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Hide on scroll down, reveal on scroll up. Transform only.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const goingDown = y > last + 4;
        const goingUp = y < last - 4;
        if (goingDown && y > 320) setHidden(true);
        else if (goingUp || y < 320) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`border-b transition-[background-color,border-color] duration-300 ${
            scrolled ? "border-line bg-[var(--c-glass)] backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
          }`}
        >
          <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
            <Link href="/" className="-ml-1 inline-flex min-h-12 items-center rounded-md p-1" aria-label={`${site.name}, home`} data-cursor="link">
              <Logo />
            </Link>

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="link-underline inline-flex min-h-11 items-center px-3 text-step--1 font-medium"
                      data-cursor="link"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <WhatsAppButton size="sm" className="hidden sm:inline-flex" magnetic>
                Chat on WhatsApp
              </WhatsAppButton>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={openMenu}
                className="grid size-11 place-items-center rounded-full hover:bg-sunken lg:hidden"
                aria-label="Open menu"
                aria-haspopup="dialog"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="rp-menu m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeMenu();
        }}
      >
        <div className="container-x flex h-full flex-col">
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <Link href="/" onClick={closeMenu} aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className="grid size-11 place-items-center rounded-full hover:bg-sunken"
              aria-label="Close menu"
              autoFocus
            >
              <Close />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
            <ul className="divide-y divide-line border-y border-line">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <li key={item.href} className="rp-menu-item" style={{ ["--i" as string]: i }}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between py-3 font-display text-step-3 aria-[current=page]:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/for/photographers"
              onClick={closeMenu}
              className="mt-6 inline-flex min-h-11 items-center text-step-0 font-semibold text-accent-text"
            >
              For photo and video studios →
            </Link>
          </nav>
          <div className="pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
            <WhatsAppButton size="lg" className="w-full">
              Chat on WhatsApp
            </WhatsAppButton>
            <p className="mt-3 text-center text-step--1 text-muted">{site.responseTimeShort}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
