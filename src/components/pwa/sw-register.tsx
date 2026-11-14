"use client";

import { useEffect } from "react";

/**
 * Registers the service worker (production only). Pages that must work offline
 * (Pitch mode, the demo) pass `warm` so the worker pre-caches them and their
 * assets right after first load.
 */
export function ServiceWorkerRegister({ warm = false }: { warm?: boolean }) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_SW_DEV) return;

    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => {
        if (cancelled || !warm) return;
        const urls = new Set<string>([location.pathname + location.search, location.pathname]);
        for (const entry of performance.getEntriesByType("resource")) {
          const u = new URL(entry.name);
          if (u.origin === location.origin) urls.add(u.pathname + u.search);
        }
        reg.active?.postMessage({ type: "WARM", urls: Array.from(urls) });
      })
      .catch(() => {
        /* offline support is a progressive enhancement */
      });
    return () => {
      cancelled = true;
    };
  }, [warm]);

  return null;
}
