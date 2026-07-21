/**
 * Capture one resilient still WebP preview for every component in a Twilight kit.
 *
 * Example:
 * ROOT=/path/to/kit DEMO_URL=http://127.0.0.1:5173/clean-preview.html \
 * DESKTOP_DIR=/path/to/Desktop/folder node scripts/capture-twilight-previews.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.env.ROOT || process.cwd());
const demoUrl = process.env.DEMO_URL;
const desktopDir = process.env.DESKTOP_DIR;
const background = process.env.BACKGROUND || '#ffffff';

if (!demoUrl || !desktopDir) {
  throw new Error('ROOT, DEMO_URL, and DESKTOP_DIR must be set');
}

const bundle = JSON.parse(fs.readFileSync(path.join(root, 'twilight-bundle.json'), 'utf8'));
const components = (bundle.components || []).map(({ name }) => name).filter(Boolean);
const projectDir = path.join(root, 'notion-screenshots', 'webps');
fs.mkdirSync(projectDir, { recursive: true });
fs.mkdirSync(desktopDir, { recursive: true });
fs.writeFileSync(
  path.join(desktopDir, 'اقرأني.txt'),
  'معاينات عناصر Twilight كإضافات لمتاجر ثيم رائد؛ بعد نتيجة الاختبار تظهر منتجات التاجر أو زر رابط.\n',
);

const browser = await chromium.launch({ headless: true });
const results = [];

for (const name of components) {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1200 },
    deviceScaleFactor: 1,
  });

  try {
    const url = new URL(demoUrl);
    url.searchParams.set('component', name);
    await page.goto(url.toString(), { waitUntil: 'domcontentloaded', timeout: 120000 });
    const card = page.locator(`.component-card[data-component="${name}"]`).first();
    await card.waitFor({ state: 'visible', timeout: 90000 });
    await page.waitForTimeout(700);
    const host = await card.evaluateHandle((el, component) => {
      const prefix = `salla-${component}`;
      return [...el.querySelectorAll('*')].find((node) => {
        const tag = node.tagName.toLowerCase();
        return tag === prefix || tag.startsWith(`${prefix}-`);
      }) || el;
    }, name);
    const element = host.asElement();
    if (!element) throw new Error('Rendered custom element was not found');
    const png = await element.screenshot({ type: 'png', animations: 'disabled' });
    const webp = await sharp(png)
      .flatten({ background })
      .resize({ width: 1600, height: 1200, fit: 'contain', background, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    const filename = `${name}.webp`;
    fs.writeFileSync(path.join(projectDir, filename), webp);
    fs.writeFileSync(path.join(desktopDir, filename), webp);
    results.push({ name, ok: true, bytes: webp.length });
    console.log(`OK ${name} ${(webp.length / 1024).toFixed(0)}KB`);
  } catch (error) {
    results.push({ name, ok: false, error: String(error.message || error) });
    console.error(`FAIL ${name}: ${error.message || error}`);
  } finally {
    await page.close();
  }
}

await browser.close();
fs.writeFileSync(path.join(projectDir, 'manifest.json'), JSON.stringify(results, null, 2));
const failed = results.filter((result) => !result.ok);
console.log(`DONE ${results.length - failed.length}/${results.length} → ${desktopDir}`);
if (failed.length) console.error(`FAILED: ${failed.map(({ name }) => name).join(', ')}`);
