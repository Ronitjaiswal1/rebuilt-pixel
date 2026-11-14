"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/icons";

type Theme = "light" | "dark";
const KEY = "rp:theme";

function current(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  mq.addEventListener("change", cb);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", cb);
  };
}

/** Inline script for <head>: applies the saved theme before first paint. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, current, () => "light");
  const isDark = theme === "dark";

  const toggle = () => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: theme still applies for this page */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Dark theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-sunken ${className}`}
      data-cursor="link"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
