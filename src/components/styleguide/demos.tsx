"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { SplitHeadline } from "@/components/ui/split-headline";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => toast("Thanks! Your enquiry is in.", "success")}>
        <span>Success toast</span>
      </button>
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => toast("Couldn't send. Try WhatsApp.", "error")}>
        <span>Error toast</span>
      </button>
    </div>
  );
}

/** Replays the split-text headline and shows a magnetic button. */
export function MotionDemo() {
  const [run, setRun] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="card p-8">
        <p className="text-step--1 text-muted">Split-text headline (CSS, runs before JS, off under reduced motion)</p>
        <div key={run}>
          <SplitHeadline as="p" text="Fixed price. Built in days." className="display mt-4 text-step-5" accentWords={["days"]} />
        </div>
        <button type="button" className="btn btn-primary btn-sm mt-6" onClick={() => setRun((n) => n + 1)}>
          <span>Replay</span>
        </button>
      </div>
      <div className="card grid place-items-center p-8">
        <p className="mb-6 text-step--1 text-muted">Magnetic button (desktop, fine pointer)</p>
        <button type="button" className="btn btn-accent btn-lg" data-magnetic>
          <span>Move your pointer here</span>
        </button>
        <div className="mt-8 h-24 w-full overflow-hidden rounded-md bg-sunken" data-reveal>
          <p className="p-4 text-step--1 text-muted">This box uses data-reveal: it fades up once when scrolled into view.</p>
        </div>
      </div>
    </div>
  );
}
