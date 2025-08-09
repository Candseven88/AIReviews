const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function ensureJpgFromSvg(svgPath, jpgPath, width, height) {
  const dir = path.dirname(jpgPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // If a real JPG already exists, do not overwrite it
  if (fs.existsSync(jpgPath)) {
    console.log(`Skip existing JPG: ${path.relative(process.cwd(), jpgPath)}`);
    return;
  }

  const w = width || 1200;
  const h = height || 630;

  try {
    if (fs.existsSync(svgPath)) {
      const svgBuffer = fs.readFileSync(svgPath);
      const image = sharp(svgBuffer, { density: 300 });
      const pipeline = width || height
        ? image.resize(width || null, height || null, { fit: 'inside', withoutEnlargement: true })
        : image;
      await pipeline.jpeg({ quality: 85, mozjpeg: true }).toFile(jpgPath);
      console.log(`Generated from SVG: ${path.relative(process.cwd(), jpgPath)}`);
      return;
    }
  } catch (err) {
    console.warn(`SVG unsupported or failed (${path.basename(svgPath)}): ${err.message}`);
  }

  // Fallback: create a blank placeholder JPG
  const background = { r: 243, g: 244, b: 246 };
  const text = path.basename(jpgPath, path.extname(jpgPath)).replace(/[-_]/g, ' ').toUpperCase();
  try {
    await sharp({ create: { width: w, height: h, channels: 3, background } })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgPath);
    console.log(`Generated placeholder JPG: ${path.relative(process.cwd(), jpgPath)} (${w}x${h})`);
  } catch (err) {
    console.warn(`Failed to generate placeholder for ${jpgPath}: ${err.message}`);
  }
}

(async () => {
  const root = path.resolve(__dirname, '..');
  const imgDir = path.join(root, 'images', 'babysaja');
  const tasks = [
    { name: 'cover', w: 1600, h: 900 },
    { name: 'voice-clone', w: 1400, h: 800 },
    { name: 'virtual-avatar', w: 1400, h: 800 },
    { name: 'chat-role', w: 1400, h: 800 },
    { name: 'workflow', w: 1600, h: 900 },
  ];
  await Promise.all(tasks.map(t => {
    const svg = path.join(imgDir, `${t.name}.svg`);
    const jpg = path.join(imgDir, `${t.name}.jpg`);
    return ensureJpgFromSvg(svg, jpg, t.w, t.h);
  }));
})(); 