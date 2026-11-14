import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

// Static instances (Satori needs static fonts). Read once at module scope.
const fraunces = await readFile(join(process.cwd(), "public/fonts/Fraunces-Display.ttf"));
const instrument = await readFile(join(process.cwd(), "public/fonts/InstrumentSans-SemiBold.ttf"));

export const ogSize = { width: 1200, height: 630 };

/** Branded social card: ink-navy, marigold pixel mark, one big line. */
export function renderOg({ title, kicker, footer }: { title: string; kicker: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1830",
          color: "#f6f3ec",
          padding: "64px 72px",
          fontFamily: "Instrument",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", position: "relative", width: 40, height: 40 }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 18, height: 18, background: "#f6f3ec", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 0, top: 21, width: 18, height: 18, background: "#f6f3ec", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 21, top: 21, width: 18, height: 18, background: "#f6f3ec", borderRadius: 3 }} />
            <div style={{ position: "absolute", left: 24, top: -3, width: 18, height: 18, background: "#f2a516", borderRadius: 3 }} />
          </div>
          <div style={{ fontFamily: "Fraunces", fontSize: 34, letterSpacing: -1 }}>Rebuilt Pixel</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#f2a516", letterSpacing: 3, textTransform: "uppercase" }}>{kicker}</div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: title.length > 48 ? 70 : 84,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              marginTop: 20,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b4bccb" }}>
          <div>{footer}</div>
          <div style={{ color: "#f6f3ec" }}>Chat on WhatsApp</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Instrument", data: instrument, weight: 600, style: "normal" },
      ],
    },
  );
}
