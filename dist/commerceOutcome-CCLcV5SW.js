import { css as $, nothing as f, html as k } from "lit";
function z() {
  var r, e, t;
  try {
    const o = typeof Salla < "u" ? (e = (r = Salla == null ? void 0 : Salla.lang) == null ? void 0 : r.getLocale) == null ? void 0 : e.call(r) : void 0, a = (t = document.documentElement.lang) == null ? void 0 : t.split("-")[0];
    return String(o || a || "ar").toLowerCase();
  } catch {
    return "ar";
  }
}
function b(r, e = "") {
  if (r == null)
    return e;
  if (typeof r == "string")
    return r.trim() || e;
  if (typeof r == "number")
    return String(r);
  if (typeof r == "object") {
    const t = r, a = [z(), "ar", "en", ...Object.keys(t)];
    for (const i of a) {
      const s = t[i];
      if (typeof s == "string" && s.trim())
        return s.trim();
    }
  }
  return e;
}
const m = "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))";
function h() {
  var t;
  if (typeof document > "u") return "light";
  const r = document.documentElement, e = (r.getAttribute("data-theme") || r.getAttribute("data-mode") || "").toLowerCase();
  if (e === "dark") return "dark";
  if (e === "light") return "light";
  if (r.classList.contains("dark") || (t = document.body) != null && t.classList.contains("dark"))
    return "dark";
  try {
    const o = localStorage.getItem("salla_demo_theme");
    if (o === "dark" || o === "light") return o;
  } catch {
  }
  return "light";
}
function j(r = h()) {
  const e = r === "dark";
  return {
    "--fs-store-primary": m,
    "--accent-color": m,
    "--button-bg": m,
    "--button-color": "#ffffff",
    "--text-color": e ? "#ffffff" : "#000000",
    "--muted-color": e ? "#aaaaaa" : "#666666",
    "--card-bg": e ? "#0f0f0f" : "#ffffff",
    "--fs-surface": e ? "#0a0a0a" : "#f0f0f0",
    "--border-color": e ? "rgba(255, 255, 255, 0.12)" : "#e5e7eb",
    "--section-bg": "transparent"
  };
}
function S(r, e) {
  for (const [t, o] of Object.entries(e))
    r.style.setProperty(t, o);
  r.setAttribute("data-fs-theme", h());
}
function u(r, e) {
  r.querySelectorAll(".fs-section").forEach((t) => {
    S(t, e);
  });
}
function L(r = h()) {
  if (typeof document > "u") return;
  const e = j(r);
  u(document, e), document.querySelectorAll("*").forEach((t) => {
    const o = t, a = o.shadowRoot;
    a && a.querySelector(".fs-section") && (S(o, e), u(a, e));
  });
}
let g = !1, c = null;
function n() {
  c && clearTimeout(c), c = setTimeout(() => {
    c = null, L();
  }, 50);
}
function M() {
  if (!(g || typeof document > "u")) {
    g = !0, n();
    try {
      new MutationObserver(n).observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["data-theme", "data-mode", "class"]
      }), document.body && new MutationObserver(n).observe(document.body, {
        attributes: !0,
        attributeFilter: ["class", "data-theme", "data-mode"]
      });
    } catch {
    }
    window.addEventListener("storage", (r) => {
      r.key === "salla_demo_theme" && n();
    });
    try {
      new MutationObserver((r) => {
        r.some((e) => e.addedNodes.length) && n();
      }).observe(document.documentElement, { childList: !0, subtree: !0 });
    } catch {
    }
  }
}
function T(r) {
  return Object.entries(r || {}).reduce((e, [t, o]) => {
    const a = t.includes(".") ? t.split(".").pop() : t;
    return e[a] = o, e;
  }, {});
}
function x(r, e = "") {
  const t = typeof r == "string" || typeof r == "number" ? String(r).trim() : b(r, "").trim();
  return t && t.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 48) || e;
}
function C(r, e = "") {
  if (r && typeof r == "object" && !Array.isArray(r)) {
    const t = r, o = String(t.en ?? "").trim(), a = String(t.ar ?? "").trim();
    return x(o || a, e);
  }
  return x(r, e);
}
function N(r, e, t = "item") {
  const o = String(r.id ?? r.value ?? r.key ?? "").trim();
  return o || C(r.name ?? r.title ?? r.label ?? r.brand ?? r.model, "") || `${t}-${e + 1}`;
}
function W(r) {
  return Array.isArray(r) ? r.filter((e) => !!e && typeof e == "object").map((e, t) => {
    const o = T(e), a = o;
    return String(a.id ?? "").trim() || (a.id = N(a, t)), o;
  }) : [];
}
function d(r, e = 0) {
  return typeof r == "number" && Number.isFinite(r) ? r : typeof r == "string" && r.trim() !== "" && Number.isFinite(Number(r)) ? Number(r) : r && typeof r == "object" && "value" in r ? d(r.value, e) : e;
}
function v(r, e = 0) {
  if (typeof r == "number" && Number.isFinite(r)) return r;
  if (typeof r == "string" && r.trim() !== "") {
    const t = Number(r.replace(",", "."));
    return Number.isFinite(t) ? t : e;
  }
  return e;
}
function q(r, e, t) {
  return Math.min(t, Math.max(e, r));
}
function p(r, e = !1) {
  if (typeof r == "boolean") return r;
  if (typeof r == "string") {
    const t = r.toLowerCase().trim();
    if (["true", "1", "yes", "on"].includes(t)) return !0;
    if (["false", "0", "no", "off", ""].includes(t)) return !1;
  }
  return typeof r == "number" ? r !== 0 : e;
}
function l(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const e = r.trim();
    return Y(e) ? e : "";
  }
  if (Array.isArray(r)) {
    for (const e of r) {
      const t = l(e);
      if (t) return t;
    }
    return "";
  }
  if (typeof r == "object") {
    const e = r, t = [
      e.url,
      e.href,
      e.link,
      e.value,
      e.custom,
      e.path
    ];
    for (const o of t) {
      const a = l(o);
      if (a) return a;
    }
  }
  return "";
}
function Y(r) {
  if (!r || r === "#") return !1;
  if (r.startsWith("/") || r.startsWith("#") || r.startsWith("?") || r.startsWith("mailto:") || r.startsWith("tel:") || r.startsWith("whatsapp:"))
    return !0;
  try {
    const e = new URL(r, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(e.protocol);
  } catch {
    return !1;
  }
}
function _(r) {
  try {
    return new URL(r, window.location.origin).origin !== window.location.origin;
  } catch {
    return !1;
  }
}
function F(r) {
  if (!r || typeof r != "string") return !1;
  try {
    const e = new URL(r, window.location.origin);
    return !!["http:", "https:"].includes(e.protocol);
  } catch {
    return !1;
  }
}
function U(r, e = "group_order") {
  return [...r].sort(
    (t, o) => v(t[e], 0) - v(o[e], 0)
  );
}
function A(r, e, t, o) {
  return z() === "en" ? e : o || r;
}
async function D(r) {
  var e;
  if (!r) return !1;
  try {
    if ((e = navigator.clipboard) != null && e.writeText)
      return await navigator.clipboard.writeText(r), !0;
  } catch {
  }
  try {
    const t = document.createElement("textarea");
    t.value = r, t.setAttribute("readonly", ""), t.style.position = "fixed", t.style.opacity = "0", document.body.appendChild(t), t.select();
    const o = document.execCommand("copy");
    return document.body.removeChild(t), o;
  } catch {
    return !1;
  }
}
function P() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return !1;
  }
}
function O(r, e, t) {
  const o = r || {};
  return {
    bg: "transparent",
    text: "#000000",
    muted: "#666666",
    accent: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    card: "var(--color-white, var(--bg-color, #ffffff))",
    border: "var(--color-border, #e5e7eb)",
    buttonBg: "var(--color-primary, var(--primary-color, var(--color-main, #64748b)))",
    buttonColor: "#ffffff",
    radius: `${d(o[`${e}radius`], 20)}px`,
    spaceDesktop: d(
      o[`${e}space_desktop`],
      48
    ),
    spaceMobile: d(
      o[`${e}space_mobile`],
      28
    ),
    animate: p(o[`${e}animate`], !0),
    fullWidth: p(o[`${e}full_width`], !1),
    noBottomMargin: !1,
    hasContainer: !0
  };
}
function V(r) {
  const e = r.hasContainer !== !1;
  return M(), {
    ...j(),
    "--section-radius": r.radius,
    "--space-desktop": `${r.spaceDesktop}px`,
    "--space-mobile": `${r.spaceMobile}px`,
    "--space-desktop-bottom": r.noBottomMargin ? "0px" : `${r.spaceDesktop}px`,
    "--space-mobile-bottom": r.noBottomMargin ? "0px" : `${r.spaceMobile}px`,
    "--section-container-max": e ? "1440px" : "none",
    "--section-container-pad": e ? "16px" : "0px",
    "--section-container-pad-sm": e ? "12px" : "0px"
  };
}
function y(r, e = "") {
  if (typeof r == "string" && r.trim()) return r.trim();
  if (Array.isArray(r) && r[0]) {
    const t = r[0];
    if (typeof t == "string") return t;
    if (t && typeof t == "object" && "value" in t)
      return String(t.value ?? e);
    if (t && typeof t == "object" && "key" in t)
      return String(t.key ?? e);
  }
  if (r && typeof r == "object") {
    const t = r;
    if (Array.isArray(t.selected) && t.selected[0])
      return y(t.selected, e);
    if ("value" in t && t.value != null && !Array.isArray(t.value))
      return String(t.value ?? e);
    if (Array.isArray(t.value) && t.value[0])
      return y(t.value, e);
  }
  return e;
}
function X(r) {
  const e = b(r, "");
  return e ? e.split(/[,،|/]/).map((t) => t.trim()).filter(Boolean) : [];
}
function w(r) {
  if (!r) return "";
  if (typeof r == "string") {
    const e = r.trim();
    return F(e) || e.startsWith("/") ? e : "";
  }
  if (Array.isArray(r)) {
    for (const e of r) {
      const t = w(e);
      if (t) return t;
    }
    return "";
  }
  if (typeof r == "object") {
    const e = r, t = [e.url, e.src, e.image, e.thumbnail, e.original];
    for (const o of t) {
      const a = w(o);
      if (a) return a;
    }
  }
  return "";
}
const H = $`
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
function B(r, e, t) {
  if (r && typeof r == "object" && "config" in r && "prefix" in r) {
    const a = r;
    return {
      ...a,
      config: a.config || {},
      prefix: a.prefix || ""
    };
  }
  return {
    ...{},
    config: r || {},
    prefix: ""
  };
}
function E(r, e, t = {}) {
  const o = (t.href || "").trim() || l(r[`${e}result_link`] ?? r[`${e}cta_link`]) || "/", a = b(r[`${e}cta_label`], "").trim() || A("تسوق الآن", "Shop now"), i = ["fs-btn", "fs-tap", t.className || ""].filter(Boolean).join(" ");
  return k`<a
    class=${i}
    href=${o}
    target=${_(o) ? "_blank" : f}
    rel=${_(o) ? "noopener noreferrer" : f}
  >
    ${a}
  </a>`;
}
function K(r, e, t) {
  const o = B(r);
  if (o.ready === !1) return f;
  const a = o.config || {}, i = o.prefix || "", s = l(
    a[`${i}result_link`] ?? a[`${i}cta_link`]
  );
  return p(a[`${i}show_cta`], !!s) && !!s ? k`
    <aside class="fs-commerce" aria-label=${A("التسوق", "Shopping")}>
      <div class="fs-commerce__actions">
        ${E(a, i, { className: "fs-commerce__cta" })}
      </div>
    </aside>
  ` : f;
}
export {
  w as a,
  V as b,
  K as c,
  q as d,
  l as e,
  v as f,
  y as g,
  U as h,
  _ as i,
  F as j,
  X as k,
  b as l,
  D as m,
  W as n,
  z as o,
  P as p,
  p as q,
  O as r,
  H as s,
  A as t
};
