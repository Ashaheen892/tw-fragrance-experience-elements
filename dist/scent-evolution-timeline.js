import { css as x, LitElement as _, nothing as i, html as s } from "lit";
import { property as y, state as $ } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import { keyed as k } from "lit/directives/keyed.js";
import { styleMap as f } from "lit/directives/style-map.js";
import { n as w, a as L, l, g as S, s as z, t as n, r as C, p as I, b as A, c as M } from "./commerceOutcome-CCLcV5SW.js";
const H = x`
  :host {
    direction: inherit;
  }

  .set-shell {
    display: grid;
    gap: 1rem;
  }

  .set-track {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x proximity;
    padding-bottom: 0.35rem;
  }

  .set-track--vertical {
    flex-direction: column;
    overflow: visible;
    scroll-snap-type: none;
    padding-bottom: 0;
  }

  .set-step {
    flex: 0 0 auto;
    min-width: 8.5rem;
    scroll-snap-align: start;
    display: grid;
    gap: 0.45rem;
    min-height: 44px;
    padding: 0.95rem 1.05rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 80%, transparent);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease,
      background 0.24s ease;
  }

  .set-track--vertical .set-step {
    min-width: 0;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .set-step:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--step-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .set-step.is-active {
    border-color: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--step-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .set-step:active {
    transform: translateY(0);
  }

  .set-step__dot {
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    background: var(--step-color, var(--accent-color, var(--fs-store-primary)));
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--step-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent);
  }

  .set-step__label {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .set-step__time {
    margin: 0;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
  }

  .set-detail {
    position: relative;
    overflow: hidden;
    min-height: 10rem;
  }

  .set-detail__bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.22;
    pointer-events: none;
  }

  .set-detail__bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--card-bg, #fff) 15%, transparent),
      var(--card-bg, #fff)
    );
  }

  .set-detail__body {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.55rem;
  }

  .set-detail__time {
    margin: 0;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (min-width: 960px) {
    .set-shell--vertical {
      grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .set-step {
      transition: none;
    }

    .set-step:hover,
    .set-step.is-active {
      transform: none;
    }
  }
`;
function O(o) {
  return S(o.set_layout, "horizontal") === "vertical" ? "vertical" : "horizontal";
}
function P(o) {
  return w(o).map((e, t) => ({
    id: `stage-${t}`,
    label: l(e.label),
    timeLabel: l(e.time_label),
    desc: l(e.desc),
    color: l(e.color) || "#9a7b4f",
    image: L(e.image)
  })).filter((e) => e.label || e.timeLabel || e.desc);
}
var Y = Object.defineProperty, u = (o, e, t, p) => {
  for (var r = void 0, a = o.length - 1, d; a >= 0; a--)
    (d = o[a]) && (r = d(e, t, r) || r);
  return r && Y(e, t, r), r;
};
const g = class g extends _ {
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
  get stages() {
    var e;
    return P((e = this.config) == null ? void 0 : e.set_stages);
  }
  ensureActive() {
    var t;
    const e = this.stages;
    e.some((p) => p.id === this.activeId) || (this.activeId = ((t = e[0]) == null ? void 0 : t.id) ?? "");
  }
  get active() {
    return this.stages.find((e) => e.id === this.activeId) ?? this.stages[0] ?? null;
  }
  select(e) {
    this.activeId = e;
  }
  renderStep(e) {
    const t = e.id === this.activeId;
    return s`
      <button
        type="button"
        class=${m({ "set-step": !0, "is-active": t, "fs-tap": !0 })}
        style=${f({ "--step-color": e.color })}
        aria-pressed=${t ? "true" : "false"}
        aria-controls="set-detail"
        @click=${() => this.select(e.id)}
      >
        <span class="set-step__dot" aria-hidden="true"></span>
        <span>
          <p class="set-step__label">${e.label || n("مرحلة", "Stage")}</p>
          ${e.timeLabel ? s`<p class="set-step__time">${e.timeLabel}</p>` : i}
        </span>
      </button>
    `;
  }
  renderDetail(e) {
    return s`
      <div class="set-detail fs-panel fs-fade-swap" id="set-detail" role="region" aria-live="polite">
        ${e.image ? s`<div
              class="set-detail__bg"
              style=${f({ backgroundImage: `url("${e.image}")` })}
              aria-hidden="true"
            ></div>` : i}
        <div class="set-detail__body">
          <h3 class="fs-panel__title">${e.label || n("مرحلة العطر", "Scent stage")}</h3>
          ${e.timeLabel ? s`<p class="set-detail__time">${e.timeLabel}</p>` : i}
          ${e.desc ? s`<p class="fs-panel__desc">${e.desc}</p>` : s`<p class="fs-panel__desc">
                ${n("اختر مرحلة لعرض وصف تطور العطر.", "Pick a stage to see how the scent evolves.")}
              </p>`}
        </div>
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = C(e, "set_"), p = t.animate && !I(), r = l(e.set_title), a = l(e.set_desc), d = this.stages, h = O(e), v = this.active;
    return d.length ? s`
      <section
        class=${m({ "fs-section": !0, "fs-animate": p })}
        style=${f(A(t))}
        aria-label=${r || n("رحلة العطر عبر الوقت", "Scent evolution timeline")}
      >
        <div class="fs-container">
          ${r || a ? s`<div class="fs-header">
                ${r ? s`<h2 class="fs-title">${r}</h2>` : i}
                ${a ? s`<p class="fs-desc">${a}</p>` : i}
              </div>` : i}

          <div
            class=${m({
      "set-shell": !0,
      "set-shell--vertical": h === "vertical"
    })}
          >
            <div
              class=${m({
      "set-track": !0,
      "set-track--vertical": h === "vertical"
    })}
              role="tablist"
              aria-label=${n("مراحل العطر", "Scent stages")}
            >
              ${d.map((b) => this.renderStep(b))}
            </div>
            ${v ? k(v.id, this.renderDetail(v)) : i}
          </div>
          ${M({ config: e, prefix: "set_" })}
        </div>
      </section>
    ` : s`<div class="fs-empty" role="status">
        ${n(
      "أضف مراحل تطور العطر من إعدادات العنصر.",
      "Add scent evolution stages in the element settings."
    )}
      </div>`;
  }
};
g.styles = [z, H];
let c = g;
u([
  y({ type: Object })
], c.prototype, "config");
u([
  $()
], c.prototype, "activeId");
typeof c < "u" && c.registerSallaComponent("salla-scent-evolution-timeline");
export {
  c as default
};
