import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toast";
import { ServiceWorkerRegister } from "@/components/pwa/sw-register";

/** Chrome-less layout for Pitch mode and the demo. Both are cached for offline use. */
export default function BareLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
      <ServiceWorkerRegister warm />
    </>
  );
}
