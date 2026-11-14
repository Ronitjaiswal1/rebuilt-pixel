import { Check, Minus } from "@/components/ui/icons";
import { comparison, plans, type Cell } from "@/content/plans";
import { formatINR } from "@/lib/format";

function CellView({ value }: { value: Cell }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto text-success" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto text-line-strong" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="font-medium">{value}</span>;
}

/**
 * Full feature comparison. Sticky first column and horizontal scroll on small
 * screens; the scroll container is focusable so keyboard users can scroll it.
 */
export function ComparisonTable() {
  return (
    <div
      className="relative -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:thin] md:mx-0 md:px-0"
      tabIndex={0}
      role="region"
      aria-label="Plan comparison table, scrolls sideways on small screens"
    >
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-step--1">
        <caption className="sr-only">Features included in each plan</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-20 w-[38%] min-w-[180px] border-b border-line bg-bg py-4 pr-4 text-left align-bottom font-semibold"
            >
              Feature
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={`border-b border-line px-3 py-4 text-center align-bottom ${
                  p.featured ? "rounded-t-md bg-sunken" : ""
                }`}
              >
                <span className="block font-display text-step-1">{p.name}</span>
                <span className="num block font-normal text-muted">{formatINR(p.price)}</span>
              </th>
            ))}
          </tr>
        </thead>
        {comparison.map((group) => (
          <tbody key={group.group}>
            <tr>
              <th
                scope="colgroup"
                colSpan={4}
                className="sticky left-0 z-10 bg-bg pb-2 pt-8 text-left text-step--2 font-semibold uppercase tracking-[0.12em] text-accent-text"
              >
                {group.group}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="group">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-b border-line bg-bg py-3.5 pr-4 text-left font-normal shadow-[8px_0_12px_-12px_rgb(0_0_0/0.3)] md:shadow-none"
                >
                  {row.label}
                </th>
                {plans.map((p) => (
                  <td
                    key={p.id}
                    className={`border-b border-line px-3 py-3.5 text-center ${p.featured ? "bg-sunken" : ""}`}
                  >
                    <CellView value={row.values[p.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
