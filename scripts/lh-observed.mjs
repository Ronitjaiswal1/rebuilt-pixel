// Prints Lighthouse observed (unthrottled) vs simulated paint metrics.
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ["--headless=new"] });
for (const url of process.argv.slice(2)) {
  const { lhr } = await lighthouse(url, { port: chrome.port, logLevel: "error", onlyCategories: ["performance"] });
  const m = lhr.audits.metrics.details.items[0];
  console.log(url, JSON.stringify({ obsFCP: m.observedFirstContentfulPaint, obsLCP: m.observedLargestContentfulPaint, obsLoad: m.observedLoad, simFCP: m.firstContentfulPaint, simLCP: m.largestContentfulPaint, TBT: m.totalBlockingTime, score: lhr.categories.performance.score }));
}
await chrome.kill();
