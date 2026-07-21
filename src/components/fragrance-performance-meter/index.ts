import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { hasMetrics, parseMetrics, resolveMeterStyle, ringCircumference, ringDashOffset } from './utils.js';
import type { MeterStyle, PerformanceMetric } from './types.js';

const RING_RADIUS = 42;

export default class FragrancePerformanceMeter extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  private get metrics(): PerformanceMetric[] {
    return parseMetrics(this.config || {});
  }

  private renderBar(metric: PerformanceMetric) {
    const style: Record<string, string> = {
      ...(metric.color ? { '--metric-color': metric.color } : {}),
    };
    const animate = !prefersReducedMotion();

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

  private renderRing(metric: PerformanceMetric) {
    const style: Record<string, string> = metric.color ? { '--metric-color': metric.color } : {};
    const circumference = ringCircumference(RING_RADIUS);
    const dashOffset = ringDashOffset(metric.value, RING_RADIUS);

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

  private renderMetrics(metrics: PerformanceMetric[], style: MeterStyle) {
    if (style === 'rings') {
      return html`<div class="fpm-rings">${metrics.map((m) => this.renderRing(m))}</div>`;
    }
    return html`<div class="fpm-bars">${metrics.map((m) => this.renderBar(m))}</div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'fpm_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.fpm_title as string);
    const desc = localizedString(c.fpm_desc as string);
    const metrics = this.metrics;
    const meterStyle = resolveMeterStyle(c);
    const showData = hasMetrics(metrics);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مؤشر الأداء العطري', 'Fragrance performance meter')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${showData
            ? html`<div class="fpm-panel fs-panel">${this.renderMetrics(metrics, meterStyle)}</div>`
            : html`<div class="fs-empty" role="status">
                ${t('أضف مقاييس الأداء من إعدادات العنصر.', 'Add performance metrics in the element settings.')}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: 'fpm_' })}
        </div>
      </section>
    `;
  }
}
