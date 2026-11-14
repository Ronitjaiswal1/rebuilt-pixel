/** Copy for /for/photographers — the featured vertical. */
export const photographers = {
  meta: {
    title: "Website for photographers and video studios in India",
    description:
      "Photography websites with fast galleries, packages pages, booking enquiries on WhatsApp and private client galleries. Fixed prices from ₹7,999.",
  },
  eyebrow: "For photo and video studios",
  title: "Your work is beautiful. Your website should be too.",
  intro:
    "Couples and families decide on Instagram, then check your website before they message. We build studio sites that load your galleries fast, show your packages clearly and send booking enquiries to WhatsApp.",
  pains: [
    {
      title: "Your link looks like everyone else's",
      body: "A template portfolio on a builder's subdomain looks the same as every other studio's. Your own domain and a design built around your style don't.",
    },
    {
      title: "Instagram doesn't rank on Google",
      body: "When someone searches \"wedding photographer in my city\", Google shows websites and Business Profiles, not your reels.",
    },
    {
      title: "\"Price?\" in your DMs, all day",
      body: "A clear packages page answers the first question before it's asked, so the enquiries you get are from people who are ready to book.",
    },
  ],
  features: [
    {
      title: "Galleries by shoot type",
      body: "Weddings, pre-wedding, maternity, newborn, events. Each with a full-screen viewer that works with a swipe.",
    },
    {
      title: "Packages page",
      body: "Your packages side by side, with what's included and a WhatsApp button on each one.",
    },
    {
      title: "Booking enquiry form",
      body: "Asks for the date, city and type of shoot, so you can reply with availability straight away.",
    },
    {
      title: "WhatsApp on every page",
      body: "Every button opens a chat with a prefilled message naming the package they were looking at.",
    },
    {
      title: "Films and reels",
      body: "A video section for your wedding films and reels, loaded only when someone presses play.",
    },
    {
      title: "Private proofing galleries",
      body: "On Signature: a password-protected gallery where clients pick their favourites for the album.",
    },
  ],
  fit: [
    { plan: "launch", line: "A clean portfolio with one gallery, your packages and WhatsApp." },
    { plan: "growth", line: "Galleries by shoot type, packages page, films, Instagram feed and Google Business Profile." },
    { plan: "signature", line: "Online booking with advance payment and private client proofing galleries." },
  ],
  faq: [
    {
      q: "Will my photos lose quality on the website?",
      a: "No. We serve modern image formats at the right size for each screen, so photos look sharp on a big monitor and still load quickly on a phone.",
    },
    {
      q: "Can I add new shoots myself?",
      a: "On Signature, yes, through the admin panel. On Launch and Growth, send us the photos on WhatsApp during your support period and we'll add them.",
    },
    {
      q: "Can clients choose photos for their album online?",
      a: "Yes. Private proofing galleries come with the Signature plan.",
    },
  ],
} as const;
