var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, e as extractLink, a as extractImageUrl, s as sharedSectionCss, i as isExternalUrl, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  .spf-shell {
    display: grid;
    gap: 1.35rem;
    max-width: 960px;
    margin-inline: auto;
  }

  .spf-selector__label {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--muted-color, #666666);
    text-align: center;
  }

  .spf-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .spf-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .spf-card {
    display: grid;
    gap: 0.45rem;
    min-height: 118px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    font: inherit;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .spf-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .spf-card.is-active {
    border-color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(
        in srgb,
        var(--item-color, var(--accent-color, var(--fs-store-primary))) 18%,
        transparent
      ),
      0 12px 28px rgba(90, 70, 40, 0.1);
  }

  .spf-card:active {
    transform: translateY(0);
  }

  .spf-card__icon {
    width: 2.4rem;
    height: 2.4rem;
    margin-inline: auto;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 14%, #fff);
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
    font-size: 1.1rem;
    overflow: hidden;
  }

  .spf-card__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .spf-card__name {
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-card__desc {
    margin: 0;
    font-size: 0.76rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .spf-result {
    padding: 1.15rem 1.1rem;
    border-radius: var(--section-radius, 20px);
    background: var(--card-bg, #fff);
    border: 1px solid color-mix(in srgb, var(--item-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 12px 32px rgba(90, 70, 40, 0.08);
    animation: spf-fade-in 0.35s ease;
  }

  @keyframes spf-fade-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .spf-result__eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--item-color, var(--accent-color, var(--fs-store-primary)));
  }

  .spf-result__title {
    margin: 0 0 0.55rem;
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    font-weight: 800;
    line-height: 1.3;
  }

  .spf-result__desc {
    margin: 0;
    color: var(--muted-color, #666666);
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .spf-result__actions {
    margin-top: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .spf-card,
    .spf-result {
      transition: none !important;
      animation: none !important;
    }

    .spf-card:hover {
      transform: none;
    }
  }
`;
function parsePersonalities(raw) {
  return normalizeCollection(raw).map((item, i) => {
    const name = localizedString(item.name);
    return {
      id: String(item.id ?? item.personality_id ?? "").trim() || `personality-${i + 1}`,
      name,
      desc: localizedString(item.desc),
      icon: String(item.icon ?? "").trim(),
      image: extractImageUrl(item.image) || extractImageUrl(item.icon),
      color: String(item.color ?? "").trim(),
      resultFamily: localizedString(item.result_family),
      resultDesc: localizedString(item.result_desc),
      link: extractLink(item.link)
    };
  }).filter((p) => p.name || p.desc);
}
__name(parsePersonalities, "parsePersonalities");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _ScentPersonalityFinder = class _ScentPersonalityFinder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.selectedId = "");
  }
  get personalities() {
    var _a;
    return parsePersonalities((_a = this.config) == null ? void 0 : _a.spf_personalities);
  }
  resolveSelected(items) {
    if (!items.length) return null;
    if (this.selectedId) {
      const found = items.find((p) => p.id === this.selectedId);
      if (found) return found;
    }
    return null;
  }
  select(id) {
    this.selectedId = this.selectedId === id ? "" : id;
  }
  renderIcon(item) {
    const isSicon = item.icon.startsWith("sicon-");
    return item.image ? html`<img src=${item.image} alt="" loading="lazy" decoding="async" />` : item.icon ? isSicon ? html`<span class=${item.icon}></span>` : html`<span>${item.icon}</span>` : html`<span aria-hidden="true">◆</span>`;
  }
  renderCard(item) {
    const active = this.selectedId === item.id, style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "spf-card": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        aria-controls="spf-result"
        @click=${() => this.select(item.id)}
      >
        <span class="spf-card__icon">${this.renderIcon(item)}</span>
        <span class="spf-card__name">${item.name}</span>
        ${item.desc ? html`<p class="spf-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderResult(item) {
    const style = item.color ? { "--item-color": item.color } : {}, external = item.link ? isExternalUrl(item.link) : !1;
    return html`
      <article
        id="spf-result"
        class="spf-result"
        style=${styleMap(style)}
        role="region"
        aria-live="polite"
      >
        <p class="spf-result__eyebrow">${t("عائلتك العطرية", "Your fragrance family")}</p>
        <h3 class="spf-result__title">${item.resultFamily || item.name}</h3>
        ${item.resultDesc ? html`<p class="spf-result__desc">${item.resultDesc}</p>` : item.desc ? html`<p class="spf-result__desc">${item.desc}</p>` : nothing}
        ${item.link ? html`<div class="spf-result__actions">
              <a
                class="fs-btn fs-tap"
                href=${item.link}
                target=${external ? "_blank" : "_self"}
                rel=${external ? "noopener noreferrer" : nothing}
              >
                ${t("استكشف العائلة", "Explore this family")}
              </a>
            </div>` : nothing}
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "spf_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.spf_title), desc = localizedString(c.spf_desc), personalities = this.personalities, selected = this.resolveSelected(personalities);
    return personalities.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مستكشف الشخصية العطرية", "Scent personality finder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="spf-shell">
            <p class="spf-selector__label">${t("اختر شخصيتك", "Choose your personality")}</p>
            <div class="spf-grid" role="group" aria-label=${t("الشخصيات العطرية", "Scent personalities")}>
              ${personalities.map((item) => this.renderCard(item))}
            </div>
            ${selected ? this.renderResult(selected) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "spf_", ready: !!selected, selection: selected })}
        </div>
      </section>
    ` : html`
        <section
          class=${classMap({ "fs-section": !0, "fs-animate": animate })}
          style=${styleMap(themeStyleMap(theme))}
          aria-label=${title || t("مستكشف الشخصية العطرية", "Scent personality finder")}
        >
          <div class="fs-container">
            ${title || desc ? html`<div class="fs-header">
                  ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                  ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
                </div>` : nothing}
            <div class="fs-empty" role="status">
              ${t("أضف شخصيات عطرية من إعدادات العنصر.", "Add scent personalities in the element settings.")}
            </div>
          </div>
        </section>
      `;
  }
};
__name(_ScentPersonalityFinder, "ScentPersonalityFinder"), _ScentPersonalityFinder.styles = [sharedSectionCss, componentStyles];
let ScentPersonalityFinder = _ScentPersonalityFinder;
__decorateClass([
  property({ type: Object })
], ScentPersonalityFinder.prototype, "config");
__decorateClass([
  state()
], ScentPersonalityFinder.prototype, "selectedId");
typeof ScentPersonalityFinder < "u" && ScentPersonalityFinder.registerSallaComponent("salla-scent-personality-finder");
export {
  ScentPersonalityFinder as default
};
