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
import { parsePersonalities } from './utils.js';
import type { ScentPersonality } from './types.js';

export default class ScentPersonalityFinder extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedId = '';

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

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.selectedId = '';
    }
  }

  private get personalities(): ScentPersonality[] {
    return parsePersonalities(this.config?.spf_personalities);
  }

  private resolveSelected(items: ScentPersonality[]): ScentPersonality | null {
    if (!items.length) return null;
    if (this.selectedId) {
      const found = items.find((p) => p.id === this.selectedId);
      if (found) return found;
    }
    return null;
  }

  private select(id: string): void {
    this.selectedId = this.selectedId === id ? '' : id;
  }

  private renderIcon(item: ScentPersonality) {
    const isSicon = item.icon.startsWith('sicon-');
    if (item.image) {
      return html`<img src=${item.image} alt="" loading="lazy" decoding="async" />`;
    }
    if (item.icon) {
      return isSicon ? html`<span class=${item.icon}></span>` : html`<span>${item.icon}</span>`;
    }
    return html`<span aria-hidden="true">◆</span>`;
  }

  private renderCard(item: ScentPersonality) {
    const active = this.selectedId === item.id;
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};

    return html`
      <button
        type="button"
        class=${classMap({ 'spf-card': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(style)}
        aria-pressed=${active ? 'true' : 'false'}
        aria-controls="spf-result"
        @click=${() => this.select(item.id)}
      >
        <span class="spf-card__icon">${this.renderIcon(item)}</span>
        <span class="spf-card__name">${item.name}</span>
        ${item.desc ? html`<p class="spf-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderResult(item: ScentPersonality) {
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};
    const external = item.link ? isExternalUrl(item.link) : false;

    return html`
      <article
        id="spf-result"
        class="spf-result"
        style=${styleMap(style)}
        role="region"
        aria-live="polite"
      >
        <p class="spf-result__eyebrow">${t('عائلتك العطرية', 'Your fragrance family')}</p>
        <h3 class="spf-result__title">${item.resultFamily || item.name}</h3>
        ${item.resultDesc
          ? html`<p class="spf-result__desc">${item.resultDesc}</p>`
          : item.desc
            ? html`<p class="spf-result__desc">${item.desc}</p>`
            : nothing}
        ${item.link
          ? html`<div class="spf-result__actions">
              <a
                class="fs-btn fs-tap"
                href=${item.link}
                target=${external ? '_blank' : '_self'}
                rel=${external ? 'noopener noreferrer' : nothing}
              >
                ${t('استكشف العائلة', 'Explore this family')}
              </a>
            </div>`
          : nothing}
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'spf_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.spf_title as string);
    const desc = localizedString(c.spf_desc as string);
    const personalities = this.personalities;
    const selected = this.resolveSelected(personalities);

    if (!personalities.length) {
      return html`
        <section
          class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t('مستكشف الشخصية العطرية', 'Scent personality finder')}
        >
          <div class="fs-container">
            ${title || desc
              ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>`
              : nothing}
            <div class="fs-empty" role="status">
              ${t('أضف شخصيات عطرية من إعدادات العنصر.', 'Add scent personalities in the element settings.')}
            </div>
          </div>
        </section>
      `;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مستكشف الشخصية العطرية', 'Scent personality finder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="spf-shell">
            <p class="spf-selector__label">${t('اختر شخصيتك', 'Choose your personality')}</p>
            <div class="spf-grid" role="group" aria-label=${t('الشخصيات العطرية', 'Scent personalities')}>
              ${personalities.map((item) => this.renderCard(item))}
            </div>
            ${selected ? this.renderResult(selected) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'spf_', ready: Boolean(selected), selection: selected })}
        </div>
      </section>
    `;
  }
}
