import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import { localizedString, getPageLocale, type LocaleValue } from '../../utils/localizedString.js';

/* ---- inlined: utils/fsTheme.ts ---- */
/**
 * Reliable light/dark + store-primary tokens for Lit shadow roots.
 * `:host-context()` is fragile (iframe demos / Firefox), so we also push
 * CSS variables onto hosts and `.fs-section` nodes when the document theme changes.
 */

type FsThemeMode = 'light' | 'dark';

const PRIMARY =
  'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))';

function detectFsTheme(): FsThemeMode {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  const attr = (
    root.getAttribute('data-theme') ||
    root.getAttribute('data-mode') ||
    ''
  ).toLowerCase();
  if (attr === 'dark') return 'dark';
  if (attr === 'light') return 'light';
  if (root.classList.contains('dark') || document.body?.classList.contains('dark')) {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem('salla_demo_theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    /* ignore */
  }
  return 'light';
}

/** CSS variables that must win inside component trees. */
function fsThemeVars(mode: FsThemeMode = detectFsTheme()): Record<string, string> {
  const dark = mode === 'dark';
  return {
    '--fs-store-primary': PRIMARY,
    '--accent-color': PRIMARY,
    '--button-bg': PRIMARY,
    '--button-color': '#ffffff',
    '--text-color': dark ? '#ffffff' : '#000000',
    '--muted-color': dark ? '#aaaaaa' : '#666666',
    '--card-bg': dark ? '#0f0f0f' : '#ffffff',
    '--fs-surface': dark ? '#0a0a0a' : '#f0f0f0',
    '--border-color': dark ? 'rgba(255, 255, 255, 0.12)' : '#e5e7eb',
    '--section-bg': 'transparent',
  };
}

function applyVars(el: HTMLElement, vars: Record<string, string>): void {
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-fs-theme', detectFsTheme());
}

function walkAndApply(root: Document | ShadowRoot, vars: Record<string, string>): void {
  root.querySelectorAll('.fs-section').forEach((node) => {
    applyVars(node as HTMLElement, vars);
  });
}

/** Push theme tokens onto every mounted kit host / section. */
function applyFsThemeToDocument(mode: FsThemeMode = detectFsTheme()): void {
  if (typeof document === 'undefined') return;
  const vars = fsThemeVars(mode);
  walkAndApply(document, vars);

  document.querySelectorAll('*').forEach((node) => {
    const el = node as HTMLElement;
    const shadow = el.shadowRoot;
    if (!shadow) return;
    if (shadow.querySelector('.fs-section')) {
      applyVars(el, vars);
      walkAndApply(shadow, vars);
    }
  });
}

let watching = false;
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSync(): void {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    applyFsThemeToDocument();
  }, 50);
}

/** Start a single document-level theme observer (idempotent). */
function ensureFsThemeWatch(): void {
  if (watching || typeof document === 'undefined') return;
  watching = true;

  scheduleSync();

  try {
    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-mode', 'class'],
    });
    if (document.body) {
      new MutationObserver(scheduleSync).observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-mode'],
      });
    }
  } catch {
    /* ignore */
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'salla_demo_theme') scheduleSync();
  });

  // Catch late-mounted custom elements in the Salla demo grid.
  try {
    new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length)) scheduleSync();
    }).observe(document.documentElement, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/* ---- inlined: utils/helpers.ts ---- */
type ConfigValue = Record<string, unknown> | null | undefined;

function normalizeItem<T extends Record<string, unknown> = Record<string, unknown>>(
  item: Record<string, unknown> | null | undefined
): T {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes('.') ? key.split('.').pop()! : key;
    acc[normalizedKey] = value;
    return acc;
  }, {} as Record<string, unknown>) as T;
}

/** Stable id from label when merchant UI has no internal-id field (Raed add-on UX). */
function slugifyId(value: unknown, fallback = ''): string {
  const raw =
    typeof value === 'string' || typeof value === 'number'
      ? String(value).trim()
      : localizedString(value as LocaleValue, '').trim();
  if (!raw) return fallback;
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || fallback;
}

/** Prefer English label for stable ASCII ids across AR/EN storefronts. */
function itemIdFromLabel(value: unknown, fallback = ''): string {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const row = value as Record<string, unknown>;
    const en = String(row.en ?? '').trim();
    const ar = String(row.ar ?? '').trim();
    return slugifyId(en || ar, fallback);
  }
  return slugifyId(value, fallback);
}

function resolveItemId(
  item: Record<string, unknown>,
  index: number,
  prefix = 'item'
): string {
  const explicit = String(item.id ?? item.value ?? item.key ?? '').trim();
  if (explicit) return explicit;
  return (
    itemIdFromLabel(item.name ?? item.title ?? item.label ?? item.brand ?? item.model, '') ||
    `${prefix}-${index + 1}`
  );
}

function normalizeCollection<T extends Record<string, unknown> = Record<string, unknown>>(
  items: unknown
): T[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item, index) => {
      const normalized = normalizeItem<T>(item);
      const row = normalized as Record<string, unknown>;
      if (!String(row.id ?? '').trim()) {
        row.id = resolveItemId(row, index);
      }
      return normalized;
    });
}

function getUnitValue(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '' && Number.isFinite(Number(val))) {
    return Number(val);
  }
  if (val && typeof val === 'object' && 'value' in (val as object)) {
    return getUnitValue((val as { value: unknown }).value, fallback);
  }
  return fallback;
}

function toNumber(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '') {
    const n = Number(val.replace(',', '.'));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function isTruthy(val: unknown, fallback = false): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const v = val.toLowerCase().trim();
    if (['true', '1', 'yes', 'on'].includes(v)) return true;
    if (['false', '0', 'no', 'off', ''].includes(v)) return false;
  }
  if (typeof val === 'number') return val !== 0;
  return fallback;
}

function extractLink(value: unknown): string {
  if (!value) return '';

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return isValidHref(trimmed) ? trimmed : '';
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return '';
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const candidates = [
      obj.url,
      obj.href,
      obj.link,
      obj.value,
      obj.custom,
      obj.path,
    ];

    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }
  }

  return '';
}

function isValidHref(url: string): boolean {
  if (!url || url === '#') return false;
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;
  if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('whatsapp:')) {
    return true;
  }
  try {
    const parsed = new URL(url, window.location.origin);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isDirectMediaUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url, window.location.origin);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return true;
  } catch {
    return false;
  }
}

function formatPrice(amount: number, currency = 'ر.س'): string {
  if (!Number.isFinite(amount)) return '';
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${currency}`.trim();
}

/** Store currency from Salla when available — no merchant currency field needed. */
function getStoreCurrency(fallback = 'ر.س'): string {
  try {
    const w = window as unknown as {
      Salla?: {
        config?: { currency?: { symbol?: string; code?: string } };
        currency?: { symbol?: string; code?: string };
      };
      salla?: {
        config?: { currency?: { symbol?: string; code?: string } };
        currency?: { symbol?: string; code?: string };
      };
    };
    const salla = w.Salla || w.salla;
    const fromConfig =
      salla?.config?.currency?.symbol ||
      salla?.config?.currency?.code ||
      salla?.currency?.symbol ||
      salla?.currency?.code;
    if (typeof fromConfig === 'string' && fromConfig.trim()) {
      return fromConfig.trim();
    }
    const attr = document.documentElement.getAttribute('data-currency');
    if (attr?.trim()) return attr.trim();
  } catch {
    // ignore
  }
  return fallback;
}

function groupByKey<T extends object>(
  items: T[],
  key: keyof T | string
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const group = String((item as Record<string, unknown>)[key as string] ?? '').trim();
    if (!group) continue;
    const list = map.get(group) || [];
    list.push(item);
    map.set(group, list);
  }
  return map;
}

function sortByOrder<T extends object>(
  items: T[],
  orderKey: keyof T | string = 'group_order'
): T[] {
  return [...items].sort(
    (a, b) =>
      toNumber((a as Record<string, unknown>)[orderKey as string], 0) -
      toNumber((b as Record<string, unknown>)[orderKey as string], 0)
  );
}

function t(
  ar: string,
  en: string,
  value?: LocaleValue,
  fallbackAr?: string
): string {
  if (value != null) {
    const localized = localizedString(value, '');
    if (localized) return localized;
  }
  // Prefer merchant-provided value; chrome fallbacks follow storefront locale
  // (Salla.lang → html lang → ar), same as the reference bundle.
  if (getPageLocale() === 'en') return en;
  return fallbackAr || ar;
}

function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

function safeStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = String(phone || '').replace(/\D+/g, '');
  if (!digits || digits.length < 8) return '';
  const text = encodeURIComponent(message || '');
  return `https://wa.me/${digits}${text ? `?text=${text}` : ''}`;
}

async function copyText(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }

  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

interface SectionTheme {
  bg: string;
  text: string;
  muted: string;
  accent: string;
  card: string;
  border: string;
  buttonBg: string;
  buttonColor: string;
  radius: string;
  spaceDesktop: number;
  spaceMobile: number;
  animate: boolean;
  fullWidth: boolean;
  /** Standard Salla editor controls (mirror the default element editor). */
  noBottomMargin: boolean;
  hasContainer: boolean;
}

function readSectionTheme(
  config: ConfigValue,
  prefix: string,
  defaults?: Partial<SectionTheme>
): SectionTheme {
  const c = config || {};
  // Colors come from the store theme (primary + light/dark), not merchant pickers.
  return {
    bg: 'transparent',
    text: '#000000',
    muted: '#666666',
    accent: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    card: 'var(--color-white, var(--bg-color, #ffffff))',
    border: 'var(--color-border, #e5e7eb)',
    buttonBg: 'var(--color-primary, var(--primary-color, var(--color-main, #64748b)))',
    buttonColor: '#ffffff',
    radius: `${getUnitValue(c[`${prefix}radius`], defaults?.radius ? Number(String(defaults.radius).replace('px', '')) : 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      defaults?.spaceDesktop ?? 48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      defaults?.spaceMobile ?? 28
    ),
    animate: isTruthy(c[`${prefix}animate`], defaults?.animate ?? true),
    fullWidth: isTruthy(c[`${prefix}full_width`], defaults?.fullWidth ?? false),
    noBottomMargin: false,
    hasContainer: true,
  };
}

function themeStyleMap(theme: SectionTheme): Record<string, string> {
  const useContainer = theme.hasContainer !== false;
  ensureFsThemeWatch();
  return {
    ...fsThemeVars(),
    '--section-radius': theme.radius,
    '--space-desktop': `${theme.spaceDesktop}px`,
    '--space-mobile': `${theme.spaceMobile}px`,
    '--space-desktop-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceDesktop}px`,
    '--space-mobile-bottom': theme.noBottomMargin ? '0px' : `${theme.spaceMobile}px`,
    '--section-container-max': useContainer ? '1440px' : 'none',
    '--section-container-pad': useContainer ? '16px' : '0px',
    '--section-container-pad-sm': useContainer ? '12px' : '0px',
  };
}

function getRadioValue(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (Array.isArray(value) && value[0]) {
    const first = value[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object' && 'value' in first) {
      return String((first as { value: unknown }).value ?? fallback);
    }
    if (first && typeof first === 'object' && 'key' in first) {
      return String((first as { key: unknown }).key ?? fallback);
    }
  }
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    // Twilight dropdown-list: { selected: [{ value | key }], options, ... }
    if (Array.isArray(obj.selected) && obj.selected[0]) {
      return getRadioValue(obj.selected, fallback);
    }
    if ('value' in obj && obj.value != null && !Array.isArray(obj.value)) {
      return String(obj.value ?? fallback);
    }
    if (Array.isArray(obj.value) && obj.value[0]) {
      return getRadioValue(obj.value, fallback);
    }
  }
  return fallback;
}

function parseTags(raw: unknown): string[] {
  const text = localizedString(raw as LocaleValue, '');
  if (!text) return [];
  return text
    .split(/[,،|/]/)
    .map((part: string) => part.trim())
    .filter(Boolean);
}

function extractMoneyAmount(val: unknown): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string' && val.trim() !== '') return toNumber(val, 0);
  if (val && typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if ('amount' in obj) return extractMoneyAmount(obj.amount);
    if ('value' in obj) return extractMoneyAmount(obj.value);
  }
  return 0;
}

function extractImageUrl(val: unknown): string {
  if (!val) return '';
  if (typeof val === 'string') {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith('/') ? trimmed : '';
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return '';
  }
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return '';
}

interface SallaProductSnapshot {
  id: string;
  name: string;
  image: string;
  url: string;
  price: number;
  old_price: number;
  rating: number;
}

/** Read a 0–5 rating from varied Salla shapes (rating.stars, rating, rate...). */
function extractRating(val: unknown): number {
  if (val == null) return 0;
  if (typeof val === 'number' && Number.isFinite(val)) {
    return Math.max(0, Math.min(5, val));
  }
  if (typeof val === 'string') return extractRating(toNumber(val, 0));
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const candidate =
      obj.stars ?? obj.rate ?? obj.rating ?? obj.average ?? obj.value;
    if (candidate != null && candidate !== val) return extractRating(candidate);
  }
  return 0;
}

/** Normalize Salla Products dropdown values (object, array, or selected wrapper). */
function extractSallaProduct(raw: unknown): SallaProductSnapshot | null {
  if (!raw) return null;

  let candidate: unknown = raw;

  if (Array.isArray(raw)) {
    candidate = raw[0];
  } else if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    const selected = Array.isArray(obj.selected) ? obj.selected : [];
    const values = Array.isArray(obj.value) ? obj.value : [];

    // Prefer non-empty selected; otherwise fall through to value (Twilight quirk)
    if (selected.length) {
      candidate = selected[0];
    } else if (values.length) {
      candidate = typeof values[0] === 'object' && values[0] ? values[0] : values[0];
    } else if (obj.product && typeof obj.product === 'object') {
      candidate = obj.product;
    } else if (obj.value && typeof obj.value === 'object' && !Array.isArray(obj.value)) {
      // Twilight picker: { label, value: { id, name, image, ... } }
      candidate = obj.value;
    }
  }

  if (candidate != null && (typeof candidate === 'string' || typeof candidate === 'number')) {
    const id = String(candidate).trim();
    return id ? { id, name: '', image: '', url: '', price: 0, old_price: 0, rating: 0 } : null;
  }

  if (!candidate || typeof candidate !== 'object') return null;

  const product = candidate as Record<string, unknown>;
  let id = String(product.id ?? product.product_id ?? '').trim();
  if (!id && product.value != null && typeof product.value !== 'object') {
    id = String(product.value).trim();
  }
  if (!id && product.value && typeof product.value === 'object') {
    const nested = product.value as Record<string, unknown>;
    id = String(nested.id ?? nested.product_id ?? nested.value ?? '').trim();
  }

  const name =
    localizedString(product.name as LocaleValue, '').trim() ||
    localizedString(product.label as LocaleValue, '').trim() ||
    localizedString(product.title as LocaleValue, '').trim();
  const image =
    extractImageUrl(product.image) ||
    extractImageUrl(product.main_image) ||
    extractImageUrl(product.thumbnail) ||
    extractImageUrl(product.images) ||
    (product.value && typeof product.value === 'object'
      ? extractImageUrl((product.value as Record<string, unknown>).image)
      : '');
  const url = extractLink(
    product.url ||
      product.permalink ||
      product.link ||
      (product.value && typeof product.value === 'object'
        ? (product.value as Record<string, unknown>).url
        : '')
  );

  const onSale = isTruthy(product.on_sale) || isTruthy(product.is_on_sale);
  const salePrice = extractMoneyAmount(
    product.sale_price ?? product.sale_price_amount ?? product.discounted_price
  );
  const regularPrice = extractMoneyAmount(
    product.regular_price ?? product.regular_price_amount ?? product.price_before
  );
  const basePrice = extractMoneyAmount(product.price ?? product.price_amount);

  let price = basePrice;
  let old_price = 0;

  if (onSale && salePrice > 0) {
    price = salePrice;
    old_price = regularPrice > salePrice ? regularPrice : 0;
  } else if (regularPrice > basePrice && basePrice > 0) {
    price = basePrice;
    old_price = regularPrice;
  } else if (salePrice > 0 && regularPrice > salePrice) {
    price = salePrice;
    old_price = regularPrice;
  }

  const rating = extractRating(product.rating ?? product.rate ?? product.rating_stars);

  if (!id && !name && !image && !url) return null;

  return { id, name, image, url, price, old_price, rating };
}

/* ---- inlined: utils/sharedStyles.ts ---- */
/**
 * Shared section chrome + mobile/tablet baselines.
 * Breakpoints: phone ≤639 · tablet ≤959 · desktop ≥960
 */
const sharedSectionCss = css`
  :host {
    direction: inherit;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: block;
    overflow-x: clip;
    /* Store primary + light/dark text defaults */
    --fs-store-primary: var(--color-primary, var(--primary-color, var(--color-main, #64748b)));
    --accent-color: var(--fs-store-primary);
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
    /* Light: titles black · subtitle/desc muted */
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f0f0f0;
    --fs-success: #2f9e63;
    --fs-caution: #e0a100;
    --fs-danger: #cf4b4b;
    --fs-unknown: #8f7a86;
  }

  :host-context(:root:not([data-theme='dark']):not(.dark)),
  :host-context(html:not([data-theme='dark']):not(.dark)) {
    --text-color: #000000;
    --muted-color: #666666;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --section-bg: transparent;
    --fs-surface: #f0f0f0;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  :host-context([data-theme='dark']),
  :host-context(.dark),
  :host-context([data-mode='dark']) {
    /* Dark: titles white · subtitle/desc muted · secondary surfaces darker */
    --text-color: #ffffff;
    --muted-color: #aaaaaa;
    --card-bg: #0f0f0f;
    --border-color: rgba(255, 255, 255, 0.12);
    --section-bg: transparent;
    --fs-surface: #0a0a0a;
    --button-bg: var(--fs-store-primary);
    --button-color: #ffffff;
  }

  .fs-section {
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
    color: var(--text-color, #000000);
    padding: var(--space-mobile, 28px) 0
      var(--space-mobile-bottom, var(--space-mobile, 28px));
    overflow-x: clip;
  }

  @media (min-width: 960px) {
    .fs-section {
      padding: var(--space-desktop, 48px) 0
        var(--space-desktop-bottom, var(--space-desktop, 48px));
    }
  }

  .fs-container {
    width: 100%;
    max-width: var(--section-container-max, 1440px);
    margin: 0 auto;
    padding: 0 var(--section-container-pad, 16px);
    box-sizing: border-box;
  }

  .fs-section--full .fs-container {
    max-width: none;
  }

  .fs-header {
    text-align: center;
    margin-bottom: clamp(1.35rem, 3vw, 1.85rem);
  }

  .fs-title {
    margin: 0 0 0.6rem;
    font-size: clamp(1.4rem, 2.6vw, 1.95rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--text-color, #000000);
  }

  /* Distinct fragrance motif: a soft champagne rule under the section title */
  .fs-header .fs-title::after {
    content: '';
    display: block;
    width: 54px;
    height: 3px;
    margin: 0.7rem auto 0;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, #5c4a32)
    );
  }

  .fs-subtitle {
    margin: 0 0 0.45rem;
    color: var(--muted-color, #666666);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.5;
  }

  .fs-desc {
    margin: 0 auto;
    max-width: 42rem;
    color: var(--muted-color, #666666);
    font-size: 0.95rem;
    line-height: 1.7;
    text-wrap: pretty;
  }

  .fs-title,
  .fs-commerce__title {
    color: var(--text-color, #000000);
  }

  .fs-desc,
  .fs-subtitle,
  .fs-empty {
    color: var(--muted-color, #666666);
  }

  :host([data-fs-theme='dark']) .fs-title,
  :host([data-fs-theme='dark']) .fs-commerce__title {
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-desc,
  :host([data-fs-theme='dark']) .fs-subtitle,
  :host([data-fs-theme='dark']) .fs-empty {
    color: #aaaaaa;
  }

  :host([data-fs-theme='light']) .fs-title,
  :host([data-fs-theme='light']) .fs-commerce__title {
    color: #000000;
  }

  :host([data-fs-theme='light']) .fs-desc,
  :host([data-fs-theme='light']) .fs-subtitle,
  :host([data-fs-theme='light']) .fs-empty {
    color: #666666;
  }

  /* Tip / notice surfaces — follow light/dark tokens (never hard-mix with #fff) */
  .fs-hint,
  .fs-notice {
    margin: 0;
    padding: 0.7rem 0.85rem;
    border-radius: 12px;
    font-size: 0.88rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 14%,
      var(--fs-surface, var(--card-bg, #f0f0f0))
    );
    border: 1px solid color-mix(in srgb, var(--border-color, #e5e7eb) 80%, transparent);
    border-inline-start: 3px solid var(--accent-color, var(--fs-store-primary));
  }

  :host([data-fs-theme='dark']) .fs-hint,
  :host([data-fs-theme='dark']) .fs-notice {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='light']) .fs-hint,
  :host([data-fs-theme='light']) .fs-notice {
    color: #000000;
  }

  :host([data-fs-theme='dark']) .bsf-question__hint,
  :host([data-fs-theme='dark']) .bsg-step__hint,
  :host([data-fs-theme='dark']) .bsg-notice,
  :host([data-fs-theme='dark']) .bac-tip,
  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .bac-notice,
  :host([data-fs-theme='dark']) .bil-note,
  :host([data-fs-theme='dark']) .brl-step__note,
  :host([data-fs-theme='dark']) .bpa-tips,
  :host([data-fs-theme='dark']) .bpa-notice,
  :host([data-fs-theme='dark']) .bff-notice,
  :host([data-fs-theme='dark']) .bff-note,
  :host([data-fs-theme='dark']) .bfz-notice,
  :host([data-fs-theme='dark']) .bch-notice,
  :host([data-fs-theme='dark']) .bwp-notice,
  :host([data-fs-theme='dark']) .srg-zone-tip,
  :host([data-fs-theme='dark']) .pql-callout,
  :host([data-fs-theme='dark']) .fll-note,
  :host([data-fs-theme='dark']) .inp-note,
  :host([data-fs-theme='dark']) .sfr-tip,
  :host([data-fs-theme='dark']) .nal-tip,
  :host([data-fs-theme='dark']) .pcc-notice,
  :host([data-fs-theme='dark']) .pcc-tips,
  :host([data-fs-theme='dark']) .icpm-tip,
  :host([data-fs-theme='dark']) .mmt-note,
  :host([data-fs-theme='dark']) .csdg-alert,
  :host([data-fs-theme='dark']) .tbsg-notes {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 18%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  :host([data-fs-theme='dark']) .bac-tip__text,
  :host([data-fs-theme='dark']) .pcc-notice__text,
  :host([data-fs-theme='dark']) .pcc-tips__text,
  :host([data-fs-theme='dark']) .icpm-tip__text,
  :host([data-fs-theme='dark']) .pcc-tips__title {
    color: #ffffff;
    background: transparent;
    border: none;
  }

  :host-context([data-theme='dark']) .fs-section,
  :host-context(.dark) .fs-section,
  :host-context([data-mode='dark']) .fs-section {
    color: #ffffff;
    background:
      radial-gradient(
        130% 90% at 100% 0%,
        color-mix(in srgb, var(--fs-store-primary) 14%, transparent),
        transparent 58%
      ),
      radial-gradient(
        120% 80% at 0% 100%,
        color-mix(in srgb, var(--fs-store-primary) 8%, transparent),
        transparent 55%
      ),
      var(--section-bg, transparent);
  }

  :host-context([data-theme='dark']) .fs-card,
  :host-context(.dark) .fs-card,
  :host-context([data-mode='dark']) .fs-card,
  :host-context([data-theme='dark']) .fs-stage,
  :host-context(.dark) .fs-stage,
  :host-context([data-mode='dark']) .fs-stage {
    background: var(--card-bg, #0f0f0f);
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
    color: #ffffff;
  }

  :host-context([data-theme='dark']) .fs-commerce,
  :host-context(.dark) .fs-commerce,
  :host-context([data-mode='dark']) .fs-commerce {
    border-color: var(--border-color, rgba(255, 255, 255, 0.14));
  }

  /* Section entrance — applied when theme.animate && !reducedMotion */
  @keyframes fs-rise-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fs-animate {
    animation: fs-rise-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-animate .fs-header {
    animation: fs-rise-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both;
  }

  .fs-card {
    background: var(--card-bg, #ffffff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 85%, #fff);
    border-radius: var(--section-radius, 20px);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent),
      0 14px 34px rgba(90, 70, 40, 0.09);
  }

  /* —— Unified buttons (size + primary fill) —— */
  .fs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.65rem 1.35rem;
    border: 1.5px solid transparent;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      var(--button-bg, var(--accent-color, var(--fs-store-primary))),
      color-mix(
        in srgb,
        var(--button-bg, var(--accent-color, var(--fs-store-primary))) 62%,
        #5c4a32
      )
    );
    color: var(--button-color, #ffffff);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    box-shadow: 0 8px 20px
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease,
      filter 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fs-btn:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
    box-shadow: 0 12px 26px
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 34%, transparent);
  }

  .fs-btn:active {
    transform: translateY(0);
    filter: brightness(0.98);
  }

  .fs-btn:disabled,
  .fs-btn[aria-disabled='true'] {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    filter: none;
    pointer-events: none;
  }

  .fs-btn--ghost {
    background: transparent;
    color: var(--accent-color, var(--fs-store-primary));
    border-color: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 48%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: none;
  }

  .fs-btn--ghost:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, transparent);
    filter: none;
    border-color: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 70%,
      var(--border-color, #e6e0d6)
    );
  }

  :host([data-fs-theme='dark']) .fs-btn--ghost {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, rgba(255, 255, 255, 0.2));
  }

  .fs-btn--compact,
  .fs-btn--icon {
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem 1rem;
    font-size: 0.86rem;
    box-shadow: 0 4px 12px
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent);
  }

  .fs-btn--icon {
    width: 44px;
    padding: 0;
  }

  .fs-btn--ghost.fs-btn--compact,
  .fs-btn--ghost.fs-btn--icon {
    box-shadow: none;
  }

  /* Circular prev/next controls (carousels, detail navigators) */
  .fs-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    padding: 0;
    border-radius: 50%;
    border: 1.5px solid color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 40%,
      var(--border-color, #e6e0d6)
    );
    background: var(--card-bg, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    font: inherit;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.1);
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .fs-icon-btn:hover {
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff));
    border-color: var(--accent-color, var(--fs-store-primary));
    transform: translateY(-1px);
  }

  .fs-icon-btn:active {
    transform: translateY(0);
  }

  .fs-icon-btn--on-media {
    background: color-mix(in srgb, var(--text-color, #1f1a14) 42%, transparent);
    border-color: color-mix(in srgb, var(--card-bg, #fff) 40%, transparent);
    color: var(--card-bg, #fff);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
  }

  .fs-icon-btn--on-media:hover {
    background: color-mix(in srgb, var(--text-color, #1f1a14) 62%, transparent);
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--card-bg, #fff);
  }

  /* Choice chips — same height/radius as primary buttons */
  .fs-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    min-width: 44px;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid var(--border-color, #e5e7eb);
    background: var(--fs-surface, var(--card-bg, #f0f0f0));
    color: var(--text-color, #000000);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  }

  .fs-chip:hover {
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e5e7eb));
  }

  .fs-chip[aria-pressed='true'],
  .fs-chip.is-active,
  .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
    transform: translateY(-1px);
  }

  :host([data-fs-theme='dark']) .fs-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .fs-chip[aria-pressed='true'],
  :host([data-fs-theme='dark']) .fs-chip.is-active,
  :host([data-fs-theme='dark']) .fs-chip[aria-selected='true'] {
    background: var(--button-bg, var(--fs-store-primary));
    border-color: transparent;
    color: #ffffff;
  }

  /* Align pill CTAs / choice chips only — NOT card-style chips (spa-chip, ffm-chip, …) */
  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta,
  .spb-cta,
  .bsf-chip,
  .bsg-option,
  .brb-option,
  .bca-answer,
  .bch-type,
  .bff-chip,
  .bac-chip {
    min-height: 44px;
    border-radius: 999px;
    box-sizing: border-box;
  }

  .bpb-card__cta,
  .spb-card__cta,
  .gpb-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.65rem 1.25rem;
    border: 1.5px solid transparent;
    background: var(--button-bg, var(--fs-store-primary));
    color: var(--button-color, #ffffff);
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.2;
    text-decoration: none;
    box-shadow: 0 6px 16px color-mix(in srgb, var(--fs-store-primary) 22%, transparent);
  }

  .fs-tap {
    min-width: 44px;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .fs-actions,
  .fs-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .fs-nav {
    justify-content: center;
    margin-top: 0.35rem;
  }

  .fs-nav .fs-btn {
    min-width: 7.5rem;
  }

  .fs-btn:focus-visible,
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-empty {
    display: grid;
    place-items: center;
    gap: 0.55rem;
    padding: 2.4rem 1.25rem;
    text-align: center;
    color: var(--muted-color, #6e6558);
    border: 1px dashed color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 28%, var(--border-color, #e6e0d6));
    border-radius: var(--section-radius, 20px);
    background:
      radial-gradient(
        80% 80% at 50% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 7%, transparent),
        transparent 70%
      ),
      color-mix(in srgb, var(--card-bg, #fff) 70%, var(--section-bg, transparent));
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .fs-coach {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, var(--fs-surface, var(--card-bg, #f0f0f0)));
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e6e0d6));
    color: var(--text-color, #000000);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  :host([data-fs-theme='dark']) .fs-coach {
    color: #ffffff;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 16%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: rgba(255, 255, 255, 0.12);
  }

  .fs-coach__mark {
    flex: 0 0 auto;
    width: 1.55rem;
    height: 1.55rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 800;
  }

  .fs-progress {
    display: grid;
    gap: 0.45rem;
    max-width: 28rem;
    margin-inline: auto;
    width: 100%;
  }

  .fs-progress__bar {
    height: 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 75%, #fff);
    overflow: hidden;
  }

  .fs-progress__bar > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 65%, #5c4a32)
    );
    transition: width 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .fs-progress__label {
    font-size: 0.8rem;
    font-weight: 650;
    color: var(--muted-color, #6e6558);
    text-align: center;
  }

  .fs-stage {
    position: relative;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    overflow: hidden;
  }

  /* Interactive choice surfaces — reuse across quiz / map / picker tools */
  .fs-choice-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .fs-choice-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .fs-choice {
    display: grid;
    gap: 0.4rem;
    align-content: start;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .fs-choice:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .fs-choice.is-active,
  .fs-choice[aria-pressed='true'] {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .fs-choice:active {
    transform: translateY(0);
  }

  .fs-panel {
    display: grid;
    gap: 0.85rem;
    padding: 1.15rem 1.2rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 88%, #fff);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent),
      0 14px 34px rgba(90, 70, 40, 0.08);
  }

  .fs-panel__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.28rem);
    font-weight: 800;
    line-height: 1.35;
    color: var(--text-color, #000000);
  }

  .fs-panel__desc {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.65;
    color: var(--muted-color, #6e6558);
  }

  .fs-result {
    display: grid;
    gap: 1rem;
    padding: clamp(1.15rem, 3vw, 1.55rem);
    border-radius: var(--section-radius, 20px);
    background:
      radial-gradient(
        120% 80% at 100% 0%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, transparent),
        transparent 55%
      ),
      var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, var(--border-color, #e6e0d6));
    box-shadow: 0 16px 40px rgba(90, 70, 40, 0.1);
    animation: fs-rise-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .fs-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    min-height: 1.7rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 12%, #fff);
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-pill--success {
    background: color-mix(in srgb, var(--fs-success) 14%, #fff);
    color: var(--fs-success);
  }

  .fs-pill--caution {
    background: color-mix(in srgb, var(--fs-caution) 16%, #fff);
    color: #9a6d00;
  }

  .fs-pill--danger {
    background: color-mix(in srgb, var(--fs-danger) 14%, #fff);
    color: var(--fs-danger);
  }

  .fs-meter {
    width: 100%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 80%, transparent);
    overflow: hidden;
  }

  .fs-meter > span {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 60%, #5c4a32)
    );
    border-radius: inherit;
    transition: width 0.45s ease;
  }

  .fs-scroll-x {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent) transparent;
  }

  .fs-scroll-x::-webkit-scrollbar {
    height: 4px;
  }

  .fs-scroll-x::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 35%, transparent);
  }

  .fs-scroll-x > * {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  /* Soft fade for detail panels when selection changes */
  @keyframes fs-fade-swap {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fs-fade-swap {
    animation: fs-fade-swap 0.28s ease both;
  }

  /* —— Salla theme-raed style product card —— */
  .fs-product-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-product-card--selectable {
    cursor: pointer;
  }

  .fs-product-card--selectable:focus-visible {
    outline: 2px solid var(--accent-color, var(--fs-store-primary));
    outline-offset: 2px;
  }

  .fs-product-card.is-selected {
    border-color: var(--accent-color, var(--fs-store-primary));
    box-shadow:
      0 0 0 2px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 32%, transparent),
      0 16px 34px rgba(43, 33, 28, 0.12);
  }

  .fs-product-card__media {
    position: relative;
    aspect-ratio: 1 / 1;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 45%, #fff);
  }

  .fs-product-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-product-card__img--empty {
    background: linear-gradient(145deg, #3a2c26, #1c1613);
  }

  /* fs-product-card__badge--rtl-fix */
  .fs-product-card__badge {
    position: absolute;
    top: 1rem;
    inset-inline-start: 0;
    z-index: 2;
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.02em;
      }

  :host([dir='rtl']) .fs-product-card__badge,
  [dir='rtl'] .fs-product-card__badge {
    border-radius: 15px 0 0 15px;
  }

  .fs-product-card__wishlist {
    position: absolute;
    top: 0.6rem;
    inset-inline-end: 0.6rem;
    z-index: 3;
    width: 2.15rem;
    height: 2.15rem;
    display: grid;
    place-items: center;
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 70%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-bg, #fff) 82%, transparent);
    color: var(--muted-color, #6e6558);
    font-size: 0.98rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(43, 33, 28, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .fs-product-card__wishlist:hover {
    transform: scale(1.1);
    color: #d1495b;
    border-color: color-mix(in srgb, #d1495b 35%, var(--border-color, #e6e0d6));
  }

  .fs-product-card__wishlist:active {
    transform: scale(0.94);
  }

  .fs-product-card__wishlist.is-active {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, #d1495b, #b23a4a);
    animation: fs-heart-pop 0.32s ease;
  }

  @keyframes fs-heart-pop {
    0% {
      transform: scale(0.8);
    }
    55% {
      transform: scale(1.18);
    }
    100% {
      transform: scale(1);
    }
  }

  .fs-product-card__check {
    position: absolute;
    top: 0.6rem;
    inset-inline-start: 0.6rem;
    z-index: 3;
    width: 1.65rem;
    height: 1.65rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--accent-color, var(--fs-store-primary));
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 6px 14px rgba(43, 33, 28, 0.22);
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .fs-product-card.is-selected .fs-product-card__check {
    opacity: 1;
    transform: scale(1);
  }

  .fs-product-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.42rem;
    padding: 0.8rem 0.85rem 0.9rem;
    flex: 1 1 auto;
  }

  .fs-product-card__title {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1.45;
    color: var(--text-color, #000000);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fs-product-card__title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .fs-product-card:hover .fs-product-card__title a {
    color: var(--accent-color, var(--fs-store-primary));
  }

  .fs-product-card__subtitle {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.45;
  }

  .fs-product-card__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem 0.6rem;
    margin-top: auto;
    padding-top: 0.15rem;
  }

  .fs-product-card__price {
    display: inline-flex;
    align-items: baseline;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .fs-product-card__price-now {
    font-size: 1rem;
    font-weight: 700;
    color: #991b1b;
    letter-spacing: -0.01em;
  }

  .fs-product-card__price-old {
    font-size: 0.76rem;
    font-weight: 500;
    color: var(--muted-color, #6e6558);
    text-decoration: line-through;
  }

  .fs-product-card__rating {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: color-mix(in srgb, #f4a940 16%, var(--card-bg, #fff));
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--text-color, #000000);
  }

  .fs-product-card__rating .sicon-star2 {
    color: #f4a940;
  }

  .fs-product-card__add {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.25rem;
    padding: 0.5rem 1.25rem 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 300ms;
  }

  .fs-product-card__add:hover {
    opacity: 0.8;
  }

  .fs-product-card__add:active {
    opacity: 0.9;
  }

  .fs-product-card__link {
    margin-top: 0.2rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent-color, var(--fs-store-primary));
    text-decoration: none;
  }

  .fs-product-card__link:hover {
    text-decoration: underline;
  }

  /* —— Tablet —— */
  @media (max-width: 959px) {
    .fs-header {
      margin-bottom: 1.25rem;
    }

    .fs-title {
      font-size: clamp(1.3rem, 4vw, 1.75rem);
      line-height: 1.3;
    }

    .fs-desc {
      font-size: 0.92rem;
      line-height: 1.65;
    }

    
    .fs-actions .fs-btn {
      width: 100%;
    }
  }

  /* —— Phone —— */
  @media (max-width: 639px) {
    .fs-section {
      padding: var(--space-mobile, 22px) 0
        var(--space-mobile-bottom, var(--space-mobile, 22px));
    }

    .fs-container {
      padding: 0 var(--section-container-pad-sm, 12px);
    }

    .fs-header {
      margin-bottom: 1rem;
    }

    .fs-title {
      font-size: clamp(1.2rem, 6.2vw, 1.55rem);
      line-height: 1.28;
    }

    .fs-desc {
      font-size: 0.88rem;
      line-height: 1.6;
    }

    .fs-empty {
      padding: 1.35rem 0.85rem;
      font-size: 0.88rem;
    }

    /* Keep primary buttons consistent on phone */
    .fs-btn {
      min-height: 44px;
      padding: 0.65rem 1.2rem;
      font-size: 0.9rem;
    }

    .fs-btn:hover {
      box-shadow: 0 6px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 26%, transparent);
    }

    .fs-tap {
      min-height: 44px;
      min-width: 44px;
    }

    
    /*
     * Shrink choice chips / options / toggles across all beauty tools.
     * !important beats per-component min-heights (styles load after shared).
     * Excludes icon-only nav handles and visual sample pickers.
     */
    button[class*='option'],
    button[class*='segment'],
    button[class*='toggle'],
    button[class*='answer'],
    button[class*='finish'],
    button[role='tab'],
    button.bch-color,
    button.bch-type,
    button.bta-play__cta,
    button.bil-segment__btn,
    button.brl-step__toggle,
    button.bcr-cover__btn,
    a.fs-btn {
      min-height: 44px !important;
      padding-top: 0.35rem !important;
      padding-bottom: 0.35rem !important;
      font-size: 0.82rem !important;
    }

    /* Form controls that read as large tap targets */
    input.bpa-input,
    select.bpa-select,
    .bpa-input,
    .bpa-select {
      min-height: 38px !important;
      padding: 0.45rem 0.7rem !important;
      font-size: 0.88rem !important;
    }

    /* Multi-line option cards stay readable but smaller */
    button.bch-type,
    button.bsg-option:not([class*='compact']) {
      min-height: 46px !important;
      padding: 0.5rem 0.75rem !important;
      font-size: 0.84rem !important;
    }

    /* Pill-chip icons only — exclude card chips (spa-chip, ffm-chip, …) */
    button.bsf-chip [class*='swatch'],
    button.bsf-chip [class*='icon'],
    button.bff-chip [class*='swatch'],
    button.bff-chip [class*='icon'],
    button.bac-chip [class*='swatch'],
    button.bac-chip [class*='icon'] {
      width: 1.65rem !important;
      height: 1.65rem !important;
      font-size: 0.8rem !important;
    }

    button.bca-answer [class*='icon'],
    button.bca-answer img {
      width: 1.75rem !important;
      height: 1.75rem !important;
    }

    .fs-product-card__body {
      padding: 0.65rem 0.65rem 0.75rem;
      gap: 0.35rem;
    }

    .fs-product-card__title {
      font-size: 0.86rem;
    }

    .fs-product-card__price-now {
      font-size: 0.92rem;
    }

    .fs-product-card__wishlist {
      width: 1.95rem;
      height: 1.95rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-btn,
    .fs-meter > span,
    * {
      scroll-behavior: auto !important;
    }

    .fs-animate,
    .fs-fade-swap,
    .fs-result,
    .fs-choice,
    .fs-icon-btn,
    .fs-pulse,
    .fs-fade,
    .fs-curtain,
    .fs-celebrate,
    .fs-product-card,
    .fs-product-card__img,
    .fs-product-card__media::after,
    .fs-product-card__wishlist,
    .fs-product-card__check,
    .fs-product-card__add {
      transition: none !important;
      animation: none !important;
    }

    .fs-choice:hover,
    .fs-icon-btn:hover,
    .fs-product-card:hover {
      transform: none;
    }

    .fs-product-card:hover .fs-product-card__img {
      transform: none;
    }
  }

  /* —— Merchant commercial outcome (real Salla products slider) —— */
  .fs-commerce {
    margin-top: clamp(1.5rem, 4vw, 3rem);
    padding-top: clamp(1.25rem, 3vw, 2rem);
    border-top: 1px solid var(--border-color, #e8ddd6);
    display: grid;
    gap: 1rem;
  }

  .fs-commerce__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin: 0;
  }

  .fs-commerce__title,
  .fs-commerce__head h3 {
    margin: 0;
    color: var(--text-color, #2b211c);
    font-size: 1.1rem;
    font-weight: 800;
    text-align: start;
    line-height: 1.35;
  }

  .fs-commerce__view-all {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    border: 1px solid color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 35%,
      var(--border-color, #e8ddd6)
    );
    border-radius: 999px;
    color: var(--accent-color, var(--fs-store-primary));
    background: var(--card-bg, #fff);
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    transition: color 180ms ease, background-color 180ms ease,
      border-color 180ms ease;
  }

  .fs-commerce__view-all:hover {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    background: var(--accent-color, var(--fs-store-primary));
  }

  .fs-commerce__view-all-arrow {
    font-size: 1rem;
    transition: transform 180ms ease;
  }

  .fs-commerce__view-all:hover .fs-commerce__view-all-arrow {
    transform: translateX(-2px);
  }

  :host-context([dir='ltr']) .fs-commerce__view-all-arrow,
  :host([dir='ltr']) .fs-commerce__view-all-arrow {
    transform: rotate(180deg);
  }

  @media (max-width: 479px) {
    .fs-commerce__head {
      align-items: flex-start;
    }

    .fs-commerce__view-all {
      min-height: 38px;
      padding-inline: 0.7rem;
      font-size: 0.78rem;
    }
  }

  .fs-commerce__head p {
    margin: 0.35rem 0 0;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    text-align: center;
  }

  .fs-commerce__slider {
    min-width: 0;
    width: 100%;
  }

  .fs-commerce__slider salla-products-slider {
    display: block;
    width: 100%;
    margin-bottom: 0 !important;
  }

  .fs-commerce__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.65rem;
  }

  .fs-commerce__cta {
    min-width: min(100%, 16rem);
  }

  .fs-commerce__hint {
    margin: 0;
    text-align: center;
    color: var(--muted-color, #7a6a62);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .fs-commerce__slider[data-hide-add='1'] .s-product-card-content-footer,
  .fs-commerce__slider[data-hide-add='1'] .s-add-product-button,
  .fs-commerce__slider[data-hide-add='1'] salla-add-product-button {
    display: none !important;
  }

  /* —— Salla product cards (Theme Raed look) —— */
  .fs-commerce__slider .s-slider-block__title {
    display: none;
  }

  .fs-commerce__slider .swiper,
  .fs-commerce__slider .s-slider-container {
    overflow: hidden;
    padding: 0.35rem 0.2rem 1.1rem;
  }

  .fs-commerce__slider .swiper-wrapper {
    align-items: stretch;
  }

  .fs-commerce__slider .swiper-slide,
  .fs-commerce__slider .s-products-slider-card {
    height: auto;
    /* Swiper sets slide width — forcing it breaks drag/translate */
    box-sizing: border-box;
  }

  .fs-commerce__slider salla-product-card,
  .fs-commerce__slider .s-product-card-entry {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: start;
    color: #1f2937;
    background: #fff;
    border: 0;
    border-radius: 15px;
    box-shadow: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-vertical {
    flex-direction: column;
  }

  .fs-commerce__slider--shadow .s-product-card-entry:hover,
  .fs-commerce__slider--shadow .s-product-card-shadow:hover {
    box-shadow: 5px 10px 30px rgba(43, 45, 52, 0.051);
  }

  .fs-commerce__slider .s-product-card-image {
    position: relative;
    display: block;
    flex: 1 1 0%;
    overflow: hidden;
    width: 100%;
    min-height: 11rem;
    max-height: 15rem;
    aspect-ratio: 1 / 1;
    background: #f3f4f6;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .fs-commerce__slider .s-product-card-image::before,
  .fs-commerce__slider .s-product-card-image a::before {
    content: none !important;
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  .fs-commerce__slider .s-product-card-image:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-image a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }

  .fs-commerce__slider .s-product-card-image img,
  .fs-commerce__slider .s-product-card-image-cover,
  .fs-commerce__slider .s-product-card-image-contain {
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fs-commerce__slider .s-product-card-image-contain {
    object-fit: contain;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn {
    position: absolute;
    top: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    opacity: 0.75;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn:hover {
    opacity: 1;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button,
  .fs-commerce__slider .s-product-card-wishlist-btn .s-button-element {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #fff !important;
    box-shadow: none;
    cursor: pointer;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn svg {
    width: 1rem;
    height: 1rem;
    fill: #6b7280;
  }

  .fs-commerce__slider .s-product-card-wishlist-btn button:hover svg {
    fill: #4b5563;
  }

  .fs-commerce__slider .s-product-card-wishlist-added svg,
  .fs-commerce__slider .s-product-card-wishlist-added i {
    fill: #ef4444;
    color: #ef4444;
  }

  .fs-commerce__slider .s-product-card-promotion-title {
    position: absolute;
    top: 1rem;
    left: 0;
    z-index: 2;
    max-width: calc(100% - 60px);
    padding: 0.375rem 0.625rem;
    border-radius: 0 15px 15px 0;
    background: #991b1b;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([dir='rtl']) .fs-commerce__slider .s-product-card-promotion-title,
  [dir='rtl'] .fs-commerce__slider .s-product-card-promotion-title {
    right: 0;
    left: auto;
    border-radius: 15px 0 0 15px;
  }

  .fs-commerce__slider .s-product-card-quantity {
    position: absolute;
    bottom: 0.25rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 15px;
    background: #f87171;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-badge {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    z-index: 2;
    max-width: calc(100% - 60px);
    transform: translateX(-50%);
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    background: #f3f4f6;
    color: #999;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1rem;
  }

  .fs-commerce__slider .s-product-card-out-of-stock img {
    filter: grayscale(100%);
  }

  .fs-commerce__slider .s-product-card-content {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 0.75rem;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .fs-commerce__slider .s-product-card-content {
      padding: 1.25rem;
    }
  }

  .fs-commerce__slider .s-product-card-content-title {
    margin: 0 0 0.625rem;
    max-width: 100%;
    line-height: 1.5rem;
    word-break: break-word;
  }

  .fs-commerce__slider .s-product-card-content-title a {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-decoration: none;
  }

  .fs-commerce__slider .s-product-card-content-title a:hover {
    color: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
  }

  .fs-commerce__slider .s-product-card-content-subtitle {
    margin: 0 0 0.625rem;
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .fs-commerce__slider .s-product-card-content-sub {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-content-footer {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    gap: 0.65rem;
    margin-top: auto;
  }

  .fs-commerce__slider .s-product-card-price {
    margin: 0;
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b !important;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-sale-price span {
    color: #9ca3af;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-decoration: line-through;
  }

  .fs-commerce__slider .s-product-card-starting-price {
    display: flex;
    width: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0.625rem;
  }

  .fs-commerce__slider .s-product-card-starting-price h4 {
    margin: 0;
    display: inline-block;
    color: #991b1b;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.25rem;
  }

  .fs-commerce__slider .s-product-card-starting-price p {
    margin: 0;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .fs-commerce__slider .s-product-card-rating {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: #9ca3af;
    font-size: 0.875rem;
  }

  .fs-commerce__slider .s-product-card-rating span svg {
    width: 1rem;
    height: 1rem;
    margin-bottom: 3px;
    fill: #fbbf24;
  }

  .fs-commerce__slider .s-add-product-button,
  .fs-commerce__slider .s-add-product-button-main {
    display: block;
    width: 100%;
    margin-top: 0;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
    min-height: 2.55rem;
    padding: 0.55rem 1.1rem;
    border-radius: 999px;
    border: 1px solid var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    background: var(--color-primary, var(--accent-color, var(--fs-store-primary)));
    color: var(--color-primary-reverse, #fff);
    font-size: 0.8125rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary, #21636d) 22%, transparent);
    transition: transform 180ms ease, opacity 180ms ease;
  }

  .fs-commerce__slider .s-add-product-button .s-button-btn:hover,
  .fs-commerce__slider .s-add-product-button-main .s-button-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    .fs-commerce__slider .s-product-card-entry,
    .fs-commerce__slider .s-product-card-image img {
      transition: none;
    }
  }
`;

/* ---- inlined: utils/commerceOutcome.ts ---- */
type CommerceRenderOptions = {
  config?: Record<string, unknown>;
  prefix?: string;
  matchTags?: string[];
  ready?: boolean;
  dynamicOnly?: boolean;
  selection?: unknown;
  defaultProductsTitle?: { ar: string; en: string };
  sliderOverride?: unknown;
};

type CommerceCtaOptions = {
  className?: string;
  /** Per-item link, if the caller wants to override the merchant-level CTA. */
  href?: string;
};

function normalizeArgs(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): Required<
  Pick<CommerceRenderOptions, 'config' | 'prefix'>
> &
  CommerceRenderOptions {
  if (
    optionsOrConfig &&
    typeof optionsOrConfig === 'object' &&
    'config' in optionsOrConfig &&
    'prefix' in optionsOrConfig
  ) {
    const o = optionsOrConfig as CommerceRenderOptions;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || '',
    };
  }

  const extra: CommerceRenderOptions =
    legacyOptions && !Array.isArray(legacyOptions) ? legacyOptions : {};
  return {
    ...extra,
    config: (optionsOrConfig as Record<string, unknown>) || {},
    prefix: legacyPrefix || '',
  };
}

function renderCommerceCtaButton(
  config: Record<string, unknown>,
  prefix: string,
  options: CommerceCtaOptions = {}
): TemplateResult {
  const ctaLink =
    (options.href || '').trim() ||
    extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) ||
    '/';
  const ctaLabel =
    localizedString(config[`${prefix}cta_label`] as LocaleValue, '').trim() ||
    t('تسوق الآن', 'Shop now');
  const className = ['fs-btn', 'fs-tap', options.className || '']
    .filter(Boolean)
    .join(' ');

  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? '_blank' : nothing}
    rel=${isExternalUrl(ctaLink) ? 'noopener noreferrer' : nothing}
  >
    ${ctaLabel}
  </a>`;
}

function renderCommerceOutcome(
  options: CommerceRenderOptions
): TemplateResult | typeof nothing;
function renderCommerceOutcome(
  config: Record<string, unknown>,
  prefix: string,
  options?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing;
function renderCommerceOutcome(
  optionsOrConfig: CommerceRenderOptions | Record<string, unknown>,
  legacyPrefix?: string,
  legacyOptions?: CommerceRenderOptions | string[]
): TemplateResult | typeof nothing {
  const opts = normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions);
  if (opts.ready === false) return nothing;

  const c = opts.config || {};
  const prefix = opts.prefix || '';
  const ctaLink = extractLink(
    c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]
  );
  const showCta =
    isTruthy(c[`${prefix}show_cta`], Boolean(ctaLink)) && Boolean(ctaLink);
  if (!showCta) return nothing;

  return html`
    <aside class="fs-commerce" aria-label=${t('التسوق', 'Shopping')}>
      <div class="fs-commerce__actions">
        ${renderCommerceCtaButton(c, prefix, { className: 'fs-commerce__cta' })}
      </div>
    </aside>
  `;
}

/* ---- inlined: components/smart-gift-builder/styles.ts ---- */
const componentStyles = css`
  .sgb-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .sgb-step {
    display: grid;
    gap: 1rem;
  }

  .sgb-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
  }

  .sgb-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .sgb-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .sgb-card {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-card.is-active {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .sgb-card:active {
    transform: translateY(0);
  }

  .sgb-card__icon {
    font-size: 1.35rem;
    line-height: 1;
  }

  .sgb-card__name {
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .sgb-card__desc,
  .sgb-card__range {
    margin: 0;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .sgb-list {
    display: grid;
    gap: 0.55rem;
  }

  .sgb-option {
    display: grid;
    gap: 0.15rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-option.is-active {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .sgb-option:active {
    transform: translateY(0);
  }

  .sgb-option__label {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .sgb-option__range {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .sgb-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .sgb-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .sgb-result {
    padding: 0;
    border-radius: var(--section-radius, 20px);
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 14px 36px rgba(90, 70, 40, 0.1);
  }

  .sgb-result__box {
    width: 100%;
    height: 0.55rem;
    border-radius: 999px;
    background: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__title {
    margin: 0;
    font-size: clamp(1.1rem, 2.3vw, 1.4rem);
    font-weight: 800;
  }

  .sgb-result__block {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 16%, var(--border-color, #e6e0d6));
  }

  .sgb-result__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .sgb-card,
    .sgb-option {
      transition: none !important;
    }

    .sgb-card:hover,
    .sgb-option:hover {
      transform: none;
    }
  }
`;

/* ---- inlined: components/smart-gift-builder/types.ts ---- */
interface GiftPerson {
  id: string;
  name: string;
  icon: string;
}

interface GiftOccasion {
  id: string;
  name: string;
  desc: string;
}

interface GiftBudget {
  id: string;
  label: string;
  rangeText: string;
}

interface GiftStyle {
  id: string;
  name: string;
  desc: string;
  color: string;
}

interface GiftRecipe {
  id: string;
  personIds: string[];
  occasionIds: string[];
  budgetIds: string[];
  styleIds: string[];
  wrapSuggestion: string;
  message: string;
  boxColor: string;
  scentCharacter: string;
}

interface GiftSelections {
  personId: string;
  occasionId: string;
  budgetId: string;
  styleId: string;
}

type GiftStepKey = 'person' | 'occasion' | 'budget' | 'style';

interface GiftNavLabels {
  next: string;
  back: string;
  see: string;
  reset: string;
  ctaLabel: string;
}

/* ---- inlined: components/smart-gift-builder/utils.ts ---- */
function parseMatchIds(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return String(obj.id ?? obj.value ?? obj.key ?? '').trim();
        }
        return '';
      })
      .filter(Boolean);
  }
  const text = String(raw ?? '').trim();
  if (!text) return [];
  return text
    .split(/[,،|/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parsePersons(raw: unknown): GiftPerson[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.person_id ?? '').trim() || `person-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      icon: String(item.icon ?? '').trim(),
    }))
    .filter((p) => p.name);
}

function parseOccasions(raw: unknown): GiftOccasion[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.occasion_id ?? '').trim() || `occasion-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
    }))
    .filter((o) => o.name);
}

function parseBudgets(raw: unknown): GiftBudget[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.budget_id ?? '').trim() || `budget-${i + 1}`,
      label: localizedString(item.label as LocaleValue) || localizedString(item.name as LocaleValue),
      rangeText:
        localizedString(item.range_text as LocaleValue) ||
        localizedString(item.range as LocaleValue) ||
        localizedString(item.desc as LocaleValue),
    }))
    .filter((b) => b.label);
}

function parseStyles(raw: unknown): GiftStyle[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.style_id ?? '').trim() || `style-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
      color: String(item.color ?? '').trim(),
    }))
    .filter((s) => s.name);
}

function parseRecipes(raw: unknown): GiftRecipe[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.recipe_id ?? '').trim() || `recipe-${i + 1}`,
      personIds: parseMatchIds(item.person_id ?? item.person_ids),
      occasionIds: parseMatchIds(item.occasion_id ?? item.occasion_ids),
      budgetIds: parseMatchIds(item.budget_id ?? item.budget_ids),
      styleIds: parseMatchIds(item.style_id ?? item.style_ids),
      wrapSuggestion: localizedString(item.wrap_suggestion as LocaleValue),
      message: localizedString(item.message as LocaleValue),
      boxColor: String(item.box_color ?? item.color ?? '').trim(),
      scentCharacter: localizedString(item.scent_character as LocaleValue),
    }))
    .filter(
      (r) =>
        r.wrapSuggestion ||
        r.message ||
        r.scentCharacter ||
        r.personIds.length ||
        r.occasionIds.length
    );
}

function parseNavLabels(config: Record<string, unknown>): GiftNavLabels {
  return {
    next: localizedString(config.sgb_next_btn as LocaleValue) || t('التالي', 'Next'),
    back: localizedString(config.sgb_back_btn as LocaleValue) || t('السابق', 'Back'),
    see: localizedString(config.sgb_see_btn as LocaleValue) || t('اعرض الهدية', 'See your gift'),
    reset: localizedString(config.sgb_reset_btn as LocaleValue) || t('ابدأ من جديد', 'Start over'),
    ctaLabel:
      localizedString(config.sgb_cta_label as LocaleValue) ||
      t('تسوق الآن', 'Shop now'),
  };
}

function resolveResultLink(config: Record<string, unknown>): string {
  return extractLink(config.sgb_result_link);
}

function findMatchingRecipe(
  recipes: GiftRecipe[],
  selections: GiftSelections
): GiftRecipe | null {
  if (!recipes.length) return null;

  const { personId, occasionId, budgetId, styleId } = selections;

  const exact = recipes.find((recipe) => {
    const personOk = !recipe.personIds.length || recipe.personIds.includes(personId);
    const occasionOk = !recipe.occasionIds.length || recipe.occasionIds.includes(occasionId);
    const budgetOk = !recipe.budgetIds.length || recipe.budgetIds.includes(budgetId);
    const styleOk = !recipe.styleIds.length || recipe.styleIds.includes(styleId);
    return personOk && occasionOk && budgetOk && styleOk && recipe.personIds.length > 0;
  });
  if (exact) return exact;

  let best: GiftRecipe | null = null;
  let bestScore = -1;

  for (const recipe of recipes) {
    let score = 0;
    if (personId && recipe.personIds.includes(personId)) score += 4;
    else if (!recipe.personIds.length) score += 1;

    if (occasionId && recipe.occasionIds.includes(occasionId)) score += 3;
    else if (!recipe.occasionIds.length) score += 1;

    if (styleId && recipe.styleIds.includes(styleId)) score += 2;
    else if (!recipe.styleIds.length) score += 1;

    if (budgetId && recipe.budgetIds.includes(budgetId)) score += 2;
    else if (!recipe.budgetIds.length) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = recipe;
    }
  }

  return best;
}

function buildFallbackGiftSummary(
  person: GiftPerson | null,
  occasion: GiftOccasion | null,
  budget: GiftBudget | null,
  style: GiftStyle | null
): string {
  const parts: string[] = [];

  if (person?.name) {
    parts.push(t(`لـ ${person.name}`, `For ${person.name}`));
  }
  if (occasion?.name) {
    parts.push(t(`مناسبة: ${occasion.name}`, `Occasion: ${occasion.name}`));
  }
  if (budget?.label) {
    parts.push(
      t(
        `الميزانية: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ''}`,
        `Budget: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ''}`
      )
    );
  }
  if (style?.name) {
    parts.push(t(`الأسلوب: ${style.name}`, `Style: ${style.name}`));
  }

  if (!parts.length) {
    return t(
      'اختر التفاصيل لبناء صندوق هدية عطري مخصّص.',
      'Pick details to build a custom fragrance gift box.'
    );
  }

  return parts.join(' · ');
}

const GIFT_STEPS = [
  { key: 'person' as const, labelAr: 'لمن الهدية؟', labelEn: 'Who is it for?' },
  { key: 'occasion' as const, labelAr: 'المناسبة', labelEn: 'Occasion' },
  { key: 'budget' as const, labelAr: 'الميزانية', labelEn: 'Budget' },
  { key: 'style' as const, labelAr: 'أسلوب التغليف', labelEn: 'Presentation style' },
];

function emptySelections(): GiftSelections {
  return {
    personId: '',
    occasionId: '',
    budgetId: '',
    styleId: '',
  };
}

function resolvePerson(persons: GiftPerson[], id: string): GiftPerson | null {
  return persons.find((p) => p.id === id) ?? null;
}

function resolveOccasion(occasions: GiftOccasion[], id: string): GiftOccasion | null {
  return occasions.find((o) => o.id === id) ?? null;
}

function resolveBudget(budgets: GiftBudget[], id: string): GiftBudget | null {
  return budgets.find((b) => b.id === id) ?? null;
}

function resolveStyle(styles: GiftStyle[], id: string): GiftStyle | null {
  return styles.find((s) => s.id === id) ?? null;
}

/* ---- inlined: components/smart-gift-builder/index.ts ---- */
export default class SmartGiftBuilder extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private stepIndex = 0;
  @state() private showResult = false;
  @state() private selections: GiftSelections = emptySelections();

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.stepIndex = 0;
      this.showResult = false;
      this.selections = emptySelections();
    }
  }

  private get persons() {
    return parsePersons(this.config?.sgb_persons);
  }

  private get occasions() {
    return parseOccasions(this.config?.sgb_occasions);
  }

  private get budgets() {
    return parseBudgets(this.config?.sgb_budgets);
  }

  private get styles() {
    return parseStyles(this.config?.sgb_styles);
  }

  private get recipes() {
    return parseRecipes(this.config?.sgb_recipes);
  }

  private get currentStepKey(): GiftStepKey {
    return GIFT_STEPS[this.stepIndex]?.key ?? 'person';
  }

  private canAdvance(): boolean {
    const key = this.currentStepKey;
    if (key === 'person') return !!this.selections.personId || !this.persons.length;
    if (key === 'occasion') return !!this.selections.occasionId || !this.occasions.length;
    if (key === 'budget') return !!this.selections.budgetId || !this.budgets.length;
    if (key === 'style') return !!this.selections.styleId || !this.styles.length;
    return true;
  }

  private goNext(): void {
    if (!this.canAdvance()) return;
    if (this.stepIndex >= GIFT_STEPS.length - 1) {
      this.showResult = true;
      return;
    }
    this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.showResult) {
      this.showResult = false;
      return;
    }
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.stepIndex = 0;
    this.showResult = false;
    this.selections = emptySelections();
  }

  private get matchedRecipe() {
    return findMatchingRecipe(this.recipes, this.selections);
  }

  private renderPersonCard(item: ReturnType<typeof parsePersons>[number]) {
    const active = this.selections.personId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, personId: item.id };
        }}
      >
        ${item.icon ? html`<span class="sgb-card__icon">${item.icon}</span>` : nothing}
        <span class="sgb-card__name">${item.name}</span>
      </button>
    `;
  }

  private renderOccasionCard(item: ReturnType<typeof parseOccasions>[number]) {
    const active = this.selections.occasionId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, occasionId: item.id };
        }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderBudgetOption(item: ReturnType<typeof parseBudgets>[number]) {
    const active = this.selections.budgetId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-option': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, budgetId: item.id };
        }}
      >
        <span class="sgb-option__label">${item.label}</span>
        ${item.rangeText ? html`<p class="sgb-option__range">${item.rangeText}</p>` : nothing}
      </button>
    `;
  }

  private renderStyleCard(item: ReturnType<typeof parseStyles>[number]) {
    const active = this.selections.styleId === item.id;
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};

    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(style)}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, styleId: item.id };
        }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderStepBody() {
    const key = this.currentStepKey;
    const stepMeta = GIFT_STEPS[this.stepIndex];

    if (key === 'person') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.persons.length
            ? html`<div class="sgb-grid">${this.persons.map((item) => this.renderPersonCard(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف خيارات الأشخاص من إعدادات العنصر.', 'Add person options in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'occasion') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.occasions.length
            ? html`<div class="sgb-grid">${this.occasions.map((item) => this.renderOccasionCard(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف المناسبات من إعدادات العنصر.', 'Add occasions in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'budget') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.budgets.length
            ? html`<div class="sgb-list">${this.budgets.map((item) => this.renderBudgetOption(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف خيارات الميزانية من إعدادات العنصر.', 'Add budget options in element settings.')}
              </div>`}
        </div>
      `;
    }

    return html`
      <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.styles.length
          ? html`<div class="sgb-grid">${this.styles.map((item) => this.renderStyleCard(item))}</div>`
          : html`<div class="sgb-step__empty">
              ${t('أضف أساليب التغليف من إعدادات العنصر.', 'Add presentation styles in element settings.')}
            </div>`}
      </div>
    `;
  }

  private renderResult() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const recipe = this.matchedRecipe;
    const person = resolvePerson(this.persons, this.selections.personId);
    const occasion = resolveOccasion(this.occasions, this.selections.occasionId);
    const budget = resolveBudget(this.budgets, this.selections.budgetId);
    const style = resolveStyle(this.styles, this.selections.styleId);
    const accent = recipe?.boxColor || style?.color || '#9a7b4f';

    const wrapText =
      recipe?.wrapSuggestion ||
      (style?.name
        ? t(`تغليف ${style.name}`, `${style.name} wrapping`)
        : t('تغليف أنيق بشريط ذهبي', 'Elegant wrap with a gold ribbon'));

    const messageText =
      recipe?.message ||
      buildFallbackGiftSummary(person, occasion, budget, style);

    const scentText =
      recipe?.scentCharacter ||
      t('عطر متوازن يناسب ذوق المُهدى إليه', 'A balanced scent suited to the recipient');

    return html`
      <article
        class="sgb-result fs-result"
        style=${styleMap({ '--gift-accent': accent })}
        role="region"
        aria-live="polite"
      >
        <div class="sgb-result__box" aria-hidden="true"></div>
        <h3 class="sgb-result__title">${t('صندوق هديتك', 'Your gift box')}</h3>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('التغليف', 'Wrapping')}</span>
          <p class="sgb-result__text">${wrapText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('رسالة الهدية', 'Gift message')}</span>
          <p class="sgb-result__text">${messageText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('الطابع العطري', 'Scent character')}</span>
          <p class="sgb-result__text">${scentText}</p>
        </div>

        <div class="fs-actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
          config: c,
          prefix: 'sgb_',
          ready: true,
          matchTags: [
            this.selections.personId,
            this.selections.occasionId,
            this.selections.budgetId,
            this.selections.styleId,
          ],
        })}
      </article>
    `;
  }

  private renderProgress() {
    const total = GIFT_STEPS.length;
    const current = this.showResult ? total : this.stepIndex + 1;
    const percent = Math.round((current / total) * 100);

    return html`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${percent}
        aria-label=${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
      >
        <div class="fs-progress__bar">
          <span style=${styleMap({ width: `${percent}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
        </p>
      </div>
    `;
  }

  private renderWizard() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const isLast = this.stepIndex >= GIFT_STEPS.length - 1;
    const bodyKey = this.showResult ? 'result' : `step-${this.stepIndex}`;

    return html`
      <div class="sgb-shell">
        ${this.renderProgress()}

        ${keyed(
          bodyKey,
          html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderResult() : this.renderStepBody()}
          </div>`
        )}

        ${this.showResult
          ? nothing
          : html`<div class="fs-nav">
              ${this.stepIndex > 0
                ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>`
                : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${!this.canAdvance() ? 'true' : 'false'}
                title=${!this.canAdvance() ? t('اختر خياراً للمتابعة', 'Choose an option to continue') : ''}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'sgb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.sgb_title as string);
    const desc = localizedString(c.sgb_desc as string);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('صندوق الهدية الذكي', 'Smart gift builder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
}

