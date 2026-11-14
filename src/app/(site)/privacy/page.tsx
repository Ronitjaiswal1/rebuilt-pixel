import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "What information Rebuilt Pixel collects, why, and how you can ask us to delete it.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="14 November 2026">
      <p>
        This policy explains what information {site.name} (&ldquo;we&rdquo;) collects when you use this website or
        contact us, why we collect it, and your choices. We aim to follow India&apos;s Digital Personal Data Protection
        Act, 2023.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiry form:</strong> your name, WhatsApp number, and anything else you choose to share (email,
          type of business, what you&apos;re interested in, your message), plus the page you sent it from.
        </li>
        <li>
          <strong>WhatsApp:</strong> if you message us, WhatsApp shares your number and the messages you send. WhatsApp
          is run by Meta under its own privacy policy.
        </li>
        <li>
          <strong>Visit statistics:</strong> we use privacy-friendly analytics that do not use cookies and do not
          identify you personally. We see things like which pages were viewed and the type of device.
        </li>
        <li>
          <strong>Server logs:</strong> our hosting provider keeps short-term technical logs (such as IP address and
          browser type) to keep the site secure and working.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and discuss your project.</li>
        <li>To send quotes, invoices and project updates if you become a client.</li>
        <li>To understand which pages are useful, so we can improve the site.</li>
        <li>To protect the site from spam and abuse.</li>
      </ul>
      <p>We do not sell your information, and we do not use it for unrelated marketing.</p>

      <h2>Who we share it with</h2>
      <p>
        Only the services we need to run this website and reply to you: our hosting provider, our email delivery
        provider (which forwards form enquiries to our inbox), and WhatsApp if you contact us there. Each processes data
        under its own terms.
      </p>

      <h2>Cookies</h2>
      <p>
        This site does not set advertising or tracking cookies by default. It stores small preferences on your device,
        such as your light or dark theme choice. If we ever add analytics that use cookies, we will ask for your consent
        first.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to respond and for a reasonable period after, usually no longer than two
        years unless you become a client. Client records are kept as required for accounting and tax purposes.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to show, correct or delete the personal information we hold about you, or withdraw consent. Send
        the request on WhatsApp{site.email ? ` or to ${site.email}` : ""}. We will respond within a reasonable time.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>
    </LegalPage>
  );
}
