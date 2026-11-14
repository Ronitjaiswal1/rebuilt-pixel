# Design system

Live reference: **`/styleguide`** (hidden from the sitemap and search engines). Tokens live in `src/styles/tokens/` and are wired into Tailwind in `src/app/globals.css` (`@theme inline`).

No logo was supplied, so the palette follows the brief's fallback: ink-navy and warm paper, with one marigold accent. The pixel mark in `src/components/brand/logo.tsx` is a **placeholder** until a real logo arrives.

## Colour (`tokens/colors.css`)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--c-bg` | `#F6F3EC` warm paper | `#0B1220` ink-navy | Page background |
| `--c-surface` | `#FFFFFF` | `#131C2E` | Cards, raised surfaces |
| `--c-sunken` | `#EDE8DD` | `#0F1727` | Alternate bands, table highlight |
| `--c-ink` | `#0E1830` | `#F3EEE4` | Text, primary button |
| `--c-muted` | `#4B5568` | `#A9B2C3` | Secondary text |
| `--c-line` / `--c-line-strong` | `#D9D2C3` / `#8A8474` | `#24304A` / `#6B7891` | Hairlines / form borders |
| `--c-accent` | `#F2A516` marigold | `#FFB833` | Fills, highlights (never small text on paper) |
| `--c-accent-text` | `#8A5300` | `#FFBF47` | Accent text that passes AA |
| `--c-accent-2` | `#1F3A5F` slate | `#8FB0DD` | Links in prose, focus |
| `--c-success` / `--c-error` | `#1D7A46` / `#B42318` | `#4CC38A` / `#FF8A7A` | Semantic only |
| `--c-whatsapp` | `#0B7D3E` | `#25D366` | WhatsApp actions only |

- **Dark is designed, not inverted.** Every value was chosen and checked separately.
- **`.band-ink`** re-maps the tokens to a deep navy band inside a light page (featured plan, final CTA, footer, Pitch mode).
- **Theme**: follows `prefers-color-scheme` until the visitor uses the toggle; the choice is saved in `localStorage` and applied before first paint by an inline script (no flash).
- **Contrast**: `npm run check:contrast` checks every text and UI pair in all three palettes and writes `docs/CONTRAST.md`. All pairs pass WCAG AA.

## Typography (`tokens/typography.css`)

- **Display: Fraunces** (variable, optical size). Self-hosted as a 41 KB subset (`src/assets/fonts/Fraunces-RP.woff2`): Basic Latin, ₹ and a few punctuation marks, weight 400–700, optical size 14–144. Used only for headlines, prices and big numbers.
- **Body: Instrument Sans** via `next/font/google`, with a metric-matched fallback (no layout shift).
- **₹ in body text:** Instrument Sans has no ₹, so a 2 KB Noto Sans subset (`tokens/rupee.woff`, `unicode-range: U+20B9`) sits first in the body stack and downloads only when ₹ appears.
- **Devanagari:** Noto Sans Devanagari is declared with `preload: false`; it downloads only if Hindi text is added.
- **Scale:** fluid `clamp()` steps `--step--2` to `--step-8` (360 → 1440px). Tailwind: `text-step-0` … `text-step-8`.
- **Rules:** body measure 65ch (`.measure`), `text-wrap: balance` on headings, `pretty` on paragraphs, tabular lining numerals for prices (`.num`), Indian grouping via `formatINR()` (`₹1,20,000`).

## Layout, space, shape (`tokens/space.css`)

- 8px spacing scale (`--space-1` = 8px … `--space-16` = 128px). In Tailwind, use even steps (`p-2` = 8px, `p-4` = 16px …).
- Content width 1200px (`.container-x`), wide rows 1440px (`.container-wide`), gutters `clamp(16px … 40px)`.
- 12-column grid (`lg:grid-cols-12`), section rhythm `--section-y`.
- One radius scale by role: `xs` 4 (tags), `sm` 8 (inputs), `md` 14 (cards), `lg` 24 (panels, media), `xl` 36 (device frames), `pill` (buttons, chips).
- Shadows only on raised, interactive surfaces: `sm`, `md` (hover), `lg` (featured plan, floating button, device frames).

## Motion (`tokens/motion.css`, `components/motion/motion-provider.tsx`)

**Primary library: GSAP + ScrollTrigger, with Lenis for smooth scroll.** Why GSAP over Framer Motion: it drives plain DOM through data attributes, so pages stay Server Components with no per-section client boundaries. It also loads in its own chunk only after idle, only on desktop, and has mature scroll-linked tooling.

| Effect | How | Where it runs |
|---|---|---|
| Split-text headline | CSS keyframes on server-rendered word spans | Desktop; phones get a whole-headline rise (keeps the LCP paint intact) |
| Hero entrance | `.rise` (transform only) | Everywhere |
| Scroll reveals | `IntersectionObserver` adds `.rp-reveal` on first entry | Everywhere (no library) |
| Smooth scroll | Lenis (`lerp 0.11`) | Desktop fine pointers |
| Parallax | `data-parallax` + ScrollTrigger scrub | Desktop |
| Image settle on work cards | `data-scale-in` (1.12 → 1) | Desktop |
| Work card reveal | Second screen slides up on hover/focus (CSS transform) | Pointer devices |
| Magnetic buttons | `data-magnetic` + `gsap.quickTo` | Desktop |
| Custom cursor | Follower ring, grows on links, "View" on work | Desktop mouse only; native cursor stays |
| Device mockup | Screens scroll, phone floats (CSS) | Desktop; still on phones |

Rules:

- **Visible at rest.** Nothing waits on scroll or an observer to appear. The reveal class is added only at the moment an element enters view, and anything on screen at load is left untouched. Screenshots, crawlers and no-JS visitors see everything.
- **Only `transform` and `opacity` animate.**
- **`prefers-reduced-motion`**: no Lenis, no parallax, no GSAP, no reveals, no loops. Simple state changes only.
- Durations: `--dur-1` 120ms (press), `--dur-2` 220ms (hover), `--dur-3` 420ms (menus), `--dur-4` 800ms (entrances). Easing: `--e-out` for entrances.

## Components

Header (sticky blur, hides on scroll down), mobile menu (native `<dialog>`: focus trap, Escape), buttons (`.btn-primary`, `.btn-secondary`, `.btn-accent`, `.btn-whatsapp`, all ≥44px), plan cards, comparison table (sticky first column, sideways scroll on phones, keyboard-scrollable region), service cards, industry cards, work showcase, testimonial **placeholder**, process steps, FAQ (`<details>`, works without JS), enquiry form (labelled fields, inline errors, honeypot), footer, floating WhatsApp button (hides over the footer and other WhatsApp CTAs), theme toggle, toast (`aria-live`). All are shown on `/styleguide`.
