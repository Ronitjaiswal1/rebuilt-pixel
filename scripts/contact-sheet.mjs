// Contact sheet of the top of each screenshot: node scripts/contact-sheet.mjs <width> <theme> <out.png> [cropH]
import sharp from "sharp";
import { readdirSync } from "node:fs";
const [w, theme, out, cropH = "1400"] = process.argv.slice(2);
const files = readdirSync("qa/screenshots").filter((f) => f.endsWith(`-${w}-${theme}.png`)).sort();
const tileW = 480, cols = 4;
const tiles = [];
for (const [i, f] of files.entries()) {
  const meta = await sharp(`qa/screenshots/${f}`).metadata();
  const h = Math.min(Number(cropH), meta.height);
  const buf = await sharp(`qa/screenshots/${f}`).extract({ left: 0, top: 0, width: meta.width, height: h }).resize({ width: tileW }).png().toBuffer();
  const th = (await sharp(buf).metadata()).height;
  tiles.push({ buf, th, name: f, i });
}
const rowH = Math.max(...tiles.map((t) => t.th)) + 30;
const rows = Math.ceil(tiles.length / cols);
const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cols * (tileW + 10)}" height="${rows * rowH}">${tiles.map((t) => `<text x="${(t.i % cols) * (tileW + 10) + 4}" y="${Math.floor(t.i / cols) * rowH + rowH - 8}" font-size="18" font-family="Arial" fill="#000">${t.name}</text>`).join("")}</svg>`);
await sharp({ create: { width: cols * (tileW + 10), height: rows * rowH, channels: 3, background: "#bbb" } })
  .composite([...tiles.map((t) => ({ input: t.buf, left: (t.i % cols) * (tileW + 10), top: Math.floor(t.i / cols) * rowH })), { input: label, left: 0, top: 0 }])
  .png().toFile(out);
console.log(files.length, "tiles");
