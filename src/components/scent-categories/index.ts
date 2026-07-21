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
import { parseCategories, resolveLayout } from './utils.js';
import type { CategoryLayout, ScentCategory } from './types.js';

const GRID_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`;
const SLIDER_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16"><rect x="1" y="3" width="14" height="4" rx="1"/><rect x="1" y="9" width="14" height="4" rx="1"/></svg>`;

export default class ScentCategories extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  private layout: CategoryLayout = 'slider';

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.layout = resolveLayout(this.config || {});
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.layout = resolveLayout(this.config || {});
    }
  }

  private setLayout(layout: CategoryLayout): void {
    this.layout = layout;
    this.requestUpdate();
  }

  private get categories(): ScentCategory[] {
    return parseCategories(this.config?.scat_categories);
  }

  private renderCard(cat: ScentCategory) {
    const hasImage = Boolean(cat.image);
    const tag = cat.link ? 'a' : 'div';
    const attrs = cat.link
      ? { href: cat.link, target: '_blank', rel: 'noopener noreferrer' }
      : {};

    const inner = html`
      <div class=${classMap({ 'scat-card__media': true, 'scat-card__media--empty': !hasImage })}>
        ${hasImage
          ? html`<img class="scat-card__img" src=${cat.image} alt=${cat.name} loading="lazy" decoding="async" />`
          : html`<span>${cat.icon || (cat.name || '•').slice(0, 1)}</span>`}
        ${hasImage ? html`<div class="scat-card__overlay"></div>` : nothing}
        ${cat.icon && hasImage
          ? html`<span class="scat-card__icon">${cat.icon}</span>`
          : nothing}
      </div>
      <div class="scat-card__body">
        <h3 class="scat-card__name">${cat.name || t('تصنيف', 'Category')}</h3>
        ${cat.description
          ? html`<p class="scat-card__desc">${cat.description}</p>`
          : nothing}
      </div>
    `;

    if (tag === 'a') {
      return html`<a class="scat-card" href=${attrs.href!} target=${attrs.target!} rel=${attrs.rel!}>${inner}</a>`;
    }
    return html`<div class="scat-card">${inner}</div>`;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'scat_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.scat_title as string);
    const desc = localizedString(c.scat_desc as string);
    const categories = this.categories;

    if (!categories.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف تصنيفات من إعدادات العنصر.',
          'Add categories in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('تصنيفات العطور', 'Scent categories')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="scat-toggle" role="radiogroup" aria-label=${t('طريقة العرض', 'Layout')}>
            <button
              type="button"
              class=${classMap({ 'scat-toggle__btn': true, 'fs-tap': true, 'is-active': this.layout === 'slider' })}
              aria-pressed=${this.layout === 'slider' ? 'true' : 'false'}
              aria-label=${t('عرض منزلق', 'Slider view')}
              @click=${() => this.setLayout('slider')}
            >${SLIDER_SVG}</button>
            <button
              type="button"
              class=${classMap({ 'scat-toggle__btn': true, 'fs-tap': true, 'is-active': this.layout === 'grid' })}
              aria-pressed=${this.layout === 'grid' ? 'true' : 'false'}
              aria-label=${t('عرض شبكي', 'Grid view')}
              @click=${() => this.setLayout('grid')}
            >${GRID_SVG}</button>
          </div>

          <div class=${this.layout === 'slider' ? 'scat-slider' : 'scat-grid'} role="list">
            ${categories.map((cat) => html`<div role="listitem">${this.renderCard(cat)}</div>`)}
          </div>

          ${renderCommerceOutcome({ config: c, prefix: 'scat_' })}
        </div>
      </section>
    `;
  }
}
