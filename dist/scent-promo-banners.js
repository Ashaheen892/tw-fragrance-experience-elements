var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, f as toNumber, e as extractLink, l as localizedString, a as extractImageUrl, s as sharedSectionCss, p as prefersReducedMotion, i as isExternalUrl, r as readSectionTheme, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .spb-carousel {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
    touch-action: pan-y;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .spb-carousel:active {
    cursor: grabbing;
  }

  .spb-track {
    display: flex;
    transition: transform 0.28s ease;
  }

  .spb-slide {
    position: relative;
    flex: 0 0 100%;
    min-height: 320px;
    max-height: 520px;
    aspect-ratio: 21 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .spb-slide__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.28s ease;
  }

  .spb-slide.is-active .spb-slide__bg {
    transform: scale(1.03);
  }

  .spb-slide__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--text-color, #1f1a14) calc(var(--spb-overlay, 0.45) * 100%), transparent);
    pointer-events: none;
  }

  .spb-slide__content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem 1.5rem;
    max-width: 38rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
  }

  .spb-slide__heading {
    margin: 0;
    font-size: clamp(1.5rem, 3.5vw, 2.4rem);
    font-weight: 800;
    letter-spacing: 0.03em;
    line-height: 1.25;
    color: var(--card-bg, #fff);
    text-shadow: 0 2px 12px color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .spb-slide__sub {
    margin: 0;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.6;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    max-width: 32rem;
  }

  .spb-nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
  }

  .spb-nav--prev {
    inset-inline-start: 0.75rem;
  }

  .spb-nav--next {
    inset-inline-end: 0.75rem;
  }

  .spb-nav.fs-icon-btn--on-media:hover {
    transform: translateY(calc(-50% - 1px));
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-track,
    .spb-slide__bg,
    .spb-nav {
      transition: none;
    }

    .spb-slide.is-active .spb-slide__bg,
    .spb-nav.fs-icon-btn--on-media:hover {
      transform: translateY(-50%);
    }
  }
`, DEFAULTS = [
  {
    id: "launch",
    heading: t("إصدار محدود", "Limited edition"),
    subheading: t("عطور الموسم بتركيبة فاخرة", "Seasonal scents in a luxurious blend"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: t("اكتشف المجموعة", "Explore collection"),
    ctaLink: "",
    overlayOpacity: 45
  },
  {
    id: "gift",
    heading: t("هدايا عطرية", "Scented gifts"),
    subheading: t("اختيارات أنيقة لكل مناسبة", "Elegant picks for every occasion"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: t("تسوّق الهدايا", "Shop gifts"),
    ctaLink: "",
    overlayOpacity: 45
  }
];
function parseBanners(raw) {
  const parsed = normalizeCollection(raw).map((row, index) => ({
    id: `banner-${index}`,
    heading: localizedString(row.heading) || localizedString(row.title),
    subheading: localizedString(row.subheading),
    image: extractImageUrl(row.image),
    ctaLabel: localizedString(row.cta_label),
    ctaLink: extractLink(row.cta_link ?? row.link),
    overlayOpacity: Math.max(0, Math.min(100, toNumber(row.overlay_opacity, 45)))
  })).filter((item) => item.image || item.heading);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      heading: item.heading || d.heading,
      subheading: item.subheading || d.subheading,
      ctaLabel: item.ctaLabel || d.ctaLabel
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseBanners, "parseBanners");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentPromoBanners = class _ScentPromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.autoTimer = 0, this.boundLangHandler = () => this.requestUpdate(), this.swipeStartX = null, this.onPointerDown = (e) => {
      e.pointerType === "mouse" && e.button !== 0 || (this.swipeStartX = e.clientX, this.stopAuto());
    }, this.onPointerUp = (e) => {
      const startX = this.swipeStartX;
      if (this.swipeStartX = null, this.startAuto(), startX == null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) < 40) return;
      (getComputedStyle(this).direction === "rtl" ? dx > 0 : dx < 0) ? this.next() : this.prev();
    }, this.onPointerCancel = () => {
      this.swipeStartX = null, this.startAuto();
    }, this.onDragStart = (e) => e.preventDefault();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.startAuto();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.stopAuto(), super.disconnectedCallback();
  }
  updated(changed) {
    if (changed.has("config")) {
      const banners = this.banners;
      this.activeIndex >= banners.length && (this.activeIndex = 0), this.startAuto();
    }
  }
  get banners() {
    var _a;
    return parseBanners((_a = this.config) == null ? void 0 : _a.spb_banners);
  }
  startAuto() {
    var _a;
    if (this.stopAuto(), this.banners.length <= 1 || prefersReducedMotion()) return;
    const interval = Math.max(3e3, Number((_a = this.config) == null ? void 0 : _a.spb_interval) || 5e3);
    this.autoTimer = window.setInterval(() => this.next(), interval);
  }
  stopAuto() {
    this.autoTimer && (window.clearInterval(this.autoTimer), this.autoTimer = 0);
  }
  goTo(index) {
    this.activeIndex = index, this.startAuto();
  }
  prev() {
    const len = this.banners.length;
    this.goTo((this.activeIndex - 1 + len) % len);
  }
  next() {
    this.goTo((this.activeIndex + 1) % this.banners.length);
  }
  renderSlide(banner, index) {
    const active = index === this.activeIndex;
    return html`
      <div
        class=${classMap({ "spb-slide": !0, "is-active": active })}
        role="tabpanel"
        aria-hidden=${active ? "false" : "true"}
      >
        ${banner.image ? html`<img class="spb-slide__bg" src=${banner.image} alt="" loading=${index === 0 ? "eager" : "lazy"} decoding="async" />` : nothing}
        <div class="spb-slide__overlay" style=${styleMap({ "--spb-overlay": `${banner.overlayOpacity / 100}` })}></div>
        ${active ? keyed(index, html`<div class="spb-slide__content fs-fade-swap">
              ${banner.heading ? html`<h3 class="spb-slide__heading">${banner.heading}</h3>` : nothing}
              ${banner.subheading ? html`<p class="spb-slide__sub">${banner.subheading}</p>` : nothing}
              ${banner.ctaLabel && banner.ctaLink ? html`<a
                    class="fs-btn fs-tap"
                    href=${banner.ctaLink}
                    target=${isExternalUrl(banner.ctaLink) ? "_blank" : nothing}
                    rel=${isExternalUrl(banner.ctaLink) ? "noopener noreferrer" : nothing}
                  >${banner.ctaLabel}</a>` : nothing}
            </div>`) : html`<div class="spb-slide__content">
              ${banner.heading ? html`<h3 class="spb-slide__heading">${banner.heading}</h3>` : nothing}
              ${banner.subheading ? html`<p class="spb-slide__sub">${banner.subheading}</p>` : nothing}
              ${banner.ctaLabel && banner.ctaLink ? html`<a
                    class="fs-btn fs-tap"
                    href=${banner.ctaLink}
                    target=${isExternalUrl(banner.ctaLink) ? "_blank" : nothing}
                    rel=${isExternalUrl(banner.ctaLink) ? "noopener noreferrer" : nothing}
                  >${banner.ctaLabel}</a>` : nothing}
            </div>`}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "spb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.spb_title), desc = localizedString(c.spb_desc), banners = this.banners;
    return banners.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("بانرات ترويجية", "Promotional banners")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

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

            ${banners.length > 1 ? html`
                <button type="button" class="spb-nav spb-nav--prev fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${t("السابق", "Previous")} @click=${() => this.prev()}>‹</button>
                <button type="button" class="spb-nav spb-nav--next fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${t("التالي", "Next")} @click=${() => this.next()}>›</button>
              ` : nothing}
          </div>

          ${renderCommerceOutcome({ config: c, prefix: "spb_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف بانرات ترويجية من إعدادات العنصر.",
      "Add promo banners in the element settings."
    )}
      </div>`;
  }
};
__name(_ScentPromoBanners, "ScentPromoBanners"), _ScentPromoBanners.styles = [sharedSectionCss, componentStyles];
let ScentPromoBanners = _ScentPromoBanners;
__decorateClass([
  property({ type: Object })
], ScentPromoBanners.prototype, "config");
__decorateClass([
  state()
], ScentPromoBanners.prototype, "activeIndex");
typeof ScentPromoBanners < "u" && ScentPromoBanners.registerSallaComponent("salla-scent-promo-banners");
export {
  ScentPromoBanners as default
};
