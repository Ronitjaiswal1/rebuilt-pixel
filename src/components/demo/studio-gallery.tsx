"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { categories, gallery, type Category } from "@/content/demo-studio";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/icons";

/**
 * Filterable masonry gallery with a full-screen viewer.
 * Viewer: native <dialog> (focus trap, Esc), arrow keys, swipe, counter.
 */
export function StudioGallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const items = filter === "all" ? gallery : gallery.filter((p) => p.category === filter);

  const open = (i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => {
      setIndex(null);
      openerRef.current?.focus();
    };
    dlg.addEventListener("keydown", onKey);
    dlg.addEventListener("close", onClose);
    return () => {
      dlg.removeEventListener("keydown", onKey);
      dlg.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index !== null ? items[index] : null;

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className="min-h-11 shrink-0 rounded-full border border-[var(--s-line)] px-5 text-sm font-semibold transition-colors aria-pressed:border-[var(--s-maroon)] aria-pressed:bg-[var(--s-maroon)] aria-pressed:text-[var(--s-maroon-ink)]"
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {items.length} photos
      </p>

      <ul className="studio-masonry mt-6">
        {items.map((p, i) => (
          <li key={p.src.src}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block w-full overflow-hidden bg-[var(--s-line)]"
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                sizes="(min-width: 1024px) 31vw, 50vw"
                placeholder="blur"
                quality={70}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {categories.find((c) => c.id === p.category)?.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="studio-lightbox m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current ? (
          <div
            className="relative flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between p-3 sm:p-5">
              <p className="num text-sm font-semibold tracking-[0.18em]" aria-live="polite">
                {index! + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close viewer"
                autoFocus
              >
                <Close />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
              <Image
                key={current.src.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                quality={75}
                placeholder="blur"
                className="fade-up object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-3 sm:p-5">
              <button
                type="button"
                onClick={() => step(-1)}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Previous photo"
              >
                <ArrowLeft />
              </button>
              <p className="text-center text-xs text-white/75">
                {current.alt}. Photo: {current.credit} / Unsplash
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Next photo"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
