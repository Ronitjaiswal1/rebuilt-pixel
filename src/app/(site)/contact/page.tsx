import { contactPage } from "@/content/pages";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { SplitHeadline } from "@/components/ui/split-headline";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Clock, Mail, MapPin } from "@/components/ui/icons";
import { ContactQr } from "@/components/pitch/contact-qr";

export const metadata = pageMeta({ ...contactPage.meta, path: "/contact" });

export default function ContactPage() {
  return (
    <section className="pb-[var(--section-y)] pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow rise">{contactPage.eyebrow}</p>
          <SplitHeadline text={contactPage.title} className="display mt-5 text-step-6" />
          <p className="lede rise mt-6" style={{ ["--delay" as string]: "380ms" }}>
            {contactPage.intro}
          </p>
          <div className="rise mt-10" style={{ ["--delay" as string]: "460ms" }} data-wa-hide>
            <WhatsAppButton size="lg" intent={{ type: "page", page: "contact" }} magnetic>
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
          <ul className="mt-10 space-y-4 text-step--1">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 shrink-0 text-accent-text" />
              <span>{site.responseTime}</span>
            </li>
            {site.email ? (
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-accent-text" />
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-accent-text" />
              <span>
                {site.city ? `Based in ${site.city}. ` : ""}Working with businesses across {site.country}, online and
                on WhatsApp.
              </span>
            </li>
          </ul>
          <div className="mt-10 hidden lg:block">
            <ContactQr />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg border border-line bg-surface p-6 sm:p-10">
            <h2 className="heading text-step-3">{contactPage.formTitle}</h2>
            <p className="mt-2 text-muted">{contactPage.formIntro}</p>
            <div className="mt-8">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
