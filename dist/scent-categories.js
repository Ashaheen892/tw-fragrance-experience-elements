import { css as b, html as r, LitElement as v, nothing as l } from "lit";
import { property as y } from "lit/decorators.js";
import { classMap as m } from "lit/directives/class-map.js";
import { styleMap as _ } from "lit/directives/style-map.js";
import { t as o, g as x, n as $, e as k, l as c, a as w, s as L, r as C, p as S, b as z, c as q } from "./commerceOutcome-CkVkQjOd.js";
const j = b`
  :host {
    direction: inherit;
  }

  /* ── Layout toggle ── */
  .scat-toggle {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    margin-bottom: 1.5rem;
  }

  .scat-toggle__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid color-mix(in srgb, var(--accent-color, #9a7b4f) 35%, var(--border-color, #e6e0d6));
    border-radius: 8px;
    background: transparent;
    color: var(--muted-color, #6e6558);
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }

  .scat-toggle__btn.is-active {
    border-color: var(--accent-color, #9a7b4f);
    color: var(--accent-color, #9a7b4f);
    background: color-mix(in srgb, var(--accent-color, #9a7b4f) 8%, transparent);
  }

  .scat-toggle__icon {
    width: 1rem;
    height: 1rem;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ── Grid layout ── */
  .scat-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }

  /* ── Slider layout ── */
  .scat-slider {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    padding-bottom: 0.5rem;
  }

  .scat-slider > .scat-card {
    flex: 0 0 auto;
    width: min(78vw, 17rem);
    scroll-snap-align: start;
  }

  /* ── Card ── */
  .scat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--accent-color, #9a7b4f) 18%, var(--border-color, #e6e0d6));
    background: var(--card-bg, #fff);
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
  }

  .scat-card:hover {
    border-color: color-mix(in srgb, var(--accent-color, #9a7b4f) 42%, var(--border-color, #e6e0d6));
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
    transform: translateY(-2px);
  }

  /* ── Image area ── */
  .scat-card__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--border-color, #e6e0d6) 45%, #fff);
  }

  .scat-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scat-card:hover .scat-card__img {
    transform: scale(1.04);
  }

  .scat-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(31, 26, 20, 0.55) 0%,
      rgba(31, 26, 20, 0.1) 50%,
      transparent 100%
    );
    pointer-events: none;
  }

  .scat-card__icon {
    position: absolute;
    top: 0.75rem;
    inset-inline-end: 0.75rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.92);
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* ── Body ── */
  .scat-card__body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
  }

  .scat-card__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 1.35;
    color: var(--text-color, #1f1a14);
  }

  .scat-card__desc {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted-color, #6e6558);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Gold hairline accent at bottom ── */
  .scat-card::after {
    content: '';
    display: block;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 5%,
      var(--accent-color, #9a7b4f) 50%,
      transparent 95%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .scat-card:hover::after {
    opacity: 1;
  }

  /* ── No-image fallback ── */
  .scat-card__media--empty {
    display: grid;
    place-items: center;
    background: linear-gradient(
      135deg,
      var(--section-bg, #f6f4f1),
      color-mix(in srgb, var(--accent-color, #9a7b4f) 12%, var(--card-bg, #fff))
    );
    font-size: 2rem;
  }

  @media (min-width: 960px) {
    .scat-grid {
      grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scat-card,
    .scat-card__img {
      transition: none;
    }
    .scat-card:hover {
      transform: none;
    }
    .scat-card:hover .scat-card__img {
      transform: none;
    }
  }
`, p = [
  {
    id: "floral",
    name: o("زهور", "Floral"),
    description: o("باقات ناعمة وأنيقة", "Soft elegant bouquets"),
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "woody",
    name: o("خشبي", "Woody"),
    description: o("دفء الأخشاب والتوابل", "Warm woods & spice"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "oriental",
    name: o("شرقي", "Oriental"),
    description: o("عنبر ومسك فاخر", "Amber & luxurious musk"),
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "fresh",
    name: o("منعش", "Fresh"),
    description: o("حمضيات ونسيم نظيف", "Citrus & clean breeze"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  }
];
function h(n) {
  return x(n.scat_layout, "slider") === "grid" ? "grid" : "slider";
}
function G(n) {
  const e = $(n).map((t, s) => ({
    id: `category-${s}`,
    name: c(t.name) || c(t.title),
    description: c(t.description),
    image: w(t.image),
    color: c(t.color) || "#9a7b4f",
    icon: c(t.icon),
    link: k(t.link)
  })).filter((t) => t.name || t.image);
  return e.length ? e.map((t, s) => {
    const a = p[s % p.length];
    return {
      ...t,
      image: t.image || a.image,
      name: t.name || a.name,
      description: t.description || a.description
    };
  }) : p.map((t) => ({ ...t }));
}
var E = Object.defineProperty, I = (n, e, t, s) => {
  for (var a = void 0, i = n.length - 1, d; i >= 0; i--)
    (d = n[i]) && (a = d(e, t, a) || a);
  return a && E(e, t, a), a;
};
const B = r`<svg class="scat-toggle__icon" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`, M = r`<svg class="scat-toggle__icon" viewBox="0 0 16 16"><rect x="1" y="3" width="14" height="4" rx="1"/><rect x="1" y="9" width="14" height="4" rx="1"/></svg>`, f = class f extends v {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate(), this.layout = "slider";
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.layout = h(this.config || {});
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.layout = h(this.config || {}));
  }
  setLayout(e) {
    this.layout = e, this.requestUpdate();
  }
  get categories() {
    var e;
    return G((e = this.config) == null ? void 0 : e.scat_categories);
  }
  renderCard(e) {
    const t = !!e.image, s = e.link ? "a" : "div", a = e.link ? { href: e.link, target: "_blank", rel: "noopener noreferrer" } : {}, i = r`
      <div class=${m({ "scat-card__media": !0, "scat-card__media--empty": !t })}>
        ${t ? r`<img class="scat-card__img" src=${e.image} alt=${e.name} loading="lazy" decoding="async" />` : r`<span>${e.icon || (e.name || "•").slice(0, 1)}</span>`}
        ${t ? r`<div class="scat-card__overlay"></div>` : l}
        ${e.icon && t ? r`<span class="scat-card__icon">${e.icon}</span>` : l}
      </div>
      <div class="scat-card__body">
        <h3 class="scat-card__name">${e.name || o("تصنيف", "Category")}</h3>
        ${e.description ? r`<p class="scat-card__desc">${e.description}</p>` : l}
      </div>
    `;
    return s === "a" ? r`<a class="scat-card" href=${a.href} target=${a.target} rel=${a.rel}>${i}</a>` : r`<div class="scat-card">${i}</div>`;
  }
  render() {
    const e = this.config || {}, t = C(e, "scat_"), s = t.animate && !S(), a = c(e.scat_title), i = c(e.scat_desc), d = this.categories;
    return d.length ? r`
      <section
        class=${m({ "fs-section": !0, "fs-animate": s })}
        style=${_(z(t))}
        aria-label=${a || o("تصنيفات العطور", "Scent categories")}
      >
        <div class="fs-container">
          ${a || i ? r`<div class="fs-header">
                ${a ? r`<h2 class="fs-title">${a}</h2>` : l}
                ${i ? r`<p class="fs-desc">${i}</p>` : l}
              </div>` : l}

          <div class="scat-toggle" role="radiogroup" aria-label=${o("طريقة العرض", "Layout")}>
            <button
              type="button"
              class=${m({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": this.layout === "slider" })}
              aria-pressed=${this.layout === "slider" ? "true" : "false"}
              aria-label=${o("عرض منزلق", "Slider view")}
              @click=${() => this.setLayout("slider")}
            >${M}</button>
            <button
              type="button"
              class=${m({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": this.layout === "grid" })}
              aria-pressed=${this.layout === "grid" ? "true" : "false"}
              aria-label=${o("عرض شبكي", "Grid view")}
              @click=${() => this.setLayout("grid")}
            >${B}</button>
          </div>

          <div class=${this.layout === "slider" ? "scat-slider" : "scat-grid"} role="list">
            ${d.map((u) => r`<div role="listitem">${this.renderCard(u)}</div>`)}
          </div>

          ${q({ config: e, prefix: "scat_" })}
        </div>
      </section>
    ` : r`<div class="fs-empty" role="status">
        ${o(
      "أضف تصنيفات من إعدادات العنصر.",
      "Add categories in the element settings."
    )}
      </div>`;
  }
};
f.styles = [L, j];
let g = f;
I([
  y({ type: Object })
], g.prototype, "config");
typeof g < "u" && g.registerSallaComponent("salla-scent-categories");
export {
  g as default
};
