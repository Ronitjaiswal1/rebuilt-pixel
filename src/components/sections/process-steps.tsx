import { steps } from "@/content/process";

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
      {steps.map((s) => (
        <li key={s.n} className="relative flex flex-col bg-surface p-6 sm:p-8">
          <div className="flex items-baseline justify-between">
            <span className="num font-display text-step-6 leading-none text-accent-text">{s.n}</span>
            <span className="chip">{s.when}</span>
          </div>
          <h3 className="heading mt-8 text-step-3">{s.title}</h3>
          <p className="mt-3 text-step--1 text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
