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
import { parseStages, resolveLayout } from './utils.js';
import type { TimelineStage } from './types.js';

export default class ScentEvolutionTimeline extends LitElement {

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

  private get stages(): TimelineStage[] {
    return parseStages(this.config?.set_stages);
  }

  private ensureActive(): void {
    const list = this.stages;
    if (!list.some((s) => s.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): TimelineStage | null {
    return this.stages.find((s) => s.id === this.activeId) ?? this.stages[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderStep(stage: TimelineStage) {
    const active = stage.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ 'set-step': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({ '--step-color': stage.color })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="set-detail"
        @click=${() => this.select(stage.id)}
      >
        <span class="set-step__dot" aria-hidden="true"></span>
        <span>
          <p class="set-step__label">${stage.label || t('مرحلة', 'Stage')}</p>
          ${stage.timeLabel
            ? html`<p class="set-step__time">${stage.timeLabel}</p>`
            : nothing}
        </span>
      </button>
    `;
  }

  private renderDetail(stage: TimelineStage) {
    return html`
      <div class="set-detail fs-panel fs-fade-swap" id="set-detail" role="region" aria-live="polite">
        ${stage.image
          ? html`<div
              class="set-detail__bg"
              style=${styleMap({ backgroundImage: `url("${stage.image}")` })}
              aria-hidden="true"
            ></div>`
          : nothing}
        <div class="set-detail__body">
          <h3 class="fs-panel__title">${stage.label || t('مرحلة العطر', 'Scent stage')}</h3>
          ${stage.timeLabel
            ? html`<p class="set-detail__time">${stage.timeLabel}</p>`
            : nothing}
          ${stage.desc
            ? html`<p class="fs-panel__desc">${stage.desc}</p>`
            : html`<p class="fs-panel__desc">
                ${t('اختر مرحلة لعرض وصف تطور العطر.', 'Pick a stage to see how the scent evolves.')}
              </p>`}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'set_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.set_title as string);
    const desc = localizedString(c.set_desc as string);
    const stages = this.stages;
    const layout = resolveLayout(c);
    const active = this.active;

    if (!stages.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف مراحل تطور العطر من إعدادات العنصر.',
          'Add scent evolution stages in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('رحلة العطر عبر الوقت', 'Scent evolution timeline')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div
            class=${classMap({
              'set-shell': true,
              'set-shell--vertical': layout === 'vertical',
            })}
          >
            <div
              class=${classMap({
                'set-track': true,
                'set-track--vertical': layout === 'vertical',
              })}
              role="tablist"
              aria-label=${t('مراحل العطر', 'Scent stages')}
            >
              ${stages.map((stage) => this.renderStep(stage))}
            </div>
            ${active ? keyed(active.id, this.renderDetail(active)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'set_' })}
        </div>
      </section>
    `;
  }
}
