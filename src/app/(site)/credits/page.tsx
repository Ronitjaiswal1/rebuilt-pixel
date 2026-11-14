import { credits } from "@/content/credits";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Image credits",
  description: "Credits for the photographs used in Rebuilt Pixel concept designs.",
  path: "/credits",
});

export default function CreditsPage() {
  return (
    <section className="pb-[var(--section-y)] pt-[calc(var(--header-h)+3.5rem)]">
      <div className="container-x">
        <p className="eyebrow">Credits</p>
        <h1 className="display mt-4 text-step-6">Image credits</h1>
        <p className="lede mt-5">
          Photos in our concept designs come from Unsplash, used under the{" "}
          <a href="https://unsplash.com/license" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
            Unsplash License
          </a>
          . They are self-hosted, not hotlinked, and they do not show our clients. Thank you to these photographers.
        </p>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((c) => (
            <li key={c.file} className="bg-surface p-5">
              <p className="font-semibold">
                <a href={c.profile} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {c.photographer}
                </a>
              </p>
              <p className="mt-1 text-step--1 text-muted">
                <a href={c.photo} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  View photo on Unsplash
                </a>{" "}
                · <span className="font-mono text-step--2">{c.file}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-step--1 text-muted">
          Typefaces: Fraunces, Instrument Sans, Cormorant Garamond and Noto Sans, all under the SIL Open Font License.
        </p>
      </div>
    </section>
  );
}
