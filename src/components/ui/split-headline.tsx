import type { ElementType } from "react";

/**
 * Split-text headline rendered on the server. Each word rises inside its own
 * clipped box using a CSS animation, so it runs before any JS and the final
 * (natural) state is fully visible. Reduced motion disables it in CSS.
 */
export function SplitHeadline({
  text,
  as: Tag = "h1",
  className = "",
  startIndex = 0,
  accentWords = [],
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  startIndex?: number;
  accentWords?: string[];
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag className={`split-root ${className}`} id={id} aria-label={text}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?]/g, "");
        const accent = accentWords.includes(clean);
        return (
          <span key={`${word}-${i}`} aria-hidden="true">
            <span className="split-word">
              <span
                style={{ ["--i" as string]: i + startIndex }}
                className={accent ? "text-accent-text" : undefined}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
