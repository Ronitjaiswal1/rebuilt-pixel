"use client";

import { useEffect, useState } from "react";
import { Close } from "./icons";

type ToastKind = "success" | "error" | "info";
type ToastItem = { id: number; message: string; kind: ToastKind };

const EVENT = "rp:toast";

/** Show a toast from anywhere on the client. */
export function toast(message: string, kind: ToastKind = "info") {
  window.dispatchEvent(new CustomEvent<Omit<ToastItem, "id">>(EVENT, { detail: { message, kind } }));
}

/** Polite live region that stacks toasts bottom-centre. */
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let n = 0;
    const onToast = (e: Event) => {
      const { message, kind } = (e as CustomEvent<Omit<ToastItem, "id">>).detail;
      const id = ++n;
      setItems((list) => [...list.slice(-2), { id, message, kind }]);
      window.setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 6000);
    };
    window.addEventListener(EVENT, onToast);
    return () => window.removeEventListener(EVENT, onToast);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4 md:bottom-8"
    >
      {items.map((t) => (
        <div
          key={t.id}
          className="fade-up pointer-events-auto flex max-w-md items-start gap-3 rounded-md border border-line bg-surface px-4 py-3 text-step--1 shadow-lg"
        >
          <span
            aria-hidden
            className={`mt-1.5 size-2 shrink-0 rounded-full ${
              t.kind === "success" ? "bg-success" : t.kind === "error" ? "bg-error" : "bg-accent"
            }`}
          />
          <p className="flex-1">{t.message}</p>
          <button
            type="button"
            onClick={() => setItems((list) => list.filter((x) => x.id !== t.id))}
            className="-m-2 grid size-10 place-items-center rounded-full hover:bg-sunken"
            aria-label="Dismiss"
          >
            <Close size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
