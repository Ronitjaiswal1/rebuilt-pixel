import Image from "next/image";
import Link from "next/link";
import desktop from "@/assets/screens/studio-desktop.jpg";
import packagesShot from "@/assets/screens/studio-packages.jpg";
import galleryPhone from "@/assets/screens/studio-gallery-phone.jpg";
import { ArrowUpRight } from "@/components/ui/icons";

/**
 * Concept work. Hover/scroll motion: the screenshot settles from a slight zoom
 * as it scrolls in, and a second screen slides up on hover (transform only).
 */
export function WorkShowcase() {
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <Link
        href="/demo/studio"
        className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface no-underline lg:col-span-8"
        data-cursor="view"
        data-reveal
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-sunken lg:aspect-auto lg:min-h-[28rem] lg:flex-1">
          <div className="absolute inset-0" data-scale-in>
            <Image
              src={desktop}
              alt="Aangan Studio concept: home page with a wedding photo and the line 'Weddings, families and the quiet moments in between'"
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-x-[8%] top-full transition-transform duration-700 ease-[var(--e-out)] group-hover:-translate-y-[92%] group-focus-visible:-translate-y-[92%]">
            <Image
              src={packagesShot}
              alt=""
              sizes="(min-width: 1024px) 640px, 90vw"
              quality={70}
              className="h-auto w-full rounded-t-md shadow-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
          <div>
            <span className="tag-concept">Concept design</span>
            <h3 className="heading mt-3 text-step-3">Aangan Studio</h3>
            <p className="mt-1 text-step--1 text-muted">
              Photo and video studio · galleries, packages, booking enquiries
            </p>
          </div>
          <span className="link-arrow text-step--1">
            Try the live demo <ArrowUpRight />
          </span>
        </div>
      </Link>

      <div className="grid gap-5 lg:col-span-4" data-reveal-stagger>
        <Link
          href="/demo/studio/site#work"
          className="group relative block overflow-hidden rounded-lg border border-line bg-[#f5f0e8] no-underline"
          data-cursor="view"
        >
          <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden">
            <Image
              src={galleryPhone}
              alt="The concept's photo gallery with category filters, on a phone"
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
          </div>
          <p className="border-t border-line bg-surface p-5 text-step--1">
            <span className="font-semibold">Gallery on a phone.</span>{" "}
            <span className="text-muted">Filters, full-screen viewer, swipe.</span>
          </p>
        </Link>
        <div className="flex flex-col justify-between rounded-lg border border-dashed border-line-strong p-6">
          <p className="eyebrow">Your project</p>
          <p className="mt-3 font-display text-step-2">
            Real client work will appear here as projects launch, with permission.
          </p>
          <Link href="/work" className="link-arrow mt-4 text-step--1">
            See all work <ArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
