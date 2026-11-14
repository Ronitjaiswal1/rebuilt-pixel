"use client";

import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const CONSENT_KEY = "rp:consent";
/** Set automatically by Vercel at build time; absent locally and on other hosts. */
const ON_VERCEL = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);

/**
 * Analytics.
 * - Vercel Analytics: cookieless, always on in production (no consent needed).
 * - Plausible: optional, cookieless, via NEXT_PUBLIC_PLAUSIBLE_DOMAIN.
 * - Google Analytics / Meta Pixel: placeholder slots. They set cookies, so they
 *   only load after the visitor accepts the consent notice, and the notice only
 *   appears when one of them is configured.
 */
export function Analytics() {
  const needsConsent = Boolean(GA_ID || META_PIXEL_ID);
  const [consent, setConsent] = useState<"granted" | "denied" | "unknown">("unknown");

  useEffect(() => {
    if (!needsConsent) return;
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a persisted choice once on mount
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {
      /* storage blocked: treat as unknown */
    }
  }, [needsConsent]);

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {ON_VERCEL ? <VercelAnalytics /> : null}
      {PLAUSIBLE_DOMAIN ? (
        <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="lazyOnload" />
      ) : null}

      {consent === "granted" && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {consent === "granted" && META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {needsConsent && consent === "unknown" ? (
        <div
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-lg rounded-md border border-line bg-surface p-5 text-step--1 shadow-lg"
        >
          <p>
            We use cookies for analytics to see which pages help visitors. No cookies are set unless you accept.{" "}
            <a href="/privacy" className="underline">
              Privacy policy
            </a>
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => choose("granted")}>
              <span>Accept</span>
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => choose("denied")}>
              <span>Decline</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
