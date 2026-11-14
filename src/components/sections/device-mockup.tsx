import Image from "next/image";
import desktopLong from "@/assets/screens/studio-desktop-long.jpg";
import phoneLong from "@/assets/screens/studio-phone-long.jpg";
import { WhatsAppGlyph } from "@/components/ui/icons";

/**
 * Laptop + phone showing the Aangan Studio concept. The screens slowly scroll
 * (CSS transform animation, off under reduced motion). Imagery is a real
 * screenshot of /demo/studio, so it shows exactly what we built.
 */
export function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] pb-10 pl-6 sm:pl-10" aria-hidden="false">
      <figure className="m-0">
        {/* Laptop */}
        <div className="relative">
          <div className="rounded-t-[18px] bg-[#0b0f18] p-[2.2%] pb-[2.8%] shadow-lg ring-1 ring-black/30">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[#f5f0e8]">
              <div className="animate-screen absolute inset-x-0 top-0" style={{ ["--scroll-to" as string]: "-58%" }}>
                <Image
                  src={desktopLong}
                  alt="The Aangan Studio concept website on a laptop: a wedding photo hero, studio intro and photo gallery"
                  sizes="(min-width: 1024px) 560px, 90vw"
                  quality={70}
                  placeholder="blur"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
          <div className="mx-[-7%] h-3 rounded-b-[14px] bg-gradient-to-b from-[#cfd2d8] to-[#9aa0aa] sm:h-4" />
        </div>

        {/* Phone */}
        <div className="animate-float absolute -bottom-2 -left-0 w-[30%] min-w-[118px] sm:-left-2">
          <div className="rounded-[26px] bg-[#0b0f18] p-[5%] shadow-lg ring-1 ring-black/40">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[20px] bg-[#f5f0e8]">
              <div
                className="animate-screen absolute inset-x-0 top-0"
                style={{ ["--scroll-to" as string]: "-62%", animationDelay: "-3s" }}
              >
                <Image
                  src={phoneLong}
                  alt="The same concept website on a phone"
                  sizes="180px"
                  quality={70}
                  placeholder="blur"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry preview chip — illustrates the concept's WhatsApp flow */}
        <div
          className="fade-up absolute -right-1 top-[56%] hidden max-w-[15rem] items-start gap-3 rounded-md border border-line bg-surface/95 p-3 text-left shadow-md backdrop-blur sm:flex"
          style={{ ["--delay" as string]: "900ms" }}
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-whatsapp text-on-whatsapp">
            <WhatsAppGlyph size={18} />
          </span>
          <span className="text-step--2 leading-snug">
            <span className="block font-semibold">New enquiry</span>
            <span className="text-muted">&ldquo;Is 14 Feb free for a wedding in Jaipur?&rdquo;</span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.1em] text-muted">Concept demo</span>
          </span>
        </div>

        <figcaption className="absolute -bottom-0 right-0 text-step--2 text-muted">
          <span className="tag-concept">Concept design</span>
        </figcaption>
      </figure>
    </div>
  );
}
