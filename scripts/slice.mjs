// Slices a tall screenshot into chunks for visual review.
// Usage: node scripts/slice.mjs <file.png> <outDir> [chunkHeight]
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const [file, outDir, chunkH = "1600"] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const { width, height } = await sharp(file).metadata();
const h = Number(chunkH);
let i = 0;
for (let top = 0; top < height; top += h, i++) {
  await sharp(file)
    .extract({ left: 0, top, width, height: Math.min(h, height - top) })
    .toFile(`${outDir}/${i}.png`);
}
console.log(width, height, i, "slices");
