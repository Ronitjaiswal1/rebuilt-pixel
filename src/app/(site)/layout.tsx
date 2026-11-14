import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Toaster } from "@/components/ui/toast";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] inline-flex min-h-11 items-center rounded-md bg-ink px-4 font-semibold text-bg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
      <MotionProvider />
      <ServiceWorkerRegister />
    </>
  );
}
