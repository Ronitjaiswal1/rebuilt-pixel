import QRCode from "qrcode";

/**
 * Synchronous QR → SVG path. Rendering on the server keeps QR codes out of the
 * client bundle and lets static pages (and the offline cache) include them.
 */
export function qrPath(text: string): { size: number; d: string } {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (data[y * size + x]) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return { size, d };
}

/** Raw module matrix, used by the PDF generator to draw the same code. */
export function qrMatrix(text: string): { size: number; data: ArrayLike<number> } {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  return { size: qr.modules.size, data: qr.modules.data };
}
