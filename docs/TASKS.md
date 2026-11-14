# Task list

`[x]` done · `[~]` in progress · `[ ]` to do · `[!]` blocked on you (see TODO.md)

## Phase 1 — Research
- [x] Inspect brand assets (none found; fallback palette)
- [x] Design benchmarks, competitors, customer insight, photographer vertical, performance
- [x] `/docs/RESEARCH.md`
- [x] CHECKPOINT 1 summary

## Phase 2 — Design system
- [x] Next.js 16 + TS + Tailwind v4 scaffold (Vite prototype kept in git history, commit 0ccd0b2)
- [x] Tokens in `/src/styles/tokens`, light + dark + ink band, wired into Tailwind
- [x] Contrast-check script, all pairs pass AA (`docs/CONTRAST.md`)
- [x] Fonts: Fraunces (self-hosted subset), Instrument Sans, ₹ subset, Devanagari fallback
- [x] Motion layer: IO reveals everywhere; GSAP + ScrollTrigger + Lenis on desktop only; reduced-motion safe
- [x] Components
- [x] `/styleguide` + screenshots 390/768/1440 (CHECKPOINT 2)
- [x] `/docs/DESIGN_SYSTEM.md`

## Phase 3 — IA and copy
- [x] `/src/content` for site, plans, services, industries, FAQ, process, pages, pitch, demo, credits
- [x] Copy for all pages; honesty placeholders
- [!] Copy approval, policies, contact details

## Phase 4 — Build
- [x] Home, Services, Pricing, Work, Industries, /for/photographers, Process, About, Contact
- [x] /pitch (keys, swipe, progress, ?client=, Prepared-for field, QR, PDF)
- [x] /demo/studio concept (gallery, viewer, packages, form, phone/laptop frames)
- [x] Service worker (offline pitch + demo)
- [x] QR codes, PDF summary
- [x] Enquiry API (Resend, webhook, honeypot, rate limit, lead log)
- [x] SEO: metadata, OG images, sitemap, robots, JSON-LD, icons, manifest
- [x] Analytics (Vercel) + Plausible/GA/Meta slots with consent
- [x] Privacy, Terms (draft for legal review), Credits, 404

## Phase 5 — QA
- [x] build / lint / typecheck clean
- [x] Lighthouse mobile + desktop
- [x] Playwright screenshots, all pages × 390/768/1440 × light/dark (102), no overflow, no console errors
- [x] Functional E2E: form → webhook, WhatsApp links, menu, keyboard, reduced motion, pitch, offline, PDF, links
- [x] Accessibility (Lighthouse/axe 100 on audited pages)
- [x] Price & feature verification (CHECKPOINT 3)

## Phase 6 — Launch
- [~] Vercel preview
- [x] LAUNCH.md, README.md, TODO.md
