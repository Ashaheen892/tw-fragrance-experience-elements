import { css as $, LitElement as _, html as r, nothing as p } from "lit";
import { property as w, state as k } from "lit/decorators.js";
import { classMap as b } from "lit/directives/class-map.js";
import { keyed as L } from "lit/directives/keyed.js";
import { styleMap as v } from "lit/directives/style-map.js";
import { n as P, l as o, d as g, f as u, s as S, t as n, r as C, p as I, b as z, c as M } from "./commerceOutcome-CCLcV5SW.js";
const A = $`
  :host {
    direction: inherit;
  }

  .smc-shell {
    display: grid;
    gap: 1rem;
  }

  .smc-board {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background:
      linear-gradient(
        to right,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 6%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 50%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 10%, var(--card-bg, #fff)) 100%
      ),
      linear-gradient(
        to bottom,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 5%, var(--card-bg, #fff)) 0%,
        var(--card-bg, #fff) 50%,
        color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 8%, var(--card-bg, #fff)) 100%
      );
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    overflow: hidden;
  }

  .smc-axis {
    position: absolute;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 70%, transparent);
    pointer-events: none;
  }

  .smc-axis--x {
    top: 50%;
    left: 8%;
    right: 8%;
    height: 1px;
    transform: translateY(-50%);
  }

  .smc-axis--y {
    left: 50%;
    top: 8%;
    bottom: 8%;
    width: 1px;
    transform: translateX(-50%);
  }

  .smc-label {
    position: absolute;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
    pointer-events: none;
  }

  .smc-label--left {
    left: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .smc-label--right {
    right: 0.65rem;
    top: 50%;
    transform: translateY(-50%);
    text-align: end;
  }

  .smc-label--top {
    top: 0.55rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .smc-label--bottom {
    bottom: 0.55rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .smc-point {
    position: absolute;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--card-bg, #fff);
    background: var(--point-color, var(--accent-color, var(--fs-store-primary)));
    color: var(--button-color, #fff);
    font-size: 0.68rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    cursor: pointer;
    transform: translate(-50%, -50%);
    box-shadow: 0 8px 18px rgba(90, 70, 40, 0.14);
    transition:
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .smc-point:hover {
    transform: translate(-50%, calc(-50% - 2px));
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.16);
  }

  .smc-point.is-active {
    transform: translate(-50%, calc(-50% - 2px)) scale(1.06);
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--point-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.18);
  }

  .smc-panel__coords {
    margin: 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted-color, #666666);
  }

  @media (min-width: 960px) {
    .smc-shell {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .smc-point {
      transition: none;
    }

    .smc-point:hover,
    .smc-point.is-active {
      transform: translate(-50%, -50%);
    }
  }
`;
function T(a) {
  return {
    xLeft: o(a.smc_x_left) || "Fresh",
    xRight: o(a.smc_x_right) || "Warm",
    yTop: o(a.smc_y_top) || "Soft",
    yBottom: o(a.smc_y_bottom) || "Strong"
  };
}
function E(a) {
  return P(a).map((e, t) => ({
    id: `point-${t}`,
    name: o(e.name),
    desc: o(e.desc),
    x: g(u(e.x, 50), 0, 100),
    y: g(u(e.y, 50), 0, 100),
    color: o(e.color) || "#9a7b4f"
  })).filter((e) => e.name || e.desc);
}
var H = Object.defineProperty, x = (a, e, t, c) => {
  for (var s = void 0, i = a.length - 1, m; i >= 0; i--)
    (m = a[i]) && (s = m(e, t, s) || s);
  return s && H(e, t, s), s;
};
const h = class h extends _ {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && this.ensureActive();
  }
  get points() {
    var e;
    return E((e = this.config) == null ? void 0 : e.smc_points);
  }
  ensureActive() {
    var t;
    const e = this.points;
    e.some((c) => c.id === this.activeId) || (this.activeId = ((t = e[0]) == null ? void 0 : t.id) ?? "");
  }
  get active() {
    return this.points.find((e) => e.id === this.activeId) ?? this.points[0] ?? null;
  }
  select(e) {
    this.activeId = e;
  }
  renderPoint(e) {
    const t = e.id === this.activeId, c = (e.name || "•").slice(0, 1);
    return r`
      <button
        type="button"
        class=${b({ "smc-point": !0, "is-active": t, "fs-tap": !0 })}
        style=${v({
      "--point-color": e.color,
      left: `${e.x}%`,
      top: `${100 - e.y}%`
    })}
        aria-pressed=${t ? "true" : "false"}
        aria-controls="smc-detail"
        aria-label=${e.name || n("نقطة", "Point")}
        title=${e.name}
        @click=${() => this.select(e.id)}
      >
        ${c}
      </button>
    `;
  }
  renderPanel(e) {
    return r`
      <div class="smc-panel fs-panel fs-fade-swap" id="smc-detail" role="region" aria-live="polite">
        <h3 class="fs-panel__title">${e.name || n("نقطة عطرية", "Scent point")}</h3>
        ${e.desc ? r`<p class="fs-panel__desc">${e.desc}</p>` : r`<p class="fs-panel__desc">
              ${n("اضغط على نقطة في البوصلة لعرض التفاصيل.", "Tap a point on the compass to see details.")}
            </p>`}
        <p class="smc-panel__coords">
          ${n("الموضع", "Position")}: ${Math.round(e.x)}% × ${Math.round(e.y)}%
        </p>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = C(e, "smc_"), c = t.animate && !I(), s = o(e.smc_title), i = o(e.smc_desc), m = this.points, d = T(e), f = this.active;
    return m.length ? r`
      <section
        class=${b({ "fs-section": !0, "fs-animate": c })}
        style=${v(z(t))}
        aria-label=${s || n("بوصلة الطابع العطري", "Scent mood compass")}
      >
        <div class="fs-container">
          ${s || i ? r`<div class="fs-header">
                ${s ? r`<h2 class="fs-title">${s}</h2>` : p}
                ${i ? r`<p class="fs-desc">${i}</p>` : p}
              </div>` : p}

          <div class="smc-shell">
            <div class="smc-board" role="img" aria-label=${n("بوصلة الطابع", "Mood compass")}>
              <span class="smc-axis smc-axis--x" aria-hidden="true"></span>
              <span class="smc-axis smc-axis--y" aria-hidden="true"></span>
              <span class="smc-label smc-label--left">${d.xLeft}</span>
              <span class="smc-label smc-label--right">${d.xRight}</span>
              <span class="smc-label smc-label--top">${d.yTop}</span>
              <span class="smc-label smc-label--bottom">${d.yBottom}</span>
              ${m.map((y) => this.renderPoint(y))}
            </div>
            ${f ? L(f.id, this.renderPanel(f)) : p}
          </div>
          ${M({ config: e, prefix: "smc_" })}
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${n(
      "أضف نقاط الطابع العطري من إعدادات العنصر.",
      "Add scent mood points in the element settings."
    )}
      </div>`;
  }
};
h.styles = [S, A];
let l = h;
x([
  w({ type: Object })
], l.prototype, "config");
x([
  k()
], l.prototype, "activeId");
typeof l < "u" && l.registerSallaComponent("salla-scent-mood-compass");
export {
  l as default
};
