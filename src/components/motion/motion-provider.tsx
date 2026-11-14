"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive motion layer.
 *
 * Everywhere (no library, tiny):
 *   data-reveal            fades/slides up once when it enters the viewport
 *   data-reveal-stagger    same, for each direct child, staggered
 *   Content is always visible at rest. The animation class is added only at
 *   the moment an element enters view; anything already on screen at load is
 *   left alone. Nothing sits hidden waiting for an observer.
 *
 * Desktop fine pointers only (GSAP + ScrollTrigger + Lenis, loaded on idle in
 * their own chunk, never on phones or under reduced motion):
 *   data-parallax="0.12"   translateY scrubbed against scroll
 *   data-scale-in          image settles from 1.12 → 1 as it scrolls in
 *   data-magnetic          button follows the pointer slightly
 *   data-cursor="view|link" cursor state
 *   + Lenis smooth scrolling
 */

let libs: Promise<{
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  Lenis: typeof import("lenis").default;
}> | null = null;

function loadLibs() {
  libs ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([g, st, l]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, Lenis: l.default };
  });
  return libs;
}

function whenIdle(cb: () => void): () => void {
  let id: number | undefined;
  let t: ReturnType<typeof setTimeout> | undefined;
  const run = () => {
    if ("requestIdleCallback" in window) id = window.requestIdleCallback(cb, { timeout: 2500 });
    else t = setTimeout(cb, 600);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    window.removeEventListener("load", run);
    if (id !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(id);
    if (t) clearTimeout(t);
  };
}

const isVisible = (el: Element) => el.getClientRects().length > 0;

/** IntersectionObserver reveals: add a CSS animation class on first entry. */
function setupReveals(): () => void {
  const vh = window.innerHeight;
  const targets: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => targets.push(el));
  document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      const el = child as HTMLElement;
      el.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
      targets.push(el);
    });
  });
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("rp-reveal");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of targets) {
    if (!isVisible(el) || el.getBoundingClientRect().top < vh * 0.92) continue; // on screen already
    io.observe(el);
  }
  return () => io.disconnect();
}

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cleanups: Array<() => void> = [setupReveals()];

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth >= 1024;
    if (!fine) return () => cleanups.forEach((fn) => fn());

    let disposed = false;
    const cancelIdle = whenIdle(async () => {
      const { gsap, ScrollTrigger, Lenis } = await loadLibs();
      if (disposed) return;

      const lenis = new Lenis({
        lerp: 0.11,
        anchors: { offset: -88 },
        prevent: (node) => node.closest("dialog") !== null,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      });

      const ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-scale-in]").forEach((el) => {
          if (!isVisible(el)) return;
          gsap.fromTo(
            el,
            { scale: 1.12 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: 0.6 } },
          );
        });
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          if (!isVisible(el)) return;
          const speed = Number(el.dataset.parallax) || 0.12;
          gsap.to(el, {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.36);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      });
      cleanups.push(() => ctx.revert());
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // Cursor: a follower ring; the native cursor stays.
      const cursor = document.createElement("div");
      cursor.className = "rp-cursor";
      cursor.setAttribute("aria-hidden", "true");
      document.body.appendChild(cursor);
      const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
      const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        cx(e.clientX);
        cy(e.clientY);
        cursor.dataset.visible = "true";
        const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button, summary");
        const mode = target?.dataset.cursor ?? (target ? "link" : "");
        if (cursor.dataset.mode !== mode) {
          cursor.dataset.mode = mode;
          cursor.textContent = mode === "view" ? "View" : "";
        }
      };
      const leave = () => (cursor.dataset.visible = "false");
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        cursor.remove();
      });
    });

    return () => {
      disposed = true;
      cancelIdle();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
