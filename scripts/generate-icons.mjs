import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public');
mkdirSync(outDir, { recursive: true });

const logoSvg = (padPct) => {
  const pad = padPct;
  const size = 64;
  const inner = size - pad * 2;
  const scale = inner / 64;
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#111110" rx="${padPct === 0 ? 16 : 0}" />
  <g transform="translate(${pad},${pad}) scale(${scale})">
    <g fill="url(#g)">
      <rect x="6" y="24" width="6" height="16" rx="2" />
      <rect x="14" y="19" width="5" height="26" rx="2" />
      <rect x="19" y="30" width="26" height="4" rx="2" />
      <rect x="45" y="19" width="5" height="26" rx="2" />
      <rect x="52" y="24" width="6" height="16" rx="2" />
    </g>
  </g>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E4FF3D" />
      <stop offset="1" stop-color="#B8D400" />
    </linearGradient>
  </defs>
</svg>`;
};

async function run() {
  const targets = [
    { file: 'icon-192.png', size: 192, pad: 0 },
    { file: 'icon-512.png', size: 512, pad: 0 },
    { file: 'icon-maskable-512.png', size: 512, pad: 10 }, // extra safe-zone padding for maskable
    { file: 'apple-touch-icon.png', size: 180, pad: 0 },
  ];

  for (const t of targets) {
    const padPct = t.pad ? 64 * (t.pad / 100) : 0;
    const svg = Buffer.from(logoSvg(padPct));
    await sharp(svg).resize(t.size, t.size).png().toFile(path.join(outDir, t.file));
    console.log('generated', t.file);
  }
}

run();
