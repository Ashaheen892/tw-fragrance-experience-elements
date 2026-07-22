var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, a as extractImageUrl, l as localizedString, g as getRadioValue, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
function resolveLayout(config) {
  return getRadioValue(config.set_layout, "horizontal") === "vertical" ? "vertical" : "horizontal";
}
__name(resolveLayout, "resolveLayout");
function parseStages(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `stage-${index}`,
    label: localizedString(row.label),
    timeLabel: localizedString(row.time_label),
    desc: localizedString(row.desc),
    color: localizedString(row.color) || "#9a7b4f",
    image: extractImageUrl(row.image)
  })).filter((stage) => stage.label || stage.timeLabel || stage.desc);
}
__name(parseStages, "parseStages");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentEvolutionTimeline = class _ScentEvolutionTimeline extends LitElement {
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
  get stages() {
    var _a;
    return parseStages((_a = this.config) == null ? void 0 : _a.set_stages);
  }
  ensureActive() {
    var _a;
    const list = this.stages;
    list.some((s) => s.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.stages.find((s) => s.id === this.activeId) ?? this.stages[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  renderStep(stage) {
    const active = stage.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ "set-step": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({ "--step-color": stage.color })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="set-detail"
        @click=${() => this.select(stage.id)}
      >
        <span class="set-step__dot" aria-hidden="true"></span>
        <span>
          <p class="set-step__label">${stage.label || t("مرحلة", "Stage")}</p>
          ${stage.timeLabel ? html`<p class="set-step__time">${stage.timeLabel}</p>` : nothing}
        </span>
      </button>
    `;
  }
  renderDetail(stage) {
    return html`
      <div class="set-detail fs-panel fs-fade-swap" id="set-detail" role="region" aria-live="polite">
        ${stage.image ? html`<div
              class="set-detail__bg"
              style=${styleMap({ backgroundImage: `url("${stage.image}")` })}
              aria-hidden="true"
            ></div>` : nothing}
        <div class="set-detail__body">
          <h3 class="fs-panel__title">${stage.label || t("مرحلة العطر", "Scent stage")}</h3>
          ${stage.timeLabel ? html`<p class="set-detail__time">${stage.timeLabel}</p>` : nothing}
          ${stage.desc ? html`<p class="fs-panel__desc">${stage.desc}</p>` : html`<p class="fs-panel__desc">
                ${t("اختر مرحلة لعرض وصف تطور العطر.", "Pick a stage to see how the scent evolves.")}
              </p>`}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "set_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.set_title), desc = localizedString(c.set_desc), stages = this.stages, layout = resolveLayout(c), active = this.active;
    return stages.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("رحلة العطر عبر الوقت", "Scent evolution timeline")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div
            class=${classMap({
      "set-shell": !0,
      "set-shell--vertical": layout === "vertical"
    })}
          >
            <div
              class=${classMap({
      "set-track": !0,
      "set-track--vertical": layout === "vertical"
    })}
              role="tablist"
              aria-label=${t("مراحل العطر", "Scent stages")}
            >
              ${stages.map((stage) => this.renderStep(stage))}
            </div>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "set_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف مراحل تطور العطر من إعدادات العنصر.",
      "Add scent evolution stages in the element settings."
    )}
      </div>`;
  }
};
__name(_ScentEvolutionTimeline, "ScentEvolutionTimeline"), _ScentEvolutionTimeline.styles = [sharedSectionCss, componentStyles];
let ScentEvolutionTimeline = _ScentEvolutionTimeline;
__decorateClass([
  property({ type: Object })
], ScentEvolutionTimeline.prototype, "config");
__decorateClass([
  state()
], ScentEvolutionTimeline.prototype, "activeId");
typeof ScentEvolutionTimeline < "u" && ScentEvolutionTimeline.registerSallaComponent("salla-scent-evolution-timeline");
export {
  ScentEvolutionTimeline as default
};
