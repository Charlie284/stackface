export type Picture = HTMLImageElement | HTMLCanvasElement;
const CW = 6,
  CH = 10; // char cell at font-size 10 monospace
const FONT =
  "ui-monospace,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace";
export const DARK_OP = [
  0.14, 0.22, 0.3, 0.38, 0.47, 0.56, 0.66, 0.77, 0.88, 1.0,
]; // screen: bright→bright
export const LIGHT_OP = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.31, 0.24, 0.18]; // print: dark→heavy ink

/* ---------- grid sampling ---------- */
export function sampleGrid(
  img: Picture,
  cols: number,
  gamma: number,
  useAlpha: boolean,
  cutoff: number,
) {
  const rows = Math.max(
    8,
    Math.round((img.height / img.width) * cols * (CW / CH)),
  );
  const cv = document.createElement("canvas");
  cv.width = cols;
  cv.height = rows;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, cols, rows);
  ctx.drawImage(img, 0, 0, cols, rows);
  const d = ctx.getImageData(0, 0, cols, rows).data;

  const lum = new Float32Array(cols * rows);
  const vis = new Uint8Array(cols * rows);
  const visible = [];
  for (let i = 0; i < cols * rows; i++) {
    const r = d[i * 4],
      g = d[i * 4 + 1],
      b = d[i * 4 + 2],
      a = d[i * 4 + 3];
    const L = (0.2126 * r + 0.7152 * g + 0.0722 * b) * (a / 255);
    if (useAlpha ? a >= 90 : true) {
      vis[i] = 1;
      lum[i] = L;
      visible.push(L);
    }
  }
  if (!visible.length) return { cols, rows, cells: null };

  // autocontrast: stretch between 1st and 99th percentile
  visible.sort((a, b) => a - b);
  const lo = visible[Math.floor(visible.length * 0.01)];
  const hi =
    visible[Math.min(visible.length - 1, Math.floor(visible.length * 0.99))];
  const span = Math.max(1, hi - lo);

  const cells = new Int8Array(cols * rows).fill(-1); // -1 = skip, else bucket 0..9
  for (let i = 0; i < cols * rows; i++) {
    if (!vis[i]) continue;
    let v = Math.min(1, Math.max(0, (lum[i] - lo) / span));
    v = Math.pow(v, gamma);
    if (!useAlpha && v < cutoff) continue; // drop near-black bg cells
    cells[i] = Math.min(9, Math.floor(v * 10));
  }
  return { cols, rows, cells };
}

/* ---------- glyph stream ---------- */
export function makeStream(raw: string) {
  const words = raw
    .split(/[,\n]+/)
    .map((w) => w.trim().toLowerCase().replace(/\s+/g, ""))
    .filter(Boolean);
  const s = (words.length ? words : ["code"]).join(".") + ".";
  return s;
}

const escXML = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------- svg builder ---------- */
export function buildSVG(
  grid: { cols: number; rows: number; cells: Int8Array },
  stream: string,
  opTable: number[],
  color: string,
) {
  const { cols, rows, cells } = grid;
  const W = cols * CW,
    H = rows * CH;
  const out = [];
  let k = 0; // stream cursor — advances only on rendered cells
  for (let y = 0; y < rows; y++) {
    const spans = [];
    let x = 0;
    while (x < cols) {
      const b = cells[y * cols + x];
      if (b < 0) {
        x++;
        continue;
      }
      const start = x;
      let chars = "";
      while (x < cols && cells[y * cols + x] === b) {
        chars += stream[k % stream.length];
        k++;
        x++;
      }
      spans.push(
        `<tspan x="${start * CW}" textLength="${chars.length * CW}" lengthAdjust="spacingAndGlyphs" fill-opacity="${opTable[b]}">${escXML(chars)}</tspan>`,
      );
    }
    if (spans.length)
      out.push(
        `<text y="${(y + 1) * CH}" fill="${color}">${spans.join("")}</text>`,
      );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W + 12}" height="${H + 12}" viewBox="0 0 ${W + 12} ${H + 12}" role="img" aria-label="ASCII portrait rendered from a tech stack — made with stackface">
<style>text{font-family:${FONT};font-size:10px}</style>
<g transform="translate(6,6)">
${out.join("\n")}
</g>
</svg>`;
}

/* ---------- background removal (lazy, CDN, graceful fallback) ---------- */
let bgLib: typeof import("@imgly/background-removal") | null = null,
  bgLibFailed = false;
export async function removeBg(
  file: File,
  onProgress: (message: string) => void,
) {
  if (!bgLib && !bgLibFailed) {
    try {
      onProgress("loading background-removal model…");
      bgLib = await import("@imgly/background-removal");
    } catch (e) {
      bgLibFailed = true;
      console.warn("bg removal unavailable:", e);
    }
  }
  if (!bgLib) return null;
  const blob = await bgLib.removeBackground(file, {
    progress: (key, cur, total) => {
      if (total)
        onProgress(
          `background removal: ${key.split(":").pop()} ${Math.round((cur / total) * 100)}%`,
        );
    },
  });
  return blob;
}

export function blobToImage(blob: Blob) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const url = URL.createObjectURL(blob);
    const im = new Image();
    im.onload = () => {
      URL.revokeObjectURL(url);
      res(im);
    };
    im.onerror = (e) => {
      URL.revokeObjectURL(url);
      rej(e);
    };
    im.src = url;
  });
}

/* crop away transparent margins after background removal, so the
   subject fills the grid instead of floating in empty space */
export function autoCropAlpha(img: Picture) {
  const W = "naturalWidth" in img ? img.naturalWidth : img.width,
    H = "naturalHeight" in img ? img.naturalHeight : img.height;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, W, H).data;
  let minX = W,
    minY = H,
    maxX = -1,
    maxY = -1;
  const step = Math.max(1, Math.round(Math.max(W, H) / 800));
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (d[(y * W + x) * 4 + 3] > 60) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return img; // nothing visible — keep original
  const pad = Math.round((maxX - minX) * 0.03);
  const sx = Math.max(0, minX - pad),
    sy = Math.max(0, minY - pad);
  const sw = Math.min(W, maxX + pad) - sx,
    sh = Math.min(H, maxY + pad) - sy;
  if (sw < 20 || sh < 20) return img;
  const out = document.createElement("canvas");
  out.width = sw;
  out.height = sh;
  out.getContext("2d")!.drawImage(cv, sx, sy, sw, sh, 0, 0, sw, sh);
  return out; // canvas is drawImage-compatible
}
