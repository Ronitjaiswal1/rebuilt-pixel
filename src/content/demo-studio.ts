import type { StaticImageData } from "next/image";
import coupleWalk from "@/assets/photos/couple-walk.jpg";
import coupleRiver from "@/assets/photos/couple-river.jpg";
import coupleLights from "@/assets/photos/couple-lights.jpg";
import couplePath from "@/assets/photos/couple-path.jpg";
import couplePalace from "@/assets/photos/couple-palace.jpg";
import couplePetals from "@/assets/photos/couple-petals.jpg";
import mandapDay from "@/assets/photos/mandap-day.jpg";
import mandapHall from "@/assets/photos/mandap-hall.jpg";
import venueAisle from "@/assets/photos/venue-aisle.jpg";
import hennaHands from "@/assets/photos/henna-hands.jpg";
import brideRed from "@/assets/photos/bride-red.jpg";
import bridePink from "@/assets/photos/bride-pink.jpg";
import sareePortrait from "@/assets/photos/saree-portrait.jpg";
import portraitWindow from "@/assets/photos/portrait-window.jpg";
import maternitySunset from "@/assets/photos/maternity-sunset.jpg";
import maternityField from "@/assets/photos/maternity-field.jpg";
import maternityHands from "@/assets/photos/maternity-hands.jpg";
import babyHat from "@/assets/photos/baby-hat.jpg";
import babyStudio from "@/assets/photos/baby-studio.jpg";
import newbornFeet from "@/assets/photos/newborn-feet.jpg";

/**
 * Content for the /demo/studio concept site. The studio is FICTIONAL.
 * Every page that shows it must carry the "Concept design" label.
 */
export const studio = {
  name: "Aangan Studio",
  kicker: "Photographs and films",
  city: "Your city",
  heroLine: "Weddings, families and the quiet moments in between.",
  intro:
    "We photograph people the way they are with each other: candid, warm and unhurried. Based in your city, travelling across India.",
  disclaimer:
    "Concept design by Rebuilt Pixel. Aangan Studio is a fictional studio. Photos from Unsplash, credited on our credits page. Prices are samples.",
};

export type Category = "weddings" | "pre-wedding" | "portraits" | "maternity" | "newborn";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "weddings", label: "Weddings" },
  { id: "pre-wedding", label: "Pre-wedding" },
  { id: "portraits", label: "Portraits" },
  { id: "maternity", label: "Maternity" },
  { id: "newborn", label: "Newborn" },
];

export type Photo = { src: StaticImageData; alt: string; category: Category; credit: string };

export const gallery: Photo[] = [
  { src: coupleLights, alt: "Bride and groom smiling together in front of warm fairy lights", category: "weddings", credit: "ARTO SURAJ" },
  { src: coupleRiver, alt: "Couple in red and gold wedding outfits standing by a river", category: "pre-wedding", credit: "Sean Williams" },
  { src: hennaHands, alt: "Close-up of two hands with bridal henna and gold bangles", category: "weddings", credit: "Love Arya" },
  { src: brideRed, alt: "Bride in a red lehenga with gold jewellery and a sheer veil", category: "portraits", credit: "Alok Verma" },
  { src: maternitySunset, alt: "Expecting mother holding her bump in golden evening light", category: "maternity", credit: "Alexander Mass" },
  { src: mandapDay, alt: "Wedding ceremony under a pink floral mandap on a sunny terrace", category: "weddings", credit: "AMISH THAKKAR" },
  { src: couplePath, alt: "Couple embracing on a leafy village road", category: "pre-wedding", credit: "iKshana Productions" },
  { src: babyStudio, alt: "Baby lying on a soft mauve backdrop, looking at the camera", category: "newborn", credit: "Adele Morris" },
  { src: sareePortrait, alt: "Woman in a pink and orange silk saree leaning against a tree", category: "portraits", credit: "Sabesh Photography LTD" },
  { src: couplePalace, alt: "Bride and groom in embroidered outfits posing in a palace courtyard", category: "weddings", credit: "ARTO SURAJ" },
  { src: maternityField, alt: "Expecting mother in a meadow at sunset", category: "maternity", credit: "Devon Divine" },
  { src: newbornFeet, alt: "A parent's hands cradling a newborn's tiny feet", category: "newborn", credit: "Jametlene Reskp" },
  { src: couplePetals, alt: "Couple exchanging rings as rose petals fall around them", category: "weddings", credit: "shades by 43" },
  { src: bridePink, alt: "Smiling bride in a pink dupatta with a gold nose ring", category: "portraits", credit: "Aayush Rawat" },
  { src: coupleWalk, alt: "Bride and groom walking hand in hand down a tree-lined path", category: "pre-wedding", credit: "iKshana Productions" },
  { src: maternityHands, alt: "Silhouetted couple holding hands against a low sun", category: "maternity", credit: "Jametlene Reskp" },
  { src: mandapHall, alt: "Grand indoor wedding stage with a chandelier and flowers", category: "weddings", credit: "AMISH THAKKAR" },
  { src: babyHat, alt: "Smiling baby in a white knitted hat", category: "newborn", credit: "kabita Darlami" },
  { src: portraitWindow, alt: "Portrait of a young woman glancing over her shoulder by a window", category: "portraits", credit: "Arnab De" },
  { src: venueAisle, alt: "Outdoor wedding aisle lined with white flowers under a floral dome", category: "weddings", credit: "Vidit Goswami" },
];

export const heroImage = coupleWalk;
export const heroImageAlt = "Bride and groom walking hand in hand down a tree-lined path";
export const aboutImage = coupleRiver;

export type StudioPackage = {
  id: string;
  name: string;
  price: number;
  unit: string;
  blurb: string;
  includes: string[];
  popular?: boolean;
};

export const packages: StudioPackage[] = [
  {
    id: "pre-wedding",
    name: "Pre-wedding",
    price: 35000,
    unit: "per shoot",
    blurb: "A relaxed half-day shoot at a location you love.",
    includes: ["4 hours, 1 location", "1 photographer", "60 edited photos", "1-minute reel"],
  },
  {
    id: "wedding-essentials",
    name: "Wedding Essentials",
    price: 120000,
    unit: "2 days",
    blurb: "The main ceremonies, covered beautifully.",
    includes: ["2 events", "2 photographers, 1 filmmaker", "400 edited photos", "5-minute highlight film", "Online proofing gallery"],
    popular: true,
  },
  {
    id: "wedding-signature",
    name: "Wedding Signature",
    price: 240000,
    unit: "3 days",
    blurb: "Every ritual, from haldi to vidaai.",
    includes: ["Up to 5 events", "3 photographers, 2 filmmakers", "800 edited photos", "Feature film and teaser", "Printed album"],
  },
  {
    id: "maternity-newborn",
    name: "Maternity and newborn",
    price: 18000,
    unit: "per session",
    blurb: "Gentle studio or home sessions.",
    includes: ["2-hour session", "Props and outfits", "30 edited photos", "Safe newborn posing"],
  },
];

export const eventTypes = ["Wedding", "Pre-wedding", "Engagement", "Maternity", "Newborn", "Portraits", "Other"];
