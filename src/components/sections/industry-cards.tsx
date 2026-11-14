import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { industries } from "@/content/industries";

export function IndustryGrid({ showNeeds = false }: { showNeeds?: boolean }) {
  const [featured, ...rest] = industries;
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {featured.featured ? (
        <Link
          href={featured.featured.href}
          className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg p-6 text-[#f6f3ec] no-underline sm:p-8 lg:col-span-5 lg:row-span-2 lg:min-h-full"
          data-cursor="view"
          data-reveal
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0" data-scale-in>
            <Image
              src={featured.featured.image}
              alt={featured.featured.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              quality={70}
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1830]/90 via-[#0e1830]/35 to-transparent" />
          </div>
          <span className="tag-concept self-start">Featured</span>
          <h3 className="display mt-4 text-step-4">{featured.name}</h3>
          <p className="mt-3 max-w-[40ch] text-step-0 text-[#f6f3ec]/85">{featured.line}</p>
          <span className="link-arrow mt-4 text-step-0">
            See what we build for studios <ArrowUpRight />
          </span>
        </Link>
      ) : null}
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:col-span-7" data-reveal-stagger>
        {rest.map((ind) => (
          <li key={ind.id} className="bg-surface p-6 sm:p-7">
            <h3 className="heading text-step-2">{ind.name}</h3>
            <p className="mt-2 text-step--1 text-muted">{ind.line}</p>
            {showNeeds ? (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {ind.needs.map((n) => (
                  <li key={n} className="chip text-step--2">
                    {n}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      {!showNeeds ? (
        <div className="lg:col-span-7 lg:col-start-6">
          <Link href="/industries" className="link-arrow text-step--1">
            How we tailor sites by industry <ArrowRight size={16} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
