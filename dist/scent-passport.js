var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { l as localizedString, g as getPageLocale } from "./localizedString-Bm7wdWFi.js";
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const PRIMARY = "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))";
function detectFsTheme() {
  var _a;
  if (typeof document > "u") return "light";
  const root = document.documentElement, attr = (root.getAttribute("data-theme") || root.getAttribute("data-mode") || "").toLowerCase();
  if (attr === "dark") return "dark";
  if (attr === "light") return "light";
  if (root.classList.contains("dark") || (_a = document.body) != null && _a.classList.contains("dark"))
    return "dark";
  try {
    const stored = localStorage.getItem("salla_demo_theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
  }
  return "light";
}
__name(detectFsTheme, "detectFsTheme");
function fsThemeVars(mode = detectFsTheme()) {
  const dark = mode === "dark";
  return {
    "--fs-store-primary": PRIMARY,
    "--accent-color": PRIMARY,
    "--button-bg": PRIMARY,
    "--button-color": "#ffffff",
    "--text-color": dark ? "#ffffff" : "#000000",
    "--muted-color": dark ? "#aaaaaa" : "#666666",
    "--card-bg": dark ? "#0f0f0f" : "#ffffff",
    "--fs-surface": dark ? "#0a0a0a" : "#f0f0f0",
    "--border-color": dark ? "rgba(255, 255, 255, 0.12)" : "#e5e7eb",
    "--section-bg": "transparent"
  };
}
__name(fsThemeVars, "fsThemeVars");
function applyVars(el, vars) {
  for (const [key, value] of Object.entries(vars))
    el.style.setProperty(key, value);
  el.setAttribute("data-fs-theme", detectFsTheme());
}
__name(applyVars, "applyVars");
function walkAndApply(root, vars) {
  root.querySelectorAll(".fs-section").forEach((node) => {
    applyVars(node, vars);
  });
}
__name(walkAndApply, "walkAndApply");
function applyFsThemeToDocument(mode = detectFsTheme()) {
  if (typeof document > "u") return;
  const vars = fsThemeVars(mode);
  walkAndApply(document, vars), document.querySelectorAll("*").forEach((node) => {
    const el = node, shadow = el.shadowRoot;
    shadow && shadow.querySelector(".fs-section") && (applyVars(el, vars), walkAndApply(shadow, vars));
  });
}
__name(applyFsThemeToDocument, "applyFsThemeToDocument");
let watching = !1, syncTimer = null;
function scheduleSync() {
  syncTimer && clearTimeout(syncTimer), syncTimer = setTimeout(() => {
    syncTimer = null, applyFsThemeToDocument();
  }, 50);
}
__name(scheduleSync, "scheduleSync");
function ensureFsThemeWatch() {
  if (!(watching || typeof document > "u")) {
    watching = !0, scheduleSync();
    try {
      new MutationObserver(scheduleSync).observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme", "data-mode", "class"]
      }), document.body && new MutationObserver(scheduleSync).observe(document.body, {
        attributes: !0,
        attributeFilter: ["class", "data-theme", "data-mode"]
      });
    } catch {
    }
    window.addEventListener("storage", (event) => {
      event.key === "salla_demo_theme" && scheduleSync();
    });
    try {
      new MutationObserver((records) => {
        records.some((r) => r.addedNodes.length) && scheduleSync();
      }).observe(document.documentElement, { childList: !0, subtree: !0 });
    } catch {
    }
  }
}
__name(ensureFsThemeWatch, "ensureFsThemeWatch");
function normalizeItem(item) {
  return Object.entries(item || {}).reduce((acc, [key, value]) => {
    const normalizedKey = key.includes(".") ? key.split(".").pop() : key;
    return acc[normalizedKey] = value, acc;
  }, {});
}
__name(normalizeItem, "normalizeItem");
function slugifyId(value, fallback = "") {
  const raw = typeof value == "string" || typeof value == "number" ? String(value).trim() : localizedString(value, "").trim();
  return raw && raw.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || fallback;
}
__name(slugifyId, "slugifyId");
function itemIdFromLabel(value, fallback = "") {
  if (value && typeof value == "object" && !Array.isArray(value)) {
    const row = value, en = String(row.en ?? "").trim(), ar = String(row.ar ?? "").trim();
    return slugifyId(en || ar, fallback);
  }
  return slugifyId(value, fallback);
}
__name(itemIdFromLabel, "itemIdFromLabel");
function resolveItemId(item, index, prefix = "item") {
  const explicit = String(item.id ?? item.value ?? item.key ?? "").trim();
  return explicit || itemIdFromLabel(item.name ?? item.title ?? item.label ?? item.brand ?? item.model, "") || `${prefix}-${index + 1}`;
}
__name(resolveItemId, "resolveItemId");
function normalizeCollection(items) {
  return Array.isArray(items) ? items.filter((item) => !!item && typeof item == "object").map((item, index) => {
    const normalized = normalizeItem(item), row = normalized;
    return String(row.id ?? "").trim() || (row.id = resolveItemId(row, index)), normalized;
  }) : [];
}
__name(normalizeCollection, "normalizeCollection");
function getUnitValue(val, fallback = 0) {
  return typeof val == "number" && Number.isFinite(val) ? val : typeof val == "string" && val.trim() !== "" && Number.isFinite(Number(val)) ? Number(val) : val && typeof val == "object" && "value" in val ? getUnitValue(val.value, fallback) : fallback;
}
__name(getUnitValue, "getUnitValue");
function isTruthy(val, fallback = !1) {
  if (typeof val == "boolean") return val;
  if (typeof val == "string") {
    const v = val.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(v)) return !0;
    if (["false", "0", "no", "off", ""].includes(v)) return !1;
  }
  return typeof val == "number" ? val !== 0 : fallback;
}
__name(isTruthy, "isTruthy");
function extractLink(value) {
  if (!value) return "";
  if (typeof value == "string") {
    const trimmed = value.trim();
    return isValidHref(trimmed) ? trimmed : "";
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const link = extractLink(item);
      if (link) return link;
    }
    return "";
  }
  if (typeof value == "object") {
    const obj = value, candidates = [
      obj.url,
      obj.href,
      obj.link,
      obj.value,
      obj.custom,
      obj.path
    ];
    for (const candidate of candidates) {
      const link = extractLink(candidate);
      if (link) return link;
    }
  }
  return "";
}
__name(extractLink, "extractLink");
function isValidHref(url) {
  if (!url || url === "#") return !1;
  if (url.startsWith("/") || url.startsWith("#") || url.startsWith("?") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("whatsapp:"))
    return !0;
  try {
    const parsed = new URL(url, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol);
  } catch {
    return !1;
  }
}
__name(isValidHref, "isValidHref");
function isExternalUrl(url) {
  try {
    return new URL(url, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
__name(isExternalUrl, "isExternalUrl");
function isDirectMediaUrl(url) {
  if (!url || typeof url != "string") return !1;
  try {
    const parsed = new URL(url, window.location.origin);
    return !!["http:", "https:"].includes(parsed.protocol);
  } catch {
    return !1;
  }
}
__name(isDirectMediaUrl, "isDirectMediaUrl");
function t(ar, en, value, fallbackAr) {
  return getPageLocale() === "en" ? en : fallbackAr || ar;
}
__name(t, "t");
async function copyText(text) {
  var _a;
  if (!text) return !1;
  try {
    if ((_a = navigator.clipboard) != null && _a.writeText)
      return await navigator.clipboard.writeText(text), !0;
  } catch {
  }
  try {
    const area = document.createElement("textarea");
    area.value = text, area.setAttribute("readonly", ""), area.style.position = "fixed", area.style.opacity = "0", document.body.appendChild(area), area.select();
    const ok = document.execCommand("copy");
    return document.body.removeChild(area), ok;
  } catch {
    return !1;
  }
}
__name(copyText, "copyText");
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
__name(prefersReducedMotion, "prefersReducedMotion");
function readSectionTheme(config, prefix, defaults) {
  const c = config || {};
  return {
    bg: "transparent",
    text: "#000000",
    muted: "#666666",
    accent: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    card: "var(--color-white, var(--bg-color, #ffffff))",
    border: "var(--color-border, #e5e7eb)",
    buttonBg: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    buttonColor: "#ffffff",
    radius: `${getUnitValue(c[`${prefix}radius`], 20)}px`,
    spaceDesktop: getUnitValue(
      c[`${prefix}space_desktop`],
      48
    ),
    spaceMobile: getUnitValue(
      c[`${prefix}space_mobile`],
      28
    ),
    animate: isTruthy(c[`${prefix}animate`], !0),
    fullWidth: isTruthy(c[`${prefix}full_width`], !1),
    noBottomMargin: !1,
    hasContainer: !0
  };
}
__name(readSectionTheme, "readSectionTheme");
function themeStyleMap(theme) {
  const useContainer = theme.hasContainer !== !1;
  return ensureFsThemeWatch(), {
    ...fsThemeVars(),
    "--section-radius": theme.radius,
    "--space-desktop": `${theme.spaceDesktop}px`,
    "--space-mobile": `${theme.spaceMobile}px`,
    "--space-desktop-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceDesktop}px`,
    "--space-mobile-bottom": theme.noBottomMargin ? "0px" : `${theme.spaceMobile}px`,
    "--section-container-max": useContainer ? "1440px" : "none",
    "--section-container-pad": useContainer ? "16px" : "0px",
    "--section-container-pad-sm": useContainer ? "12px" : "0px"
  };
}
__name(themeStyleMap, "themeStyleMap");
function parseTags(raw) {
  const text = localizedString(raw, "");
  return text ? text.split(/[,،|/]/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(parseTags, "parseTags");
function extractImageUrl(val) {
  if (!val) return "";
  if (typeof val == "string") {
    const trimmed = val.trim();
    return isDirectMediaUrl(trimmed) || trimmed.startsWith("/") ? trimmed : "";
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      const url = extractImageUrl(item);
      if (url) return url;
    }
    return "";
  }
  if (typeof val == "object") {
    const obj = val, candidates = [obj.url, obj.src, obj.image, obj.thumbnail, obj.original];
    for (const candidate of candidates) {
      const url = extractImageUrl(candidate);
      if (url) return url;
    }
  }
  return "";
}
__name(extractImageUrl, "extractImageUrl");
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
function normalizeArgs(optionsOrConfig, legacyPrefix, legacyOptions) {
  if (optionsOrConfig && typeof optionsOrConfig == "object" && "config" in optionsOrConfig && "prefix" in optionsOrConfig) {
    const o = optionsOrConfig;
    return {
      ...o,
      config: o.config || {},
      prefix: o.prefix || ""
    };
  }
  return {
    ...{},
    config: optionsOrConfig || {},
    prefix: ""
  };
}
__name(normalizeArgs, "normalizeArgs");
function renderCommerceCtaButton(config, prefix, options = {}) {
  const ctaLink = (options.href || "").trim() || extractLink(config[`${prefix}result_link`] ?? config[`${prefix}cta_link`]) || "/", ctaLabel = localizedString(config[`${prefix}cta_label`], "").trim() || t("تسوق الآن", "Shop now"), className = ["fs-btn", "fs-tap", options.className || ""].filter(Boolean).join(" ");
  return html`<a
    class=${className}
    href=${ctaLink}
    target=${isExternalUrl(ctaLink) ? "_blank" : nothing}
    rel=${isExternalUrl(ctaLink) ? "noopener noreferrer" : nothing}
  >
    ${ctaLabel}
  </a>`;
}
__name(renderCommerceCtaButton, "renderCommerceCtaButton");
function renderCommerceOutcome(optionsOrConfig, legacyPrefix, legacyOptions) {
  const opts = normalizeArgs(optionsOrConfig);
  if (opts.ready === !1) return nothing;
  const c = opts.config || {}, prefix = opts.prefix || "", ctaLink = extractLink(
    c[`${prefix}result_link`] ?? c[`${prefix}cta_link`]
  );
  return isTruthy(c[`${prefix}show_cta`], !!ctaLink) && !!ctaLink ? html`
    <aside class="fs-commerce" aria-label=${t("التسوق", "Shopping")}>
      <div class="fs-commerce__actions">
        ${renderCommerceCtaButton(c, prefix, { className: "fs-commerce__cta" })}
      </div>
    </aside>
  ` : nothing;
}
__name(renderCommerceOutcome, "renderCommerceOutcome");
const componentStyles = css`
  .spa-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .spa-step {
    display: grid;
    gap: 1rem;
  }

  .spa-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
    color: var(--text-color, #000000);
  }

  .spa-step .fs-coach {
    justify-content: center;
    text-align: start;
    max-width: 36rem;
    margin-inline: auto;
    width: 100%;
  }

  .spa-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
  }

  @media (min-width: 640px) {
    .spa-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.85rem;
    }
  }

  /* Card chips (wear times / notes) — not pill buttons */
  .spa-chip {
    display: grid;
    align-content: center;
    justify-items: center;
    gap: 0.45rem;
    min-height: 104px;
    padding: 1rem 0.85rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--fs-surface, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease,
      color 0.22s ease;
  }

  .spa-chip:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 14%, transparent);
  }

  .spa-chip.is-active {
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 14%,
      var(--fs-surface, var(--card-bg, #ffffff))
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--button-bg, var(--fs-store-primary))) 20%,
        transparent
      ),
      0 12px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  .spa-chip:active {
    transform: translateY(0);
  }

  .spa-chip__icon {
    width: 2.35rem;
    height: 2.35rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 16%,
      var(--card-bg, #ffffff)
    );
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.05rem;
    overflow: hidden;
  }

  .spa-chip.is-active .spa-chip__icon {
    background: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  .spa-chip__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spa-chip__name {
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.35;
    color: inherit;
  }

  :host([data-fs-theme='dark']) .spa-chip {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-chip.is-active {
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 22%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-chip__icon {
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 22%,
      #141414
    );
  }

  .spa-list {
    display: grid;
    gap: 0.55rem;
  }

  .spa-option {
    display: grid;
    gap: 0.2rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--fs-surface, var(--card-bg, #ffffff));
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, transparent);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  :host([data-fs-theme='dark']) .spa-option {
    background: var(--fs-surface, #0a0a0a);
    border-color: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }

  .spa-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spa-option.is-active {
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 14%,
      var(--fs-surface, var(--card-bg, #ffffff))
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--button-bg, var(--fs-store-primary))) 20%,
        transparent
      ),
      0 12px 28px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent);
  }

  :host([data-fs-theme='dark']) .spa-option.is-active {
    background: color-mix(
      in srgb,
      var(--item-color, var(--button-bg, var(--fs-store-primary))) 22%,
      var(--fs-surface, #0a0a0a)
    );
    border-color: var(--item-color, var(--button-bg, var(--fs-store-primary)));
    color: #ffffff;
  }

  :host([data-fs-theme='dark']) .spa-option__desc {
    color: rgba(255, 255, 255, 0.72);
  }

  .spa-option:active {
    transform: translateY(0);
  }

  .spa-option__name {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .spa-option__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
  }

  .spa-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .spa-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .spa-passport {
    position: relative;
    overflow: hidden;
    padding: 0;
    border-radius: calc(var(--section-radius, 20px) * 1.05);
    background:
      linear-gradient(
        145deg,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 18%, #fff) 0%,
        var(--card-bg, #fff) 42%,
        color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff)) 100%
      );
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 28%, var(--border-color, #e6e0d6));
    box-shadow:
      0 18px 42px rgba(90, 70, 40, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .spa-passport::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    background: linear-gradient(
      180deg,
      var(--passport-accent, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 55%, #fff)
    );
  }

  .spa-passport__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
  }

  .spa-passport__brand {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__seal {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 16%, #fff);
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 35%, transparent);
  }

  .spa-passport__title {
    margin: 0 0 0.35rem;
    font-size: clamp(1.2rem, 2.5vw, 1.55rem);
    font-weight: 800;
    line-height: 1.25;
  }

  .spa-passport__holder {
    margin: 0 0 1rem;
    font-size: 0.82rem;
    color: var(--muted-color, #666666);
  }

  .spa-passport__grid {
    display: grid;
    gap: 0.65rem;
  }

  .spa-passport__row {
    display: grid;
    gap: 0.2rem;
    padding: 0.65rem 0.75rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 6%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 14%, var(--border-color, #e6e0d6));
  }

  .spa-passport__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--passport-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .spa-passport__value {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.55;
  }

  .spa-passport__summary {
    margin: 0.85rem 0 0;
    padding-top: 0.85rem;
    border-top: 1px dashed color-mix(in srgb, var(--passport-accent, var(--accent-color, var(--fs-store-primary))) 25%, var(--border-color, #e6e0d6));
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .spa-toast {
    margin: 0;
    text-align: center;
    font-size: 0.82rem;
    color: var(--accent-color, var(--fs-store-primary));
    font-weight: 700;
  }

  @media (prefers-reduced-motion: reduce) {
    .spa-chip,
    .spa-option {
      transition: none !important;
    }

    .spa-chip:hover,
    .spa-option:hover,
    .spa-option.is-active {
      transform: none;
    }
  }
`;
function parseIds(raw) {
  if (Array.isArray(raw))
    return raw.map((item) => {
      if (typeof item == "string") return item.trim();
      if (item && typeof item == "object") {
        const obj = item;
        return String(obj.id ?? obj.value ?? obj.key ?? "").trim();
      }
      return "";
    }).filter(Boolean);
  const text = String(raw ?? "").trim();
  return text ? text.split(/[,،|/]/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(parseIds, "parseIds");
function parseNotes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.note_id ?? "").trim() || `note-${i + 1}`,
    name: localizedString(item.name),
    color: String(item.color ?? "").trim(),
    icon: String(item.icon ?? "").trim(),
    image: extractImageUrl(item.image) || extractImageUrl(item.icon)
  })).filter((n) => n.name);
}
__name(parseNotes, "parseNotes");
function parseStrengths(raw) {
  return normalizeCollection(raw).map((item, i) => {
    const value = String(item.value ?? item.id ?? item.strength_id ?? "").trim();
    return {
      id: String(item.id ?? item.strength_id ?? value).trim() || `strength-${i + 1}`,
      name: localizedString(item.name),
      desc: localizedString(item.desc),
      value: value || `strength-${i + 1}`
    };
  }).filter((s) => s.name);
}
__name(parseStrengths, "parseStrengths");
function parseTimes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.time_id ?? "").trim() || `time-${i + 1}`,
    name: localizedString(item.name)
  })).filter((t2) => t2.name);
}
__name(parseTimes, "parseTimes");
function parseCharacters(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.character_id ?? "").trim() || `character-${i + 1}`,
    name: localizedString(item.name),
    desc: localizedString(item.desc),
    color: String(item.color ?? "").trim(),
    icon: String(item.icon ?? "").trim()
  })).filter((c) => c.name);
}
__name(parseCharacters, "parseCharacters");
function parsePassportResults(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.result_id ?? "").trim() || `result-${i + 1}`,
    summary: localizedString(item.summary),
    characterIds: parseIds(item.character_id ?? item.character_ids),
    tags: parseTags(item.tags)
  })).filter((r) => r.summary || r.characterIds.length || r.tags.length);
}
__name(parsePassportResults, "parsePassportResults");
function parseNavLabels(config) {
  return {
    next: localizedString(config.spa_next_btn) || t("التالي", "Next"),
    back: localizedString(config.spa_back_btn) || t("السابق", "Back"),
    see: localizedString(config.spa_see_btn) || t("اعرض جوازك", "See your passport"),
    reset: localizedString(config.spa_reset_btn) || t("ابدأ من جديد", "Start over"),
    share: localizedString(config.spa_share_btn) || t("نسخ الملخص", "Copy summary"),
    passportTitle: localizedString(config.spa_passport_title) || t("جوازك العطري", "Your scent passport"),
    holderLabel: localizedString(config.spa_holder_label) || t("حامل الجواز", "Passport holder"),
    ctaLabel: localizedString(config.spa_cta_label) || t("استكشف التوصية", "Explore recommendation")
  };
}
__name(parseNavLabels, "parseNavLabels");
function findMatchingResult(results, characterId, characterName) {
  if (!results.length) return null;
  const byCharacter = results.find((r) => r.characterIds.includes(characterId));
  if (byCharacter) return byCharacter;
  const nameToken = characterName.trim().toLowerCase();
  if (nameToken) {
    const byTag = results.find(
      (r) => r.tags.some((tag) => tag.toLowerCase() === nameToken || nameToken.includes(tag.toLowerCase()))
    );
    if (byTag) return byTag;
  }
  return results[0] ?? null;
}
__name(findMatchingResult, "findMatchingResult");
function buildGeneratedSummary(selections, liked, disliked, strength, times, character) {
  const parts = [], likedNames = liked.filter((n) => selections.likedIds.includes(n.id)).map((n) => n.name), dislikedNames = disliked.filter((n) => selections.dislikedIds.includes(n.id)).map((n) => n.name), timeNames = times.filter((t2) => selections.timeIds.includes(t2.id)).map((t2) => t2.name);
  return character != null && character.name && parts.push(
    t(
      `طابعك العطري: ${character.name}.`,
      `Your scent character: ${character.name}.`
    )
  ), likedNames.length && parts.push(
    t(
      `نوتات تحبها: ${likedNames.join("، ")}.`,
      `Notes you love: ${likedNames.join(", ")}.`
    )
  ), dislikedNames.length && parts.push(
    t(
      `تتجنّب: ${dislikedNames.join("، ")}.`,
      `You avoid: ${dislikedNames.join(", ")}.`
    )
  ), strength != null && strength.name && parts.push(
    t(
      `التركيز المفضّل: ${strength.name}.`,
      `Preferred intensity: ${strength.name}.`
    )
  ), timeNames.length && parts.push(
    t(
      `أوقات الارتداء: ${timeNames.join("، ")}.`,
      `Wear times: ${timeNames.join(", ")}.`
    )
  ), parts.length ? parts.join(" ") : t(
    "أكمل اختياراتك لبناء ملفك العطري الشخصي.",
    "Complete your picks to build your personal scent profile."
  );
}
__name(buildGeneratedSummary, "buildGeneratedSummary");
function buildShareText(summary, selections, liked, disliked, strength, times, character, passportTitle) {
  const header = passportTitle || t("جوازك العطري", "Your scent passport"), body = summary || buildGeneratedSummary(selections, liked, disliked, strength, times, character);
  return `${header}

${body}`;
}
__name(buildShareText, "buildShareText");
const PASSPORT_STEPS = [
  { key: "liked", labelAr: "النوتات المفضّلة", labelEn: "Liked notes" },
  { key: "disliked", labelAr: "نوتات تتجنّبها", labelEn: "Notes to avoid" },
  { key: "strength", labelAr: "قوّة العطر", labelEn: "Scent strength" },
  { key: "times", labelAr: "أوقات الارتداء", labelEn: "Wear times" },
  { key: "character", labelAr: "طابعك العطري", labelEn: "Scent character" }
];
function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}
__name(toggleId, "toggleId");
function emptySelections() {
  return {
    likedIds: [],
    dislikedIds: [],
    strengthId: "",
    timeIds: [],
    characterId: ""
  };
}
__name(emptySelections, "emptySelections");
function resolveStrength(strengths, strengthId) {
  return strengths.find((s) => s.id === strengthId || s.value === strengthId) ?? null;
}
__name(resolveStrength, "resolveStrength");
function resolveCharacter(characters, characterId) {
  return characters.find((c) => c.id === characterId) ?? null;
}
__name(resolveCharacter, "resolveCharacter");
const _ScentPassport = class _ScentPassport extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "", this.boundLangHandler = () => this.requestUpdate(), this.shareTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.shareTimer && clearTimeout(this.shareTimer), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "");
  }
  get likedNotes() {
    var _a;
    return parseNotes((_a = this.config) == null ? void 0 : _a.spa_liked_notes);
  }
  get dislikedNotes() {
    var _a;
    return parseNotes((_a = this.config) == null ? void 0 : _a.spa_disliked_notes);
  }
  get strengths() {
    var _a;
    return parseStrengths((_a = this.config) == null ? void 0 : _a.spa_strengths);
  }
  get times() {
    var _a;
    return parseTimes((_a = this.config) == null ? void 0 : _a.spa_times);
  }
  get characters() {
    var _a;
    return parseCharacters((_a = this.config) == null ? void 0 : _a.spa_characters);
  }
  get currentStepKey() {
    var _a;
    return ((_a = PASSPORT_STEPS[this.stepIndex]) == null ? void 0 : _a.key) ?? "liked";
  }
  canAdvance() {
    const key = this.currentStepKey;
    return key === "strength" ? !!this.selections.strengthId || !this.strengths.length : key === "character" ? !!this.selections.characterId || !this.characters.length : !0;
  }
  goNext() {
    if (this.canAdvance()) {
      if (this.stepIndex >= PASSPORT_STEPS.length - 1) {
        this.showResult = !0;
        return;
      }
      this.stepIndex += 1;
    }
  }
  goBack() {
    if (this.showResult) {
      this.showResult = !1;
      return;
    }
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.shareNotice = "";
  }
  async shareSummary() {
    const c = this.config || {}, labels = parseNavLabels(c), summary = this.resolveSummary(), text = buildShareText(
      summary,
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter,
      labels.passportTitle
    ), ok = await copyText(text);
    this.shareNotice = ok ? t("تم نسخ الملخص.", "Summary copied.") : t("تعذّر النسخ.", "Could not copy."), this.shareTimer && clearTimeout(this.shareTimer), this.shareTimer = setTimeout(() => {
      this.shareNotice = "";
    }, 2400);
  }
  get selectedStrength() {
    return resolveStrength(this.strengths, this.selections.strengthId);
  }
  get selectedCharacter() {
    return resolveCharacter(this.characters, this.selections.characterId);
  }
  get selectedTimes() {
    return this.times.filter((item) => this.selections.timeIds.includes(item.id));
  }
  resolveSummary() {
    var _a, _b;
    const matched = findMatchingResult(
      parsePassportResults((_a = this.config) == null ? void 0 : _a.spa_results),
      this.selections.characterId,
      ((_b = this.selectedCharacter) == null ? void 0 : _b.name) ?? ""
    );
    return matched != null && matched.summary ? matched.summary : buildGeneratedSummary(
      this.selections,
      this.likedNotes,
      this.dislikedNotes,
      this.selectedStrength,
      this.selectedTimes,
      this.selectedCharacter
    );
  }
  renderIcon(icon, image) {
    return image ? html`<img src=${image} alt="" loading="lazy" decoding="async" />` : icon.startsWith("sicon-") ? html`<span class=${icon}></span>` : html`<span>${icon || "◆"}</span>`;
  }
  renderNoteChip(item, selectedIds, field) {
    const active = selectedIds.includes(item.id), style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "spa-chip": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        [field]: toggleId(this.selections[field], item.id)
      };
    }}
      >
        <span class="spa-chip__icon">${this.renderIcon(item.icon, item.image)}</span>
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }
  renderStrengthOption(item) {
    const active = this.selections.strengthId === item.id || this.selections.strengthId === item.value;
    return html`
      <button
        type="button"
        class=${classMap({ "spa-option": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, strengthId: item.id };
    }}
      >
        <span class="spa-option__name">${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderTimeChip(item) {
    const active = this.selections.timeIds.includes(item.id);
    return html`
      <button
        type="button"
        class=${classMap({ "spa-chip": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = {
        ...this.selections,
        timeIds: toggleId(this.selections.timeIds, item.id)
      };
    }}
      >
        <span class="spa-chip__name">${item.name}</span>
      </button>
    `;
  }
  renderCharacterOption(item) {
    const active = this.selections.characterId === item.id, style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "spa-option": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, characterId: item.id };
    }}
      >
        <span class="spa-option__name">${item.icon ? `${item.icon} ` : nothing}${item.name}</span>
        ${item.desc ? html`<p class="spa-option__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderStepBody() {
    const key = this.currentStepKey, stepMeta = PASSPORT_STEPS[this.stepIndex];
    return key === "liked" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("اختر واحدة أو أكثر", "Pick one or more")}
          </p>
          ${this.likedNotes.length ? html`<div class="spa-grid">
                ${this.likedNotes.map(
      (item) => this.renderNoteChip(item, this.selections.likedIds, "likedIds")
    )}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف نوتات مفضّلة من إعدادات العنصر.", "Add liked notes in element settings.")}
              </div>`}
        </div>
      ` : key === "disliked" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("اختياري — لتجنّب ما لا يناسبك", "Optional — notes to skip")}
          </p>
          ${this.dislikedNotes.length ? html`<div class="spa-grid">
                ${this.dislikedNotes.map(
      (item) => this.renderNoteChip(item, this.selections.dislikedIds, "dislikedIds")
    )}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف نوتات مرفوضة من إعدادات العنصر.", "Add disliked notes in element settings.")}
              </div>`}
        </div>
      ` : key === "strength" ? html`
        <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.strengths.length ? html`<div class="spa-list">
                ${this.strengths.map((item) => this.renderStrengthOption(item))}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف مستويات التركيز من إعدادات العنصر.", "Add strength levels in element settings.")}
              </div>`}
        </div>
      ` : key === "times" ? html`
        <div class="spa-step" role="group" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          <p class="fs-coach">
            <span class="fs-coach__mark" aria-hidden="true">✦</span>
            ${t("متى ترتدي العطر؟", "When do you wear fragrance?")}
          </p>
          ${this.times.length ? html`<div class="spa-grid">
                ${this.times.map((item) => this.renderTimeChip(item))}
              </div>` : html`<div class="spa-step__empty">
                ${t("أضف أوقات الارتداء من إعدادات العنصر.", "Add wear times in element settings.")}
              </div>`}
        </div>
      ` : html`
      <div class="spa-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="spa-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.characters.length ? html`<div class="spa-list">
              ${this.characters.map((item) => this.renderCharacterOption(item))}
            </div>` : html`<div class="spa-step__empty">
              ${t("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent characters in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderPassport() {
    const c = this.config || {}, labels = parseNavLabels(c), character = this.selectedCharacter, accent = (character == null ? void 0 : character.color) || "#9a7b4f", likedNames = this.likedNotes.filter((n) => this.selections.likedIds.includes(n.id)).map((n) => n.name), dislikedNames = this.dislikedNotes.filter((n) => this.selections.dislikedIds.includes(n.id)).map((n) => n.name), summary = this.resolveSummary(), showShare = !!(localizedString(c.spa_share_btn) || labels.share);
    return html`
      <article
        class="spa-passport fs-result"
        style=${styleMap({ "--passport-accent": accent })}
        role="region"
        aria-live="polite"
      >
        <div class="spa-passport__head">
          <p class="spa-passport__brand">${labels.passportTitle}</p>
          <span class="spa-passport__seal" aria-hidden="true">${(character == null ? void 0 : character.icon) || "✦"}</span>
        </div>
        <h3 class="spa-passport__title">${(character == null ? void 0 : character.name) || t("ملفك العطري", "Your scent profile")}</h3>
        <p class="spa-passport__holder">${labels.holderLabel}</p>

        <div class="spa-passport__grid">
          ${likedNames.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("تحب", "You love")}</span>
                <p class="spa-passport__value">${likedNames.join(" · ")}</p>
              </div>` : nothing}
          ${dislikedNames.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("تتجنّب", "You avoid")}</span>
                <p class="spa-passport__value">${dislikedNames.join(" · ")}</p>
              </div>` : nothing}
          ${this.selectedStrength ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("التركيز", "Intensity")}</span>
                <p class="spa-passport__value">${this.selectedStrength.name}</p>
              </div>` : nothing}
          ${this.selectedTimes.length ? html`<div class="spa-passport__row">
                <span class="spa-passport__label">${t("أوقات الارتداء", "Wear times")}</span>
                <p class="spa-passport__value">
                  ${this.selectedTimes.map((item) => item.name).join(" · ")}
                </p>
              </div>` : nothing}
        </div>

        ${summary ? html`<p class="spa-passport__summary">${summary}</p>` : nothing}

        <div class="fs-actions">
          ${showShare ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.shareSummary}>
                ${labels.share}
              </button>` : nothing}
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
      config: c,
      prefix: "spa_",
      ready: !0,
      matchTags: [
        this.selections.characterId,
        this.selections.strengthId,
        ...this.selections.likedIds,
        ...this.selections.timeIds
      ]
    })}
        ${this.shareNotice ? html`<p class="spa-toast" role="status">${this.shareNotice}</p>` : nothing}
      </article>
    `;
  }
  renderProgress() {
    const total = PASSPORT_STEPS.length, current = this.showResult ? total : this.stepIndex + 1, percent = Math.round(current / total * 100);
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
  renderWizard() {
    const c = this.config || {}, labels = parseNavLabels(c), isLast = this.stepIndex >= PASSPORT_STEPS.length - 1, bodyKey = this.showResult ? "result" : `step-${this.stepIndex}`;
    return html`
      <div class="spa-shell">
        ${this.renderProgress()}

        ${keyed(
      bodyKey,
      html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderPassport() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? nothing : html`<div class="fs-nav">
              ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>` : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${this.canAdvance() ? "false" : "true"}
                title=${this.canAdvance() ? "" : t("اختر خياراً للمتابعة", "Choose an option to continue")}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "spa_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.spa_title), desc = localizedString(c.spa_desc);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("جوازك العطري", "Scent passport")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
__name(_ScentPassport, "ScentPassport"), _ScentPassport.styles = [sharedSectionCss, componentStyles];
let ScentPassport = _ScentPassport;
__decorateClass([
  property({ type: Object })
], ScentPassport.prototype, "config");
__decorateClass([
  state()
], ScentPassport.prototype, "stepIndex");
__decorateClass([
  state()
], ScentPassport.prototype, "showResult");
__decorateClass([
  state()
], ScentPassport.prototype, "selections");
__decorateClass([
  state()
], ScentPassport.prototype, "shareNotice");
typeof ScentPassport < "u" && ScentPassport.registerSallaComponent("salla-scent-passport");
export {
  ScentPassport as default
};
