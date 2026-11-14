export type Step = { n: string; title: string; body: string; when: string };

export const steps: Step[] = [
  {
    n: "01",
    title: "Chat",
    when: "Day 0",
    body: "Message us on WhatsApp. We ask a few questions about your business, suggest the right plan and confirm the price in writing.",
  },
  {
    n: "02",
    title: "Content",
    when: "Day 1",
    body: "You send your logo, photos and details using a simple checklist. We help with the text if you need it. The delivery clock starts here.",
  },
  {
    n: "03",
    title: "Design and build",
    when: "Days 2 to 20",
    body: "We design and build your site and share a preview link. You give feedback on WhatsApp, and we make the revisions in your plan.",
  },
  {
    n: "04",
    title: "Launch",
    when: "Day 7, 12 or 25",
    body: "We connect your domain, set up search and analytics, and hand over every login. Your support period starts on launch day.",
  },
];

export const whatWeNeed = [
  "Your logo, if you have one (we can tidy it up)",
  "Photos of your work, space, team or products",
  "Your services or menu, with prices if you want them shown",
  "Address, timings, phone and WhatsApp number",
  "Links to your Instagram, Google listing or other profiles",
  "Two or three websites you like, for style direction",
];

export const paymentTerms = [
  "Price confirmed in writing before we start",
  "Paid in milestones: a part to start, the balance before launch",
  "UPI or bank transfer, with an invoice for every payment",
  "Domain and hosting billed at actuals, invoice shown",
];
