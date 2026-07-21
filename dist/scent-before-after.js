import { css as I, html as i, LitElement as z, nothing as d } from "lit";
import { property as k, state as $ } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as M } from "lit/directives/keyed.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { t as s, n as E, l as b, a as w, g as C, s as S, r as R, p as U, b as j, c as q } from "./commerceOutcome-CkVkQjOd.js";
const D = I`
  :host {
    direction: inherit;
  }

  .sba-tabs {
    display: flex;
    justify-content: center;
    gap: 0.65rem;
    margin-bottom: 1.15rem;
    flex-wrap: wrap;
  }

  .sba-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 44px;
    padding: 0.45rem 1rem;
    border: 1.5px solid color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 30%, var(--border-color, #e6e0d6));
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #6e6558);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition:
      border-color 0.24s ease,
      color 0.24s ease,
      background 0.24s ease,
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .sba-tab:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 45%, var(--border-color, #e6e0d6));
    box-shadow: 0 8px 18px rgba(90, 70, 40, 0.08);
  }

  .sba-tab.is-active {
    border-color: var(--accent-color, var(--fs-store-primary));
    color: var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 9%, var(--card-bg, #fff));
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 18%, transparent),
      0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sba-compare {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    aspect-ratio: 16 / 10;
    max-height: 560px;
    width: 100%;
    background: var(--text-color, #1f1a14);
  }

  .sba-compare__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .sba-compare__before {
    z-index: 1;
  }

  .sba-compare__after {
    z-index: 0;
  }

  .sba-compare--vertical .sba-compare__before {
    clip-path: inset(0 calc(100% - var(--sba-pos, 50%)) 0 0);
  }

  .sba-compare--horizontal .sba-compare__before {
    clip-path: inset(0 0 calc(100% - var(--sba-pos, 50%)) 0);
  }

  .sba-handle {
    position: absolute;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sba-compare--vertical .sba-handle {
    top: 0;
    bottom: 0;
    width: 3px;
    left: var(--sba-pos, 50%);
    transform: translateX(-50%);
    cursor: ew-resize;
    flex-direction: column;
  }

  .sba-compare--horizontal .sba-handle {
    left: 0;
    right: 0;
    height: 3px;
    top: var(--sba-pos, 50%);
    transform: translateY(-50%);
    cursor: ns-resize;
    flex-direction: row;
  }

  .sba-handle__line {
    flex: 1;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent),
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent)
    );
  }

  .sba-compare--horizontal .sba-handle__line {
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent),
      var(--accent-color, var(--fs-store-primary)),
      color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 25%, transparent)
    );
  }

  .sba-handle__grip {
    flex: 0 0 auto;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--accent-color, var(--fs-store-primary));
    background: color-mix(in srgb, var(--text-color, #1f1a14) 72%, transparent);
    backdrop-filter: blur(6px);
    display: grid;
    place-items: center;
    color: var(--accent-color, var(--fs-store-primary));
    font-size: 0.9rem;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.2);
    transition: transform 0.24s ease;
  }

  .sba-handle__grip:hover {
    transform: scale(1.08);
  }

  .sba-handle__grip svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }

  .sba-label {
    position: absolute;
    z-index: 4;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-color, #1f1a14) 65%, transparent);
    backdrop-filter: blur(4px);
    color: var(--card-bg, #fff);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .sba-label--before {
    bottom: 1rem;
    inset-inline-start: 1rem;
  }

  .sba-label--after {
    bottom: 1rem;
    inset-inline-end: 1rem;
  }

  .sba-compare--horizontal .sba-label--before {
    top: 1rem;
    bottom: auto;
    inset-inline-start: 1rem;
  }

  .sba-compare--horizontal .sba-label--after {
    bottom: 1rem;
    inset-inline-start: 1rem;
  }

  .sba-caption {
    margin: 0.85rem 0 0;
    text-align: center;
    color: var(--muted-color, #6e6558);
    font-size: 0.88rem;
    line-height: 1.55;
    font-style: italic;
  }

  @media (max-width: 639px) {
    .sba-compare {
      aspect-ratio: 4 / 3;
      max-height: 380px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sba-tab,
    .sba-handle__grip {
      transition: none;
    }

    .sba-tab:hover {
      transform: none;
    }

    .sba-handle__grip:hover {
      transform: none;
    }
  }
`, h = [
  {
    id: "layering",
    beforeImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: s("قبل", "Before"),
    afterLabel: s("بعد", "After"),
    caption: s("طبقة عطرية أغنى", "Richer scent layering")
  },
  {
    id: "evolution",
    beforeImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: s("افتتاحية", "Opening"),
    afterLabel: s("قاعدة", "Base"),
    caption: s("تطور الرائحة عبر الساعات", "Scent evolution over hours")
  }
];
function O(l) {
  return C(l.sba_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
function P(l) {
  const a = E(l).map((e, t) => ({
    id: `slide-${t}`,
    beforeImage: w(e.before_image),
    afterImage: w(e.after_image),
    beforeLabel: b(e.before_label) || "",
    afterLabel: b(e.after_label) || "",
    caption: b(e.caption)
  })).filter((e) => e.beforeImage || e.afterImage || e.caption);
  return a.length ? a.map((e, t) => {
    const r = h[t % h.length];
    return {
      ...e,
      beforeImage: e.beforeImage || r.beforeImage,
      afterImage: e.afterImage || r.afterImage,
      beforeLabel: e.beforeLabel || r.beforeLabel,
      afterLabel: e.afterLabel || r.afterLabel,
      caption: e.caption || r.caption
    };
  }) : h.map((e) => ({ ...e }));
}
var H = Object.defineProperty, g = (l, a, e, t) => {
  for (var r = void 0, n = l.length - 1, p; n >= 0; n--)
    (p = l[n]) && (r = p(a, e, r) || r);
  return r && H(a, e, r), r;
};
const B = i`<svg viewBox="0 0 16 16"><path d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10"/></svg>`, v = class v extends z {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.position = 50, this.dragging = !1, this.boundLangHandler = () => this.requestUpdate(), this.onDown = (a) => {
      var e, t;
      a.preventDefault(), this.dragging = !0, (t = (e = a.target).setPointerCapture) == null || t.call(e, a.pointerId), window.addEventListener("pointermove", this.onMove), window.addEventListener("pointerup", this.onUp), this.updatePosition(a);
    }, this.onMove = (a) => {
      this.dragging && this.updatePosition(a);
    }, this.onUp = () => {
      this.dragging = !1, window.removeEventListener("pointermove", this.onMove), window.removeEventListener("pointerup", this.onUp);
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), window.removeEventListener("pointermove", this.onMove), window.removeEventListener("pointerup", this.onUp), super.disconnectedCallback();
  }
  updated(a) {
    if (a.has("config")) {
      const e = this.slides;
      this.activeIndex >= e.length && (this.activeIndex = 0), this.position = 50;
    }
  }
  get slides() {
    var a;
    return P((a = this.config) == null ? void 0 : a.sba_slides);
  }
  get direction() {
    return O(this.config || {});
  }
  get active() {
    return this.slides[this.activeIndex] ?? null;
  }
  selectSlide(a) {
    this.activeIndex = a, this.position = 50;
  }
  updatePosition(a) {
    const e = this.renderRoot.querySelector(".sba-compare");
    if (!e) return;
    const t = e.getBoundingClientRect(), n = this.direction === "vertical" ? (a.clientX - t.left) / t.width * 100 : (a.clientY - t.top) / t.height * 100;
    this.position = Math.max(5, Math.min(95, n));
  }
  render() {
    const a = this.config || {}, e = R(a, "sba_"), t = e.animate && !U(), r = b(a.sba_title), n = b(a.sba_desc), p = this.slides, o = this.active, u = this.direction;
    if (!p.length)
      return i`<div class="fs-empty" role="status">
        ${s(
        "أضف شرائح قبل/بعد من إعدادات العنصر.",
        "Add before/after slides in the element settings."
      )}
      </div>`;
    const x = (o == null ? void 0 : o.beforeLabel) || s("قبل", "BEFORE"), _ = (o == null ? void 0 : o.afterLabel) || s("بعد", "AFTER");
    return i`
      <section
        class=${f({ "fs-section": !0, "fs-animate": t })}
        style=${y(j(e))}
        aria-label=${r || s("مقارنة قبل وبعد", "Before & after comparison")}
      >
        <div class="fs-container">
          ${r || n ? i`<div class="fs-header">
                ${r ? i`<h2 class="fs-title">${r}</h2>` : d}
                ${n ? i`<p class="fs-desc">${n}</p>` : d}
              </div>` : d}

          ${p.length > 1 ? i`<div class="sba-tabs" role="tablist">
                ${p.map((L, m) => i`
                  <button
                    type="button"
                    role="tab"
                    class=${f({ "sba-tab": !0, "fs-tap": !0, "is-active": m === this.activeIndex })}
                    aria-selected=${m === this.activeIndex ? "true" : "false"}
                    @click=${() => this.selectSlide(m)}
                  >${L.caption || `${m + 1}`}</button>
                `)}
              </div>` : d}

          ${o ? M(this.activeIndex, i`
              <div
                class=${f({
      "sba-compare": !0,
      "sba-compare--vertical": u === "vertical",
      "sba-compare--horizontal": u === "horizontal",
      "fs-fade-swap": !0
    })}
                style=${y({ "--sba-pos": `${this.position}%` })}
              >
                <img class="sba-compare__img sba-compare__before" src=${o.beforeImage} alt=${x} loading="lazy" decoding="async" />
                <img class="sba-compare__img sba-compare__after" src=${o.afterImage} alt=${_} loading="lazy" decoding="async" />
                <span class="sba-label sba-label--before">${x}</span>
                <span class="sba-label sba-label--after">${_}</span>
                <div
                  class="sba-handle"
                  @pointerdown=${this.onDown}
                  role="slider"
                  aria-label=${s("اسحب للمقارنة", "Drag to compare")}
                  aria-valuenow=${Math.round(this.position)}
                  aria-valuemin="5"
                  aria-valuemax="95"
                >
                  <span class="sba-handle__line"></span>
                  <span class="sba-handle__grip">${B}</span>
                  <span class="sba-handle__line"></span>
                </div>
              </div>
              ${o.caption ? i`<p class="sba-caption">${o.caption}</p>` : d}
            `) : d}

          ${q({ config: a, prefix: "sba_" })}
        </div>
      </section>
    `;
  }
};
v.styles = [S, D];
let c = v;
g([
  k({ type: Object })
], c.prototype, "config");
g([
  $()
], c.prototype, "activeIndex");
g([
  $()
], c.prototype, "position");
typeof c < "u" && c.registerSallaComponent("salla-scent-before-after");
export {
  c as default
};
