# Decisions

Short records of choices made while building, and why. Newest last.

## Stack

| Choice | Why |
|---|---|
| **Next.js 16 (App Router) + TypeScript** | As briefed. Every marketing page is prerendered static (`○` in the build), so it is fast, cheap on Vercel and cacheable offline. `cacheComponents` is on (the v16 default for new apps). |
| **Tailwind CSS v4** | Tokens live as CSS variables and map into Tailwind with `@theme inline`, so one source drives both utilities and hand-written CSS. |
| **GSAP + ScrollTrigger** | See DESIGN_SYSTEM.md › Motion. Loaded only after idle on desktop; phones never download it. |
| **Lenis** | Light smooth scroll that cooperates with ScrollTrigger. Desktop only, off under reduced motion. |
| **qrcode** | Generates QR codes as SVG paths on the server (no client JS). Also used lazily by the PDF. |
| **pdf-lib + @pdf-lib/fontkit** | Builds the one-page plan PDF in the browser, so it works offline mid-pitch and can carry the client's name. Loaded only on click. |
| **@vercel/analytics** | Cookieless, so no consent notice. Mounted only on Vercel builds. |
| Dev only: **Playwright, @axe-core/playwright, Lighthouse, chrome-launcher, wawoff2, prettier** | QA scripts, screenshots, Lighthouse, and compressing the self-hosted font. |

Not added: no UI kit, no animation library besides GSAP, no form or schema library (six fields, validated by hand in `src/lib/enquiry-schema.ts`), no Resend SDK (one `fetch` call).

## Content and honesty

- All copy, prices, plans, services, industries, FAQ and pitch slides live in `src/content/`. Components only render.
- No testimonials, client names, statistics or logos are invented. Proof sections use labelled placeholders (see TODO.md).
- The only portfolio piece is **Aangan Studio**, a fictional studio clearly labelled "Concept design" everywhere it appears (demo banner, work cards, hero mockup, pitch).
- Photos: 20 Unsplash photos, downloaded and self-hosted (not hotlinked), credited on `/credits`. One shortlisted photo was dropped as not right for a family-friendly demo.
- The sample package prices inside the studio demo are labelled as samples for a fictional studio.
- Payment terms (milestones, UPI/bank transfer), domain-in-your-name, response time and the cancellation wording are **proposed policies** taken from the research positioning. They are flagged in TODO.md for confirmation.

## Personalisation (`?client=`)

- Read on the client from the URL, sanitised (letters in any script, digits, spaces and `& . , ' ’ ( ) -`, max 48 characters), kept in `sessionStorage` for the meeting.
- Client-side on purpose: pages stay fully static and cacheable, and `?client=` works offline. The "Prepared for" line swaps text in a fixed-height slot, so personalising causes no layout shift.

## WhatsApp

- Every CTA builds a `wa.me` link with a URL-encoded prefilled message naming the plan, service or page, plus "this is [Name]" when `?client=` is set.
- **No number is configured yet.** Until `site.whatsappNumber` is set, links open `https://wa.me/?text=…`, which lets the visitor pick a chat. This works, and never points at a made-up number.

## Enquiry form

- Route handler `POST /api/enquiry`: honeypot field (bots get a fake success), rate limit of 5 per 10 minutes per IP, server-side validation, then delivery by Resend email and/or a webhook. Every lead is also logged as one JSON line to the hosting logs.
- Rate limiting is **in-memory per server instance**. That is enough to stop casual abuse. If spam becomes a problem, swap in Upstash Redis or Vercel KV (one function).
- In production with no delivery configured, the API returns 503 and the form offers WhatsApp instead. A lead is never silently lost.

## Offline (Pitch mode and demo)

- A hand-written service worker (`public/sw.js`): network-first with a 3.5s timeout for pages (weak signal falls back to cache quickly), cache-first for hashed assets and images.
- `/pitch` and `/demo/*` ask the worker to **warm** after first load. It fetches the pitch and demo pages, parses their HTML and caches scripts, styles, fonts and image variants up to 1280px, plus every size of preloaded hero images.
- Pitch links to the demo with a plain `<a>` (full navigation), so the cached HTML is served offline.
- Tested: pitch and demo work fully offline after one online visit (`npm run qa:e2e`).

## Performance

- **Fonts.** Google's Fraunces declares a latin-ext face whose range covers ₹, so every price pulled a 58 KB file for one glyph. Fraunces is now self-hosted as a 41 KB subset that includes ₹ (was 66 KB + 58 KB).
- **Hero.** The phone layout gives the headline the first screen, and the device mockup starts below the fold. Above-the-fold entrances are transform-only, so text counts as painted on the first frame.
- **Motion on phones.** Reveals use `IntersectionObserver` + CSS; GSAP and Lenis are desktop-only and load after idle.
- **Inline CSS was tried and reverted.** Next inlined the stylesheet three times (once in `<style>`, twice in the RSC payload), doubling HTML to 83 KB gzipped. External CSS is 15 KB gzipped and cacheable.
- **Images.** `next/image` with AVIF/WebP, blur placeholders, a reduced set of widths (fewer variants to cache offline), and qualities allow-listed (70, 75).

## Things deliberately left out

- **Light/dark toggle in Pitch mode and the demo**: Pitch is always the ink band (presentation look); the demo is the fictional studio's own brand.
- **A hero video**: heavy on 4G, and the device mockup tells the story without one.
