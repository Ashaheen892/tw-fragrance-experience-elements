import { css as L, html as s, LitElement as I, nothing as h } from "lit";
import { property as z, state as k } from "lit/decorators.js";
import { classMap as g } from "lit/directives/class-map.js";
import { keyed as M } from "lit/directives/keyed.js";
import { styleMap as y } from "lit/directives/style-map.js";
import { t as i, n as C, l as m, a as $, g as E, s as D, r as R, p as S, b as A, c as U } from "./commerceOutcome-CCLcV5SW.js";
const j = L`
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
    color: var(--muted-color, #666666);
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
    z-index: 6;
    display: grid;
    place-items: center;
    touch-action: none;
  }

  .sba-compare--vertical .sba-handle {
    top: 0;
    bottom: 0;
    width: 2.75rem;
    left: var(--sba-pos, 50%);
    transform: translateX(-50%);
    cursor: ew-resize;
  }

  .sba-compare--horizontal .sba-handle {
    left: 0;
    right: 0;
    height: 2.75rem;
    top: var(--sba-pos, 50%);
    transform: translateY(-50%);
    cursor: ns-resize;
  }

  .sba-handle__rail {
    position: absolute;
    inset: 0;
    margin: auto;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 55%, transparent);
    pointer-events: none;
  }

  .sba-compare--vertical .sba-handle__rail {
    width: 3px;
    height: 100%;
  }

  .sba-compare--horizontal .sba-handle__rail {
    height: 3px;
    width: 100%;
  }

  .sba-handle__grip {
    position: relative;
    z-index: 1;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--accent-color, var(--fs-store-primary));
    background: var(--card-bg, #fff);
    color: var(--accent-color, var(--fs-store-primary));
    display: grid;
    place-items: center;
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 16%, transparent),
      0 8px 20px rgba(90, 70, 40, 0.28);
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .sba-handle:hover .sba-handle__grip,
  .sba-handle:focus-visible .sba-handle__grip {
    transform: scale(1.08);
    box-shadow:
      0 0 0 5px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 22%, transparent),
      0 10px 24px rgba(90, 70, 40, 0.32);
  }

  .sba-handle__svg {
    width: 1.15rem;
    height: 1.15rem;
    display: block;
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
    color: var(--muted-color, #666666);
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

    .sba-handle:hover .sba-handle__grip,
    .sba-handle:focus-visible .sba-handle__grip {
      transform: none;
    }
  }
`, v = [
  {
    id: "layering",
    beforeImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: i("قبل", "Before"),
    afterLabel: i("بعد", "After"),
    caption: i("طبقة عطرية أغنى", "Richer scent layering")
  },
  {
    id: "evolution",
    beforeImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: i("افتتاحية", "Opening"),
    afterLabel: i("قاعدة", "Base"),
    caption: i("تطور الرائحة عبر الساعات", "Scent evolution over hours")
  }
];
function O(d) {
  return E(d.sba_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
function q(d) {
  const a = C(d).map((e, r) => ({
    id: `slide-${r}`,
    beforeImage: $(e.before_image),
    afterImage: $(e.after_image),
    beforeLabel: m(e.before_label) || "",
    afterLabel: m(e.after_label) || "",
    caption: m(e.caption)
  })).filter((e) => e.beforeImage || e.afterImage || e.caption);
  return a.length ? a.map((e, r) => {
    const t = v[r % v.length];
    return {
      ...e,
      beforeImage: e.beforeImage || t.beforeImage,
      afterImage: e.afterImage || t.afterImage,
      beforeLabel: e.beforeLabel || t.beforeLabel,
      afterLabel: e.afterLabel || t.afterLabel,
      caption: e.caption || t.caption
    };
  }) : v.map((e) => ({ ...e }));
}
var P = Object.defineProperty, u = (d, a, e, r) => {
  for (var t = void 0, n = d.length - 1, b; n >= 0; n--)
    (b = d[n]) && (t = b(a, e, t) || t);
  return t && P(a, e, t), t;
};
const B = s`
  <svg class="sba-handle__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M8 12H16M8 12l2.2-2.2M8 12l2.2 2.2M16 12l-2.2-2.2M16 12l-2.2 2.2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`, H = s`
  <svg class="sba-handle__svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M12 8V16M12 8l-2.2 2.2M12 8l2.2 2.2M12 16l-2.2-2.2M12 16l2.2-2.2"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`, x = class x extends I {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.position = 50, this.dragging = !1, this.boundLangHandler = () => this.requestUpdate(), this.onDown = (a) => {
      var e, r;
      a.preventDefault(), this.dragging = !0, (r = (e = a.target).setPointerCapture) == null || r.call(e, a.pointerId), window.addEventListener("pointermove", this.onMove), window.addEventListener("pointerup", this.onUp), this.updatePosition(a);
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
    return q((a = this.config) == null ? void 0 : a.sba_slides);
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
    const r = e.getBoundingClientRect(), n = this.direction === "vertical" ? (a.clientX - r.left) / r.width * 100 : (a.clientY - r.top) / r.height * 100;
    this.position = Math.max(5, Math.min(95, n));
  }
  render() {
    const a = this.config || {}, e = R(a, "sba_"), r = e.animate && !S(), t = m(a.sba_title), n = m(a.sba_desc), b = this.slides, o = this.active, f = this.direction;
    if (!b.length)
      return s`<div class="fs-empty" role="status">
        ${i(
        "أضف شرائح قبل/بعد من إعدادات العنصر.",
        "Add before/after slides in the element settings."
      )}
      </div>`;
    const _ = (o == null ? void 0 : o.beforeLabel) || i("قبل", "BEFORE"), w = (o == null ? void 0 : o.afterLabel) || i("بعد", "AFTER");
    return s`
      <section
        class=${g({ "fs-section": !0, "fs-animate": r })}
        style=${y(A(e))}
        aria-label=${t || i("مقارنة قبل وبعد", "Before & after comparison")}
      >
        <div class="fs-container">
          ${t || n ? s`<div class="fs-header">
                ${t ? s`<h2 class="fs-title">${t}</h2>` : h}
                ${n ? s`<p class="fs-desc">${n}</p>` : h}
              </div>` : h}

          ${b.length > 1 ? s`<div class="sba-tabs" role="tablist">
                ${b.map((l, c) => s`
                  <button
                    type="button"
                    role="tab"
                    class=${g({ "sba-tab": !0, "fs-tap": !0, "is-active": c === this.activeIndex })}
                    aria-selected=${c === this.activeIndex ? "true" : "false"}
                    @click=${() => this.selectSlide(c)}
                  >${l.caption || `${c + 1}`}</button>
                `)}
              </div>` : h}

          ${o ? M(this.activeIndex, s`
              <div
                class=${g({
      "sba-compare": !0,
      "sba-compare--vertical": f === "vertical",
      "sba-compare--horizontal": f === "horizontal",
      "fs-fade-swap": !0
    })}
                style=${y({ "--sba-pos": `${this.position}%` })}
                @pointerdown=${this.onDown}
              >
                <img class="sba-compare__img sba-compare__before" src=${o.beforeImage} alt=${_} loading="lazy" decoding="async" />
                <img class="sba-compare__img sba-compare__after" src=${o.afterImage} alt=${w} loading="lazy" decoding="async" />
                <span class="sba-label sba-label--before">${_}</span>
                <span class="sba-label sba-label--after">${w}</span>
                <div
                  class="sba-handle"
                  @pointerdown=${this.onDown}
                  role="slider"
                  tabindex="0"
                  aria-orientation=${f === "vertical" ? "horizontal" : "vertical"}
                  aria-label=${i("اسحب للمقارنة", "Drag to compare")}
                  aria-valuenow=${Math.round(this.position)}
                  aria-valuemin="5"
                  aria-valuemax="95"
                  @keydown=${(l) => {
      const c = l.key === "ArrowLeft" || l.key === "ArrowUp" ? -4 : l.key === "ArrowRight" || l.key === "ArrowDown" ? 4 : 0;
      c && (l.preventDefault(), this.position = Math.max(5, Math.min(95, this.position + c)));
    }}
                >
                  <span class="sba-handle__rail" aria-hidden="true"></span>
                  <span class="sba-handle__grip" aria-hidden="true">
                    ${f === "vertical" ? B : H}
                  </span>
                </div>
              </div>
              ${o.caption ? s`<p class="sba-caption">${o.caption}</p>` : h}
            `) : h}

          ${U({ config: a, prefix: "sba_" })}
        </div>
      </section>
    `;
  }
};
x.styles = [D, j];
let p = x;
u([
  z({ type: Object })
], p.prototype, "config");
u([
  k()
], p.prototype, "activeIndex");
u([
  k()
], p.prototype, "position");
typeof p < "u" && p.registerSallaComponent("salla-scent-before-after");
export {
  p as default
};
