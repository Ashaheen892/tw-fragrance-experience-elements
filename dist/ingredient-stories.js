var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, a as extractImageUrl, g as getRadioValue, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  :host {
    direction: inherit;
  }

  .igs-layout {
    display: grid;
    gap: 1rem;
  }

  .igs-grid {
    display: grid;
    gap: 0.65rem;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  }

  .igs-grid--list {
    grid-template-columns: 1fr;
  }

  .igs-card {
    display: grid;
    gap: 0.45rem;
    min-height: 44px;
    padding: 1rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.85);
    border: 1.5px solid color-mix(in srgb, var(--border-color, #e6e0d6) 82%, transparent);
    background: var(--card-bg, #fff);
    color: var(--text-color, #000000);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      border-color 0.24s ease,
      box-shadow 0.24s ease,
      transform 0.24s ease,
      background 0.24s ease;
  }

  .igs-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .igs-card.is-active {
    border-color: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
    background: color-mix(
      in srgb,
      var(--ing-color, var(--accent-color, var(--fs-store-primary))) 9%,
      var(--card-bg, #fff)
    );
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--ing-color, var(--accent-color, var(--fs-store-primary))) 18%, transparent),
      0 12px 28px rgba(90, 70, 40, 0.1);
    transform: translateY(-2px);
  }

  .igs-card:active {
    transform: translateY(0);
  }

  .igs-card__badge {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--button-color, #fff);
    background: var(--ing-color, var(--accent-color, var(--fs-store-primary)));
  }

  .igs-card__badge img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .igs-card__name {
    margin: 0;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .igs-card__teaser {
    margin: 0;
    font-size: 0.78rem;
    color: var(--muted-color, #666666);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .igs-panel__head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .igs-meta {
    display: grid;
    gap: 0.45rem;
  }

  .igs-meta__row {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.6;
  }

  .igs-meta__label {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent-color, var(--fs-store-primary));
  }

  @media (min-width: 960px) {
    .igs-layout {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .igs-card {
      transition: none;
    }

    .igs-card:hover,
    .igs-card.is-active {
      transform: none;
    }
  }
`;
function resolveLayout(config) {
  return getRadioValue(config.igs_layout, "grid") === "list" ? "list" : "grid";
}
__name(resolveLayout, "resolveLayout");
function parseIngredients(raw) {
  return normalizeCollection(raw).map((row, index) => ({
    id: `ingredient-${index}`,
    name: localizedString(row.name),
    shortTeaser: localizedString(row.short_teaser),
    story: localizedString(row.story),
    origin: localizedString(row.origin),
    character: localizedString(row.character),
    mood: localizedString(row.mood),
    image: extractImageUrl(row.image),
    color: localizedString(row.color) || "#9a7b4f",
    icon: localizedString(row.icon)
  })).filter(
    (item) => item.name || item.shortTeaser || item.story || item.image
  );
}
__name(parseIngredients, "parseIngredients");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _IngredientStories = class _IngredientStories extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.selectedId = "", this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler), this.ensureSelection();
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && this.ensureSelection();
  }
  get ingredients() {
    var _a;
    return parseIngredients((_a = this.config) == null ? void 0 : _a.igs_ingredients);
  }
  ensureSelection() {
    var _a;
    const list = this.ingredients;
    list.some((i) => i.id === this.selectedId) || (this.selectedId = ((_a = list[0]) == null ? void 0 : _a.id) ?? "");
  }
  get selected() {
    return this.ingredients.find((i) => i.id === this.selectedId) ?? null;
  }
  select(id) {
    this.selectedId = id;
  }
  renderBadge(item) {
    if (item.image)
      return html`<span class="igs-card__badge">
        <img src=${item.image} alt="" loading="lazy" decoding="async" />
      </span>`;
    const isSicon = item.icon.startsWith("sicon-");
    return html`<span class="igs-card__badge" style=${styleMap({ background: item.color })}>
      ${item.icon ? isSicon ? html`<span class=${item.icon}></span>` : item.icon : (item.name || "•").slice(0, 1)}
    </span>`;
  }
  renderPanel(item) {
    return html`
      <div class="igs-panel fs-panel fs-fade-swap" id="igs-detail" role="region" aria-live="polite">
        <div class="igs-panel__head">
          ${this.renderBadge(item)}
          <h3 class="fs-panel__title">${item.name || t("مكوّن", "Ingredient")}</h3>
        </div>
        ${item.story ? html`<p class="igs-panel__story fs-panel__desc">${item.story}</p>` : item.shortTeaser ? html`<p class="igs-panel__story fs-panel__desc">${item.shortTeaser}</p>` : nothing}
        <div class="igs-meta">
          ${item.origin ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t("الأصل", "Origin")}</span> ${item.origin}</p>` : nothing}
          ${item.character ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t("الطابع", "Character")}</span> ${item.character}</p>` : nothing}
          ${item.mood ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t("المزاج", "Mood")}</span> ${item.mood}</p>` : nothing}
        </div>
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "igs_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.igs_title), desc = localizedString(c.igs_desc), ingredients = this.ingredients, layout = resolveLayout(c), selected = this.selected;
    return ingredients.length ? html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مكتبة المكونات العطرية", "Fragrance ingredient library")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          <div class="igs-layout">
            <div
              class=${classMap({
      "igs-grid": !0,
      "igs-grid--list": layout === "list"
    })}
              role="list"
            >
              ${ingredients.map((item) => {
      const active = item.id === this.selectedId;
      return html`
                  <button
                    type="button"
                    class=${classMap({ "igs-card": !0, "is-active": active, "fs-tap": !0 })}
                    style=${styleMap({ "--ing-color": item.color })}
                    role="listitem"
                    aria-pressed=${active ? "true" : "false"}
                    aria-controls="igs-detail"
                    @click=${() => this.select(item.id)}
                  >
                    ${this.renderBadge(item)}
                    <h3 class="igs-card__name">${item.name || t("مكوّن", "Ingredient")}</h3>
                    ${item.shortTeaser ? html`<p class="igs-card__teaser">${item.shortTeaser}</p>` : nothing}
                  </button>
                `;
    })}
            </div>
            ${selected ? keyed(selected.id, this.renderPanel(selected)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: "igs_" })}
        </div>
      </section>
    ` : html`<div class="fs-empty" role="status">
        ${t(
      "أضف مكونات عطرية من إعدادات العنصر.",
      "Add fragrance ingredients in the element settings."
    )}
      </div>`;
  }
};
__name(_IngredientStories, "IngredientStories"), _IngredientStories.styles = [sharedSectionCss, componentStyles];
let IngredientStories = _IngredientStories;
__decorateClass([
  property({ type: Object })
], IngredientStories.prototype, "config");
__decorateClass([
  state()
], IngredientStories.prototype, "selectedId");
typeof IngredientStories < "u" && IngredientStories.registerSallaComponent("salla-ingredient-stories");
export {
  IngredientStories as default
};
