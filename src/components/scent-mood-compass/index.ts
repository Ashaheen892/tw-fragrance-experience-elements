import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
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
import { parseLabels, parsePoints } from './utils.js';
import type { CompassPoint } from './types.js';

export default class ScentMoodCompass extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.ensureActive();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.ensureActive();
  }

  private get points(): CompassPoint[] {
    return parsePoints(this.config?.smc_points);
  }

  private ensureActive(): void {
    const list = this.points;
    if (!list.some((p) => p.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): CompassPoint | null {
    return this.points.find((p) => p.id === this.activeId) ?? this.points[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderPoint(point: CompassPoint) {
    const active = point.id === this.activeId;
    const initial = (point.name || '•').slice(0, 1);
    return html`
      <button
        type="button"
        class=${classMap({ 'smc-point': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({
          '--point-color': point.color,
          left: `${point.x}%`,
          top: `${100 - point.y}%`,
        })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="smc-detail"
        aria-label=${point.name || t('نقطة', 'Point')}
        title=${point.name}
        @click=${() => this.select(point.id)}
      >
        ${initial}
      </button>
    `;
  }

  private renderPanel(point: CompassPoint) {
    return html`
      <div class="smc-panel fs-panel fs-fade-swap" id="smc-detail" role="region" aria-live="polite">
        <h3 class="fs-panel__title">${point.name || t('نقطة عطرية', 'Scent point')}</h3>
        ${point.desc
          ? html`<p class="fs-panel__desc">${point.desc}</p>`
          : html`<p class="fs-panel__desc">
              ${t('اضغط على نقطة في البوصلة لعرض التفاصيل.', 'Tap a point on the compass to see details.')}
            </p>`}
        <p class="smc-panel__coords">
          ${t('الموضع', 'Position')}: ${Math.round(point.x)}% × ${Math.round(point.y)}%
        </p>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'smc_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.smc_title as string);
    const desc = localizedString(c.smc_desc as string);
    const points = this.points;
    const labels = parseLabels(c);
    const active = this.active;

    if (!points.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف نقاط الطابع العطري من إعدادات العنصر.',
          'Add scent mood points in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('بوصلة الطابع العطري', 'Scent mood compass')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="smc-shell">
            <div class="smc-board" role="img" aria-label=${t('بوصلة الطابع', 'Mood compass')}>
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
          ${renderCommerceOutcome({ config: c, prefix: 'smc_' })}
        </div>
      </section>
    `;
  }
}
