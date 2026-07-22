/**
 * Upload animated WebPs to catbox.moe and set image/preview_image in twilight-bundle.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WEBP_DIR = path.join(ROOT, 'notion-screenshots', 'webps');
const BUNDLE = path.join(ROOT, 'twilight-bundle.json');
const URLS_OUT = path.join(WEBP_DIR, 'urls.json');

async function uploadCatbox(filePath) {
  const buf = fs.readFileSync(filePath);
  const blob = new Blob([buf], { type: 'image/webp' });
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', blob, path.basename(filePath));
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
  });
  const text = (await res.text()).trim();
  if (!res.ok || !text.startsWith('https://')) {
    throw new Error(`Upload failed for ${path.basename(filePath)}: ${text}`);
  }
  return text;
}

const files = fs
  .readdirSync(WEBP_DIR)
  .filter((f) => f.endsWith('.webp') && !f.startsWith('.'))
  .sort();

if (!files.length) {
  console.error('No WebPs in', WEBP_DIR);
  process.exit(1);
}

const urls = fs.existsSync(URLS_OUT) ? JSON.parse(fs.readFileSync(URLS_OUT, 'utf8')) : {};
for (const file of files) {
  const name = file.replace(/\.webp$/, '');
  process.stdout.write(`upload ${name}... `);
  try {
    const url = await uploadCatbox(path.join(WEBP_DIR, file));
    urls[name] = url;
    console.log(url);
  } catch (err) {
    console.log('FAIL', err.message || err);
  }
}

fs.writeFileSync(URLS_OUT, JSON.stringify(urls, null, 2));
const canonicalUrls = path.join(ROOT, 'notion-screenshots', 'webp-urls.json');
fs.writeFileSync(canonicalUrls, JSON.stringify(urls, null, 2));

const bundle = JSON.parse(fs.readFileSync(BUNDLE, 'utf8'));
let updated = 0;
for (const comp of bundle.components || []) {
  if (urls[comp.name]) {
    comp.image = urls[comp.name];
    comp.preview_image = urls[comp.name];
    updated++;
  }
}
fs.writeFileSync(BUNDLE, JSON.stringify(bundle, null, 4) + '\n');
for (const copy of ['public/twilight-bundle.json', 'dist/twilight-bundle.json']) {
  const p = path.join(ROOT, copy);
  if (fs.existsSync(path.dirname(p))) {
    fs.writeFileSync(p, JSON.stringify(bundle, null, 4) + '\n');
  }
}
console.log(`Updated ${updated} components in twilight-bundle.json (+ public/dist)`);
console.log('Saved', canonicalUrls);
