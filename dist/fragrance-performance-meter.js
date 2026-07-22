import { css as b, LitElement as $, html as i, nothing as f } from "lit";
import { property as y } from "lit/decorators.js";
import { classMap as x } from "lit/directives/class-map.js";
import { styleMap as c } from "lit/directives/style-map.js";
import { n as w, l as p, g as S, d as k, f as L, s as C, p as g, r as M, b as E, t as u, c as R } from "./commerceOutcome-CCLcV5SW.js";
const j = b`
  .fpm-panel {
    max-width: 880px;
    margin-inline: auto;
  }

  .fpm-bars {
    display: grid;
    gap: 0.85rem;
  }

  .fpm-bar {
    display: grid;
    gap: 0.45rem;
  }

  .fpm-bar__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .fpm-bar__label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  .fpm-bar__value {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--metric-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fpm-bar__track {
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 80%, transparent);
    overflow: hidden;
  }

  .fpm-bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--metric-color, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--metric-color, var(--accent-color, var(--fs-store-primary))) 65%, var(--text-color, #5c4a32))
    );
    transition: width 0.28s ease;
  }

  .fpm-rings {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .fpm-rings {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fpm-ring {
    display: grid;
    justify-items: center;
    gap: 0.55rem;
    text-align: center;
  }

  .fpm-ring__svg {
    width: 96px;
    height: 96px;
    transform: rotate(-90deg);
  }

  .fpm-ring__track {
    fill: none;
    stroke: color-mix(in srgb, var(--border-color, #e6e0d6) 85%, transparent);
    stroke-width: 8;
  }

  .fpm-ring__arc {
    fill: none;
    stroke: var(--metric-color, var(--accent-color, var(--fs-store-primary)));
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.28s ease;
  }

  .fpm-ring__value {
    font-size: 1rem;
    font-weight: 800;
    fill: var(--text-color, #1f1a14);
    transform: rotate(90deg);
    transform-origin: 50px 50px;
  }

  .fpm-ring__label {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--text-color, #000000);
    line-height: 1.35;
  }

  @media (prefers-reduced-motion: reduce) {
    .fpm-bar__fill,
    .fpm-ring__arc {
      transition: none !important;
    }
  }
`, z = [
  "longevity",
  "sillage",
  "projection",
  "sweetness",
  "freshness",
  "warmth"
], I = ["bars", "rings"], D = {
  longevity: { ar: "الثبات", en: "Longevity" },
  sillage: { ar: "الأريج المحيط", en: "Sillage" },
  projection: { ar: "الانتشار", en: "Projection" },
  sweetness: { ar: "الحلاوة", en: "Sweetness" },
  freshness: { ar: "الانتعاش", en: "Freshness" },
  warmth: { ar: "الدفء", en: "Warmth" }
};
function O(t) {
  const e = S(t.fpm_style, "bars");
  return I.includes(e) ? e : "bars";
}
function v(t) {
  return k(L(t, 0), 0, 100);
}
function A(t) {
  const e = w(t.fpm_metrics);
  return e.length ? e.map((r, s) => {
    const a = p(r.label), n = v(r.value);
    return {
      id: String(r.id ?? r.metric_id ?? "").trim() || `metric-${s + 1}`,
      label: a,
      value: n,
      color: String(r.color ?? "").trim()
    };
  }).filter((r) => r.label || r.value > 0) : z.flatMap((r) => {
    const s = t[`fpm_${r}`], a = v(s), n = t[`fpm_${r}_label`], l = p(n);
    return a <= 0 && !l && s == null ? [] : [
      {
        id: r,
        label: l || D[r].ar,
        value: a,
        color: String(t[`fpm_${r}_color`] ?? "").trim()
      }
    ];
  });
}
function B(t) {
  return t.length > 0;
}
function T(t, e = 42) {
  const r = 2 * Math.PI * e, s = t / 100 * r;
  return String(r - s);
}
function H(t = 42) {
  return 2 * Math.PI * t;
}
var P = Object.defineProperty, U = (t, e, r, s) => {
  for (var a = void 0, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (a = l(e, r, a) || a);
  return a && P(e, r, a), a;
};
const m = 42, d = class d extends $ {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  get metrics() {
    return A(this.config || {});
  }
  renderBar(e) {
    const r = {
      ...e.color ? { "--metric-color": e.color } : {}
    }, s = !g();
    return i`
      <div class="fpm-bar" style=${c(r)}>
        <div class="fpm-bar__head">
          <span class="fpm-bar__label">${e.label}</span>
          <span class="fpm-bar__value">${e.value}%</span>
        </div>
        <div class="fpm-bar__track" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${e.value} aria-label=${e.label}>
          <span
            class="fpm-bar__fill"
            style=${c({ width: s ? `${e.value}%` : `${e.value}%` })}
          ></span>
        </div>
      </div>
    `;
  }
  renderRing(e) {
    const r = e.color ? { "--metric-color": e.color } : {}, s = H(m), a = T(e.value, m);
    return i`
      <div class="fpm-ring" style=${c(r)}>
        <svg class="fpm-ring__svg" viewBox="0 0 100 100" role="img" aria-label=${`${e.label}: ${e.value}%`}>
          <circle class="fpm-ring__track" cx="50" cy="50" r=${m} />
          <circle
            class="fpm-ring__arc"
            cx="50"
            cy="50"
            r=${m}
            stroke-dasharray=${String(s)}
            stroke-dashoffset=${a}
          />
          <text class="fpm-ring__value" x="50" y="50" text-anchor="middle" dominant-baseline="central">
            ${e.value}%
          </text>
        </svg>
        <p class="fpm-ring__label">${e.label}</p>
      </div>
    `;
  }
  renderMetrics(e, r) {
    return r === "rings" ? i`<div class="fpm-rings">${e.map((s) => this.renderRing(s))}</div>` : i`<div class="fpm-bars">${e.map((s) => this.renderBar(s))}</div>`;
  }
  render() {
    const e = this.config || {}, r = M(e, "fpm_"), s = r.animate && !g(), a = p(e.fpm_title), n = p(e.fpm_desc), l = this.metrics, h = O(e), _ = B(l);
    return i`
      <section
        class=${x({ "fs-section": !0, "fs-animate": s })}
        style=${c(E(r))}
        aria-label=${a || u("مؤشر الأداء العطري", "Fragrance performance meter")}
      >
        <div class="fs-container">
          ${a || n ? i`<div class="fs-header">
                ${a ? i`<h2 class="fs-title">${a}</h2>` : f}
                ${n ? i`<p class="fs-desc">${n}</p>` : f}
              </div>` : f}

          ${_ ? i`<div class="fpm-panel fs-panel">${this.renderMetrics(l, h)}</div>` : i`<div class="fs-empty" role="status">
                ${u("أضف مقاييس الأداء من إعدادات العنصر.", "Add performance metrics in the element settings.")}
              </div>`}
          ${R({ config: e, prefix: "fpm_" })}
        </div>
      </section>
    `;
  }
};
d.styles = [C, j];
let o = d;
U([
  y({ type: Object })
], o.prototype, "config");
typeof o < "u" && o.registerSallaComponent("salla-fragrance-performance-meter");
export {
  o as default
};
