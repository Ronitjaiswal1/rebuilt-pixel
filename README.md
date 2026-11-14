# Rebuilt Pixel website

Agency website for Rebuilt Pixel: fixed-price websites for small businesses in India, with WhatsApp-first enquiries, Pitch mode for live meetings, and a touchable concept demo.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP and Lenis. Every marketing page is prerendered static.

## Run it

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env.local     # optional for local dev
npm run dev                    # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

The enquiry form works locally without keys (leads are printed in the terminal). In production it needs Resend or a webhook; see `docs/LAUNCH.md`.

## Edit content and prices

Everything you'd want to change lives in **`src/content/`**. Components only display it.

| File | What's in it |
|---|---|
| `site.ts` | Name, tagline, **WhatsApp number**, email, city, socials, navigation, the "what you get" strip |
| `plans.ts` | **The three plans**: names, prices, features, delivery, revisions, support, the comparison table, the domain/hosting note |
| `services.ts` | The seven services |
| `industries.ts` | Industries and their one-liners |
| `faq.ts` | FAQ (also used for search-engine FAQ data) |
| `process.ts` | Steps, what we need from you, payment terms |
| `pages.ts` | Headlines and intros for each page |
| `photographers.ts` | The `/for/photographers` page |
| `pitch.ts` | Pitch mode slides |
| `demo-studio.ts` | The fictional Aangan Studio concept (photos, packages) |
| `credits.ts` | Photo credits |

**To change a price**, edit `price` in `src/content/plans.ts`, for example `price: 13999`. It updates the cards, comparison table, Pitch mode, the PDF, WhatsApp messages and the structured data for Google. Write it without commas; the site formats it as ₹13,999.

## Useful pages

- `/pitch` is Pitch mode. Use `?client=Name` to personalise it. Keys: ← → Space Home End, F for full screen.
- `/demo/studio` is the concept demo with a phone/laptop frame toggle.
- `/styleguide` shows the design system (hidden from search).

## Checks

```bash
npm run check            # lint + type-check + colour contrast
npm run qa:e2e           # functional tests (needs a running server; see the script header)
npm run qa:screens       # screenshots of every page at 390/768/1440px, light and dark → qa/screenshots
npm run qa:lighthouse    # Lighthouse mobile + desktop → qa/lighthouse
```

For QA scripts, run `npm run build && npm start -- -p 3100` first (they default to `http://localhost:3100`; override with `BASE_URL`). On Windows Git Bash, prefix Lighthouse with `MSYS_NO_PATHCONV=1` and set `CHROME_PATH` to your Chrome.

## Project layout

```
src/
  app/            routes: (site) for the main site, (bare) for /pitch and /demo
  components/     layout, sections, ui, forms, pitch, demo, motion
  content/        all copy, prices and plans
  lib/            WhatsApp links, formatting, metadata, structured data, PDF, QR
  styles/tokens/  colour, type, space, motion tokens
public/sw.js      service worker (offline Pitch mode and demo)
scripts/          QA, screenshots, icons, contrast check
docs/             research, design system, decisions, launch guide, to-do list
```

## Docs

- `docs/RESEARCH.md`: market, competitors, customer insight, performance targets
- `docs/DESIGN_SYSTEM.md`: tokens, type, motion, components
- `docs/DECISIONS.md`: why things are built the way they are
- `docs/LAUNCH.md`: domain, env vars, email, Search Console, Business Profile
- `docs/TODO.md`: what you still need to supply or decide
- `docs/CONTRAST.md`: generated contrast report
