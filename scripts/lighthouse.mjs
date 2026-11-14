// Lighthouse (mobile + desktop) for key pages. Writes HTML reports to qa/lighthouse.
// Usage: BASE_URL=http://localhost:3100 node scripts/lighthouse.mjs [/path ...]
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/pricing", "/for/photographers", "/services", "/contact", "/demo/studio/site", "/pitch"];
const out = "qa/lighthouse";
mkdirSync(out, { recursive: true });

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox"],
});

const RUNS = Number(process.env.RUNS ?? 3);
const rows = [];
for (const formFactor of ["mobile", "desktop"]) {
  for (const path of paths) {
    const config =
      formFactor === "desktop"
        ? (await import("lighthouse/core/config/desktop-config.js")).default
        : undefined; // default = Moto G Power on Slow 4G, 4x CPU throttle
    // Median of RUNS by performance score (Lighthouse's own advice for noisy machines).
    const runs = [];
    for (let r = 0; r < (formFactor === "mobile" ? RUNS : 1); r++) {
      runs.push(
        await lighthouse(
          base + path,
          { port: chrome.port, output: "html", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] },
          config,
        ),
      );
    }
    runs.sort((a, b) => a.lhr.categories.performance.score - b.lhr.categories.performance.score);
    const result = runs[Math.floor(runs.length / 2)];
    const lhr = result.lhr;
    const s = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
    const a = (id) => lhr.audits[id]?.displayValue ?? "";
    const row = {
      formFactor,
      path,
      runs: runs.map((r) => Math.round(r.lhr.categories.performance.score * 100)).join("/"),
      performance: s("performance"),
      accessibility: s("accessibility"),
      bestPractices: s("best-practices"),
      seo: s("seo"),
      LCP: a("largest-contentful-paint"),
      CLS: a("cumulative-layout-shift"),
      TBT: a("total-blocking-time"),
      FCP: a("first-contentful-paint"),
    };
    rows.push(row);
    const name = `${formFactor}-${path === "/" ? "home" : path.slice(1).replace(/\//g, "_")}`;
    writeFileSync(`${out}/${name}.html`, result.report);
    const failing = Object.values(lhr.audits)
      .filter((au) => au.score !== null && au.score < 0.9 && au.scoreDisplayMode !== "informative" && au.scoreDisplayMode !== "manual" && au.scoreDisplayMode !== "notApplicable")
      .map((au) => `${au.id}${au.displayValue ? `=${au.displayValue}` : ""}`);
    console.log(JSON.stringify(row), failing.length ? `\n   below 0.9: ${failing.slice(0, 10).join(", ")}` : "");
  }
}
await chrome.kill();
writeFileSync(`${out}/summary.json`, JSON.stringify(rows, null, 2));
