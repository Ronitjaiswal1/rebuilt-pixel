"use client";

import { useEffect, useRef, useState } from "react";
import { Expand, Laptop, Phone } from "@/components/ui/icons";

type Mode = "phone" | "laptop";
const SIZES: Record<Mode, { w: number; h: number }> = {
  phone: { w: 390, h: 844 },
  laptop: { w: 1440, h: 900 },
};

/**
 * Shows the concept site inside a phone or laptop frame. The iframe renders at
 * the real device width and is scaled to fit, so the layout is genuinely the
 * phone or desktop layout, not a squeezed one.
 */
export function DeviceViewer({ src, title }: { src: string; title: string }) {
  const [mode, setMode] = useState<Mode>("laptop");
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Default to the phone frame on narrow screens.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial choice depends on the viewport
    if (window.innerWidth < 900) setMode("phone");
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      const { w, h } = SIZES[mode];
      const pad = mode === "phone" ? 28 : 40;
      const bezel = mode === "phone" ? 24 : 32;
      const sw = stage.clientWidth - pad;
      const sh = stage.clientHeight - pad;
      setScale(Math.min(1, sw / (w + bezel), sh / (h + bezel + (mode === "laptop" ? 28 : 0))));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [mode]);

  const { w, h } = SIZES[mode];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-center gap-2 py-3">
        <div role="group" aria-label="Device frame" className="inline-flex rounded-full border border-line bg-surface p-1">
          {(
            [
              { id: "phone", label: "Phone", icon: <Phone /> },
              { id: "laptop", label: "Laptop", icon: <Laptop /> },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-step--1 font-semibold transition-colors aria-pressed:bg-ink aria-pressed:text-bg"
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
        <a href={src} className="btn btn-secondary btn-sm">
          <Expand />
          <span>Full screen</span>
        </a>
      </div>

      <div ref={stageRef} className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          {mode === "phone" ? (
            <div className="rounded-[56px] bg-[#0b0f18] p-3 shadow-lg ring-1 ring-black/40">
              <div className="relative overflow-hidden rounded-[44px] bg-white" style={{ width: w, height: h }}>
                <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-7 w-28 -translate-x-1/2 rounded-full bg-[#0b0f18]" />
                <iframe src={src} title={title} className="block size-full border-0" style={{ width: w, height: h }} />
              </div>
            </div>
          ) : (
            <div>
              <div className="rounded-t-[22px] bg-[#0b0f18] p-4 pb-5 shadow-lg ring-1 ring-black/40">
                <div className="overflow-hidden rounded-md bg-white" style={{ width: w, height: h }}>
                  <iframe src={src} title={title} className="block border-0" style={{ width: w, height: h }} />
                </div>
              </div>
              <div className="mx-auto h-7 rounded-b-[18px] bg-gradient-to-b from-[#c9ccd3] to-[#9ea3ad]" style={{ width: w + 120, marginLeft: -60 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
