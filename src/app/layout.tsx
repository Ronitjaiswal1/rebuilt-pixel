import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Noto_Sans_Devanagari } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { themeScript } from "@/components/layout/theme-toggle";
import { Analytics } from "@/components/analytics/analytics";

// Self-hosted Fraunces cut to what the site uses: Basic Latin + ₹ and a few
// punctuation marks, weight 400–700, optical size 14–144 (41 KB vs 66 KB +
// a 58 KB latin-ext file from Google). See docs/DECISIONS.md.
const fraunces = localFont({
  src: "../assets/fonts/Fraunces-RP.woff2",
  variable: "--font-fraunces",
  weight: "400 700",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Only fetched if Devanagari characters appear on a page (unicode-range).
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "website design for small business India",
    "affordable website designer India",
    "website for photographers",
    "fixed price website",
    "WhatsApp website",
  ],
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${instrument.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
