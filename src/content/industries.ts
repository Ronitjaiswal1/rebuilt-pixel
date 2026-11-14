import type { StaticImageData } from "next/image";
import coupleWalk from "@/assets/photos/couple-walk.jpg";

export type Industry = {
  id: string;
  name: string;
  line: string;
  needs: string[];
  featured?: { href: string; image: StaticImageData; imageAlt: string };
};

export const industries: Industry[] = [
  {
    id: "photographers",
    name: "Photo and video studios",
    line: "Galleries that load fast, packages people can compare, and booking enquiries that land on WhatsApp.",
    needs: ["Galleries by shoot type", "Packages page", "Date and city enquiry form", "Private proofing galleries"],
    featured: {
      href: "/for/photographers",
      image: coupleWalk,
      imageAlt: "A bride and groom in red wedding outfits walking hand in hand down a tree-lined path",
    },
  },
  {
    id: "clinics",
    name: "Clinics and dentists",
    line: "Show your doctors, timings and treatments clearly, and let patients request an appointment in a tap.",
    needs: ["Doctor profiles", "Timings and location", "Appointment requests", "Treatment pages"],
  },
  {
    id: "salons",
    name: "Salons and spas",
    line: "A price list people can actually read, before-and-after galleries, and booking requests on WhatsApp.",
    needs: ["Service menu with prices", "Gallery", "Booking requests", "Offers section"],
  },
  {
    id: "restaurants",
    name: "Restaurants and cafés",
    line: "Your menu, photos and location in one fast page, with table bookings and delivery links up front.",
    needs: ["Menu page", "Photo gallery", "Table enquiries", "Delivery app links"],
  },
  {
    id: "coaches",
    name: "Coaches and trainers",
    line: "Explain your programmes, show your results honestly, and turn visitors into discovery calls.",
    needs: ["Programme pages", "Session booking", "About and credentials", "Lead form"],
  },
  {
    id: "shops",
    name: "Local shops",
    line: "Let your neighbourhood see what you stock, when you're open and how to order on WhatsApp.",
    needs: ["Product highlights", "Opening hours and map", "WhatsApp ordering", "Google Business Profile"],
  },
  {
    id: "startups",
    name: "Startups",
    line: "A sharp launch site that explains the product in one scroll and collects early sign-ups.",
    needs: ["Product story", "Waitlist or sign-up", "Pricing page", "Analytics"],
  },
];
