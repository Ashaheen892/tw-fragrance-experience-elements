var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, e as extractLink, l as localizedString, a as extractImageUrl, s as sharedSectionCss, t, i as isExternalUrl, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .osg-shell {
    display: grid;
    gap: 1rem;
  }

  .osg-cards {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr));
  }

  .osg-card {
    display: grid;
    gap: 0.45rem;
    padding: 0.85rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease,
      background 0.22s ease;
  }

  .osg-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .osg-card.is-active {
    border-color: var(--occ-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--occ-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .osg-card:active {
    transform: translateY(0);
  }

  .osg-card__media {
    aspect-ratio: 4 / 3;
    border-radius: calc(var(--section-radius, 20px) * 0.55);
    overflow: hidden;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 18%, var(--card-bg, #fff));
  }

  .osg-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .osg-card__name {
    margin: 0;
    font-size: 0.94rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .osg-card__desc {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .osg-panel {
    border-radius: var(--section-radius, 20px);
    border: 1px solid var(--border-color, #e6e0d6);
    background: var(--card-bg, #fff);
    padding: 1.25rem;
    display: grid;
    gap: 0.75rem;
  }

  .osg-panel__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
  }

  .osg-panel__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    line-height: 1.7;
    font-size: 0.92rem;
  }

  .osg-profile {
    padding: 0.85rem 0.95rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 10%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--occ-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .osg-profile__label {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  .osg-profile__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (min-width: 960px) {
    .osg-shell {
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .osg-card {
      transition: none;
    }

    .osg-card.is-active {
      transform: none;
    }
  }
`;
function parseOccasions(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `occasion-${index}`,
    name: localizedString(row.name),
    desc: localizedString(row.desc),
    scentProfile: localizedString(row.scent_profile),
    image: extractImageUrl(row.image),
    color: localizedString(row.color) || "#9a7b4f",
    link: extractLink(row.link)
  })).filter((item) => item.name || item.desc || item.scentProfile);
}
__name(parseOccasions, "parseOccasions");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _OccasionScentGuide = class _OccasionScentGuide extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.activeId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureActive();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureActive();
  }
  get occasions() {
    var _a;
    return parseOccasions((_a = this.config) == null ? void 0 : _a.osg_occasions);
  }
  ensureActive() {
    var _a;
    const list = this.occasions;
    list.some((o) => o.id === this.activeId) || (this.activeId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get active() {
    return this.occasions.find((o) => o.id === this.activeId) ?? this.occasions[0] ?? null;
  }
  select(id) {
    this.activeId = id;
  }
  renderCard(occasion) {
    const active = occasion.id === this.activeId;
    return html`
      <button
        type="button"
        class=${classMap({ "osg-card": !0, "is-active": active, "fs-tap": !0 })}
        style=${styleMap({ "--occ-color": occasion.color })}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="osg-detail"
        @click=${() => this.select(occasion.id)}
      >
        ${occasion.image ? html`<div class="osg-card__media">
              <img src=${occasion.image} alt="" loading="lazy" decoding="async" />
            </div>` : html`<div class="osg-card__media" aria-hidden="true"></div>`}
        <h3 class="osg-card__name">${occasion.name || t("مناسبة", "Occasion")}</h3>
        ${occasion.desc ? html`<p class="osg-card__desc">${occasion.desc}</p>` : nothing}
      </button>
    `;
  }
  renderPanel(occasion) {
    const external = occasion.link ? isExternalUrl(occasion.link) : !1;
    return html`
      <div
        class="osg-panel"
        id="osg-detail"
        role="region"
        aria-live="polite"
        style=${styleMap({ "--occ-color": occasion.color })}
      >
        <h3 class="osg-panel__title">${occasion.name || t("مناسبة", "Occasion")}</h3>
        ${occasion.desc ? html`<p class="osg-panel__desc">${occasion.desc}</p>` : nothing}
        ${occasion.scentProfile ? html`<div class="osg-profile">
              <span class="osg-profile__label">${t("الملف العطري المقترح", "Suggested scent profile")}</span>
              <p class="osg-profile__text">${occasion.scentProfile}</p>
            </div>` : nothing}
        ${occasion.link ? html`<a
              class="fs-btn fs-tap"
              href=${occasion.link}
              target=${external ? "_blank" : "_self"}
              rel=${external ? "noopener noreferrer" : nothing}
            >
              ${t("استكشف التوصية", "Explore recommendation")}
            </a>` : nothing}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "osg_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.osg_title), desc = localizedString(c.osg_desc), occasions = this.occasions, active = this.active;
    return occasions.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("دليل اختيار العطر حسب المناسبة", "Occasion scent guide")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="osg-shell">
            <div class="osg-cards" role="list">
              ${occasions.map((occasion) => this.renderCard(occasion))}
            </div>
            ${active ? this.renderPanel(active) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "osg_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف مناسبات من إعدادات العنصر.",
      "Add occasions in the element settings."
    )}
      </div>`;
  }
};
__name(_OccasionScentGuide, "OccasionScentGuide"), _OccasionScentGuide.styles = [sharedSectionCss, componentStyles];
let OccasionScentGuide = _OccasionScentGuide;
__decorateClass([
  property({ type: Object })
], OccasionScentGuide.prototype, "config");
__decorateClass([
  state()
], OccasionScentGuide.prototype, "activeId");
typeof OccasionScentGuide < "u" && OccasionScentGuide.registerSallaComponent("salla-occasion-scent-guide");
export {
  OccasionScentGuide as default
};
