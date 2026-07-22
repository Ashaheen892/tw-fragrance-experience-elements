import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
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
import { parseBanners } from './utils.js';
import type { PromoBanner } from './types.js';

export default class ScentPromoBanners extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private activeIndex = 0;
  private autoTimer = 0;

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.startAuto();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    this.stopAuto();
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      const banners = this.banners;
      if (this.activeIndex >= banners.length) {
        this.activeIndex = 0;
      }
      this.startAuto();
    }
  }

  private get banners(): PromoBanner[] {
    return parseBanners(this.config?.spb_banners);
  }

  private startAuto(): void {
    this.stopAuto();
    if (this.banners.length <= 1 || prefersReducedMotion()) return;
    const interval = Math.max(3000, Number(this.config?.spb_interval) || 5000);
    this.autoTimer = window.setInterval(() => this.next(), interval);
  }

  private stopAuto(): void {
    if (this.autoTimer) {
      window.clearInterval(this.autoTimer);
      this.autoTimer = 0;
    }
  }

  private goTo(index: number): void {
    this.activeIndex = index;
    this.startAuto();
  }

  private prev(): void {
    const len = this.banners.length;
    this.goTo((this.activeIndex - 1 + len) % len);
  }

  private next(): void {
    this.goTo((this.activeIndex + 1) % this.banners.length);
  }

  private swipeStartX: number | null = null;

  private onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.swipeStartX = e.clientX;
    this.stopAuto();
  };

  private onPointerUp = (e: PointerEvent) => {
    const startX = this.swipeStartX;
    this.swipeStartX = null;
    this.startAuto();
    if (startX == null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 40) return;
    const rtl = getComputedStyle(this).direction === 'rtl';
    const forward = rtl ? dx > 0 : dx < 0;
    if (forward) this.next();
    else this.prev();
  };

  private onPointerCancel = () => {
    this.swipeStartX = null;
    this.startAuto();
  };

  private onDragStart = (e: Event) => e.preventDefault();

  private renderSlide(banner: PromoBanner, index: number) {
    const active = index === this.activeIndex;
    return html`
      <div
        class=${classMap({ 'spb-slide': true, 'is-active': active })}
        role="tabpanel"
        aria-hidden=${!active ? 'true' : 'false'}
      >
        ${banner.image
          ? html`<img class="spb-slide__bg" src=${banner.image} alt="" loading=${index === 0 ? 'eager' : 'lazy'} decoding="async" />`
          : nothing}
        <div class="spb-slide__overlay" style=${styleMap({ '--spb-overlay': `${banner.overlayOpacity / 100}` })}></div>
        ${active
          ? keyed(index, html`<div class="spb-slide__content fs-fade-swap">
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
                    target=${isExternalUrl(banner.ctaLink) ? '_blank' : nothing}
                    rel=${isExternalUrl(banner.ctaLink) ? 'noopener noreferrer' : nothing}
                  >${banner.ctaLabel}</a>`
                : nothing}
            </div>`)
          : html`<div class="spb-slide__content">
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
                    target=${isExternalUrl(banner.ctaLink) ? '_blank' : nothing}
                    rel=${isExternalUrl(banner.ctaLink) ? 'noopener noreferrer' : nothing}
                  >${banner.ctaLabel}</a>`
                : nothing}
            </div>`}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'spb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.spb_title as string);
    const desc = localizedString(c.spb_desc as string);
    const banners = this.banners;

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

          <div
            class="spb-carousel"
            role="region"
            aria-roledescription="carousel"
            @pointerdown=${this.onPointerDown}
            @pointerup=${this.onPointerUp}
            @pointercancel=${this.onPointerCancel}
            @dragstart=${this.onDragStart}
          >
            <div
              class="spb-track"
              style=${styleMap({ transform: `translateX(${-this.activeIndex * 100}%)` })}
            >
              ${banners.map((b, i) => this.renderSlide(b, i))}
            </div>

            ${banners.length > 1
              ? html`
                <button type="button" class="spb-nav spb-nav--prev fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${t('السابق', 'Previous')} @click=${() => this.prev()}>‹</button>
                <button type="button" class="spb-nav spb-nav--next fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${t('التالي', 'Next')} @click=${() => this.next()}>›</button>
              `
              : nothing}
          </div>

          ${renderCommerceOutcome({ config: c, prefix: 'spb_' })}
        </div>
      </section>
    `;
  }
}
