// Real LCP entries under Slow 4G + 4x CPU throttling (CDP), mobile viewport.
import { chromium } from "playwright";
const base = process.env.BASE_URL ?? "http://localhost:3100";
const paths = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
for (const path of paths) {
  const ctx = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__lcp.push({ t: Math.round(e.startTime), size: e.size, el: e.element ? `${e.element.tagName}.${String(e.element.className).slice(0, 50)}` : e.url?.slice(-40) });
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  const lcp = await page.evaluate(() => window.__lcp);
  const fcp = await page.evaluate(() => Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0));
  const fonts = await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => r.name.endsWith(".woff2")).map((r) => `${Math.round(r.responseEnd)}ms ${Math.round(r.transferSize / 1024)}KB`));
  console.log(path, "FCP", fcp, "\n  LCP entries:", JSON.stringify(lcp), "\n  fonts:", fonts.join(", "));
  await ctx.close();
}
await browser.close();
