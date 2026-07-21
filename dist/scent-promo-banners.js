import { css as y, LitElement as _, nothing as i, html as a } from "lit";
import { property as k, state as L } from "lit/decorators.js";
import { classMap as g } from "lit/directives/class-map.js";
import { keyed as w } from "lit/directives/keyed.js";
import { styleMap as m } from "lit/directives/style-map.js";
import { t as n, n as I, f as T, e as z, l as d, a as S, s as A, p as x, i as h, r as C, b as j, c as E } from "./commerceOutcome-CkVkQjOd.js";
const M = y`
  :host {
    direction: inherit;
  }

  .spb-carousel {
    position: relative;
    overflow: hidden;
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    box-shadow: 0 14px 34px rgba(90, 70, 40, 0.1);
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

  .spb-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 46px;
    padding: 0.65rem 1.8rem;
    border: 1.5px solid var(--accent-color, var(--fs-store-primary));
    border-radius: 999px;
    background: transparent;
    color: var(--card-bg, #fff);
    font: inherit;
    font-size: 0.84rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-decoration: none;
    cursor: pointer;
    transition:
      background 0.24s ease,
      color 0.24s ease,
      transform 0.24s ease,
      box-shadow 0.24s ease;
  }

  .spb-cta:hover {
    background: var(--accent-color, var(--fs-store-primary));
    color: var(--button-color, #fff);
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.14);
  }

  .spb-dots {
    display: flex;
    justify-content: center;
    gap: 0.65rem;
    margin-top: 1rem;
  }

  .spb-dot {
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  .spb-dot::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 999px;
    border: 1.5px solid var(--accent-color, var(--fs-store-primary));
    background: transparent;
    transition: background 0.24s ease, transform 0.24s ease;
  }

  .spb-dot.is-active::after {
    background: var(--accent-color, var(--fs-store-primary));
    transform: scale(1.25);
  }

  .spb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    min-width: 44px;
    min-height: 44px;
    border: 1.5px solid color-mix(in srgb, var(--card-bg, #fff) 35%, transparent);
    border-radius: 50%;
    background: color-mix(in srgb, var(--text-color, #1f1a14) 40%, transparent);
    backdrop-filter: blur(4px);
    color: var(--card-bg, #fff);
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      background 0.24s ease,
      border-color 0.24s ease,
      transform 0.24s ease;
    padding: 0;
  }

  .spb-nav:hover {
    background: color-mix(in srgb, var(--text-color, #1f1a14) 65%, transparent);
    border-color: var(--accent-color, var(--fs-store-primary));
    transform: translateY(calc(-50% - 2px));
  }

  .spb-nav--prev {
    inset-inline-start: 0.75rem;
  }

  .spb-nav--next {
    inset-inline-end: 0.75rem;
  }

  @media (max-width: 639px) {
    .spb-slide {
      min-height: 240px;
      aspect-ratio: 16 / 9;
    }

    .spb-nav {
      width: 2.75rem;
      height: 2.75rem;
      font-size: 0.9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spb-track,
    .spb-slide__bg,
    .spb-cta,
    .spb-nav,
    .spb-dot::after {
      transition: none;
    }

    .spb-slide.is-active .spb-slide__bg,
    .spb-cta:hover,
    .spb-nav:hover {
      transform: none;
    }
  }
`, f = [
  {
    id: "launch",
    heading: n("إصدار محدود", "Limited edition"),
    subheading: n("عطور الموسم بتركيبة فاخرة", "Seasonal scents in a luxurious blend"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: n("اكتشف المجموعة", "Explore collection"),
    ctaLink: "",
    overlayOpacity: 45
  },
  {
    id: "gift",
    heading: n("هدايا عطرية", "Scented gifts"),
    subheading: n("اختيارات أنيقة لكل مناسبة", "Elegant picks for every occasion"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: n("تسوّق الهدايا", "Shop gifts"),
    ctaLink: "",
    overlayOpacity: 45
  }
];
function O(b) {
  const e = I(b).map((t, r) => ({
    id: `banner-${r}`,
    heading: d(t.heading) || d(t.title),
    subheading: d(t.subheading),
    image: S(t.image),
    ctaLabel: d(t.cta_label),
    ctaLink: z(t.cta_link ?? t.link),
    overlayOpacity: Math.max(0, Math.min(100, T(t.overlay_opacity, 45)))
  })).filter((t) => t.image || t.heading);
  return e.length ? e.map((t, r) => {
    const s = f[r % f.length];
    return {
      ...t,
      image: t.image || s.image,
      heading: t.heading || s.heading,
      subheading: t.subheading || s.subheading,
      ctaLabel: t.ctaLabel || s.ctaLabel
    };
  }) : f.map((t) => ({ ...t }));
}
var U = Object.defineProperty, $ = (b, e, t, r) => {
  for (var s = void 0, c = b.length - 1, o; c >= 0; c--)
    (o = b[c]) && (s = o(e, t, s) || s);
  return s && U(e, t, s), s;
};
const u = class u extends _ {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.autoTimer = 0, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.startAuto();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.stopAuto(), super.disconnectedCallback();
  }
  updated(e) {
    if (e.has("config")) {
      const t = this.banners;
      this.activeIndex >= t.length && (this.activeIndex = 0), this.startAuto();
    }
  }
  get banners() {
    var e;
    return O((e = this.config) == null ? void 0 : e.spb_banners);
  }
  startAuto() {
    var t;
    if (this.stopAuto(), this.banners.length <= 1 || x()) return;
    const e = Math.max(3e3, Number((t = this.config) == null ? void 0 : t.spb_interval) || 5e3);
    this.autoTimer = window.setInterval(() => this.next(), e);
  }
  stopAuto() {
    this.autoTimer && (window.clearInterval(this.autoTimer), this.autoTimer = 0);
  }
  goTo(e) {
    this.activeIndex = e, this.startAuto();
  }
  prev() {
    const e = this.banners.length;
    this.goTo((this.activeIndex - 1 + e) % e);
  }
  next() {
    this.goTo((this.activeIndex + 1) % this.banners.length);
  }
  renderSlide(e, t) {
    const r = t === this.activeIndex;
    return a`
      <div
        class=${g({ "spb-slide": !0, "is-active": r })}
        role="tabpanel"
        aria-hidden=${r ? "false" : "true"}
      >
        ${e.image ? a`<img class="spb-slide__bg" src=${e.image} alt="" loading=${t === 0 ? "eager" : "lazy"} decoding="async" />` : i}
        <div class="spb-slide__overlay" style=${m({ "--spb-overlay": `${e.overlayOpacity / 100}` })}></div>
        ${r ? w(t, a`<div class="spb-slide__content fs-fade-swap">
              ${e.heading ? a`<h3 class="spb-slide__heading">${e.heading}</h3>` : i}
              ${e.subheading ? a`<p class="spb-slide__sub">${e.subheading}</p>` : i}
              ${e.ctaLabel && e.ctaLink ? a`<a
                    class="spb-cta fs-tap"
                    href=${e.ctaLink}
                    target=${h(e.ctaLink) ? "_blank" : i}
                    rel=${h(e.ctaLink) ? "noopener noreferrer" : i}
                  >${e.ctaLabel}</a>` : i}
            </div>`) : a`<div class="spb-slide__content">
              ${e.heading ? a`<h3 class="spb-slide__heading">${e.heading}</h3>` : i}
              ${e.subheading ? a`<p class="spb-slide__sub">${e.subheading}</p>` : i}
              ${e.ctaLabel && e.ctaLink ? a`<a
                    class="spb-cta fs-tap"
                    href=${e.ctaLink}
                    target=${h(e.ctaLink) ? "_blank" : i}
                    rel=${h(e.ctaLink) ? "noopener noreferrer" : i}
                  >${e.ctaLabel}</a>` : i}
            </div>`}
      </div>
    `;
  }
  render() {
    const e = this.config || {}, t = C(e, "spb_"), r = t.animate && !x(), s = d(e.spb_title), c = d(e.spb_desc), o = this.banners;
    return o.length ? a`
      <section
        class=${g({ "fs-section": !0, "fs-animate": r })}
        style=${m(j(t))}
        aria-label=${s || n("بانرات ترويجية", "Promotional banners")}
      >
        <div class="fs-container">
          ${s || c ? a`<div class="fs-header">
                ${s ? a`<h2 class="fs-title">${s}</h2>` : i}
                ${c ? a`<p class="fs-desc">${c}</p>` : i}
              </div>` : i}

          <div class="spb-carousel" role="region" aria-roledescription="carousel">
            <div
              class="spb-track"
              style=${m({ transform: `translateX(${-this.activeIndex * 100}%)` })}
            >
              ${o.map((v, l) => this.renderSlide(v, l))}
            </div>

            ${o.length > 1 ? a`
                <button type="button" class="spb-nav spb-nav--prev fs-tap" aria-label=${n("السابق", "Previous")} @click=${() => this.prev()}>‹</button>
                <button type="button" class="spb-nav spb-nav--next fs-tap" aria-label=${n("التالي", "Next")} @click=${() => this.next()}>›</button>
              ` : i}
          </div>

          ${o.length > 1 ? a`<div class="spb-dots" role="tablist">
                ${o.map((v, l) => a`
                  <button
                    type="button"
                    role="tab"
                    class=${g({ "spb-dot": !0, "is-active": l === this.activeIndex })}
                    aria-selected=${l === this.activeIndex ? "true" : "false"}
                    aria-label=${`${l + 1}`}
                    @click=${() => this.goTo(l)}
                  ></button>
                `)}
              </div>` : i}

          ${E({ config: e, prefix: "spb_" })}
        </div>
      </section>
    ` : a`<div class="fs-empty" role="status">
        ${n(
      "أضف بانرات ترويجية من إعدادات العنصر.",
      "Add promo banners in the element settings."
    )}
      </div>`;
  }
};
u.styles = [A, M];
let p = u;
$([
  k({ type: Object })
], p.prototype, "config");
$([
  L()
], p.prototype, "activeIndex");
typeof p < "u" && p.registerSallaComponent("salla-scent-promo-banners");
export {
  p as default
};
