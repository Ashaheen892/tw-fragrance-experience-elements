var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, g as getRadioValue, d as clamp, f as toNumber, s as sharedSectionCss, p as prefersReducedMotion, r as readSectionTheme, b as themeStyleMap, t, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
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
`, FIXED_METRIC_KEYS = [
  "longevity",
  "sillage",
  "projection",
  "sweetness",
  "freshness",
  "warmth"
], STYLES = ["bars", "rings"], DEFAULT_LABELS = {
  longevity: { ar: "الثبات", en: "Longevity" },
  sillage: { ar: "الأريج المحيط", en: "Sillage" },
  projection: { ar: "الانتشار", en: "Projection" },
  sweetness: { ar: "الحلاوة", en: "Sweetness" },
  freshness: { ar: "الانتعاش", en: "Freshness" },
  warmth: { ar: "الدفء", en: "Warmth" }
};
function resolveMeterStyle(config) {
  const value = getRadioValue(config.fpm_style, "bars");
  return STYLES.includes(value) ? value : "bars";
}
__name(resolveMeterStyle, "resolveMeterStyle");
function metricValue(raw) {
  return clamp(toNumber(raw, 0), 0, 100);
}
__name(metricValue, "metricValue");
function parseMetrics(config) {
  const collection = normalizeCollection(config.fpm_metrics);
  return collection.length ? collection.map((item, i) => {
    const label = localizedString(item.label), value = metricValue(item.value);
    return {
      id: String(item.id ?? item.metric_id ?? "").trim() || `metric-${i + 1}`,
      label,
      value,
      color: String(item.color ?? "").trim()
    };
  }).filter((m) => m.label || m.value > 0) : FIXED_METRIC_KEYS.flatMap((key) => {
    const fieldValue = config[`fpm_${key}`], value = metricValue(fieldValue), labelRaw = config[`fpm_${key}_label`], customLabel = localizedString(labelRaw);
    return value <= 0 && !customLabel && fieldValue == null ? [] : [
      {
        id: key,
        label: customLabel || DEFAULT_LABELS[key].ar,
        value,
        color: String(config[`fpm_${key}_color`] ?? "").trim()
      }
    ];
  });
}
__name(parseMetrics, "parseMetrics");
function hasMetrics(metrics) {
  return metrics.length > 0;
}
__name(hasMetrics, "hasMetrics");
function ringDashOffset(value, radius = 42) {
  const circumference = 2 * Math.PI * radius, filled = value / 100 * circumference;
  return String(circumference - filled);
}
__name(ringDashOffset, "ringDashOffset");
function ringCircumference(radius = 42) {
  return 2 * Math.PI * radius;
}
__name(ringCircumference, "ringCircumference");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const RING_RADIUS = 42, _FragrancePerformanceMeter = class _FragrancePerformanceMeter extends LitElement {
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
    return parseMetrics(this.config || {});
  }
  renderBar(metric) {
    const style = {
      ...metric.color ? { "--metric-color": metric.color } : {}
    }, animate = !prefersReducedMotion();
    return html`
      <div class="fpm-bar" style=${styleMap(style)}>
        <div class="fpm-bar__head">
          <span class="fpm-bar__label">${metric.label}</span>
          <span class="fpm-bar__value">${metric.value}%</span>
        </div>
        <div class="fpm-bar__track" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${metric.value} aria-label=${metric.label}>
          <span
            class="fpm-bar__fill"
            style=${styleMap({ width: animate ? `${metric.value}%` : `${metric.value}%` })}
          ></span>
        </div>
      </div>
    `;
  }
  renderRing(metric) {
    const style = metric.color ? { "--metric-color": metric.color } : {}, circumference = ringCircumference(RING_RADIUS), dashOffset = ringDashOffset(metric.value, RING_RADIUS);
    return html`
      <div class="fpm-ring" style=${styleMap(style)}>
        <svg class="fpm-ring__svg" viewBox="0 0 100 100" role="img" aria-label=${`${metric.label}: ${metric.value}%`}>
          <circle class="fpm-ring__track" cx="50" cy="50" r=${RING_RADIUS} />
          <circle
            class="fpm-ring__arc"
            cx="50"
            cy="50"
            r=${RING_RADIUS}
            stroke-dasharray=${String(circumference)}
            stroke-dashoffset=${dashOffset}
          />
          <text class="fpm-ring__value" x="50" y="50" text-anchor="middle" dominant-baseline="central">
            ${metric.value}%
          </text>
        </svg>
        <p class="fpm-ring__label">${metric.label}</p>
      </div>
    `;
  }
  renderMetrics(metrics, style) {
    return style === "rings" ? html`<div class="fpm-rings">${metrics.map((m) => this.renderRing(m))}</div>` : html`<div class="fpm-bars">${metrics.map((m) => this.renderBar(m))}</div>`;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "fpm_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.fpm_title), desc = localizedString(c.fpm_desc), metrics = this.metrics, meterStyle = resolveMeterStyle(c), showData = hasMetrics(metrics);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مؤشر الأداء العطري", "Fragrance performance meter")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${showData ? html`<div class="fpm-panel fs-panel">${this.renderMetrics(metrics, meterStyle)}</div>` : html`<div class="fs-empty" role="status">
                ${t("أضف مقاييس الأداء من إعدادات العنصر.", "Add performance metrics in the element settings.")}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: "fpm_" })}
        </div>
      </section>
    `;
  }
};
__name(_FragrancePerformanceMeter, "FragrancePerformanceMeter"), _FragrancePerformanceMeter.styles = [sharedSectionCss, componentStyles];
let FragrancePerformanceMeter = _FragrancePerformanceMeter;
__decorateClass([
  property({ type: Object })
], FragrancePerformanceMeter.prototype, "config");
typeof FragrancePerformanceMeter < "u" && FragrancePerformanceMeter.registerSallaComponent("salla-fragrance-performance-meter");
export {
  FragrancePerformanceMeter as default
};
