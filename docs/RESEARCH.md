# Research — Rebuilt Pixel

Phase 1, November 2026. Decision-oriented. Figures from vendor pages are marked as vendor claims. Nothing here is used on the site as a statistic unless it is attributed there too.

---

## 0. Brand assets found

- `/assets/brand/` does not exist. `public/assets_rebuiltpixel/` exists but is empty.
- **Result:** no logo, colours or fonts to derive from. We use the brief's fallback direction (ink-navy + warm off-white + marigold) and a typographic placeholder wordmark until a logo arrives. Listed in `TODO.md`.

---

## 1. Design benchmarks (principles, not copies)

These notes describe the public design patterns of each site. Sites change often, so treat them as patterns to learn from, not a snapshot.

| # | Site | What works | One thing to avoid |
|---|---|---|---|
| 1 | [linear.app](https://linear.app) | Very tight type hierarchy. Product shown as the hero. Long pages paced with one idea per band. | Low-contrast grey-on-black secondary text. |
| 2 | [stripe.com](https://stripe.com) | A strict grid under every section. Pricing that reads in one glance. Motion that explains instead of decorates. | Heavy canvas/WebGL hero. Too costly for mid-range Android. |
| 3 | [vercel.com](https://vercel.com) | Visible grid lines as a design device. Fast first paint. Monospaced detail labels. | A developer-centric tone that would feel cold to a salon owner. |
| 4 | [locomotive.ca](https://locomotive.ca) | Smooth scroll with restrained parallax. Huge, confident display type. | Scroll that feels hijacked. Lenis must stay light (lerp ~0.1) and off for reduced motion. |
| 5 | [obys.agency](https://obys.agency) | Split-text headline reveals with real typographic craft. | Legibility traded away for effect. |
| 6 | [basement.studio](https://basement.studio) | Personality through type scale contrast and bold black/white blocks. | Visual noise. Too many simultaneous effects. |
| 7 | [cuberto.com](https://cuberto.com) | Magnetic buttons and a cursor that responds to context. | Interactions that only exist for mouse users. |
| 8 | [rauno.me](https://rauno.me) | Micro-interaction craft. Restraint. Every hover state is considered. | Too sparse for a sales page. We need clear CTAs. |
| 9 | [pentagram.com](https://www.pentagram.com) | Work-first layout. Images carry the colour, UI stays neutral. | Weak calls to action. |
| 10 | [magnumphotos.com](https://www.magnumphotos.com) | Photography as the star, with editorial captions and credits. | Slow, image-heavy first load. |
| 11 | [framer.com/pricing](https://www.framer.com/pricing) | Plan cards plus a comparison table that is easy to scan. Clear "most popular" emphasis. | Glow/gradient overuse that dates quickly. |
| 12 | Awwwards photographer portfolios, e.g. Félix Péault, Tatiana Braoun (Honorable Mentions, 2026) — [Awwwards portfolio winners](https://www.awwwards.com/inspiration_search/winner_category_portfolio/) | Full-bleed images, minimal chrome, curtain/clip reveals on images. | Navigation hidden behind clever gestures. |

### The 5 design principles we will follow

1. **Visible first, then animate.** Every word and price is readable at first paint without JS. Motion only enhances: transforms and opacity, never content gating.
2. **Type does the selling.** One expressive display face used sparingly (headlines, prices, big numbers) against a calm body face. Large scale contrast instead of decoration.
3. **Imagery carries the colour.** UI stays ink, paper and one marigold accent, so concept sites and photography pop.
4. **One idea per band.** Each section answers one question a business owner has, in the order they ask it: what is this, what does it cost, can I trust you, how do I start.
5. **Built for a ₹15k Android on 4G.** Performance is part of the design. If an effect costs main-thread time on a mid-range phone, it is cut or limited to desktop.

---

## 2. Competitors in India

| Provider | Type | Positioning / claims | Price (as found) | Weakness we can use |
|---|---|---|---|---|
| **Wix** | DIY builder | Drag-and-drop, templates | No reliable INR list found; one unofficial guide estimates ₹1,200–3,000/month ([source](https://website-builder-d1x.pages.dev/posts/2026/01/website-builders-india-practical-guide)) | Owner must design it themselves. Monthly rent forever. USD-first. |
| **Squarespace** | DIY builder | Design-led templates | Tracker reports ₹630 / ₹720 / ₹1,100 on the India storefront; unverified ([source](https://usagepricing.com/blueprint/squarespace)) | Same DIY burden. Generic templates. |
| **Zoho Sites** | DIY builder (Indian company) | Part of the Zoho suite | From ₹280/month ([Techjockey](https://www.techjockey.com/alternatives/weebly)) | Template look. Effort sits with the owner. |
| **Hostinger Website Builder** | DIY + hosting | Cheap, AI builder | From ₹129/month, intro price needs a 48-month term ([eChai](https://echai.ventures/startingup/tools-web-product/which-website-builder-should-a-small-business-use-including-free-and-ai-ones), [Hostinger](https://www.hostinger.com/in/tutorials/best-website-builder/)) | Renewal jumps. This is exactly the "hidden charges" fear. |
| **Pixpa** | Photographer builder (India-founded) | All-in-one portfolio + client galleries | ~$7–25/month (aggregators: [Capterra](https://www.capterra.com/p/152263/Pixpa/pricing/), [Toolradar](https://toolradar.com/tools/pixpa/pricing)) | Template look. Subscription. DIY setup. |
| **Pixieset** | Photographer builder | Client galleries + site | $8–40/month ([PricingSaaS](https://pricingsaas.com/companies/pixieset)). Many Indian studios run on `*.mypixieset.com` subdomains (seen across search results) | Subdomain branding. Same templates as every other studio. |
| **Photomall** | Indian photo-sharing platform | Photographer website with 15+ themes, WhatsApp button | Website on own domain ₹7,999 one-time; app ₹9,999 ([pricing](https://photomall.in/en/pricing-offers)) | **Same headline price as our Launch plan**, but theme-based. We must show what custom craft adds. |
| **Codingclave** | Indian agency | Photographer-specific guides, city landing pages | Basic ₹15K–40K (7–12 days); Standard ₹50K–95K (14–25 days) ([guide](https://codingclave.com/guides/wedding-photographer-website-india-2026)) | Range pricing ("₹15K–₹1.5L") makes the buyer guess. |
| **ColorWhistle** | Indian agency | Feature-by-feature cost guides | Photographer site ₹55,000–95,000 ([guide](https://colorwhistle.com/website-cost-features/photographer-website-cost-india/)) | Expensive for a single-studio owner. Long timelines. |
| **Low-cost freelancers / micro-agencies** | Freelancers, often AI-generated sites | "Website in 3–7 days" | ₹7,999+ (5–7 days), ₹14,999 (3–8 days) ([example](https://digilightindia.netlify.app/website-development-company-india), [example](https://beyondrealityagency-in.lovable.app/pricing)) | Generic sites, many visibly AI-template built. "Trusted by 100+" claims with no proof. Unclear ownership and support. |

### The gap we can own

The market is split three ways:
- **DIY builders.** Cheap per month, but you rent forever and do the work yourself.
- **Agencies.** ₹50K+, weeks of work, and price *ranges*.
- **Commodity freelancers.** Cheap, but the sites look generic and the buyer has trust risk.

**Rebuilt Pixel's position:** *agency-grade craft at a fixed, published price, delivered in days, run over WhatsApp, and fully yours.*

Concretely, we:
- **Publish exact prices** (₹7,999 / ₹13,999 / ₹25,000), not ranges.
- **Promise ownership in writing:** domain registered in the client's name, and full handover.
- **Show domain and hosting at actuals:** we show the invoice. This kills the renewal-trap fear.
- **Run on WhatsApp first**, the way Indian owners already do business.
- **Let the site prove the skill.** The competitors' own sites look templated, and ours must not.

---

## 3. Customer insight: why owners hesitate, and how they search

**Evidence**
- 63% of small Indian businesses surveyed had no website. 40% said they were "too small". 54% wanted someone to build it for them: India is a *do-it-for-me* market. GoDaddy/RedShift survey; dated, vendor-commissioned ([DNA](https://www.dnaindia.com/technology/report-nearly-2-out-of-3-small-business-in-the-country-do-not-have-a-web-presence-godaddy-survey-2127625/amp), [YourStory](https://yourstory.com/smbstory/go-daddy-indian-small-business-website-survey)).
- Developers holding a client's domain hostage is a known pattern. The advice is to make sure the domain is registered in the business's own name ([Entrepreneur India](https://india.entrepreneur.com/technology/why-is-buying-domain-from-web-developers-not-a-great-idea/310633)).
- Builder intro prices that need multi-year terms and then renew higher feed the hidden-charges fear ([eChai](https://echai.ventures/startingup/tools-web-product/which-website-builder-should-a-small-business-use-including-free-and-ai-ones)).
- Fixed price or capped estimates are the standard advice to avoid scope creep ([upgrowth](https://upgrowth.in/website-design-cost-guide-in-india/)).

**Objections → how our copy answers them** (these drive the FAQ)

| Objection | Our answer |
|---|---|
| "I'm too small for a website" | Launch is ₹7,999 once, not a monthly rent. That's about what a single ad campaign costs. |
| "Instagram / WhatsApp is enough" | Keep both. The website is where Google sends people, where prices and packages live, and it feeds enquiries *into* your WhatsApp. |
| "Hidden charges / renewal trap" | Fixed price. Domain and hosting at actuals, and we show you the invoice. No lock-in contract. |
| "The developer will vanish with my domain" | The domain is registered in your name. You get the logins. |
| "It will take months" | 7, 12 or 25 days, depending on plan. The clock starts when we have your content. |
| "I can't update it myself" | Small edits are covered in the support period. Signature includes an admin panel and training. |
| "Will people actually find it?" | Basic search setup comes in every plan. Local SEO and Google Business Profile setup come from Growth up. |
| "How do I pay?" | UPI or bank transfer, in milestones. Details on the Process page. |

**How owners search for a provider:** word of mouth first, then Google ("website designer near me", "website for [business] in [city]"), Instagram, and IndiaMART or Justdial listings. Practically, they **message on WhatsApp before they ever fill a form**.

---

## 4. Photographer vertical (`/for/photographers`)

- **How couples find vendors.** In WeddingWire India's newlywed survey, 52% rely heavily on word of mouth, 33% use Google, and 30% use wedding websites ([WeddingWire India](https://www.weddingwire.in/wedding-tips/weddingwire-india-reveals-the-newlyweds-report-2021--c11025)). Instagram is widely described as the main discovery channel for Indian photographers (vendor blog, [Goclixy](https://saas.goclixy.com/blog/grow-photography-studio-business-india)). WhatsApp handles follow-up.
- **"Instagram is enough" counter.** Instagram posts don't rank in Google search, and a website is where clients check packages and credibility before they message ([Bluehost summary of Google's Martin Splitt](https://www.bluehost.com/blog/?p=236429), [Photomall](https://photomall.in/en/blogs/do-photographers-need-a-website-or-social-media-2026)).
- **What studios need on site:**
  - Galleries by shoot type (wedding, pre-wedding, maternity, newborn, events, commercial) with a full-screen viewer.
  - A reels/films section.
  - A packages page. Photographers in India already publish "investment" pages on Pixieset.
  - A booking enquiry form that asks for the date, city and event type.
  - A WhatsApp button.
  - Google Business Profile for "photographer near me".
  - Private client proofing galleries (Signature).
- **Competitor overlap:** Photomall (₹7,999 theme site), Pixieset, Pixpa. Our angle: *your studio shouldn't look like every other `mypixieset` link.*

---

## 5. Technical and performance reality

- **Core Web Vitals targets are unchanged for 2026:** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, at the 75th percentile of real users ([corewebvitals.io](https://corewebvitals.io/core-web-vitals)). One source claims a 150 ms INP bar after the March 2026 update. That is unverified, but we aim under 150 ms anyway.
- **Network:** India's median mobile download was ~40 Mbps in May 2026 ([Outlook Business](https://www.outlookbusiness.com/news/india-climbs-3-spots-to-56th-in-global-mobile-speed-ranking-for-may-ookla-index-news-296789)). Medians hide weak indoor signal, so we design for Lighthouse "Slow 4G" and test offline for Pitch mode.
- **Best practices we will apply:**
  - The hero image is the LCP element: preloaded (`priority`), AVIF/WebP, sized responsively. No hero video on mobile.
  - Hero headline animation in **CSS only**, so it runs before JS loads. GSAP/Lenis load **after** first paint (dynamic import on idle), and never on reduced motion.
  - Animate only `transform`/`opacity`. No layout-triggering animation, no scroll listeners doing layout reads.
  - Fonts: 2 families, variable, subset, `display: swap` with metric-matched fallbacks (next/font does this) to keep CLS ~0.
  - All below-the-fold images are lazy and have explicit sizes. Blur placeholders.
  - Server Components by default. Client JS only for the islands that need it (menu, theme toggle, FAQ, form, gallery, pitch).
  - A hand-written service worker for `/pitch` and `/demo/studio`, so they keep working offline.

---

## 6. Colour and type direction (proposal)

There is no logo, so this follows the brief's fallback. Contrast is verified by script in Phase 2.

| Token | Light | Dark | Why |
|---|---|---|---|
| `bg` (paper) | `#F6F3EC` warm off-white | `#0B1220` ink-navy | Warm paper reads "crafted", not clinical. Navy is softer than black and feels premium on OLED. |
| `surface` | `#FFFFFF` | `#131C2E` | Lifts cards one step without shadows everywhere. |
| `ink` | `#0E1830` deep ink-navy | `#F3EEE4` warm white | High contrast both ways. Warm white avoids blue-glare in dark mode. |
| `muted` | `#4B5568` | `#A9B2C3` | Secondary text that still passes AA (not the grey-on-grey trap). |
| `accent` (marigold) | fill `#F2A516`, text-safe `#8C5600` | `#FFB833` | Marigold nods to Indian festive and wedding culture and to golden-hour light. It is used for fills and highlights, never large text on paper. |
| `accent-2` (optional) | `#1F3A5F` slate-indigo | `#7FA3D6` | Rare use: links/focus where marigold would clash. Not a gradient partner. |
| `success` / `error` | `#1D7A46` / `#B42318` | `#4CC38A` / `#FF7A6B` | Semantic only. |

**Typefaces (Google Fonts via `next/font`, open licence)**
- **Display: Fraunces** (variable, optical-size axis). A warm, characterful serif that makes ₹13,999 look premium at large sizes, and its "soft" axis lets us dial back quirkiness. Used only for headlines and big numbers.
- **Body: Instrument Sans** (variable). Neutral, very legible at small sizes on low-DPI Android, and modern without being the default Inter/Geist look.
- **Devanagari fallback: Noto Sans Devanagari**, loaded with `preload: false` and a `unicode-range`, so it downloads only if Hindi text appears.

---

## 7. Tagline options

1. Fixed price. Built in days. Yours to keep.
2. Websites that send customers to your WhatsApp.
3. Your business, rebuilt for the web.
4. A proper website, without the guesswork.
5. Built to be found. Built to be trusted.

**Pick: #1, "Fixed price. Built in days. Yours to keep."** It answers the three biggest objections (cost, time, ownership) in six words. Kept in `/src/content` so you can change it.
