# To do: what only you can supply or decide

Each item says where to make the change. Most are one line in `src/content/`.

## 1. Contact details (needed before launch)

| What | Where | Effect while empty |
|---|---|---|
| WhatsApp number (digits with country code, e.g. `919876543210`) | `src/content/site.ts` → `whatsappNumber` | WhatsApp buttons open WhatsApp and let the visitor pick a chat. **Set this first.** |
| Email | `site.ts` → `email` | Email rows are hidden |
| Founder name | `site.ts` → `founder` | About page uses "One team, start to finish" |
| City | `site.ts` → `city` | Copy says "across India"; JSON-LD has no city |
| Instagram, LinkedIn URLs | `site.ts` → `socials` | Social links are hidden |
| Registered business name (if different) | `site.ts` → `legalName` | Uses "Rebuilt Pixel" |
| Domain | Vercel env `NEXT_PUBLIC_SITE_URL` | Canonical URLs and QR codes use the Vercel URL |

After setting the WhatsApp number or domain, rebuild so the QR codes in Pitch mode and on the Contact page update.

## 2. Brand

- [ ] **Logo.** `/assets/brand/` did not exist, so the pixel mark is a placeholder (`src/components/brand/logo.tsx`, `src/app/icon.svg`, `scripts/make-icons.mjs`, the PDF in `src/lib/plan-pdf.ts`, OG images in `src/lib/og.tsx`). Send the logo and I'll derive the palette from it and replace all five.
- [ ] Confirm or change the palette (ink-navy, warm paper, marigold) and fonts (Fraunces + Instrument Sans).
- [ ] Confirm the tagline: "Fixed price. Built in days. Yours to keep." (`site.ts` → `tagline`). Hero headline: "Websites that bring customers to your WhatsApp." (`src/content/pages.ts`).

## 3. Business policies I wrote as proposals (please confirm or correct)

These come from the research positioning and are stated on the site:

- [ ] **Payment terms**: milestones (part to start, balance before launch), UPI or bank transfer, invoice for every payment. (`src/content/process.ts`, FAQ, Terms, PDF)
- [ ] **Domain in the client's name, hosting on the client's account, all logins handed over.** (FAQ, About, Pricing, Terms)
- [ ] **Response time**: "We reply on WhatsApp within a few hours on working days." Add working hours if you want them shown. (`site.ts` → `responseTime`)
- [ ] **Cancellation and refunds**: Terms say the advance is refunded if you cancel before design starts. (`src/app/(site)/terms/page.tsx`)
- [ ] **"You only pay the difference"** when upgrading plans. (`pages.ts` → `home.plans.intro`)
- [ ] Domain cost guidance: "a few hundred to about fifteen hundred rupees a year". (`plans.ts` → `domainHostingExplainer`)
- [ ] Pricing for services marked "quoted on WhatsApp" (landing pages, care plans, branding). Add prices in `src/content/services.ts` if you want them shown.

## 4. Proof (never invent these)

- [ ] **Testimonials**: real quotes with the client's name and written permission. Replace `TestimonialPlaceholder` on Work and About (`src/components/sections/testimonial-placeholder.tsx`).
- [ ] **Real client work**: screenshots plus a one-line result. Add to `WorkShowcase` (`src/components/sections/work-showcase.tsx`); the dashed "Your project" card is the slot.
- [ ] **Proof strip**: once you have real proof (reviews, client logos with permission, number of sites launched), swap the "what you get" strip for it (`src/components/sections/proof-strip.tsx`).
- [ ] **Founder photo and short story** for About (placeholder box on the page).
- [ ] Optional: more concept designs (clinic, café, salon) to sit beside Aangan Studio.

## 5. Legal

- [ ] Have a lawyer review **Privacy** and **Terms** (both show a "Draft for legal review" notice; remove it in `src/components/sections/legal-page.tsx` after review).
- [ ] If you add GA4 or Meta Pixel, confirm the consent wording in `src/components/analytics/analytics.tsx`.

## 6. Accounts and launch (see LAUNCH.md)

- [ ] Vercel account and project (claim the preview deployment or deploy from Git)
- [ ] Domain purchase and DNS
- [ ] Resend account, verified sending domain, `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`
- [ ] Google Search Console, sitemap submission
- [ ] Google Business Profile for Rebuilt Pixel
- [ ] Analytics choice (Vercel Analytics is on by default; Plausible / GA4 optional)

## 7. Copy approvals

- [ ] Read every page once in Pitch voice and flag anything that doesn't sound like you. All copy is in `src/content/`.
- [ ] Plan names (Launch, Growth, Signature) are working names (`src/content/plans.ts`).
