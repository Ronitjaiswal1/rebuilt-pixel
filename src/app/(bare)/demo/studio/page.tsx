import Link from "next/link";
import { DeviceViewer } from "@/components/demo/device-viewer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ArrowLeft } from "@/components/ui/icons";
import { LogoMark } from "@/components/brand/logo";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Live demo: photo studio website (concept design)",
  description:
    "Try a concept photography studio website by Rebuilt Pixel: galleries, full-screen viewer, packages and booking enquiries. Switch between phone and laptop views.",
  path: "/demo/studio",
});

export default function DemoStudioPage() {
  return (
    <div className="flex h-dvh flex-col bg-sunken">
      <header className="border-b border-line bg-bg">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/work"
              className="grid size-11 place-items-center rounded-full hover:bg-sunken"
              aria-label="Back to Rebuilt Pixel work"
            >
              <ArrowLeft />
            </Link>
            <LogoMark size={24} />
            <div>
              <h1 className="font-display text-step-1 leading-tight">Aangan Studio</h1>
              <p className="text-step--2 text-muted">
                <span className="tag-concept mr-2 align-middle">Concept design</span>
                Fictional photo studio
              </p>
            </div>
          </div>
          <WhatsAppButton size="sm" intent={{ type: "demo" }} className="hidden sm:inline-flex">
            Want this for your business?
          </WhatsAppButton>
        </div>
      </header>
      <main className="min-h-0 flex-1">
        <DeviceViewer src="/demo/studio/site" title="Aangan Studio concept website" />
      </main>
      <div className="border-t border-line bg-bg p-3 sm:hidden">
        <WhatsAppButton intent={{ type: "demo" }} className="w-full">
          Want this for your business?
        </WhatsAppButton>
      </div>
    </div>
  );
}
