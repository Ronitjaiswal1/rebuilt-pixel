import type { ReactNode } from "react";
import { SplitHeadline } from "@/components/ui/split-headline";

/** Inner-page hero: eyebrow, split headline, intro, optional actions. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+5rem)]">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
          <p className="eyebrow rise">{eyebrow}</p>
          <SplitHeadline text={title} className="display mt-5 text-step-6" />
          {intro ? (
            <p className="lede rise mt-6" style={{ ["--delay" as string]: "380ms" }}>
              {intro}
            </p>
          ) : null}
          {children ? (
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ["--delay" as string]: "460ms" }}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="rise lg:col-span-4" style={{ ["--delay" as string]: "300ms" }}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
