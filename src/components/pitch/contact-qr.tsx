import { siteUrl } from "@/lib/site-url";
import { waHref, waMessages } from "@/lib/whatsapp";
import { QrCode } from "./qr-code";

/** Two QR codes: the website and a WhatsApp chat with a prefilled message. */
export function ContactQr({ size = 132, dark = false }: { size?: number; dark?: boolean }) {
  const items = [
    { value: siteUrl, label: "Scan to open the website", caption: "Open on your phone" },
    { value: waHref(waMessages.general()), label: "Scan to chat on WhatsApp", caption: "Chat on WhatsApp" },
  ];
  return (
    <div className="flex flex-wrap gap-6">
      {items.map((it) => (
        <figure key={it.caption} className="m-0 text-center">
          <div className={`inline-block rounded-lg p-2 ${dark ? "bg-white" : "border border-line bg-white"}`}>
            <QrCode value={it.value} label={it.label} size={size} />
          </div>
          <figcaption className="mt-2 text-step--1 font-semibold">{it.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
