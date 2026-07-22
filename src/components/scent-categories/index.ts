import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { destroyFsSwiper, fsSwiperCss, mountFsSwiper, type Swiper } from '../../utils/fsSwiper.js';
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
import { parseCategories, resolveLayout } from './utils.js';
import type { CategoryLayout, ScentCategory } from './types.js';

const GRID_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`;
const SLIDER_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="4" rx="1"/><rect x="1" y="9" width="14" height="4" rx="1"/></svg>`;

/**
 * Fragrance category cards — grid or horizontal slider.
 * Visual sibling: occasion-scent-guide / fragrance-wardrobe cards.
 */
export default class ScentCategories extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private layout: CategoryLayout = 'slider';

  private boundLangHandler = () => {
    this.requestUpdate();
    queueMicrotask(() => this.remountSwiper());
  };
  private swiper?: Swiper;

  static styles = [sharedSectionCss, fsSwiperCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.layout = resolveLayout(this.config || {});
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.layout = resolveLayout(this.config || {});
    }
    this.updateComplete.then(() => this.remountSwiper());
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = undefined;

    if (this.layout !== 'slider') return;

    const root = this.renderRoot.querySelector('.scat-swiper') as HTMLElement | null;
    if (!root || !this.categories.length) return;

    this.swiper = mountFsSwiper(root, {
      slidesPerView: 'auto',
      spaceBetween: 16,
    });
  }

  private setLayout(next: CategoryLayout): void {
    this.layout = next;
  }

  private get categories(): ScentCategory[] {
    return parseCategories(this.config?.scat_categories);
  }

  private renderCard(cat: ScentCategory) {
    const hasImage = Boolean(cat.image);
    const cardStyle = { '--cat-color': cat.color || 'var(--accent-color, var(--fs-store-primary))' };
    const external = cat.link ? isExternalUrl(cat.link) : false;

    const inner = html`
      <div class=${classMap({ 'scat-card__media': true, 'scat-card__media--empty': !hasImage })}>
        ${hasImage
          ? html`<img class="scat-card__img" src=${cat.image} alt="" loading="lazy" decoding="async" />`
          : html`<span class="scat-card__fallback">${cat.icon || (cat.name || '•').slice(0, 1)}</span>`}
        ${hasImage ? html`<div class="scat-card__overlay" aria-hidden="true"></div>` : nothing}
        ${cat.icon
          ? html`<span class="scat-card__icon" aria-hidden="true">${cat.icon}</span>`
          : nothing}
      </div>
      <div class="scat-card__body">
        <h3 class="scat-card__name">${cat.name || t('تصنيف', 'Category')}</h3>
        ${cat.description
          ? html`<p class="scat-card__desc">${cat.description}</p>`
          : nothing}
        ${cat.link
          ? html`<span class="scat-card__cta">${t('استكشف', 'Explore')}</span>`
          : nothing}
      </div>
    `;

    if (cat.link) {
      return html`
        <a
          class="scat-card"
          style=${styleMap(cardStyle)}
          href=${cat.link}
          target=${external ? '_blank' : nothing}
          rel=${external ? 'noopener noreferrer' : nothing}
        >
          ${inner}
        </a>
      `;
    }

    return html`<div class="scat-card" style=${styleMap(cardStyle)}>${inner}</div>`;
  }

  private renderShell(body: unknown) {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'scat_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.scat_title as string);
    const desc = localizedString(c.scat_desc as string);

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
          ${body}
        </div>
      </section>
    `;
  }

  render() {
    const c = this.config || {};
    const categories = this.categories;
    const isSlider = this.layout === 'slider';

    if (!categories.length) {
      return this.renderShell(html`
        <div class="fs-empty" role="status">
          ${t('أضف تصنيفات من إعدادات العنصر.', 'Add categories in the element settings.')}
        </div>
      `);
    }

    return this.renderShell(html`
      <div class="scat-shell">
        <div class="scat-toolbar">
          <p class="scat-toolbar__hint">
            ${t('تصفّح التصنيفات واختر ما يناسب ذوقك', 'Browse categories and pick what suits your taste')}
          </p>
          <div class="scat-toggle" role="radiogroup" aria-label=${t('طريقة العرض', 'Layout')}>
            <button
              type="button"
              class=${classMap({ 'scat-toggle__btn': true, 'fs-tap': true, 'is-active': isSlider })}
              aria-pressed=${isSlider ? 'true' : 'false'}
              aria-label=${t('عرض منزلق', 'Slider view')}
              @click=${() => this.setLayout('slider')}
            >
              ${SLIDER_SVG}
              <span class="scat-toggle__label">${t('شريط', 'Slider')}</span>
            </button>
            <button
              type="button"
              class=${classMap({ 'scat-toggle__btn': true, 'fs-tap': true, 'is-active': !isSlider })}
              aria-pressed=${!isSlider ? 'true' : 'false'}
              aria-label=${t('عرض شبكي', 'Grid view')}
              @click=${() => this.setLayout('grid')}
            >
              ${GRID_SVG}
              <span class="scat-toggle__label">${t('شبكة', 'Grid')}</span>
            </button>
          </div>
        </div>

        ${isSlider
          ? html`
            <div class="swiper scat-swiper">
              <div class="swiper-wrapper">
                ${categories.map(
                  (cat) => html`<div class="swiper-slide scat-track__item" role="listitem">${this.renderCard(cat)}</div>`
                )}
              </div>
            </div>`
          : html`
            <div class="scat-track scat-track--grid" role="list"
              aria-label=${t('تصنيفات العطور', 'Scent categories')}>
              ${categories.map(
                (cat) => html`<div class="scat-track__item" role="listitem">${this.renderCard(cat)}</div>`
              )}
            </div>`
        }
      </div>

      ${renderCommerceOutcome({ config: c, prefix: 'scat_' })}
    `);
  }
}
