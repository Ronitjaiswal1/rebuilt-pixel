# Task list

Updated as work progresses. `[x]` done · `[~]` in progress · `[ ]` to do.

## Phase 1 — Research
- [x] Inspect brand assets (none found; fallback palette)
- [x] Design benchmarks, competitors, customer insight, photographer vertical, performance
- [x] `/docs/RESEARCH.md`
- [x] CHECKPOINT 1 summary

## Phase 2 — Design system
- [ ] Scaffold Next.js + TS + Tailwind; remove Vite prototype (kept in git history)
- [ ] Tokens in `/src/styles/tokens`, light + dark, wired into Tailwind
- [ ] Contrast-check script + results
- [ ] Fonts via next/font (Fraunces, Instrument Sans, Noto Sans Devanagari fallback)
- [ ] Motion layer (GSAP + ScrollTrigger + Lenis), reduced-motion safe
- [ ] Components (header, hero, buttons, pricing, table, cards, FAQ, form, footer, WA float, theme toggle, toast)
- [ ] `/styleguide` + screenshots 390/768/1440 — CHECKPOINT 2
- [ ] `/docs/DESIGN_SYSTEM.md`

## Phase 3 — IA and copy
- [ ] `/src/content` (site, plans, services, industries, FAQ, process, pages)
- [ ] Copy for all pages; honesty placeholders

## Phase 4 — Build
- [ ] Home, Services, Pricing, Work, Industries, /for/photographers, Process, About, Contact
- [ ] /pitch (keys, swipe, progress, ?client=, Prepared-for field)
- [ ] /demo/studio concept (gallery, viewer, packages, form, device frame toggle)
- [ ] Service worker (offline pitch + demo)
- [ ] QR codes, PDF summary
- [ ] Enquiry API (Resend, honeypot, rate limit, lead log)
- [ ] SEO: metadata, OG images, sitemap, robots, JSON-LD, icons, manifest
- [ ] Analytics + GA/Meta slots (+ consent only if needed)
- [ ] Privacy, Terms, 404

## Phase 5 — QA
- [ ] build / lint / typecheck clean
- [ ] Lighthouse mobile + desktop
- [ ] Playwright screenshots all pages × 390/768/1440 × light/dark
- [ ] Form E2E, WhatsApp links, menu, keyboard, reduced motion, pitch, offline, PDF
- [ ] axe
- [ ] Links/images/console
- [ ] Price & feature verification — CHECKPOINT 3

## Phase 6 — Launch
- [ ] Vercel preview
- [ ] LAUNCH.md, README.md, TODO.md
