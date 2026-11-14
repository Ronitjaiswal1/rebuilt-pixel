# Launch guide

Steps to take the site from the preview to your own domain. Allow about an hour, plus DNS wait time.

## 1. Put the code on Vercel

1. Push this repository to GitHub (private is fine).
2. In Vercel: **Add New → Project → Import** the repository. Framework: Next.js (auto-detected). No build settings to change.
3. If a temporary preview was created from the CLI, you can claim it from the link Vercel printed. Importing from Git is better, though, because every push then deploys automatically.

## 2. Environment variables

Vercel → Project → **Settings → Environment Variables**. Add them for *Production* (and *Preview* if you want the form working on previews). The full list with comments is in `.env.example`.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.yourdomain.in` (no trailing slash) |
| `RESEND_API_KEY` | From Resend (step 4) |
| `ENQUIRY_TO_EMAIL` | Where enquiries should land, e.g. your Gmail. Comma-separate for several. |
| `ENQUIRY_FROM_EMAIL` | `Rebuilt Pixel <enquiries@yourdomain.in>` (must be on your verified domain) |
| `LEAD_WEBHOOK_URL` | Optional. A Google Apps Script web-app URL that appends leads to a Sheet. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Optional. A consent notice appears automatically if either is set. |

Redeploy after changing variables (Deployments → ⋯ → Redeploy).

## 3. Connect your domain

1. Buy the domain **in the business's own name** (we tell clients the same).
2. Vercel → Project → **Settings → Domains → Add** `yourdomain.in` and `www.yourdomain.in`. Choose `www` as primary (or the other way round) and redirect the other.
3. At your registrar, add the DNS records Vercel shows (usually an `A` record for the apex and a `CNAME` for `www`). HTTPS is issued automatically.
4. Set `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy. This updates canonical links, the sitemap, OG images and QR codes.

## 4. Email sending (Resend)

1. Create a Resend account. **Domains → Add domain** → add the DNS records it gives you (SPF, DKIM) at your registrar → wait for "Verified".
2. **API Keys → Create** (sending access only) → paste into `RESEND_API_KEY`.
3. Set `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL`, redeploy.
4. Test: submit the form on `/contact`. You should get an email with a "Reply on WhatsApp" link. Each lead is also logged in Vercel → Project → **Logs** (search `[enquiry] lead`).

Without Resend or a webhook, the live form shows a friendly error and offers WhatsApp, so no lead is lost silently.

## 5. Google Search Console

1. search.google.com/search-console → **Add property → Domain** → verify with the DNS TXT record.
2. **Sitemaps** → submit `https://www.yourdomain.in/sitemap.xml`.
3. **URL inspection** → request indexing for `/`, `/pricing` and `/for/photographers`.

## 6. Google Business Profile

1. business.google.com → create the profile for Rebuilt Pixel. Category: "Website designer". As a service-area business, hide your address if you work from home and set service areas.
2. Add the website URL, WhatsApp number, hours, the three plans as Products/Services (with prices), and a few photos (logo, workspace, screenshots of concept work labelled as concept).
3. Ask your first real clients for reviews there, and only real ones.

## 7. Analytics

- **Vercel Analytics**: Project → **Analytics → Enable**. It's cookieless and already in the code.
- **Plausible** (optional, cookieless): add the site in Plausible and set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- **GA4 / Meta Pixel** (optional): set the IDs; the consent notice handles the rest.

## 8. Before a pitch meeting

1. Open `https://yourdomain.in/pitch` on the laptop/phone you'll present with, **while online**. Wait a few seconds, then open the demo once. The service worker now caches Pitch mode and the demo.
2. For a personalised pitch: `/pitch?client=Studio%20Name` (or type the name on the first slide). The name carries to pricing, WhatsApp messages and the PDF.
3. Keys: → / Space next, ← back, Home / End, F for full screen. Swipe on phones.

## 9. Final checks after launch

- Run PageSpeed Insights on `/`, `/pricing`, `/for/photographers` (mobile).
- Tap every WhatsApp button on a phone and check the number and message.
- Submit one test enquiry.
- Share a link on WhatsApp to check the preview image.
