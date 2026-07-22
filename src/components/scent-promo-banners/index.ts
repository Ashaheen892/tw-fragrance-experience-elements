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
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import {
  Autoplay,
  destroyFsSwiper,
  fsSwiperCss,
  mountFsSwiper,
  type Swiper,
} from '../../utils/fsSwiper.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { componentStyles } from './styles.js';
import { parseBanners } from './utils.js';
import type { PromoBanner } from './types.js';

const AUTOPLAY_MS = 5000;

export default class ScentPromoBanners extends LitElement {
  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private swiperReady = false;

  private boundLangHandler = () => {
    this.requestUpdate();
    queueMicrotask(() => this.remountSwiper());
  };
  private swiper: Swiper | null = null;
  private remountTimer: ReturnType<typeof setTimeout> | null = null;

  static styles = [sharedSectionCss, fsSwiperCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    if (this.remountTimer) clearTimeout(this.remountTimer);
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.remountSwiper();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.scheduleRemount();
  }

  private scheduleRemount(): void {
    if (this.remountTimer) clearTimeout(this.remountTimer);
    this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }

  private remountSwiper(): void {
    destroyFsSwiper(this.swiper);
    this.swiper = null;
    this.swiperReady = false;

    const banners = parseBanners(this.config?.spb_banners);
    const root = this.renderRoot.querySelector('.spb-swiper') as HTMLElement | null;
    if (!root || banners.length < 1) return;

    const multi = banners.length > 1;
    const interval = Math.max(3000, Number(this.config?.spb_interval) || AUTOPLAY_MS);
    const autoplayOn = multi && !prefersReducedMotion();
    const prevEl = root.querySelector('.spb-nav--prev') as HTMLElement | null;
    const nextEl = root.querySelector('.spb-nav--next') as HTMLElement | null;
    const pagEl = this.renderRoot.querySelector('.spb-dots') as HTMLElement | null;
    const rtl = getComputedStyle(this).direction !== 'ltr';

    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: true,
      navigation: multi
        ? {
            prevEl: prevEl || undefined,
            nextEl: nextEl || undefined,
          }
        : undefined,
      pagination: multi && pagEl
        ? {
            el: pagEl,
            clickable: true,
            bulletClass: 'spb-dot',
            bulletActiveClass: 'is-active',
          }
        : undefined,
      autoplay: autoplayOn
        ? {
            delay: interval,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
    });

    this.swiperReady = true;
  }

  private renderSlide(banner: PromoBanner, index: number) {
    const external = banner.ctaLink ? isExternalUrl(banner.ctaLink) : false;
    return html`
      <div class="spb-slide">
        ${banner.image
          ? html`<img
              class="spb-slide__bg"
              src=${banner.image}
              alt=""
              loading=${index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable="false"
            />`
          : nothing}
        <div
          class="spb-slide__overlay"
          style=${styleMap({ '--spb-overlay': `${banner.overlayOpacity / 100}` })}
        ></div>
        <div class="spb-slide__content">
          ${banner.heading
            ? html`<h3 class="spb-slide__heading">${banner.heading}</h3>`
            : nothing}
          ${banner.subheading
            ? html`<p class="spb-slide__sub">${banner.subheading}</p>`
            : nothing}
          ${banner.ctaLabel && banner.ctaLink
            ? html`<a
                class="fs-btn fs-tap"
                href=${banner.ctaLink}
                target=${external ? '_blank' : nothing}
                rel=${external ? 'noopener noreferrer' : nothing}
                draggable="false"
              >${banner.ctaLabel}</a>`
            : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'spb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.spb_title as string);
    const desc = localizedString(c.spb_desc as string);
    const banners = parseBanners(c.spb_banners);
    const multi = banners.length > 1;

    if (!banners.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف بانرات ترويجية من إعدادات العنصر.',
          'Add promo banners in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('بانرات ترويجية', 'Promotional banners')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="spb-carousel">
            <div
              class=${classMap({
                swiper: true,
                'spb-swiper': true,
                'is-ready': this.swiperReady,
              })}
              role="region"
              aria-roledescription="carousel"
              aria-label=${title || t('بانرات ترويجية', 'Promotional banners')}
            >
              <div class="swiper-wrapper">
                ${banners.map(
                  (banner, i) => html`
                    <div class="swiper-slide spb-slide-wrap">
                      ${this.renderSlide(banner, i)}
                    </div>
                  `
                )}
              </div>

              ${multi
                ? html`
                    <button
                      type="button"
                      class="spb-nav spb-nav--prev fs-icon-btn fs-icon-btn--on-media fs-tap"
                      aria-label=${t('السابق', 'Previous')}
                    >‹</button>
                    <button
                      type="button"
                      class="spb-nav spb-nav--next fs-icon-btn fs-icon-btn--on-media fs-tap"
                      aria-label=${t('التالي', 'Next')}
                    >›</button>
                  `
                : nothing}
            </div>

            ${multi
              ? html`<div
                  class="spb-dots"
                  aria-label=${t('شرائح العرض', 'Promo slides')}
                ></div>`
              : nothing}
          </div>

          ${renderCommerceOutcome({ config: c, prefix: 'spb_' })}
        </div>
      </section>
    `;
  }
}
