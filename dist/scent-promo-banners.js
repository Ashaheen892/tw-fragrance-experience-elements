import { css as _, LitElement as y, nothing as a, html as i } from "lit";
import { property as k, state as L } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { keyed as w } from "lit/directives/keyed.js";
import { styleMap as b } from "lit/directives/style-map.js";
import { t as r, n as S, f as A, e as C, l as c, a as I, s as T, p as m, i as h, r as X, b as M, c as P } from "./commerceOutcome-CCLcV5SW.js";
const z = _`
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
`, g = [
  {
    id: "launch",
    heading: r("إصدار محدود", "Limited edition"),
    subheading: r("عطور الموسم بتركيبة فاخرة", "Seasonal scents in a luxurious blend"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: r("اكتشف المجموعة", "Explore collection"),
    ctaLink: "",
    overlayOpacity: 45
  },
  {
    id: "gift",
    heading: r("هدايا عطرية", "Scented gifts"),
    subheading: r("اختيارات أنيقة لكل مناسبة", "Elegant picks for every occasion"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80",
    ctaLabel: r("تسوّق الهدايا", "Shop gifts"),
    ctaLink: "",
    overlayOpacity: 45
  }
];
function E(p) {
  const t = S(p).map((e, n) => ({
    id: `banner-${n}`,
    heading: c(e.heading) || c(e.title),
    subheading: c(e.subheading),
    image: I(e.image),
    ctaLabel: c(e.cta_label),
    ctaLink: C(e.cta_link ?? e.link),
    overlayOpacity: Math.max(0, Math.min(100, A(e.overlay_opacity, 45)))
  })).filter((e) => e.image || e.heading);
  return t.length ? t.map((e, n) => {
    const s = g[n % g.length];
    return {
      ...e,
      image: e.image || s.image,
      heading: e.heading || s.heading,
      subheading: e.subheading || s.subheading,
      ctaLabel: e.ctaLabel || s.ctaLabel
    };
  }) : g.map((e) => ({ ...e }));
}
var O = Object.defineProperty, v = (p, t, e, n) => {
  for (var s = void 0, o = p.length - 1, l; o >= 0; o--)
    (l = p[o]) && (s = l(t, e, s) || s);
  return s && O(t, e, s), s;
};
const u = class u extends y {
  constructor() {
    super(...arguments), this.config = {}, this.activeIndex = 0, this.autoTimer = 0, this.boundLangHandler = () => this.requestUpdate(), this.swipeStartX = null, this.onPointerDown = (t) => {
      t.pointerType === "mouse" && t.button !== 0 || (this.swipeStartX = t.clientX, this.stopAuto());
    }, this.onPointerUp = (t) => {
      const e = this.swipeStartX;
      if (this.swipeStartX = null, this.startAuto(), e == null) return;
      const n = t.clientX - e;
      if (Math.abs(n) < 40) return;
      (getComputedStyle(this).direction === "rtl" ? n > 0 : n < 0) ? this.next() : this.prev();
    }, this.onPointerCancel = () => {
      this.swipeStartX = null, this.startAuto();
    }, this.onDragStart = (t) => t.preventDefault();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.startAuto();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), this.stopAuto(), super.disconnectedCallback();
  }
  updated(t) {
    if (t.has("config")) {
      const e = this.banners;
      this.activeIndex >= e.length && (this.activeIndex = 0), this.startAuto();
    }
  }
  get banners() {
    var t;
    return E((t = this.config) == null ? void 0 : t.spb_banners);
  }
  startAuto() {
    var e;
    if (this.stopAuto(), this.banners.length <= 1 || m()) return;
    const t = Math.max(3e3, Number((e = this.config) == null ? void 0 : e.spb_interval) || 5e3);
    this.autoTimer = window.setInterval(() => this.next(), t);
  }
  stopAuto() {
    this.autoTimer && (window.clearInterval(this.autoTimer), this.autoTimer = 0);
  }
  goTo(t) {
    this.activeIndex = t, this.startAuto();
  }
  prev() {
    const t = this.banners.length;
    this.goTo((this.activeIndex - 1 + t) % t);
  }
  next() {
    this.goTo((this.activeIndex + 1) % this.banners.length);
  }
  renderSlide(t, e) {
    const n = e === this.activeIndex;
    return i`
      <div
        class=${f({ "spb-slide": !0, "is-active": n })}
        role="tabpanel"
        aria-hidden=${n ? "false" : "true"}
      >
        ${t.image ? i`<img class="spb-slide__bg" src=${t.image} alt="" loading=${e === 0 ? "eager" : "lazy"} decoding="async" />` : a}
        <div class="spb-slide__overlay" style=${b({ "--spb-overlay": `${t.overlayOpacity / 100}` })}></div>
        ${n ? w(e, i`<div class="spb-slide__content fs-fade-swap">
              ${t.heading ? i`<h3 class="spb-slide__heading">${t.heading}</h3>` : a}
              ${t.subheading ? i`<p class="spb-slide__sub">${t.subheading}</p>` : a}
              ${t.ctaLabel && t.ctaLink ? i`<a
                    class="fs-btn fs-tap"
                    href=${t.ctaLink}
                    target=${h(t.ctaLink) ? "_blank" : a}
                    rel=${h(t.ctaLink) ? "noopener noreferrer" : a}
                  >${t.ctaLabel}</a>` : a}
            </div>`) : i`<div class="spb-slide__content">
              ${t.heading ? i`<h3 class="spb-slide__heading">${t.heading}</h3>` : a}
              ${t.subheading ? i`<p class="spb-slide__sub">${t.subheading}</p>` : a}
              ${t.ctaLabel && t.ctaLink ? i`<a
                    class="fs-btn fs-tap"
                    href=${t.ctaLink}
                    target=${h(t.ctaLink) ? "_blank" : a}
                    rel=${h(t.ctaLink) ? "noopener noreferrer" : a}
                  >${t.ctaLabel}</a>` : a}
            </div>`}
      </div>
    `;
  }
  render() {
    const t = this.config || {}, e = X(t, "spb_"), n = e.animate && !m(), s = c(t.spb_title), o = c(t.spb_desc), l = this.banners;
    return l.length ? i`
      <section
        class=${f({ "fs-section": !0, "fs-animate": n })}
        style=${b(M(e))}
        aria-label=${s || r("بانرات ترويجية", "Promotional banners")}
      >
        <div class="fs-container">
          ${s || o ? i`<div class="fs-header">
                ${s ? i`<h2 class="fs-title">${s}</h2>` : a}
                ${o ? i`<p class="fs-desc">${o}</p>` : a}
              </div>` : a}

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
              style=${b({ transform: `translateX(${-this.activeIndex * 100}%)` })}
            >
              ${l.map((x, $) => this.renderSlide(x, $))}
            </div>

            ${l.length > 1 ? i`
                <button type="button" class="spb-nav spb-nav--prev fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${r("السابق", "Previous")} @click=${() => this.prev()}>‹</button>
                <button type="button" class="spb-nav spb-nav--next fs-icon-btn fs-icon-btn--on-media fs-tap" aria-label=${r("التالي", "Next")} @click=${() => this.next()}>›</button>
              ` : a}
          </div>

          ${P({ config: t, prefix: "spb_" })}
        </div>
      </section>
    ` : i`<div class="fs-empty" role="status">
        ${r(
      "أضف بانرات ترويجية من إعدادات العنصر.",
      "Add promo banners in the element settings."
    )}
      </div>`;
  }
};
u.styles = [T, z];
let d = u;
v([
  k({ type: Object })
], d.prototype, "config");
v([
  L()
], d.prototype, "activeIndex");
typeof d < "u" && d.registerSallaComponent("salla-scent-promo-banners");
export {
  d as default
};
