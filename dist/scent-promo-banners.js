var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, n as normalizeCollection, f as toNumber, e as extractLink, l as localizedString, a as extractImageUrl, s as sharedSectionCss, p as prefersReducedMotion, i as isExternalUrl, r as readSectionTheme, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
import { f as fsSwiperCss, d as destroyFsSwiper, m as mountFsSwiper, A as Autoplay } from "./fsSwiper-BQLtGSuN.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .spb-carousel {
    position: relative;
  }

  .spb-swiper {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
  }

  .spb-slide-wrap {
    height: auto;
  }

  .spb-slide {
    position: relative;
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
    pointer-events: none;
  }

  .spb-slide__overlay {
    position: absolute;
    inset: 0;
    background: color-mix(
      in srgb,
      var(--text-color, #1f1a14) calc(var(--spb-overlay, 0.45) * 100%),
      transparent
    );
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
    text-shadow: 0 2px 12px
      color-mix(in srgb, var(--text-color, #1f1a14) 35%, transparent);
  }

  .spb-slide__sub {
    margin: 0;
    font-size: clamp(0.88rem, 1.5vw, 1.05rem);
    line-height: 1.6;
    color: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    max-width: 32rem;
  }

  /* Navigation arrows */
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

  .spb-nav.swiper-button-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Pagination dots */
  .spb-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.75rem;
  }

  .spb-dot {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
    min-width: 0;
    min-height: 0;
    padding: 0;
    margin: 0 !important;
    border: 0;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--fs-store-primary)) 28%,
      transparent
    );
    cursor: pointer;
    opacity: 1;
    transition: width 0.2s ease, background 0.2s ease;
  }

  .spb-dot.is-active {
    width: 1rem;
    background: var(--accent-color, var(--fs-store-primary));
  }

  /* Rise animation */
  .fs-animate .spb-swiper {
    animation: spb-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes spb-rise {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }

    .spb-nav {
      display: none;
    }

    .spb-dots {
      margin-top: 0.6rem;
      gap: 0.28rem;
    }

    .spb-dot {
      width: 0.35rem;
      height: 0.35rem;
    }

    .spb-dot.is-active {
      width: 0.8rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-nav,
    .spb-dot {
      transition: none;
    }

    .fs-animate .spb-swiper {
      animation: none;
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
const AUTOPLAY_MS = 5e3, _ScentPromoBanners = class _ScentPromoBanners extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.swiperReady = !1, this.boundLangHandler = () => {
      this.requestUpdate(), queueMicrotask(() => this.remountSwiper());
    }, this.swiper = null, this.remountTimer = null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.remountTimer && clearTimeout(this.remountTimer), destroyFsSwiper(this.swiper), this.swiper = null, super.disconnectedCallback();
  }
  firstUpdated() {
    this.remountSwiper();
  }
  updated(changed) {
    changed.has("config") && this.scheduleRemount();
  }
  scheduleRemount() {
    this.remountTimer && clearTimeout(this.remountTimer), this.remountTimer = setTimeout(() => this.remountSwiper(), 0);
  }
  remountSwiper() {
    var _a, _b;
    destroyFsSwiper(this.swiper), this.swiper = null, this.swiperReady = !1;
    const banners = parseBanners((_a = this.config) == null ? void 0 : _a.spb_banners), root = this.renderRoot.querySelector(".spb-swiper");
    if (!root || banners.length < 1) return;
    const multi = banners.length > 1, interval = Math.max(3e3, Number((_b = this.config) == null ? void 0 : _b.spb_interval) || AUTOPLAY_MS), autoplayOn = multi && !prefersReducedMotion(), prevEl = root.querySelector(".spb-nav--prev"), nextEl = root.querySelector(".spb-nav--next"), pagEl = this.renderRoot.querySelector(".spb-dots"), rtl = getComputedStyle(this).direction !== "ltr";
    this.swiper = mountFsSwiper(root, {
      rtl,
      modules: autoplayOn ? [Autoplay] : [],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 480,
      loop: multi,
      watchOverflow: !0,
      navigation: multi ? {
        prevEl: prevEl || void 0,
        nextEl: nextEl || void 0
      } : void 0,
      pagination: multi && pagEl ? {
        el: pagEl,
        clickable: !0,
        bulletClass: "spb-dot",
        bulletActiveClass: "is-active"
      } : void 0,
      autoplay: autoplayOn ? {
        delay: interval,
        disableOnInteraction: !1,
        pauseOnMouseEnter: !0
      } : !1
    }), this.swiperReady = !0;
  }
  renderSlide(banner, index) {
    const external = banner.ctaLink ? isExternalUrl(banner.ctaLink) : !1;
    return html`
      <div class="spb-slide">
        ${banner.image ? html`<img
              class="spb-slide__bg"
              src=${banner.image}
              alt=""
              loading=${index === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable="false"
            />` : nothing}
        <div
          class="spb-slide__overlay"
          style=${styleMap({ "--spb-overlay": `${banner.overlayOpacity / 100}` })}
        ></div>
        <div class="spb-slide__content">
          ${banner.heading ? html`<h3 class="spb-slide__heading">${banner.heading}</h3>` : nothing}
          ${banner.subheading ? html`<p class="spb-slide__sub">${banner.subheading}</p>` : nothing}
          ${banner.ctaLabel && banner.ctaLink ? html`<a
                class="fs-btn fs-tap"
                href=${banner.ctaLink}
                target=${external ? "_blank" : nothing}
                rel=${external ? "noopener noreferrer" : nothing}
                draggable="false"
              >${banner.ctaLabel}</a>` : nothing}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "spb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.spb_title), desc = localizedString(c.spb_desc), banners = parseBanners(c.spb_banners), multi = banners.length > 1;
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

          <div class="spb-carousel">
            <div
              class=${classMap({
      swiper: !0,
      "spb-swiper": !0,
      "is-ready": this.swiperReady
    })}
              role="region"
              aria-roledescription="carousel"
              aria-label=${title || t("بانرات ترويجية", "Promotional banners")}
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

              ${multi ? html`
                    <button
                      type="button"
                      class="spb-nav spb-nav--prev fs-icon-btn fs-icon-btn--on-media fs-tap"
                      aria-label=${t("السابق", "Previous")}
                    >‹</button>
                    <button
                      type="button"
                      class="spb-nav spb-nav--next fs-icon-btn fs-icon-btn--on-media fs-tap"
                      aria-label=${t("التالي", "Next")}
                    >›</button>
                  ` : nothing}
            </div>

            ${multi ? html`<div
                  class="spb-dots"
                  aria-label=${t("شرائح العرض", "Promo slides")}
                ></div>` : nothing}
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
__name(_ScentPromoBanners, "ScentPromoBanners"), _ScentPromoBanners.styles = [sharedSectionCss, fsSwiperCss, componentStyles];
let ScentPromoBanners = _ScentPromoBanners;
__decorateClass([
  property({ type: Object })
], ScentPromoBanners.prototype, "config");
__decorateClass([
  state()
], ScentPromoBanners.prototype, "swiperReady");
typeof ScentPromoBanners < "u" && ScentPromoBanners.registerSallaComponent("salla-scent-promo-banners");
export {
  ScentPromoBanners as default
};
