import { css as S, html as s, LitElement as E, nothing as d } from "lit";
import { property as C, state as z } from "lit/decorators.js";
import { classMap as f } from "lit/directives/class-map.js";
import { ref as D } from "lit/directives/ref.js";
import { styleMap as h } from "lit/directives/style-map.js";
import { t as i, g as P, n as I, e as T, l as p, a as j, s as M, i as q, r as A, p as G, b as H, c as R } from "./commerceOutcome-CCLcV5SW.js";
const w = "__fsDragScrollCleanup", W = 6;
function O(c) {
  var y;
  if (!c) return;
  const e = c;
  (y = e[w]) == null || y.call(e);
  let r = null, a = 0, t = 0, o = !1;
  const l = (n) => {
    n.pointerType !== "mouse" || n.button !== 0 || e.scrollWidth <= e.clientWidth || (r = n.pointerId, a = n.clientX, t = e.scrollLeft, o = !1, e.style.scrollSnapType = "none", e.style.cursor = "grabbing");
  }, _ = (n) => {
    if (r === null || n.pointerId !== r) return;
    const m = n.clientX - a;
    if (!o && Math.abs(m) > W) {
      o = !0;
      try {
        e.setPointerCapture(r);
      } catch {
      }
    }
    o && (n.preventDefault(), e.scrollLeft = t - m);
  }, u = (n) => {
    if (!(r === null || n.pointerId !== r)) {
      if (o)
        try {
          e.releasePointerCapture(r);
        } catch {
        }
      if (r = null, e.style.scrollSnapType = "", e.style.cursor = "", o) {
        const m = (k) => {
          k.preventDefault(), k.stopPropagation();
        };
        e.addEventListener("click", m, { capture: !0, once: !0 }), window.setTimeout(() => {
          e.removeEventListener("click", m, { capture: !0 });
        }, 0);
      }
      o = !1;
    }
  }, x = (n) => {
    n.preventDefault();
  };
  e.addEventListener("pointerdown", l), e.addEventListener("pointermove", _), e.addEventListener("pointerup", u), e.addEventListener("pointercancel", u), e.addEventListener("dragstart", x, { capture: !0 }), e.style.touchAction = "pan-x pan-y", e.scrollWidth > e.clientWidth && (e.style.cursor = "grab"), e[w] = () => {
    e.removeEventListener("pointerdown", l), e.removeEventListener("pointermove", _), e.removeEventListener("pointerup", u), e.removeEventListener("pointercancel", u), e.removeEventListener("dragstart", x, { capture: !0 });
  };
}
const U = S`
  :host {
    direction: inherit;
  }

  .scat-shell {
    display: grid;
    gap: 1.1rem;
  }

  .scat-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem 1rem;
  }

  .scat-toolbar__hint {
    margin: 0;
    font-size: 0.84rem;
    font-weight: 650;
    color: var(--muted-color, #6e6558);
    line-height: 1.5;
  }

  .scat-toggle {
    display: inline-flex;
    gap: 0.3rem;
    padding: 0.25rem;
    border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--border-color, #e6e0d6) 85%, transparent);
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, var(--section-bg, transparent));
  }

  .scat-toggle__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 2.4rem;
    padding: 0.35rem 0.75rem;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--muted-color, #6e6558);
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .scat-toggle__btn.is-active {
    color: var(--button-color, #fff);
    background: linear-gradient(
      135deg,
      var(--button-bg, var(--accent-color, var(--fs-store-primary))),
      color-mix(in srgb, var(--button-bg, var(--accent-color, var(--fs-store-primary))) 62%, #5c4a32)
    );
    box-shadow: 0 6px 14px color-mix(in srgb, var(--accent-color, var(--fs-store-primary)) 24%, transparent);
  }

  .scat-toggle__label {
    line-height: 1;
  }

  .scat-toggle__icon {
    width: 0.95rem;
    height: 0.95rem;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .scat-track--grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 640px) {
    .scat-track--grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
    }
  }

  @media (min-width: 960px) {
    .scat-track--grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .scat-track--slider {
    display: flex;
    gap: 0.85rem;
    padding-bottom: 0.35rem;
  }

  .scat-track--slider .scat-track__item {
    flex: 0 0 auto;
    width: min(72vw, 16.5rem);
    scroll-snap-align: start;
  }

  .scat-card {
    --cat-color: var(--accent-color, var(--fs-store-primary));
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--cat-color) 22%, var(--border-color, #e6e0d6));
    background: var(--card-bg, #fff);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 6px 16px rgba(90, 70, 40, 0.07);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease;
  }

  a.scat-card {
    cursor: pointer;
  }

  .scat-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--cat-color) 48%, var(--border-color, #e6e0d6));
    box-shadow: 0 12px 28px rgba(90, 70, 40, 0.11);
  }

  .scat-card__media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: color-mix(in srgb, var(--cat-color) 14%, var(--card-bg, #fff));
  }

  .scat-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .scat-card:hover .scat-card__img {
    transform: scale(1.045);
  }

  .scat-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--text-color, #1f1a14) 45%, transparent) 0%,
      transparent 58%
    );
    pointer-events: none;
  }

  .scat-card__icon {
    position: absolute;
    top: 0.7rem;
    inset-inline-end: 0.7rem;
    z-index: 1;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--card-bg, #fff) 88%, transparent);
    color: var(--cat-color);
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(90, 70, 40, 0.12);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
  }

  .scat-card__fallback {
    font-size: 1.85rem;
    font-weight: 800;
    color: var(--cat-color);
  }

  .scat-card__media--empty {
    display: grid;
    place-items: center;
    background: linear-gradient(
      145deg,
      color-mix(in srgb, var(--cat-color) 16%, var(--card-bg, #fff)),
      color-mix(in srgb, var(--cat-color) 5%, var(--card-bg, #fff))
    );
  }

  .scat-card__body {
    display: grid;
    gap: 0.35rem;
    padding: 0.95rem 1rem 1.05rem;
    flex: 1 1 auto;
  }

  .scat-card__name {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.35;
    letter-spacing: -0.01em;
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

  .scat-card__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.45rem;
    min-height: 2.2rem;
    padding: 0.35rem 0.9rem;
    width: fit-content;
    border-radius: 999px;
    border: 1.5px solid color-mix(in srgb, var(--cat-color) 45%, var(--border-color, #e6e0d6));
    background: color-mix(in srgb, var(--cat-color) 10%, var(--card-bg, #fff));
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--cat-color);
  }

  .scat-card::after {
    content: '';
    display: block;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 4%,
      var(--cat-color) 50%,
      transparent 96%
    );
    opacity: 0;
    transition: opacity 0.22s ease;
  }

  .scat-card:hover::after {
    opacity: 1;
  }

  @media (max-width: 479px) {
    .scat-toggle__label {
      display: none;
    }

    .scat-toggle__btn {
      width: 2.4rem;
      padding: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scat-card,
    .scat-card__img,
    .scat-toggle__btn {
      transition: none !important;
    }

    .scat-card:hover {
      transform: none;
    }

    .scat-card:hover .scat-card__img {
      transform: none;
    }
  }
`, b = [
  {
    id: "floral",
    name: i("زهور", "Floral"),
    description: i("باقات ناعمة وأنيقة", "Soft elegant bouquets"),
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "woody",
    name: i("خشبي", "Woody"),
    description: i("دفء الأخشاب والتوابل", "Warm woods & spice"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "oriental",
    name: i("شرقي", "Oriental"),
    description: i("عنبر ومسك فاخر", "Amber & luxurious musk"),
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "fresh",
    name: i("منعش", "Fresh"),
    description: i("حمضيات ونسيم نظيف", "Citrus & clean breeze"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  }
];
function $(c) {
  return P(c.scat_layout, "slider") === "grid" ? "grid" : "slider";
}
function B(c) {
  const e = I(c).map((r, a) => ({
    id: `category-${a}`,
    name: p(r.name) || p(r.title),
    description: p(r.description),
    image: j(r.image),
    color: p(r.color) || "#9a7b4f",
    icon: p(r.icon),
    link: T(r.link)
  })).filter((r) => r.name || r.image);
  return e.length ? e.map((r, a) => {
    const t = b[a % b.length];
    return {
      ...r,
      image: r.image || t.image,
      name: r.name || t.name,
      description: r.description || t.description
    };
  }) : b.map((r) => ({ ...r }));
}
var X = Object.defineProperty, L = (c, e, r, a) => {
  for (var t = void 0, o = c.length - 1, l; o >= 0; o--)
    (l = c[o]) && (t = l(e, r, t) || t);
  return t && X(e, r, t), t;
};
const F = s`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`, V = s`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="4" rx="1"/><rect x="1" y="9" width="14" height="4" rx="1"/></svg>`, v = class v extends E {
  constructor() {
    super(...arguments), this.config = {}, this.layout = "slider", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.layout = $(this.config || {});
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(e) {
    e.has("config") && (this.layout = $(this.config || {}));
  }
  setLayout(e) {
    this.layout = e;
  }
  get categories() {
    var e;
    return B((e = this.config) == null ? void 0 : e.scat_categories);
  }
  renderCard(e) {
    const r = !!e.image, a = { "--cat-color": e.color || "var(--accent-color, var(--fs-store-primary))" }, t = e.link ? q(e.link) : !1, o = s`
      <div class=${f({ "scat-card__media": !0, "scat-card__media--empty": !r })}>
        ${r ? s`<img class="scat-card__img" src=${e.image} alt="" loading="lazy" decoding="async" />` : s`<span class="scat-card__fallback">${e.icon || (e.name || "•").slice(0, 1)}</span>`}
        ${r ? s`<div class="scat-card__overlay" aria-hidden="true"></div>` : d}
        ${e.icon ? s`<span class="scat-card__icon" aria-hidden="true">${e.icon}</span>` : d}
      </div>
      <div class="scat-card__body">
        <h3 class="scat-card__name">${e.name || i("تصنيف", "Category")}</h3>
        ${e.description ? s`<p class="scat-card__desc">${e.description}</p>` : d}
        ${e.link ? s`<span class="scat-card__cta">${i("استكشف", "Explore")}</span>` : d}
      </div>
    `;
    return e.link ? s`
        <a
          class="scat-card"
          style=${h(a)}
          href=${e.link}
          target=${t ? "_blank" : d}
          rel=${t ? "noopener noreferrer" : d}
        >
          ${o}
        </a>
      ` : s`<div class="scat-card" style=${h(a)}>${o}</div>`;
  }
  renderShell(e) {
    const r = this.config || {}, a = A(r, "scat_"), t = a.animate && !G(), o = p(r.scat_title), l = p(r.scat_desc);
    return s`
      <section
        class=${f({ "fs-section": !0, "fs-animate": t })}
        style=${h(H(a))}
        aria-label=${o || i("تصنيفات العطور", "Scent categories")}
      >
        <div class="fs-container">
          ${o || l ? s`<div class="fs-header">
                ${o ? s`<h2 class="fs-title">${o}</h2>` : d}
                ${l ? s`<p class="fs-desc">${l}</p>` : d}
              </div>` : d}
          ${e}
        </div>
      </section>
    `;
  }
  render() {
    const e = this.config || {}, r = this.categories, a = this.layout === "slider";
    return r.length ? this.renderShell(s`
      <div class="scat-shell">
        <div class="scat-toolbar">
          <p class="scat-toolbar__hint">
            ${i("تصفّح التصنيفات واختر ما يناسب ذوقك", "Browse categories and pick what suits your taste")}
          </p>
          <div class="scat-toggle" role="radiogroup" aria-label=${i("طريقة العرض", "Layout")}>
            <button
              type="button"
              class=${f({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": a })}
              aria-pressed=${a ? "true" : "false"}
              aria-label=${i("عرض منزلق", "Slider view")}
              @click=${() => this.setLayout("slider")}
            >
              ${V}
              <span class="scat-toggle__label">${i("شريط", "Slider")}</span>
            </button>
            <button
              type="button"
              class=${f({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": !a })}
              aria-pressed=${a ? "false" : "true"}
              aria-label=${i("عرض شبكي", "Grid view")}
              @click=${() => this.setLayout("grid")}
            >
              ${F}
              <span class="scat-toggle__label">${i("شبكة", "Grid")}</span>
            </button>
          </div>
        </div>

        <div
          class=${f({
      "scat-track": !0,
      "scat-track--slider": a,
      "scat-track--grid": !a,
      "fs-scroll-x": a
    })}
          role="list"
          aria-label=${i("تصنيفات العطور", "Scent categories")}
          ${D((t) => {
      t instanceof HTMLElement && a && O(t);
    })}
        >
          ${r.map(
      (t) => s`<div class="scat-track__item" role="listitem">${this.renderCard(t)}</div>`
    )}
        </div>
      </div>

      ${R({ config: e, prefix: "scat_" })}
    `) : this.renderShell(s`
        <div class="fs-empty" role="status">
          ${i("أضف تصنيفات من إعدادات العنصر.", "Add categories in the element settings.")}
        </div>
      `);
  }
};
v.styles = [M, U];
let g = v;
L([
  C({ type: Object })
], g.prototype, "config");
L([
  z()
], g.prototype, "layout");
typeof g < "u" && g.registerSallaComponent("salla-scent-categories");
export {
  g as default
};
