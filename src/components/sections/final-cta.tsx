import { home } from "@/content/pages";
import { site } from "@/content/site";
import { WhatsAppButton, type WaIntent } from "@/components/ui/whatsapp-button";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export function FinalCta({
  title = home.finalCta.title,
  body = home.finalCta.body,
  defaultInterest,
  intent = { type: "general" },
}: {
  title?: string;
  body?: string;
  defaultInterest?: string;
  intent?: WaIntent;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="band-ink section relative overflow-hidden" data-wa-hide>
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="eyebrow">Start here</p>
          <h2 id="final-cta-title" className="display mt-4 text-step-6">
            {title}
          </h2>
          <p className="lede mt-6">{body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <WhatsAppButton size="lg" intent={intent} magnetic>
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
          <p className="mt-4 text-step--1 text-muted">{site.responseTime}</p>
        </div>
        <div className="lg:col-span-6" data-reveal>
          <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
            <h3 className="heading text-step-2">Or leave your details</h3>
            <p className="mt-1 text-step--1 text-muted">We&apos;ll get back to you on WhatsApp.</p>
            <div className="mt-6">
              <EnquiryForm compact idPrefix="cta" defaultInterest={defaultInterest} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
