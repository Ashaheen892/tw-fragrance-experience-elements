var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, d as clamp, f as toNumber, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
function parseLabels(config) {
  return {
    xLeft: localizedString(config.smc_x_left) || "Fresh",
    xRight: localizedString(config.smc_x_right) || "Warm",
    yTop: localizedString(config.smc_y_top) || "Soft",
    yBottom: localizedString(config.smc_y_bottom) || "Strong"
  };
}
__name(parseLabels, "parseLabels");
function parsePoints(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `point-${index}`,
    name: localizedString(row.name),
    desc: localizedString(row.desc),
    x: clamp(toNumber(row.x, 50), 0, 100),
    y: clamp(toNumber(row.y, 50), 0, 100),
    color: localizedString(row.color) || "#9a7b4f"
  })).filter((point) => point.name || point.desc);
}
__name(parsePoints, "parsePoints");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentMoodCompass = class _ScentMoodCompass extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureActive();
  }
  get points() {
    var _a;
    return parsePoints((_a = this.config) == null ? void 0 : _a.smc_points);
  }
  ensureActive() {
    var _a;
    const list = this.points;
    list.some((p) => p.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.points.find((p) => p.id === this.activeId) ?? this.points[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  renderPoint(point) {
    const active = point.id === this.activeId, initial = (point.name || "•").slice(0, 1);
    return html`
      <button
        type="button"
        class=${classMap({ "smc-point": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({
      "--point-color": point.color,
      left: `${point.x}%`,
      top: `${100 - point.y}%`
    })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="smc-detail"
        aria-label=${point.name || t("نقطة", "Point")}
        title=${point.name}
        @click=${() => this.select(point.id)}
      >
        ${initial}
      </button>
    `;
  }
  renderPanel(point) {
    return html`
      <div class="smc-panel fs-panel fs-fade-swap" id="smc-detail" role="region" aria-live="polite">
        <h3 class="fs-panel__title">${point.name || t("نقطة عطرية", "Scent point")}</h3>
        ${point.desc ? html`<p class="fs-panel__desc">${point.desc}</p>` : html`<p class="fs-panel__desc">
              ${t("اضغط على نقطة في البوصلة لعرض التفاصيل.", "Tap a point on the compass to see details.")}
            </p>`}
        <p class="smc-panel__coords">
          ${t("الموضع", "Position")}: ${Math.round(point.x)}% × ${Math.round(point.y)}%
        </p>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "smc_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.smc_title), desc = localizedString(c.smc_desc), points = this.points, labels = parseLabels(c), active = this.active;
    return points.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("بوصلة الطابع العطري", "Scent mood compass")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="smc-shell">
            <div class="smc-board" role="img" aria-label=${t("بوصلة الطابع", "Mood compass")}>
              <span class="smc-axis smc-axis--x" aria-hidden="true"></span>
              <span class="smc-axis smc-axis--y" aria-hidden="true"></span>
              <span class="smc-label smc-label--left">${labels.xLeft}</span>
              <span class="smc-label smc-label--right">${labels.xRight}</span>
              <span class="smc-label smc-label--top">${labels.yTop}</span>
              <span class="smc-label smc-label--bottom">${labels.yBottom}</span>
              ${points.map((point) => this.renderPoint(point))}
            </div>
            ${active ? keyed(active.id, this.renderPanel(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "smc_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف نقاط الطابع العطري من إعدادات العنصر.",
      "Add scent mood points in the element settings."
    )}
      </div>`;
  }
};
__name(_ScentMoodCompass, "ScentMoodCompass"), _ScentMoodCompass.styles = [sharedSectionCss, componentStyles];
let ScentMoodCompass = _ScentMoodCompass;
__decorateClass([
  property({ type: Object })
], ScentMoodCompass.prototype, "config");
__decorateClass([
  state()
], ScentMoodCompass.prototype, "activeId");
typeof ScentMoodCompass < "u" && ScentMoodCompass.registerSallaComponent("salla-scent-mood-compass");
export {
  ScentMoodCompass as default
};
