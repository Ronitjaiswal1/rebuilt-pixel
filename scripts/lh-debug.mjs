// Prints LCP element, LCP phases, top JS bootup and a11y failures for one URL (mobile).
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
const url = process.argv[2];
const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ["--headless=new"] });
const { lhr } = await lighthouse(url, { port: chrome.port, logLevel: "error", onlyCategories: ["performance", "accessibility", "seo"] });
const A = lhr.audits;
const lcpEl = A["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node;
console.log("LCP element:", lcpEl?.snippet, lcpEl?.selector);
console.log("LCP phases:", JSON.stringify(A["largest-contentful-paint-element"]?.details?.items?.[1]?.items));
console.log("Bootup:", (A["bootup-time"]?.details?.items ?? []).slice(0, 6).map((i) => `${i.url.slice(-50)} total=${Math.round(i.total)} script=${Math.round(i.scripting)}`));
console.log("Mainthread:", (A["mainthread-work-breakdown"]?.details?.items ?? []).map((i) => `${i.group}=${Math.round(i.duration)}`).join(" "));
console.log("Long tasks:", (A["long-tasks"]?.details?.items ?? []).slice(0, 8).map((i) => `${(i.url || "").slice(-40)} ${Math.round(i.duration)}ms@${Math.round(i.startTime)}`));
console.log("JS transfer:", Math.round((A["total-byte-weight"]?.details?.items ?? []).filter((i) => i.url.endsWith(".js")).reduce((s, i) => s + i.totalBytes, 0) / 1024), "KB");
for (const id of Object.keys(A)) {
  const au = A[id];
  if (lhr.categories.accessibility.auditRefs.some((r) => r.id === id) && au.score === 0) {
    console.log("A11Y", id, (au.details?.items ?? []).slice(0, 4).map((i) => (i.node?.snippet ?? "").slice(0, 140) + " :: " + (i.node?.explanation ?? "").split("\n").slice(1, 2).join("")).join("\n   "));
  }
  if (lhr.categories.seo.auditRefs.some((r) => r.id === id) && au.score === 0) console.log("SEO", id, JSON.stringify(au.details?.items?.slice(0, 3)).slice(0, 300));
}
await chrome.kill();
