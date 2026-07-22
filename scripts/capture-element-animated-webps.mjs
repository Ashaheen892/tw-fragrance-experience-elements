/**
 * Capture animated WebP previews (1600×1200, ≤200KB) showing full element steps.
 *
 * Requires: pnpm run dev (DEMO_URL)
 * Usage: DEMO_URL=http://127.0.0.1:5186/clean-preview.html node scripts/capture-element-animated-webps.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
import sharp from 'sharp';

const { GIFEncoder, quantize, applyPalette } = gifenc;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'notion-screenshots', 'webps');
const DESKTOP_DIR = path.join(process.env.HOME || '', 'Desktop', 'ثامبنيلز-عناصر-العطور-WebP');
const DEMO_URL = process.env.DEMO_URL || 'http://localhost:5186/clean-preview.html';
const W = 1600;
const H = 1200;
const MAX_BYTES = 200 * 1024;
const FRAME_MS = 850;
const BG = [246, 244, 241];

const bundle = JSON.parse(fs.readFileSync(path.join(ROOT, 'twilight-bundle.json'), 'utf8'));
const COMPONENTS = (bundle.components || []).map((c) => c.name).filter(Boolean);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(DESKTOP_DIR, { recursive: true });
fs.writeFileSync(
  path.join(DESKTOP_DIR, 'اقرأني.txt'),
  'معاينات WebP متحركة (1600×1200 ≤200KB) لعناصر تجربة العطور — توضح خطوات التفاعل.\n'
);

function fitToCanvas(pngBuffer) {
  const src = PNG.sync.read(pngBuffer);
  const out = new PNG({ width: W, height: H });
  for (let i = 0; i < W * H; i++) {
    const o = i * 4;
    out.data[o] = BG[0];
    out.data[o + 1] = BG[1];
    out.data[o + 2] = BG[2];
    out.data[o + 3] = 255;
  }
  const scale = Math.min(W / src.width, H / src.height, 1);
  const dw = Math.max(1, Math.round(src.width * scale));
  const dh = Math.max(1, Math.round(src.height * scale));
  const ox = Math.floor((W - dw) / 2);
  const oy = Math.floor((H - dh) / 2);
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(src.width - 1, Math.floor(x / scale));
      const sy = Math.min(src.height - 1, Math.floor(y / scale));
      const si = (sy * src.width + sx) * 4;
      const di = ((oy + y) * W + (ox + x)) * 4;
      const a = src.data[si + 3] / 255;
      out.data[di] = Math.round(src.data[si] * a + BG[0] * (1 - a));
      out.data[di + 1] = Math.round(src.data[si + 1] * a + BG[1] * (1 - a));
      out.data[di + 2] = Math.round(src.data[si + 2] * a + BG[2] * (1 - a));
      out.data[di + 3] = 255;
    }
  }
  return out.data;
}

function encodeGif(framesRgba) {
  const gif = GIFEncoder();
  let palette;
  for (const data of framesRgba) {
    if (!palette) palette = quantize(data, 128);
    gif.writeFrame(applyPalette(data, palette), W, H, {
      palette,
      delay: FRAME_MS,
      dispose: 1,
    });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function compressAnimatedWebp(gifBuffer) {
  let quality = 52;
  let effort = 6;
  let best = null;
  for (let attempt = 0; attempt < 10; attempt++) {
    const buf = await sharp(gifBuffer, { animated: true, pages: -1 })
      .resize(W, H, { fit: 'fill' })
      .webp({ quality, effort, loop: 0 })
      .toBuffer();
    best = buf;
    if (buf.length <= MAX_BYTES) return buf;
    quality = Math.max(18, quality - 5);
  }
  // Last resort: fewer colors via lower quality + strip
  const tiny = await sharp(gifBuffer, { animated: true, pages: -1 })
    .resize(W, H, { fit: 'fill' })
    .webp({ quality: 16, effort: 6, loop: 0, alphaQuality: 40 })
    .toBuffer();
  return tiny.length < (best?.length || Infinity) ? tiny : best;
}

async function getHost(card) {
  const handle = await card.evaluateHandle((el) => {
    const name = el.getAttribute('data-component');
    return (
      [...el.querySelectorAll('*')].find((n) =>
        n.tagName.toLowerCase().startsWith(`salla-${name}`)
      ) || el
    );
  });
  return handle.asElement();
}

async function setStepBadge(card, label, step, total) {
  await card.evaluate(
    (el, payload) => {
      let bar = el.querySelector('.gif-demo-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'gif-demo-bar';
        bar.setAttribute(
          'style',
          [
            'position:sticky',
            'top:0',
            'z-index:50',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'gap:12px',
            'padding:14px 18px',
            'background:linear-gradient(90deg,#5c4a32,#9a7b4f)',
            'color:#fff',
            'font:800 18px/1.35 "Segoe UI",Tahoma,sans-serif',
            'border-bottom:1px solid rgba(255,255,255,.2)',
            'direction:rtl',
          ].join(';')
        );
        el.insertBefore(bar, el.firstChild);
      }
      bar.innerHTML = `<span>${payload.label}</span><span style="opacity:.9;font-size:14px;font-weight:700">الخطوة ${payload.step} من ${payload.total}</span>`;
    },
    { label, step, total }
  );
}

async function clickInHost(page, host, selectors, index = 0) {
  return page.evaluate(
    ({ el, selectors, index }) => {
      const root = el.shadowRoot || el;
      for (const sel of selectors) {
        const nodes = [...root.querySelectorAll(sel)].filter((n) => {
          const s = getComputedStyle(n);
          const r = n.getBoundingClientRect();
          return (
            s.display !== 'none' &&
            s.visibility !== 'hidden' &&
            r.width > 4 &&
            r.height > 4 &&
            !n.disabled
          );
        });
        if (nodes[index]) {
          nodes[index].click();
          return true;
        }
      }
      return false;
    },
    { el: host, selectors, index }
  );
}

async function clickPrimaryNav(page, host) {
  return page.evaluate((el) => {
    const root = el.shadowRoot || el;
    const btns = [...root.querySelectorAll('button.fs-btn, button')].filter((n) => {
      const s = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const cls = n.className?.toString?.() || '';
      return (
        s.display !== 'none' &&
        s.visibility !== 'hidden' &&
        r.width > 20 &&
        !n.disabled &&
        !cls.includes('ghost') &&
        !cls.includes('icon-btn')
      );
    });
    const prefer = btns.find((b) =>
      /التالي|عرض|نتيجة|اعرض|ابدأ|See|Next|Explore/i.test(b.textContent || '')
    );
    (prefer || btns[btns.length - 1])?.click();
    return Boolean(prefer || btns.length);
  }, host);
}

/** Generic interactive walkthrough for fragrance tools */
async function demoGeneric(page, host, shot, labels) {
  await shot(labels[0]);
  for (let i = 1; i < labels.length; i++) {
    const clicked =
      (await clickInHost(page, host, [
        'button.is-active ~ button',
        'button.fs-tap',
        'button.spf-card',
        'button.spa-chip',
        'button.sgb-card',
        'button.fwd-door',
        'button.ffm-chip',
        'button.igs-card',
        'button.osg-card',
        'button.inp-tier',
        'button.smc-point',
        'button.set-step',
        'button.pql-step',
        'button.scat-toggle__btn',
        'button.sba-tab',
        'button.spb-nav',
        'button',
        '[role="button"]',
        'a.fs-btn',
      ], i % 3)) ||
      (await clickPrimaryNav(page, host));
    await page.waitForTimeout(clicked ? 480 : 300);
    await shot(labels[i]);
  }
}

const STEP_LABELS = {
  'scent-personality-finder': [
    'استعراض بطاقات الشخصيات',
    'اختيار شخصية عطرية',
    'عرض العائلة والنتيجة',
    'زر الاستكشاف أو التسوق',
  ],
  'interactive-notes-pyramid': [
    'عرض هرم النوتات',
    'فتح طبقة المقدمة',
    'استكشاف القلب والقاعدة',
    'قراءة تفاصيل النوتات',
  ],
  'fragrance-family-map': [
    'خريطة العائلات العطرية',
    'اختيار عائلة',
    'عرض التفاصيل',
    'الانتقال لعائلة أخرى',
  ],
  'fragrance-layering-lab': [
    'عرض وصفات الدمج',
    'قراءة تركيبة الدمج',
    'استعراض النتيجة والمناسبة',
    'تصفّح وصفة أخرى',
  ],
  'fragrance-performance-meter': [
    'مؤشرات أداء العطر',
    'قراءة الثبات والفوحان',
    'مقارنة الخصائص',
    'ملخص المؤشرات',
  ],
  'scent-evolution-timeline': [
    'خط رحلة العطر',
    'اللحظات الأولى',
    'بعد 30 دقيقة',
    'نهاية اليوم',
  ],
  'ingredient-stories': [
    'مكتبة المكونات',
    'اختيار مكوّن',
    'قراءة القصة والمصدر',
    'مكون آخر للمقارنة',
  ],
  'occasion-scent-guide': [
    'دليل المناسبات',
    'اختيار مناسبة',
    'مواصفات العطر المناسب',
    'استكشاف الرابط',
  ],
  'scent-mood-compass': [
    'بوصلة الطابع العطري',
    'اختيار نقطة على البوصلة',
    'عرض تفاصيل النمط',
    'مقارنة نقطة أخرى',
  ],
  'spray-ritual-guide': [
    'دليل قوة الاستخدام',
    'اختيار مستوى الرش',
    'عرض المناطق والنصائح',
    'نقاط الجسم التفاعلية',
  ],
  'scent-passport': [
    'بداية جوازك العطري',
    'اختيار النوتات المفضلة',
    'متابعة الخطوات',
    'عرض الجواز النهائي',
  ],
  'smart-gift-builder': [
    'صندوق الهدية الذكي',
    'اختيار المستلم',
    'المناسبة والميزانية',
    'اقتراح التغليف والرسالة',
  ],
  'scent-scene': [
    'مشاهد الرائحة',
    'اختيار مشهد',
    'تغيّر الخلفية والطابع',
    'استكشاف المشهد',
  ],
  'fragrance-wardrobe': [
    'خزانة العطور',
    'فتح خانة',
    'قراءة التفاصيل',
    'التنقّل بين الخانات',
  ],
  'perfume-quality-lab': [
    'مختبر الجودة',
    'اختيار محطة',
    'شرح المرحلة',
    'حقائق وشهادات',
  ],
  'scent-categories': [
    'تصنيفات العطور',
    'التبديل لعرض الشبكة',
    'تصفّح التصنيفات',
    'العودة للشريط',
  ],
  'scent-before-after': [
    'مقارنة قبل وبعد',
    'سحب شريط المقارنة',
    'تبديل الشريحة',
    'عرض النتيجة البصرية',
  ],
  'scent-promo-banners': [
    'البانر الترويجي',
    'الانتقال للبانر التالي',
    'عرض محتوى البانر',
    'زر الدعوة للإجراء',
  ],
};

async function captureOne(browser, name) {
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  const frames = [];
  try {
    const url = new URL(DEMO_URL);
    url.searchParams.set('component', name);
    await page.goto(url.toString(), { waitUntil: 'domcontentloaded', timeout: 120000 });
    const card = page.locator(`.component-card[data-component="${name}"]`).first();
    await card.waitFor({ state: 'visible', timeout: 90000 });
    await page.waitForTimeout(900);
    const host = await getHost(card);
    if (!host) throw new Error('host missing');

    const labels = STEP_LABELS[name] || [
      'بداية العنصر',
      'تفاعل أول',
      'تفاعل ثانٍ',
      'النتيجة',
    ];
    let step = 0;
    const shot = async (label) => {
      step += 1;
      await setStepBadge(card, label, step, labels.length);
      await page.waitForTimeout(180);
      const png = await card.screenshot({ type: 'png', animations: 'allow' });
      frames.push(fitToCanvas(png));
    };

    // Wait for custom element to actually render content
    await page.waitForFunction(
      (component) => {
        const card = document.querySelector(`.component-card[data-component="${component}"]`);
        const host = [...(card?.querySelectorAll('*') || [])].find((n) =>
          n.tagName.toLowerCase().startsWith(`salla-${component}`)
        );
        const root = host?.shadowRoot;
        return Boolean(root && (root.textContent || '').trim().length > 20);
      },
      name,
      { timeout: 60000 }
    );
    await page.waitForTimeout(400);

    // Special cases
    if (name === 'scent-before-after') {
      await shot(labels[0]);
      await page.evaluate((el) => {
        const root = el.shadowRoot || el;
        const cmp = root.querySelector('.sba-compare');
        if (!cmp) return;
        const r = cmp.getBoundingClientRect();
        const fire = (x) => {
          cmp.dispatchEvent(
            new PointerEvent('pointerdown', { clientX: x, clientY: r.top + r.height / 2, bubbles: true })
          );
          cmp.dispatchEvent(
            new PointerEvent('pointerup', { clientX: x, clientY: r.top + r.height / 2, bubbles: true })
          );
        };
        fire(r.left + r.width * 0.35);
      }, host);
      await page.waitForTimeout(400);
      await shot(labels[1]);
      await clickInHost(page, host, ['button.sba-tab'], 1);
      await page.waitForTimeout(400);
      await shot(labels[2]);
      await page.evaluate((el) => {
        const root = el.shadowRoot || el;
        const cmp = root.querySelector('.sba-compare');
        if (!cmp) return;
        const r = cmp.getBoundingClientRect();
        cmp.dispatchEvent(
          new PointerEvent('pointerdown', {
            clientX: r.left + r.width * 0.7,
            clientY: r.top + r.height / 2,
            bubbles: true,
          })
        );
      }, host);
      await page.waitForTimeout(350);
      await shot(labels[3]);
    } else if (name === 'scent-passport' || name === 'smart-gift-builder') {
      await shot(labels[0]);
      for (let i = 1; i < labels.length; i++) {
        await clickInHost(page, host, ['button.spa-chip', 'button.sgb-card', 'button.fs-tap', 'button'], 0);
        await page.waitForTimeout(280);
        await clickPrimaryNav(page, host);
        await page.waitForTimeout(450);
        await shot(labels[i]);
      }
    } else {
      await demoGeneric(page, host, shot, labels);
    }

    if (frames.length < 2) throw new Error('need ≥2 frames');
    const gif = encodeGif(frames);
    const webp = await compressAnimatedWebp(gif);
    const filename = `${name}.webp`;
    fs.writeFileSync(path.join(OUT_DIR, filename), webp);
    fs.writeFileSync(path.join(DESKTOP_DIR, filename), webp);
    const kb = (webp.length / 1024).toFixed(1);
    const okSize = webp.length <= MAX_BYTES;
    console.log(`${okSize ? 'OK' : 'BIG'} ${name} ${kb}KB frames=${frames.length}`);
    return { name, ok: true, bytes: webp.length, okSize, frames: frames.length };
  } catch (error) {
    console.error(`FAIL ${name}: ${error.message || error}`);
    return { name, ok: false, error: String(error.message || error) };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({ headless: true });
const results = [];
for (const name of COMPONENTS) {
  results.push(await captureOne(browser, name));
}
await browser.close();

fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
const ok = results.filter((r) => r.ok).length;
const oversized = results.filter((r) => r.ok && !r.okSize).map((r) => r.name);
console.log(`DONE ${ok}/${results.length} → ${OUT_DIR}`);
if (oversized.length) console.warn('Over 200KB:', oversized.join(', '));
