// Builds PNG icons and favicon.ico from the placeholder pixel mark.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const mark = (bg, pad) => {
  const s = 32, inner = s - pad * 2, k = inner / 32;
  const r = (x, y, c) => `<rect x="${pad + x * k}" y="${pad + y * k}" width="${12 * k}" height="${12 * k}" rx="${2 * k}" fill="${c}"/>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${bg ? `<rect width="32" height="32" fill="${bg}"/>` : ""}${r(3,3,bg ? "#f6f3ec" : "#0e1830")}${r(3,17,bg ? "#f6f3ec" : "#0e1830")}${r(17,17,bg ? "#f6f3ec" : "#0e1830")}${r(19,1,"#f2a516")}</svg>`);
};
await sharp(mark("#0e1830", 4), { density: 1200 }).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(mark("#0e1830", 4), { density: 1200 }).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(mark("#0e1830", 7), { density: 1200 }).resize(512, 512).png().toFile("public/icon-512-maskable.png");
const png = await sharp(mark(null, 0), { density: 600 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
const dir = Buffer.alloc(16); dir.writeUInt8(32, 0); dir.writeUInt8(32, 1); dir.writeUInt8(0, 2); dir.writeUInt8(0, 3);
dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6); dir.writeUInt32LE(png.length, 8); dir.writeUInt32LE(22, 12);
writeFileSync("src/app/favicon.ico", Buffer.concat([header, dir, png]));
console.log("icons written");
