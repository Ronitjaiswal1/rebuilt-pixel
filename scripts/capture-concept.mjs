// Captures the studio concept at laptop and phone sizes. These screenshots are
// used as honest, generated imagery for the hero device mockup and Work cards.
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const out = "src/assets/screens";
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();

async function shot(name, viewport, opts = {}) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: opts.dpr ?? 1, reducedMotion: "reduce" });
  await page.goto(`${base}/demo/studio/site`, { waitUntil: "networkidle" });
  if (opts.scrollTo) {
    await page.locator(opts.scrollTo).scrollIntoViewIfNeeded();
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 40);
    }, opts.scrollTo);
  }
  // Full-page shots grow the viewport, which would stretch svh-based sections.
  // Pin the hero to its on-screen height and un-stick the header first.
  if (opts.fullPage) {
    await page.addStyleTag({
      content: `.studio header{position:relative!important} .studio main > section:first-child{min-height:${Math.round(viewport.height * 0.86)}px!important}`,
    });
  }
  // Trigger lazy images below the fold for full-page captures.
  if (opts.fullPage) {
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
  }
  await page.waitForFunction(() =>
    [...document.images]
      .filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight * 4; })
      .every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 60000 });
  await page.waitForTimeout(500);
  const buf = await page.screenshot({ fullPage: Boolean(opts.fullPage), clip: opts.clip });
  await sharp(buf).resize({ width: opts.width ?? viewport.width * (opts.dpr ?? 1) }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${out}/${name}.jpg`);
  await page.close();
  console.log("saved", name);
}

await shot("studio-desktop", { width: 1440, height: 900 }, { width: 1440 });
await shot("studio-desktop-long", { width: 1440, height: 900 }, { fullPage: true, clip: { x: 0, y: 0, width: 1440, height: 3600 }, width: 1200 });
await shot("studio-phone", { width: 390, height: 844 }, { dpr: 2, width: 780 });
await shot("studio-phone-long", { width: 390, height: 844 }, { dpr: 2, fullPage: true, clip: { x: 0, y: 0, width: 390, height: 2600 }, width: 780 });
await shot("studio-packages", { width: 1440, height: 900 }, { scrollTo: "#packages", width: 1440 });
await shot("studio-gallery-phone", { width: 390, height: 844 }, { dpr: 2, scrollTo: "#work", width: 780 });
await browser.close();
