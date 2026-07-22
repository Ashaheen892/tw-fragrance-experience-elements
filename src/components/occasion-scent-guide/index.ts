import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  isExternalUrl,
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseOccasions } from './utils.js';
import type { OccasionGuide } from './types.js';

export default class OccasionScentGuide extends LitElement {

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

  private get occasions(): OccasionGuide[] {
    return parseOccasions(this.config?.osg_occasions);
  }

  private ensureActive(): void {
    const list = this.occasions;
    if (!list.some((o) => o.id === this.activeId)) {
      this.activeId = list[0]?.id ?? '';
    }
  }

  private get active(): OccasionGuide | null {
    return this.occasions.find((o) => o.id === this.activeId) ?? this.occasions[0] ?? null;
  }

  private select(id: string): void {
    this.activeId = id;
  }

  private renderCard(occasion: OccasionGuide) {
    const active = occasion.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ 'osg-card': true, 'is-active': active, 'fs-tap': true })}
        style=${styleMap({ '--occ-color': occasion.color })}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="osg-detail"
        @click=${() => this.select(occasion.id)}
      >
        ${occasion.image
          ? html`<div class="osg-card__media">
              <img src=${occasion.image} alt="" loading="lazy" decoding="async" />
            </div>`
          : html`<div class="osg-card__media" aria-hidden="true"></div>`}
        <h3 class="osg-card__name">${occasion.name || t('مناسبة', 'Occasion')}</h3>
        ${occasion.desc ? html`<p class="osg-card__desc">${occasion.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderPanel(occasion: OccasionGuide) {
    const external = occasion.link ? isExternalUrl(occasion.link) : false;
    return html`
      <div
        class="osg-panel"
        id="osg-detail"
        role="region"
        aria-live="polite"
        style=${styleMap({ '--occ-color': occasion.color })}
      >
        <h3 class="osg-panel__title">${occasion.name || t('مناسبة', 'Occasion')}</h3>
        ${occasion.desc ? html`<p class="osg-panel__desc">${occasion.desc}</p>` : nothing}
        ${occasion.scentProfile
          ? html`<div class="osg-profile">
              <span class="osg-profile__label">${t('الملف العطري المقترح', 'Suggested scent profile')}</span>
              <p class="osg-profile__text">${occasion.scentProfile}</p>
            </div>`
          : nothing}
        ${occasion.link
          ? html`<a
              class="fs-btn fs-tap"
              href=${occasion.link}
              target=${external ? '_blank' : '_self'}
              rel=${external ? 'noopener noreferrer' : nothing}
            >
              ${t('استكشف التوصية', 'Explore recommendation')}
            </a>`
          : nothing}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'osg_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.osg_title as string);
    const desc = localizedString(c.osg_desc as string);
    const occasions = this.occasions;
    const active = this.active;

    if (!occasions.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف مناسبات من إعدادات العنصر.',
          'Add occasions in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('دليل اختيار العطر حسب المناسبة', 'Occasion scent guide')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="osg-shell">
            <div class="osg-cards" role="list">
              ${occasions.map((occasion) => this.renderCard(occasion))}
            </div>
            ${active ? this.renderPanel(active) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'osg_' })}
        </div>
      </section>
    `;
  }
}
