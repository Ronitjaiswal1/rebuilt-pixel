/**
 * Pitch mode slides, in order: the problem, what we build, a demo,
 * the three plans, how we work, then WhatsApp.
 * `{client}` in any string is replaced with the prospect's name when set.
 */
export const pitch = {
  cover: {
    kicker: "Rebuilt Pixel",
    title: "A website that works as hard as you do.",
    preparedFor: "Prepared for",
    placeholder: "Business name",
  },
  problem: {
    kicker: "The problem",
    title: "Your next customer is searching right now.",
    points: [
      { big: "Google", small: "is where people check you before they call. Instagram posts don't show up there." },
      { big: "Phone", small: "is how they'll see your site. If it's slow or broken, they leave." },
      { big: "\"Price?\"", small: "is the question you answer all day. A clear page answers it for you." },
    ],
  },
  build: {
    kicker: "What we build",
    title: "A fast website that turns visitors into WhatsApp chats.",
    points: [
      "Looks right on every phone",
      "Your services, prices and photos in one place",
      "WhatsApp button and enquiry form on every page",
      "Set up for Google and Google Maps",
      "Domain in your name. You own it.",
    ],
  },
  demo: {
    kicker: "See it working",
    title: "A concept site for a photo studio. Try it on your phone.",
    body: "Galleries, packages, booking enquiries and WhatsApp, exactly as we'd build them for you.",
    cta: "Open the live demo",
  },
  plans: {
    kicker: "Plans",
    title: "Three fixed prices.",
  },
  process: {
    kicker: "How we work",
    title: "Live in days, not months.",
  },
  close: {
    kicker: "Next step",
    title: "Let's start with a WhatsApp message.",
    body: "Pick a plan, send your content, and your website goes live in 7, 12 or 25 days.",
  },
} as const;
