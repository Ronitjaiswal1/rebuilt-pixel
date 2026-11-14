import { PitchDeck } from "@/components/pitch/pitch-deck";
import { QrCode } from "@/components/pitch/qr-code";
import { pageMeta } from "@/lib/metadata";
import { siteUrl } from "@/lib/site-url";
import { waHref, waMessages } from "@/lib/whatsapp";
import demoLaptop from "@/assets/screens/studio-desktop.jpg";
import demoPhone from "@/assets/screens/studio-phone.jpg";

export const metadata = pageMeta({
  title: "Pitch mode",
  description: "Rebuilt Pixel in seven screens: the problem, what we build, a live demo, plans, process and next step.",
  path: "/pitch",
  noindex: true,
});

export default function PitchPage() {
  return (
    <PitchDeck
      qrSite={<QrCode value={siteUrl} label="QR code: open the Rebuilt Pixel website" size={150} />}
      qrWhatsApp={<QrCode value={waHref(waMessages.general())} label="QR code: chat with Rebuilt Pixel on WhatsApp" size={150} />}
      demoLaptop={demoLaptop}
      demoPhone={demoPhone}
    />
  );
}
