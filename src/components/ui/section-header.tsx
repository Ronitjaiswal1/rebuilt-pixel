import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "split";
  className?: string;
  id?: string;
  action?: ReactNode;
};

/**
 * Section heading: eyebrow, display title and optional intro.
 * "split" puts the intro beside the title on wide screens.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  align = "start",
  className = "",
  id,
  action,
}: Props) {
  const titleSize = Tag === "h1" ? "text-step-6" : "text-step-5";
  if (align === "split") {
    return (
      <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`} data-reveal>
        <div className="md:col-span-7">
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <Tag id={id} className={`display ${titleSize}`}>
            {title}
          </Tag>
        </div>
        {intro || action ? (
          <div className="md:col-span-5 md:pb-2">
            {intro ? <p className="lede">{intro}</p> : null}
            {action ? <div className="mt-6">{action}</div> : null}
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag id={id} className={`display ${titleSize}`}>
        {title}
      </Tag>
      {intro ? <p className="lede mt-5">{intro}</p> : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
