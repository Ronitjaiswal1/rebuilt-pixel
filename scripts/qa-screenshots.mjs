// QA: full-page screenshots of every page at 390/768/1440px in light and dark.
// Also reports horizontal overflow and console errors per page.
// Usage: BASE_URL=http://localhost:3100 node scripts/qa-screenshots.mjs [filter]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const out = "qa/screenshots";
mkdirSync(out, { recursive: true });

const pages = [
  "/", "/services", "/pricing", "/work", "/industries", "/for/photographers", "/process", "/about",
  "/contact", "/privacy", "/terms", "/credits", "/styleguide", "/pitch", "/demo/studio", "/demo/studio/site", "/this-page-does-not-exist",
];
const widths = (process.env.WIDTHS ?? "390,768,1440").split(",").map(Number);
const themes = (process.env.THEMES ?? "light,dark").split(",");
const filter = process.argv[2];

const browser = await chromium.launch();
const report = [];
for (const theme of themes) {
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 900 },
      colorScheme: theme,
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
    });
    for (const path of pages) {
      if (filter && !path.includes(filter)) continue;
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + path, { waitUntil: "networkidle" });
      // Load lazy images.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width && r.right > w + 1 && getComputedStyle(el).position !== "fixed") {
            let p = el.parentElement, clipped = false;
            while (p && p !== document.body) {
              const o = getComputedStyle(p).overflowX;
              if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") { clipped = true; break; }
              p = p.parentElement;
            }
            if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
          }
        }
        return { scrollW: document.documentElement.scrollWidth, w, offenders: offenders.slice(0, 5) };
      });
      const name = `${(path === "/" ? "home" : path.slice(1).replace(/\//g, "_"))}-${width}-${theme}.png`;
      await page.screenshot({ path: `${out}/${name}`, fullPage: !path.startsWith("/pitch") && path !== "/demo/studio" });
      report.push({ path, width, theme, overflow: overflow.scrollW > overflow.w ? overflow : null, errors });
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();
writeFileSync("qa/screenshots-report.json", JSON.stringify(report, null, 2));
const problems = report.filter((r) => r.overflow || r.errors.length);
console.log(`${report.length} screenshots → ${out}`);
for (const p of problems) console.log(p.path, p.width, p.theme, JSON.stringify(p.overflow), p.errors.slice(0, 2));
