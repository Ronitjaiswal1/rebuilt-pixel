import type { ReactNode } from "react";
import { Cormorant_Garamond } from "next/font/google";
import "../demo.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function StudioSiteLayout({ children }: { children: ReactNode }) {
  return <div className={`${cormorant.variable} studio`}>{children}</div>;
}
