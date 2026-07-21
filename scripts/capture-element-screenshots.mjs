/**
 * Generates still WebP previews from the Twilight demo for every component.
 * Start `pnpm run dev -- --host 127.0.0.1 --port 5173` first.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const desktopDir = path.join(process.env.HOME || '', 'Desktop', 'ثامبنيلز-عناصر-العطور-WebP');
const projectDir = path.join(root, 'notion-screenshots', 'webps');
const demoUrl = process.env.DEMO_URL || 'http://127.0.0.1:5173/clean-preview.html';
const bundle = JSON.parse(fs.readFileSync(path.join(root, 'twilight-bundle.json'), 'utf8'));
const components = (bundle.components || []).map(({ name }) => name).filter(Boolean);

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(projectDir, { recursive: true });
fs.writeFileSync(
  path.join(desktopDir, 'اقرأني.txt'),
  'هذه صور معاينة لعناصر Twilight الإضافية المباعة لمتاجر قالب رائد على سلة. تُحدَّث تلقائياً من العرض التجريبي للمشروع.\n'
);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
// The demo loader retries a script in the background, so `networkidle` may never
// occur. The card selector below is the actual readiness signal we need.
await page.goto(demoUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForSelector('.component-card[data-component]', { timeout: 90000 });
await page.waitForTimeout(3000);

const results = [];
for (const name of components) {
  try {
    const card = page.locator(`.component-card[data-component="${name}"]`).first();
    await card.waitFor({ state: 'visible', timeout: 30000 });
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    // The Twilight transform plugin suffixes custom-element names, e.g.
    // `salla-scent-passport-abc123`; match the stable component-name prefix.
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
      .flatten({ background: '#fffaf7' })
      .resize({ width: 1600, height: 1200, fit: 'contain', background: '#fffaf7', withoutEnlargement: true })
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
  }
}

fs.writeFileSync(path.join(projectDir, 'manifest.json'), JSON.stringify(results, null, 2));
await browser.close();
console.log(`DONE ${results.filter((item) => item.ok).length}/${results.length} → ${desktopDir}`);
