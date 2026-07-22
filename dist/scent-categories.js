var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { t, g as getRadioValue, n as normalizeCollection, e as extractLink, l as localizedString, a as extractImageUrl, s as sharedSectionCss, i as isExternalUrl, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const CLEANUP_KEY = "__fsDragScrollCleanup", DRAG_THRESHOLD_PX = 6;
function enableDragScroll(el) {
  var _a;
  if (!el) return;
  const host = el;
  (_a = host[CLEANUP_KEY]) == null || _a.call(host);
  let pointerId = null, startX = 0, startScrollLeft = 0, dragged = !1;
  const onPointerDown = /* @__PURE__ */ __name((event) => {
    event.pointerType !== "mouse" || event.button !== 0 || host.scrollWidth <= host.clientWidth || (pointerId = event.pointerId, startX = event.clientX, startScrollLeft = host.scrollLeft, dragged = !1, host.style.scrollSnapType = "none", host.style.cursor = "grabbing");
  }, "onPointerDown"), onPointerMove = /* @__PURE__ */ __name((event) => {
    if (pointerId === null || event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) > DRAG_THRESHOLD_PX) {
      dragged = !0;
      try {
        host.setPointerCapture(pointerId);
      } catch {
      }
    }
    dragged && (event.preventDefault(), host.scrollLeft = startScrollLeft - dx);
  }, "onPointerMove"), endDrag = /* @__PURE__ */ __name((event) => {
    if (!(pointerId === null || event.pointerId !== pointerId)) {
      if (dragged)
        try {
          host.releasePointerCapture(pointerId);
        } catch {
        }
      if (pointerId = null, host.style.scrollSnapType = "", host.style.cursor = "", dragged) {
        const suppressClick = /* @__PURE__ */ __name((clickEvent) => {
          clickEvent.preventDefault(), clickEvent.stopPropagation();
        }, "suppressClick");
        host.addEventListener("click", suppressClick, { capture: !0, once: !0 }), window.setTimeout(() => {
          host.removeEventListener("click", suppressClick, { capture: !0 });
        }, 0);
      }
      dragged = !1;
    }
  }, "endDrag"), onDragStart = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
  }, "onDragStart");
  host.addEventListener("pointerdown", onPointerDown), host.addEventListener("pointermove", onPointerMove), host.addEventListener("pointerup", endDrag), host.addEventListener("pointercancel", endDrag), host.addEventListener("dragstart", onDragStart, { capture: !0 }), host.style.touchAction = "pan-x pan-y", host.scrollWidth > host.clientWidth && (host.style.cursor = "grab"), host[CLEANUP_KEY] = () => {
    host.removeEventListener("pointerdown", onPointerDown), host.removeEventListener("pointermove", onPointerMove), host.removeEventListener("pointerup", endDrag), host.removeEventListener("pointercancel", endDrag), host.removeEventListener("dragstart", onDragStart, { capture: !0 });
  };
}
__name(enableDragScroll, "enableDragScroll");
const componentStyles = css`
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
`, DEFAULTS = [
  {
    id: "floral",
    name: t("زهور", "Floral"),
    description: t("باقات ناعمة وأنيقة", "Soft elegant bouquets"),
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "woody",
    name: t("خشبي", "Woody"),
    description: t("دفء الأخشاب والتوابل", "Warm woods & spice"),
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "oriental",
    name: t("شرقي", "Oriental"),
    description: t("عنبر ومسك فاخر", "Amber & luxurious musk"),
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  },
  {
    id: "fresh",
    name: t("منعش", "Fresh"),
    description: t("حمضيات ونسيم نظيف", "Citrus & clean breeze"),
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    color: "#9a7b4f",
    icon: "",
    link: ""
  }
];
function resolveLayout(config) {
  return getRadioValue(config.scat_layout, "slider") === "grid" ? "grid" : "slider";
}
__name(resolveLayout, "resolveLayout");
function parseCategories(raw) {
  const parsed = normalizeCollection(raw).map((row, index) => ({
    id: `category-${index}`,
    name: localizedString(row.name) || localizedString(row.title),
    description: localizedString(row.description),
    image: extractImageUrl(row.image),
    color: localizedString(row.color) || "#9a7b4f",
    icon: localizedString(row.icon),
    link: extractLink(row.link)
  })).filter((item) => item.name || item.image);
  return parsed.length ? parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      name: item.name || d.name,
      description: item.description || d.description
    };
  }) : DEFAULTS.map((d) => ({ ...d }));
}
__name(parseCategories, "parseCategories");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const GRID_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>`, SLIDER_SVG = html`<svg class="scat-toggle__icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="4" rx="1"/><rect x="1" y="9" width="14" height="4" rx="1"/></svg>`, _ScentCategories = class _ScentCategories extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.layout = "slider", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.layout = resolveLayout(this.config || {});
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.layout = resolveLayout(this.config || {}));
  }
  setLayout(next) {
    this.layout = next;
  }
  get categories() {
    var _a;
    return parseCategories((_a = this.config) == null ? void 0 : _a.scat_categories);
  }
  renderCard(cat) {
    const hasImage = !!cat.image, cardStyle = { "--cat-color": cat.color || "var(--accent-color, var(--fs-store-primary))" }, external = cat.link ? isExternalUrl(cat.link) : !1, inner = html`
      <div class=${classMap({ "scat-card__media": !0, "scat-card__media--empty": !hasImage })}>
        ${hasImage ? html`<img class="scat-card__img" src=${cat.image} alt="" loading="lazy" decoding="async" />` : html`<span class="scat-card__fallback">${cat.icon || (cat.name || "•").slice(0, 1)}</span>`}
        ${hasImage ? html`<div class="scat-card__overlay" aria-hidden="true"></div>` : nothing}
        ${cat.icon ? html`<span class="scat-card__icon" aria-hidden="true">${cat.icon}</span>` : nothing}
      </div>
      <div class="scat-card__body">
        <h3 class="scat-card__name">${cat.name || t("تصنيف", "Category")}</h3>
        ${cat.description ? html`<p class="scat-card__desc">${cat.description}</p>` : nothing}
        ${cat.link ? html`<span class="scat-card__cta">${t("استكشف", "Explore")}</span>` : nothing}
      </div>
    `;
    return cat.link ? html`
        <a
          class="scat-card"
          style=${styleMap(cardStyle)}
          href=${cat.link}
          target=${external ? "_blank" : nothing}
          rel=${external ? "noopener noreferrer" : nothing}
        >
          ${inner}
        </a>
      ` : html`<div class="scat-card" style=${styleMap(cardStyle)}>${inner}</div>`;
  }
  renderShell(body) {
    const c = this.config || {}, theme = readSectionTheme(c, "scat_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.scat_title), desc = localizedString(c.scat_desc);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("تصنيفات العطور", "Scent categories")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}
          ${body}
        </div>
      </section>
    `;
  }
  render() {
    const c = this.config || {}, categories = this.categories, isSlider = this.layout === "slider";
    return categories.length ? this.renderShell(html`
      <div class="scat-shell">
        <div class="scat-toolbar">
          <p class="scat-toolbar__hint">
            ${t("تصفّح التصنيفات واختر ما يناسب ذوقك", "Browse categories and pick what suits your taste")}
          </p>
          <div class="scat-toggle" role="radiogroup" aria-label=${t("طريقة العرض", "Layout")}>
            <button
              type="button"
              class=${classMap({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": isSlider })}
              aria-pressed=${isSlider ? "true" : "false"}
              aria-label=${t("عرض منزلق", "Slider view")}
              @click=${() => this.setLayout("slider")}
            >
              ${SLIDER_SVG}
              <span class="scat-toggle__label">${t("شريط", "Slider")}</span>
            </button>
            <button
              type="button"
              class=${classMap({ "scat-toggle__btn": !0, "fs-tap": !0, "is-active": !isSlider })}
              aria-pressed=${isSlider ? "false" : "true"}
              aria-label=${t("عرض شبكي", "Grid view")}
              @click=${() => this.setLayout("grid")}
            >
              ${GRID_SVG}
              <span class="scat-toggle__label">${t("شبكة", "Grid")}</span>
            </button>
          </div>
        </div>

        <div
          class=${classMap({
      "scat-track": !0,
      "scat-track--slider": isSlider,
      "scat-track--grid": !isSlider,
      "fs-scroll-x": isSlider
    })}
          role="list"
          aria-label=${t("تصنيفات العطور", "Scent categories")}
          ${ref((el) => {
      el instanceof HTMLElement && isSlider && enableDragScroll(el);
    })}
        >
          ${categories.map(
      (cat) => html`<div class="scat-track__item" role="listitem">${this.renderCard(cat)}</div>`
    )}
        </div>
      </div>

      ${renderCommerceOutcome({ config: c, prefix: "scat_" })}
    `) : this.renderShell(html`
        <div class="fs-empty" role="status">
          ${t("أضف تصنيفات من إعدادات العنصر.", "Add categories in the element settings.")}
        </div>
      `);
  }
};
__name(_ScentCategories, "ScentCategories"), _ScentCategories.styles = [sharedSectionCss, componentStyles];
let ScentCategories = _ScentCategories;
__decorateClass([
  property({ type: Object })
], ScentCategories.prototype, "config");
__decorateClass([
  state()
], ScentCategories.prototype, "layout");
typeof ScentCategories < "u" && ScentCategories.registerSallaComponent("salla-scent-categories");
export {
  ScentCategories as default
};
