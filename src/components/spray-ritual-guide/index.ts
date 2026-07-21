import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isTruthy,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseRituals, parseZones } from './utils.js';
import type { SprayRitual, SprayZone } from './types.js';

export default class SprayRitualGuide extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeRitualId = '';
  @state() private activeZoneId = '';

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

  private get rituals(): SprayRitual[] {
    return parseRituals(this.config?.srg_rituals);
  }

  private get zones(): SprayZone[] {
    return parseZones(this.config?.srg_zones);
  }

  private ensureActive(): void {
    const rituals = this.rituals;
    if (!rituals.some((r) => r.id === this.activeRitualId)) {
      this.activeRitualId = rituals[0]?.id ?? '';
    }
    const zones = this.zones;
    if (this.activeZoneId && !zones.some((z) => z.id === this.activeZoneId)) {
      this.activeZoneId = '';
    }
  }

  private get activeRitual(): SprayRitual | null {
    return (
      this.rituals.find((r) => r.id === this.activeRitualId) ??
      this.rituals[0] ??
      null
    );
  }

  private get activeZone(): SprayZone | null {
    return this.zones.find((z) => z.id === this.activeZoneId) ?? null;
  }

  private selectRitual(id: string): void {
    this.activeRitualId = id;
  }

  private selectZone(id: string): void {
    this.activeZoneId = this.activeZoneId === id ? '' : id;
  }

  private renderZoneDot(zone: SprayZone, index: number) {
    const active = zone.id === this.activeZoneId;
    return html`
      <button
        type="button"
        class=${classMap({ 'srg-dot': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({ left: `${zone.x}%`, top: `${zone.y}%` })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-label=${zone.label || t('منطقة', 'Zone')}
        title=${zone.label}
        @click=${() => this.selectZone(zone.id)}
      >
        ${index + 1}
      </button>
    `;
  }

  private renderBody(showBody: boolean) {
    if (!showBody || !this.zones.length) return nothing;

    const activeZone = this.activeZone;
    return html`
      <div class="srg-body-wrap">
        <div class="srg-body" role="img" aria-label=${t('مناطق الرش على الجسم', 'Body spray zones')}>
          <div class="srg-body__silhouette" aria-hidden="true"></div>
          ${this.zones.map((zone, index) => this.renderZoneDot(zone, index))}
        </div>
        ${activeZone?.tip
          ? keyed(activeZone.id, html`<p class="srg-zone-tip fs-fade-swap">
              ${activeZone.label ? html`<span class="srg-zone-tip__label">${activeZone.label}</span> ` : nothing}${activeZone.tip}
            </p>`)
          : html`<p class="srg-zone-tip">
              ${t('اضغط على نقطة لعرض نصيحة المنطقة.', 'Tap a dot to see zone tips.')}
            </p>`}
      </div>
    `;
  }

  private renderRitualCard(ritual: SprayRitual) {
    const active = ritual.id === this.activeRitualId;
    return html`
      <button
        type="button"
        class=${classMap({ 'srg-card': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({ '--rit-color': ritual.color })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => this.selectRitual(ritual.id)}
      >
        <div class="srg-card__head">
          <h3 class="srg-card__name">${ritual.name || t('طقس الرش', 'Spray ritual')}</h3>
          <span class="srg-card__intensity">${ritual.intensityLabel}</span>
        </div>
        <div class="srg-card__meta">
          ${ritual.spraysCount
            ? html`<span><span class="srg-card__meta-label">${t('عدد الرشات', 'Sprays')}</span> ${ritual.spraysCount}</span>`
            : nothing}
          ${ritual.zones
            ? html`<span><span class="srg-card__meta-label">${t('المناطق', 'Zones')}</span> ${ritual.zones}</span>`
            : nothing}
          ${ritual.distance
            ? html`<span><span class="srg-card__meta-label">${t('المسافة', 'Distance')}</span> ${ritual.distance}</span>`
            : nothing}
        </div>
        ${active && ritual.tips
          ? keyed(`${ritual.id}-tips`, html`<p class="srg-card__tips fs-fade-swap">${ritual.tips}</p>`)
          : nothing}
      </button>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'srg_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.srg_title as string);
    const desc = localizedString(c.srg_desc as string);
    const rituals = this.rituals;
    const showBody = isTruthy(c.srg_show_body, false);

    if (!rituals.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف طقوس الرش من إعدادات العنصر.',
          'Add spray rituals in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('دليل قوة الاستخدام', 'Spray ritual guide')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="srg-shell">
            ${this.renderBody(showBody)}
            <div class="srg-cards" role="list">
              ${rituals.map((ritual) => this.renderRitualCard(ritual))}
            </div>
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'srg_' })}
        </div>
      </section>
    `;
  }
}
