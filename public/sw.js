/* Rebuilt Pixel service worker — keeps Pitch mode and the demo working offline.
 *
 * Strategies (same-origin GET only):
 *   /_next/static/*, /fonts/*      cache-first (immutable, hashed)
 *   /_next/image                   cache-first, refreshed in the background
 *   pages and RSC payloads         network-first with a 3.5 s timeout, then cache
 *   everything else                stale-while-revalidate
 *
 * Pitch mode and the demo post a WARM message after first load. The worker then
 * fetches the offline pages, parses their HTML and caches their scripts, styles,
 * fonts and image variants, so the meeting keeps going if the signal drops.
 */
const VERSION = "rp-v2";
const STATIC = `${VERSION}-static`;
const PAGES = `${VERSION}-pages`;
const IMAGES = `${VERSION}-images`;
const OFFLINE_PAGES = ["/pitch", "/demo/studio", "/demo/studio/site"];
const WARM_IMAGE_WIDTHS = new Set(["640", "828", "1080", "1280"]);
const NETWORK_TIMEOUT_MS = 3500;
const IMAGE_ACCEPT = "image/avif,image/webp,image/*,*/*;q=0.8";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

const isRsc = (req, url) => req.headers.get("RSC") === "1" || url.searchParams.has("_rsc");

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

async function cacheFirst(req, cacheName, opts = {}) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreVary: true });
  if (hit) {
    if (opts.refresh) fetch(req).then((res) => res.ok && cache.put(req, res)).catch(() => {});
    return hit;
  }
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req, url) {
  const cache = await caches.open(PAGES);
  try {
    const res = await Promise.race([fetch(req), timeout(NETWORK_TIMEOUT_MS)]);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const exact = await cache.match(req, { ignoreVary: true });
    if (exact) return exact;
    if (req.mode === "navigate") {
      // ?client=Name and other query strings still get the cached page.
      const loose = await cache.match(url.pathname, { ignoreSearch: true, ignoreVary: true });
      if (loose) return loose;
      return offlinePage();
    }
    return Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(req, { ignoreVary: true });
  const network = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit || Response.error());
  return hit || network;
}

function offlinePage() {
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Offline · Rebuilt Pixel</title><style>body{font:16px/1.6 system-ui,sans-serif;background:#f6f3ec;color:#0e1830;display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}main{max-width:32rem}a{display:inline-block;margin:8px 12px 0 0;padding:12px 20px;border-radius:999px;background:#0e1830;color:#f6f3ec;text-decoration:none;font-weight:600}h1{font-family:Georgia,serif;font-weight:600;font-size:2rem;line-height:1.1}</style><main><h1>You're offline.</h1><p>This page hasn't been saved on this device yet. Pitch mode and the studio demo still work.</p><a href="/pitch">Open Pitch mode</a><a href="/demo/studio">Open the demo</a></main></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/fonts/")) {
    event.respondWith(cacheFirst(req, STATIC));
  } else if (url.pathname.startsWith("/_next/image")) {
    event.respondWith(cacheFirst(req, IMAGES, { refresh: true }));
  } else if (req.mode === "navigate" || isRsc(req, url) || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith(networkFirst(req, url));
  } else {
    event.respondWith(staleWhileRevalidate(req));
  }
});

/* ---------- Warming ---------- */

const ASSET_RE = /(?:src|href)="(\/_next\/static\/[^"]+)"/g;
const IMAGE_RE = /\/_next\/image\?[^"'\s,]+/g;
const PRELOAD_RE = /<link[^>]+rel="preload"[^>]+as="image"[^>]*>/g;
const decode = (s) => s.replace(/&amp;/g, "&");

async function put(cacheName, url, init) {
  try {
    const cache = await caches.open(cacheName);
    if (await cache.match(url, { ignoreVary: true })) return;
    const res = await fetch(url, init);
    if (res.ok) await cache.put(url, res);
  } catch {
    /* best effort */
  }
}

async function warmPage(path) {
  let html = "";
  try {
    const res = await fetch(path, { headers: { Accept: "text/html" } });
    if (!res.ok) return;
    const cache = await caches.open(PAGES);
    await cache.put(path, res.clone());
    html = await res.text();
  } catch {
    return;
  }
  const assets = new Set();
  for (const m of html.matchAll(ASSET_RE)) assets.add(decode(m[1]));
  const images = new Set();
  // Preloaded (hero) images: every width, so large screens work offline too.
  for (const tag of html.matchAll(PRELOAD_RE)) {
    for (const m of tag[0].matchAll(IMAGE_RE)) images.add(decode(m[0]));
  }
  for (const m of html.matchAll(IMAGE_RE)) {
    const u = decode(m[0]);
    const w = new URL(u, self.location.origin).searchParams.get("w");
    if (w && WARM_IMAGE_WIDTHS.has(w)) images.add(u);
  }
  await Promise.all([...assets].map((a) => put(STATIC, a)));
  // Images in small batches so a weak connection isn't flooded.
  const list = [...images];
  for (let i = 0; i < list.length; i += 6) {
    await Promise.all(list.slice(i, i + 6).map((u) => put(IMAGES, u, { headers: { Accept: IMAGE_ACCEPT } })));
  }
}

self.addEventListener("message", (event) => {
  const data = event.data || {};
  if (data.type !== "WARM") return;
  event.waitUntil(
    (async () => {
      const urls = Array.isArray(data.urls) ? data.urls : [];
      await Promise.all(
        urls
          .filter((u) => typeof u === "string" && u.startsWith("/_next/static/"))
          .map((u) => put(STATIC, u)),
      );
      for (const page of OFFLINE_PAGES) await warmPage(page);
      await Promise.all(["/manifest.webmanifest", "/icon.svg", "/fonts/Fraunces-Display.ttf", "/fonts/InstrumentSans-Regular.ttf", "/fonts/InstrumentSans-SemiBold.ttf"].map((u) => put(STATIC, u)));
    })(),
  );
});
