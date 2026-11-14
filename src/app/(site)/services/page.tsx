import Link from "next/link";
import { servicesPage } from "@/content/pages";
import { pageMeta } from "@/lib/metadata";
import { breadcrumbLd, servicesLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetailList } from "@/components/sections/service-cards";
import { FinalCta } from "@/components/sections/final-cta";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata = pageMeta({ ...servicesPage.meta, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[...servicesLd(), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])]} />
      <PageHero eyebrow={servicesPage.eyebrow} title={servicesPage.title} intro={servicesPage.intro}>
        <Link href="/pricing" className="btn btn-primary">
          <span>See the plans</span>
          <ArrowRight />
        </Link>
        <WhatsAppButton variant="secondary" intent={{ type: "page", page: "services" }}>
          Ask on WhatsApp
        </WhatsAppButton>
      </PageHero>
      <div className="container-x pb-[var(--section-y)]">
        <ServiceDetailList />
      </div>
      <FinalCta />
    </>
  );
}
