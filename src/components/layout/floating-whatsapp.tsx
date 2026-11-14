"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useClientName } from "@/hooks/use-client-name";
import { messageForPath, waHref } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "@/components/ui/icons";

/**
 * Floating WhatsApp button. Appears after the hero, hides over the footer and
 * any element marked [data-wa-hide] (sections that already have a WhatsApp
 * CTA), so it never covers a primary action. The message names the page.
 */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const client = useClientName();
  const [pastHero, setPastHero] = useState(false);
  const [overHidden, setOverHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setOverHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-footer], [data-wa-hide]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  const show = pastHero && !overHidden;

  return (
    <a
      href={waHref(messageForPath(pathname, client || undefined))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens WhatsApp)"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-on-whatsapp shadow-lg transition-[transform,opacity] duration-300 ease-out md:right-6 md:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      data-cursor="link"
    >
      <WhatsAppGlyph size={28} />
    </a>
  );
}
