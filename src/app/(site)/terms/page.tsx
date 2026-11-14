import Link from "next/link";
import { site } from "@/content/site";
import { plans, domainHostingNote } from "@/content/plans";
import { formatINR } from "@/lib/format";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = pageMeta({
  title: "Terms",
  description: "Plain-language terms for Rebuilt Pixel website projects: prices, payments, revisions, ownership and support.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="14 November 2026">
      <p>
        These terms apply when you hire {site.name} to design or build a website. Before we start, we confirm your
        plan, price and timeline in writing (usually on WhatsApp and by invoice). If anything in that written
        confirmation differs from these terms, the written confirmation applies.
      </p>

      <h2>Plans and prices</h2>
      <ul>
        {plans.map((p) => (
          <li key={p.id}>
            <strong>{p.name}:</strong> {formatINR(p.price)}, {p.pages.toLowerCase()}, {p.deliveryDays}-day delivery,{" "}
            {p.revisions.toLowerCase()}, {p.support.toLowerCase()}.
          </li>
        ))}
      </ul>
      <p>
        {domainHostingNote} Full details are on the <Link href="/pricing">pricing page</Link>. Custom projects are
        quoted separately in writing.
      </p>

      <h2>Payments</h2>
      <p>
        Payment is made in milestones: a part to start the work, and the balance before the site goes live. We accept
        UPI and bank transfer and issue an invoice for every payment. The exact split is confirmed before we start.
      </p>

      <h2>Timelines</h2>
      <p>
        Delivery times are counted in days from when we receive your content (logo, photos, text and details from our
        checklist). Delays in content or feedback move the delivery date by the same amount.
      </p>

      <h2>Revisions and scope</h2>
      <p>
        Each plan includes a set number of revision rounds. A round is one consolidated list of changes. &ldquo;Unlimited
        revisions within scope&rdquo; on Signature means changes to the agreed pages and features, not new features or
        pages beyond what was agreed. Extra work outside scope is quoted before we do it.
      </p>

      <h2>Ownership</h2>
      <ul>
        <li>Your domain is registered in your name, and hosting is set up on your account.</li>
        <li>
          Once paid in full, the design and content of your website belong to you. We may show the finished site in our
          portfolio unless you ask us not to.
        </li>
        <li>
          You confirm that you have the right to use the photos, logos and text you send us. Where we supply images,
          we use licensed or free-licence sources.
        </li>
      </ul>

      <h2>Support</h2>
      <p>
        Your support period starts on launch day. During it we fix bugs and make small content edits. Support does not
        include new pages or features, which can be quoted separately.
      </p>

      <h2>Cancellations and refunds</h2>
      <p>
        {/* TODO: confirm the cancellation and refund policy (docs/TODO.md). */}
        If you cancel before we start design work, we refund the advance. After design work begins, the advance covers
        the work done. We will always discuss this with you openly before any decision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Message us on WhatsApp{site.email ? ` or email ${site.email}` : ""}.
      </p>
    </LegalPage>
  );
}
