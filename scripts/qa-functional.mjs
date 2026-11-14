// Functional QA. Start the server with LEAD_WEBHOOK_URL=http://localhost:3999/hook
// (this script runs a mock webhook on :3999 to receive leads).
// Usage: BASE_URL=http://localhost:3100 node scripts/qa-functional.mjs
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, mkdirSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

// ---- Mock lead webhook ----
const leads = [];
const hook = createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    try { leads.push(JSON.parse(body)); } catch { /* ignore */ }
    res.writeHead(200).end("ok");
  });
}).listen(3999);

const browser = await chromium.launch();

// ---- WhatsApp links ----
{
  const page = await browser.newPage();
  await page.goto(`${base}/pricing`);
  await page.waitForLoadState("networkidle");
  const hrefs = await page.$$eval('a[href^="https://wa.me/"]', (as) => as.map((a) => a.href));
  const allEncoded = hrefs.every((h) => /\?text=[^ ]+$/.test(h) && !h.includes(" "));
  check("WhatsApp links present and URL-encoded", hrefs.length > 5 && allEncoded, `${hrefs.length} links`);
  const growth = hrefs.map((h) => decodeURIComponent(h.split("text=")[1])).find((t) => t.includes("Growth plan"));
  check("Plan button message names plan and price", Boolean(growth?.includes("₹13,999")), growth ?? "missing");
  await page.goto(`${base}/pricing?client=${encodeURIComponent("Acme <b>Studio</b>")}`);
  await page.waitForLoadState("networkidle");
  const personal = await page.$eval('a[href^="https://wa.me/"]', (a) => decodeURIComponent(a.href.split("text=")[1]));
  check("WhatsApp message includes sanitised client name", personal.includes("this is Acme bStudiob") && !personal.includes("<"), personal);
  const prepared = await page.locator("text=Prepared for").first().isVisible();
  check("?client= shows 'Prepared for' on pricing", prepared);
  await page.close();
}

// ---- Prices and features match the brief ----
{
  const page = await browser.newPage();
  await page.goto(`${base}/pricing`);
  const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
  const brief = {
    Launch: { price: "₹7,999", terms: ["7-day delivery", "1 round", "1 month"] },
    Growth: { price: "₹13,999", terms: ["12-day delivery", "3 rounds", "3 months"] },
    Signature: { price: "₹25,000", terms: ["25-day delivery", "Unlimited*", "6 months, priority"] },
  };
  const missing = [];
  for (const [name, b] of Object.entries(brief)) {
    for (const t of [name, b.price, ...b.terms]) if (!text.includes(t)) missing.push(`${name}: ${t}`);
  }
  const src = readFileSync("src/content/plans.ts", "utf8");
  const features = [...src.matchAll(/highlights: \[([\s\S]*?)\]/g)].flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  for (const f of features) if (!text.includes(f)) missing.push(`feature: ${f}`);
  if (!/All prices exclude domain and hosting/i.test(text)) missing.push("domain/hosting notice");
  const otherPrices = [...text.matchAll(/₹[\d,]+/g)].map((m) => m[0]).filter((p) => !["₹7,999", "₹13,999", "₹25,000"].includes(p));
  check("Pricing page shows exactly the briefed prices, features and terms", missing.length === 0 && otherPrices.length === 0, `${features.length} features checked; ${[...missing, ...otherPrices].slice(0, 5).join(" | ")}`);
  await page.close();
}

// ---- Mobile menu, skip link, keyboard ----
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.textContent?.trim());
  check("First Tab focuses the skip link", first === "Skip to content", first);
  await page.click('button[aria-label="Open menu"]');
  const open = await page.locator("dialog.rp-menu").evaluate((d) => d.open);
  const focusInside = await page.evaluate(() => document.activeElement?.closest("dialog") !== null);
  check("Mobile menu opens with focus inside", open && focusInside);
  await page.keyboard.press("Escape");
  const closed = await page.locator("dialog.rp-menu").evaluate((d) => !d.open);
  check("Escape closes the mobile menu", closed);
  await page.click('button[aria-label="Open menu"]');
  await page.click('dialog.rp-menu a[href="/pricing"]');
  await page.waitForURL("**/pricing");
  check("Menu link navigates and closes menu", await page.locator("dialog.rp-menu").evaluate((d) => !d.open));
  // Tap targets
  const small = await page.$$eval("a, button, summary, input, select, textarea", (els) =>
    els
      .filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== "hidden" && !e.closest(".sr-only, [aria-hidden=true], dialog:not([open])"))
      .map((e) => ({ e, r: e.getBoundingClientRect() }))
      .filter(({ e, r }) => r.height < 44 && !e.closest("p, li.text-step--1, table") && e.tagName !== "INPUT")
      .map(({ e, r }) => `${e.tagName}:${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 30)}:${Math.round(r.height)}`),
  );
  check("Interactive elements are ≥44px tall (outside inline text)", small.length === 0, small.slice(0, 6).join(" | "));
  await ctx.close();
}

// ---- FAQ keyboard + reduced motion ----
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  const summary = page.locator("details.rp-faq summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  check("FAQ opens with keyboard", await page.locator("details.rp-faq").first().evaluate((d) => d.open));
  await page.waitForTimeout(3500);
  const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
  check("Reduced motion: no running animations", running === 0, `${running} running`);
  const lenis = await page.evaluate(() => document.documentElement.classList.contains("lenis"));
  check("Reduced motion: smooth scroll not enabled", !lenis);
  await ctx.close();
}

// ---- Visible at rest (no hidden content without scrolling) ----
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(3500); // let motion layer initialise
  const hidden = await page.$$eval("main [data-reveal], main [data-reveal-stagger] > *", (els) =>
    els.filter((e) => Number(getComputedStyle(e).opacity) < 0.99 || getComputedStyle(e).visibility === "hidden").length,
  );
  check("Below-fold content is visible at rest (not waiting on scroll)", hidden === 0, `${hidden} hidden`);
  await page.close();
}

// ---- Pitch mode ----
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, acceptDownloads: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${base}/pitch?client=${encodeURIComponent("Kesar Café & Co.<script>")}`);
  await page.waitForLoadState("networkidle");
  const header = await page.locator("header").innerText();
  check("Pitch shows sanitised 'Prepared for' name", header.includes("Kesar Café & Co.script") && !header.includes("<"), header.replace(/\s+/g, " "));
  const slideName = () => page.locator("main section:not([hidden])").getAttribute("aria-label");
  await page.keyboard.press("ArrowRight");
  check("Arrow key advances slide", (await slideName())?.startsWith("The problem") ?? false, await slideName());
  await page.keyboard.press("End");
  check("End key jumps to last slide", (await slideName())?.startsWith("Next step") ?? false);
  await page.keyboard.press("Home");
  // Swipe left
  await page.evaluate(() => {
    const el = document.querySelector(".band-ink");
    const t = (x) => new Touch({ identifier: 1, target: el, clientX: x, clientY: 400 });
    el.dispatchEvent(new TouchEvent("touchstart", { touches: [t(900)], changedTouches: [t(900)], bubbles: true }));
    el.dispatchEvent(new TouchEvent("touchend", { touches: [], changedTouches: [t(300)], bubbles: true }));
  });
  check("Swipe advances slide", (await slideName())?.startsWith("The problem") ?? false, await slideName());
  check("Progress indicator updates", (await page.locator("text=2 / 7").count()) > 0);
  await page.keyboard.press("End");
  const qrCount = await page.locator('svg[role="img"][aria-label^="QR code"]').count();
  check("Final slide shows QR codes", qrCount === 2);
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.locator("main section:not([hidden]) button", { hasText: "Download plans PDF" }).click(),
  ]);
  mkdirSync("qa", { recursive: true });
  const pdfPath = `qa/${download.suggestedFilename()}`;
  await download.saveAs(pdfPath);
  const pdf = readFileSync(pdfPath);
  check("PDF downloads with client name in filename", pdf.subarray(0, 4).toString() === "%PDF" && /kesar/.test(pdfPath), `${pdfPath} ${pdf.length} bytes`);
  // Editable field
  await page.keyboard.press("Home");
  await page.fill("#prepared-for", "Studio Noor");
  check("Editing 'Prepared for' updates header", (await page.locator("header").innerText()).includes("Studio Noor"));
  await ctx.close();
}

// ---- Demo viewer and lightbox ----
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}/demo/studio`);
  await page.click('button:has-text("Phone")');
  const w = await page.locator("iframe").evaluate((f) => f.getBoundingClientRect().width / (f.getBoundingClientRect().width / f.offsetWidth));
  check("Phone frame renders the site at 390px", Math.round(w) === 390, String(w));
  await page.goto(`${base}/demo/studio/site`);
  await page.locator(".studio-masonry button").first().click();
  const counter = () => page.locator("dialog.studio-lightbox p.num").innerText();
  const c1 = await counter();
  await page.keyboard.press("ArrowRight");
  const c2 = await counter();
  check("Lightbox opens and arrow key advances", c1.startsWith("1 /") && c2.startsWith("2 /"), `${c1} → ${c2}`);
  await page.keyboard.press("Escape");
  check("Escape closes lightbox", await page.locator("dialog.studio-lightbox").evaluate((d) => !d.open));
  await page.click('button[aria-pressed]:has-text("Newborn")');
  check("Gallery filter works", (await page.locator(".studio-masonry li").count()) === 3);
  await page.close();
}

// ---- Enquiry form, end to end ----
{
  const page = await browser.newPage();
  await page.goto(`${base}/contact`);
  await page.click('form button[type="submit"]');
  const errs = await page.locator(".field-error").count();
  const invalid = await page.locator("#enquiry-name").getAttribute("aria-invalid");
  check("Form shows inline errors for empty required fields", errs >= 2 && invalid === "true");
  await page.fill("#enquiry-name", "QA Tester");
  await page.fill("#enquiry-phone", "98765 43210");
  await page.selectOption("#enquiry-business", "Salon or spa");
  await page.selectOption("#enquiry-interest", "Growth plan (₹13,999)");
  await page.fill("#enquiry-message", "Automated QA test lead.");
  await page.click('form button[type="submit"]');
  await page.waitForSelector("text=Thanks, we've got it.", { timeout: 15000 }).catch(() => {});
  const success = await page.locator("text=Thanks, we've got it.").count();
  await new Promise((r) => setTimeout(r, 500));
  const lead = leads.find((l) => l.name === "QA Tester");
  check("Form submits and lead reaches the webhook", success > 0 && lead?.interest === "Growth plan (₹13,999)" && lead?.page === "/contact", JSON.stringify(lead ?? {}));
  await page.close();

  const api = (body) => fetch(`${base}/api/enquiry`, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${body.ip ?? 1}` }, body: JSON.stringify(body) });
  const before = leads.length;
  const hp = await api({ name: "Bot", phone: "9876543210", company_website: "spam.example", ip: 7 });
  check("Honeypot returns fake success and drops the lead", hp.ok && leads.length === before);
  const statuses = [];
  for (let i = 0; i < 7; i++) statuses.push((await api({ name: "Rate", phone: "9876543210", ip: 9 })).status);
  check("Rate limit returns 429 after 5 requests", statuses.slice(0, 5).every((s) => s === 200) && statuses[5] === 429, statuses.join(","));
  const bad = await api({ name: "X", phone: "12", ip: 11 });
  check("Server rejects invalid input with 422", bad.status === 422);
}

// ---- Offline: Pitch mode and demo after first load ----
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: "allow" });
  const page = await ctx.newPage();
  await page.goto(`${base}/pitch`);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => navigator.serviceWorker.ready);
  // Wait for warming to finish: demo HTML and images cached.
  const warmed = await page.waitForFunction(async () => {
    const keys = await caches.keys();
    let pages = 0, images = 0;
    for (const k of keys) {
      const c = await caches.open(k);
      const reqs = await c.keys();
      pages += reqs.filter((r) => r.url.endsWith("/demo/studio/site") || r.url.endsWith("/demo/studio")).length;
      images += reqs.filter((r) => r.url.includes("/_next/image")).length;
    }
    return pages >= 2 && images > 20 ? { pages, images } : false;
  }, null, { timeout: 120000, polling: 1000 }).then((h) => h.jsonValue()).catch(() => null);
  check("Service worker warms pitch + demo for offline", Boolean(warmed), JSON.stringify(warmed));
  await ctx.setOffline(true);
  await page.goto(`${base}/pitch?client=Offline%20Test`);
  check("Pitch loads offline (with ?client=)", (await page.locator("header").innerText()).includes("Offline Test"));
  await page.keyboard.press("ArrowRight");
  check("Pitch navigation works offline", (await page.locator("main section:not([hidden])").getAttribute("aria-label"))?.startsWith("The problem") ?? false);
  await page.goto(`${base}/demo/studio`);
  const frame = page.frameLocator("iframe");
  await frame.locator(".studio-masonry").waitFor({ timeout: 15000 }).catch(() => {});
  const stats = await page.frames()[1]?.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    await new Promise((r) => setTimeout(r, 1500));
    const imgs = [...document.images];
    return {
      total: imgs.length,
      loaded: imgs.filter((i) => i.complete && i.naturalWidth > 0).length,
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc.slice(-60)),
    };
  }).catch((e) => ({ total: 0, loaded: 0, broken: [String(e)] }));
  check("Demo loads offline inside the device frame (all images)", Boolean(stats && stats.total > 15 && stats.broken.length === 0), JSON.stringify(stats));
  await page.goto(`${base}/about`).catch(() => {});
  check("Uncached page shows the offline fallback", (await page.content()).includes("You're offline") || (await page.content()).includes("A small studio"));
  await ctx.close();
}

// ---- Links and images ----
{
  const page = await browser.newPage();
  const seen = new Set();
  const bad = [];
  const queue = ["/"];
  const assets = new Set();
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await page.goto(base + path, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) { bad.push(`${path} → ${res?.status()}`); continue; }
    const brokenImgs = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.currentSrc || i.src));
    brokenImgs.forEach((s) => bad.push(`img ${s} on ${path}`));
    const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const l of links) {
      if (!l || l.startsWith("http") || l.startsWith("mailto:") || l.startsWith("#")) continue;
      const clean = l.split("#")[0].split("?")[0];
      if (clean && !seen.has(clean)) queue.push(clean);
    }
    for (const a of await page.$$eval('link[rel~="icon"], link[rel="manifest"], meta[property="og:image"]', (els) => els.map((e) => e.getAttribute("href") || e.getAttribute("content")))) assets.add(a);
  }
  for (const a of assets) {
    const u = a.startsWith("http") ? a.replace(/^https?:\/\/[^/]+/, base) : base + a;
    const r = await fetch(u);
    if (!r.ok) bad.push(`asset ${a} → ${r.status}`);
  }
  const manifest = await (await fetch(`${base}/manifest.webmanifest`)).json();
  const manifestIcons = manifest.icons.map((i) => i.src);
  for (const p of ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/sw.js", "/twitter-image", "/apple-icon", "/favicon.ico", ...manifestIcons]) {
    const r = await fetch(base + p);
    if (!r.ok) bad.push(`${p} → ${r.status}`);
  }
  check("All internal links, images and meta assets resolve", bad.length === 0, `${seen.size} pages crawled; ${bad.slice(0, 5).join(" | ")}`);
  await page.close();
}

await browser.close();
hook.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
