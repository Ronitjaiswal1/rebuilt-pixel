/**
 * FAQ — each answer handles an objection found in research (docs/RESEARCH.md §3).
 * Shown on Home and Pricing, and emitted as FAQPage JSON-LD where shown.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I really need a website if I already have Instagram and WhatsApp?",
    a: "Keep both. A website adds what they can't: it shows up on Google when people search for what you do, it holds your prices and packages in one place, and it sends enquiries straight into your WhatsApp. Think of it as the shop front your Instagram points to.",
  },
  {
    q: "How much does it cost, in total?",
    a: "Launch is ₹7,999, Growth is ₹13,999 and Signature is ₹25,000. That's a one-time price for the design and build. The only extra is your domain and hosting, which we set up and charge at actuals, with the invoice shown. No hidden charges.",
  },
  {
    q: "How long does it take?",
    a: "7 days for Launch, 12 for Growth and 25 for Signature. The clock starts once we have your content: your logo, photos, text and the details we ask for. If you need help with the text, tell us and we'll draft it with you.",
  },
  {
    q: "Who owns the domain and the website?",
    a: "You do. We register the domain in your name and set up hosting on your account. When the project is done you get all the logins. You're never stuck with us.",
  },
  {
    q: "Can I make changes after the site goes live?",
    a: "Yes. Small edits are included during your support period: 1, 3 or 6 months depending on the plan. After that you can take a monthly care plan or ask for changes as you need them. Signature also includes an admin panel so you can update content yourself.",
  },
  {
    q: "How will I update photos, prices or text?",
    a: "On Launch and Growth, you send us the change on WhatsApp and we make it. Signature includes an admin panel and a training session, so you can edit pages, galleries and prices yourself.",
  },
  {
    q: "How do payments work?",
    a: "We split the price into milestones: a part to start, and the balance before the site goes live. You can pay by UPI or bank transfer. You get an invoice for every payment.",
  },
  {
    q: "What happens after launch? Do you disappear?",
    a: "No. Every plan includes support after launch, and we stay on WhatsApp for questions. If something breaks during your support period, we fix it.",
  },
  {
    q: "Will people actually find my website on Google?",
    a: "Every plan includes basic search setup: clear page titles, descriptions and a sitemap submitted to Google. Growth and Signature add local SEO and your Google Business Profile, which is what usually puts a local business on the map for \"near me\" searches. Nobody can honestly promise a #1 ranking, and we won't.",
  },
  {
    q: "I need an online store or a booking system. Can you do that?",
    a: "Yes, as a custom project. Signature already includes bookings with advance payment. For larger stores or web apps, message us what you need and we'll send a written quote before any work starts.",
  },
];
