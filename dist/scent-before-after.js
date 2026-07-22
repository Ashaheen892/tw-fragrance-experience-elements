var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, l as localizedString, a as extractImageUrl, g as getRadioValue, s as sharedSectionCss, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
`, DEFAULTS = [
  {
    id: "layering",
    beforeImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: t("قبل", "Before"),
    afterLabel: t("بعد", "After"),
    caption: t("طبقة عطرية أغنى", "Richer scent layering")
  },
  {
    id: "evolution",
    beforeImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80",
    beforeLabel: t("افتتاحية", "Opening"),
    afterLabel: t("قاعدة", "Base"),
    caption: t("تطور الرائحة عبر الساعات", "Scent evolution over hours")
  }
];
function resolveDirection(config) {
  return getRadioValue(config.sba_direction, "vertical") === "horizontal" ? "horizontal" : "vertical";
}
__name(resolveDirection, "resolveDirection");
function parseSlides(raw) {
  const parsed = normalizeCollection(raw).map((row, index) => ({
    id: `slide-${index}`,
    beforeImage: extractImageUrl(row.before_image),
    afterImage: extractImageUrl(row.after_image),
    beforeLabel: localizedString(row.before_label) || "",
    afterLabel: localizedString(row.after_label) || "",
    caption: localizedString(row.caption)
  })).filter((item) => item.beforeImage || item.afterImage || item.caption);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      beforeImage: item.beforeImage || d.beforeImage,
      afterImage: item.afterImage || d.afterImage,
      beforeLabel: item.beforeLabel || d.beforeLabel,
      afterLabel: item.afterLabel || d.afterLabel,
      caption: item.caption || d.caption
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseSlides, "parseSlides");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const DRAG_ICON_H = html`
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
`, DRAG_ICON_V = html`
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
`, _ScentBeforeAfter = class _ScentBeforeAfter extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.position = 50, this.dragging = !1, this.boundLangHandler = () => this.requestUpdate(), this.onDown = (e) => {
      var _a, _b;
      e.preventDefault(), this.dragging = !0, (_b = (_a = e.target).setPointerCapture) == null || _b.call(_a, e.pointerId), window.addEventListener("pointermove", this.onMove), window.addEventListener("pointerup", this.onUp), this.updatePosition(e);
    }, this.onMove = (e) => {
      this.dragging && this.updatePosition(e);
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
  updated(changed) {
    if (changed.has("config")) {
      const slides = this.slides;
      this.activeIndex >= slides.length && (this.activeIndex = 0), this.position = 50;
    }
  }
  get slides() {
    var _a;
    return parseSlides((_a = this.config) == null ? void 0 : _a.sba_slides);
  }
  get direction() {
    return resolveDirection(this.config || {});
  }
  get active() {
    return this.slides[this.activeIndex] ?? null;
  }
  selectSlide(index) {
    this.activeIndex = index, this.position = 50;
  }
  updatePosition(e) {
    const container = this.renderRoot.querySelector(".sba-compare");
    if (!container) return;
    const rect = container.getBoundingClientRect(), raw = this.direction === "vertical" ? (e.clientX - rect.left) / rect.width * 100 : (e.clientY - rect.top) / rect.height * 100;
    this.position = Math.max(5, Math.min(95, raw));
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "sba_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.sba_title), desc = localizedString(c.sba_desc), slides = this.slides, active = this.active, dir = this.direction;
    if (!slides.length)
      return html`<div class="fs-empty" role="status">
        ${t(
        "أضف شرائح قبل/بعد من إعدادات العنصر.",
        "Add before/after slides in the element settings."
      )}
      </div>`;
    const beforeLabel = (active == null ? void 0 : active.beforeLabel) || t("قبل", "BEFORE"), afterLabel = (active == null ? void 0 : active.afterLabel) || t("بعد", "AFTER");
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مقارنة قبل وبعد", "Before & after comparison")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${slides.length > 1 ? html`<div class="sba-tabs" role="tablist">
                ${slides.map((s, i) => html`
                  <button
                    type="button"
                    role="tab"
                    class=${classMap({ "sba-tab": !0, "fs-tap": !0, "is-active": i === this.activeIndex })}
                    aria-selected=${i === this.activeIndex ? "true" : "false"}
                    @click=${() => this.selectSlide(i)}
                  >${s.caption || `${i + 1}`}</button>
                `)}
              </div>` : nothing}

          ${active ? keyed(this.activeIndex, html`
              <div
                class=${classMap({
      "sba-compare": !0,
      "sba-compare--vertical": dir === "vertical",
      "sba-compare--horizontal": dir === "horizontal",
      "fs-fade-swap": !0
    })}
                style=${styleMap({ "--sba-pos": `${this.position}%` })}
                @pointerdown=${this.onDown}
              >
                <img class="sba-compare__img sba-compare__before" src=${active.beforeImage} alt=${beforeLabel} loading="lazy" decoding="async" />
                <img class="sba-compare__img sba-compare__after" src=${active.afterImage} alt=${afterLabel} loading="lazy" decoding="async" />
                <span class="sba-label sba-label--before">${beforeLabel}</span>
                <span class="sba-label sba-label--after">${afterLabel}</span>
                <div
                  class="sba-handle"
                  @pointerdown=${this.onDown}
                  role="slider"
                  tabindex="0"
                  aria-orientation=${dir === "vertical" ? "horizontal" : "vertical"}
                  aria-label=${t("اسحب للمقارنة", "Drag to compare")}
                  aria-valuenow=${Math.round(this.position)}
                  aria-valuemin="5"
                  aria-valuemax="95"
                  @keydown=${(e) => {
      const step = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -4 : e.key === "ArrowRight" || e.key === "ArrowDown" ? 4 : 0;
      step && (e.preventDefault(), this.position = Math.max(5, Math.min(95, this.position + step)));
    }}
                >
                  <span class="sba-handle__rail" aria-hidden="true"></span>
                  <span class="sba-handle__grip" aria-hidden="true">
                    ${dir === "vertical" ? DRAG_ICON_H : DRAG_ICON_V}
                  </span>
                </div>
              </div>
              ${active.caption ? html`<p class="sba-caption">${active.caption}</p>` : nothing}
            `) : nothing}

          ${renderCommerceOutcome({ config: c, prefix: "sba_" })}
        </div>
      </section>
    `;
  }
};
__name(_ScentBeforeAfter, "ScentBeforeAfter"), _ScentBeforeAfter.styles = [sharedSectionCss, componentStyles];
let ScentBeforeAfter = _ScentBeforeAfter;
__decorateClass([
  property({ type: Object })
], ScentBeforeAfter.prototype, "config");
__decorateClass([
  state()
], ScentBeforeAfter.prototype, "activeIndex");
__decorateClass([
  state()
], ScentBeforeAfter.prototype, "position");
typeof ScentBeforeAfter < "u" && ScentBeforeAfter.registerSallaComponent("salla-scent-before-after");
export {
  ScentBeforeAfter as default
};
