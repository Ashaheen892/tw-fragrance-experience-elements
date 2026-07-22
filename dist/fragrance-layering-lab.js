var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, s as sharedSectionCss, t, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap, c as renderCommerceOutcome } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  .fll-grid {
    display: grid;
    gap: 0.85rem;
    grid-template-columns: minmax(0, 1fr);
  }

  @media (min-width: 640px) {
    .fll-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 960px) {
    .fll-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fll-card {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 0.95rem;
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    border: 1.5px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 22%, var(--border-color, #e6e0d6));
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }

  .fll-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .fll-card__title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.35;
    color: var(--recipe-color, var(--accent-color, var(--fs-store-primary)));
  }

  .fll-formula {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0.45rem;
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .fll-note {
    padding: 0.28rem 0.55rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 10%, #fff);
    border: 1px solid color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
  }

  .fll-op {
    color: var(--muted-color, #666666);
    font-weight: 800;
  }

  .fll-result {
    padding: 0.55rem 0.65rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--recipe-color, var(--accent-color, var(--fs-store-primary))) 8%, var(--card-bg, #fff));
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.45;
  }

  .fll-meta {
    display: grid;
    gap: 0.45rem;
  }

  .fll-meta__row {
    display: grid;
    gap: 0.15rem;
  }

  .fll-meta__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--muted-color, #666666);
  }

  .fll-meta__value {
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.55;
    color: var(--text-color, #000000);
  }

  @media (prefers-reduced-motion: reduce) {
    .fll-card {
      transition: none !important;
    }

    .fll-card:hover {
      transform: none;
    }
  }
`;
function parseRecipes(raw) {
  return normalizeCollection(raw).map((item, i) => {
    const title = localizedString(item.title), noteA = localizedString(item.note_a), noteB = localizedString(item.note_b), result = localizedString(item.result);
    return {
      id: String(item.id ?? item.recipe_id ?? "").trim() || `recipe-${i + 1}`,
      title,
      noteA,
      noteB,
      noteC: localizedString(item.note_c),
      result,
      occasion: localizedString(item.occasion),
      howTo: localizedString(item.how_to),
      color: String(item.color ?? item.accent_color ?? "").trim()
    };
  }).filter((r) => r.title || r.noteA || r.noteB || r.result);
}
__name(parseRecipes, "parseRecipes");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _FragranceLayeringLab = class _FragranceLayeringLab extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  get recipes() {
    var _a;
    return parseRecipes((_a = this.config) == null ? void 0 : _a.fll_recipes);
  }
  renderFormula(recipe) {
    return html`
      <div class="fll-formula" aria-label=${t("تركيبة الدمج", "Layering formula")}>
        <span class="fll-note">${recipe.noteA}</span>
        <span class="fll-op">+</span>
        <span class="fll-note">${recipe.noteB}</span>
        ${recipe.noteC ? html`
              <span class="fll-op">+</span>
              <span class="fll-note">${recipe.noteC}</span>
            ` : nothing}
        <span class="fll-op">=</span>
        <span class="fll-result">${recipe.result}</span>
      </div>
    `;
  }
  renderCard(recipe) {
    const style = recipe.color ? { "--recipe-color": recipe.color } : {};
    return html`
      <article class="fll-card" style=${styleMap(style)}>
        ${recipe.title ? html`<h3 class="fll-card__title">${recipe.title}</h3>` : nothing}
        ${this.renderFormula(recipe)}
        <div class="fll-meta">
          ${recipe.occasion ? html`<div class="fll-meta__row">
                <span class="fll-meta__label">${t("المناسبة", "Occasion")}</span>
                <p class="fll-meta__value">${recipe.occasion}</p>
              </div>` : nothing}
          ${recipe.howTo ? html`<div class="fll-meta__row">
                <span class="fll-meta__label">${t("طريقة الاستخدام", "How to apply")}</span>
                <p class="fll-meta__value">${recipe.howTo}</p>
              </div>` : nothing}
        </div>
      </article>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "fll_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.fll_title), desc = localizedString(c.fll_desc), recipes = this.recipes;
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("مختبر دمج العطور", "Fragrance layering lab")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}

          ${recipes.length ? html`<div class="fll-grid" role="list">
                ${recipes.map((recipe) => this.renderCard(recipe))}
              </div>` : html`<div class="fs-empty" role="status">
                ${t("أضف وصفات دمج من إعدادات العنصر.", "Add layering recipes in the element settings.")}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: "fll_" })}
        </div>
      </section>
    `;
  }
};
__name(_FragranceLayeringLab, "FragranceLayeringLab"), _FragranceLayeringLab.styles = [sharedSectionCss, componentStyles];
let FragranceLayeringLab = _FragranceLayeringLab;
__decorateClass([
  property({ type: Object })
], FragranceLayeringLab.prototype, "config");
typeof FragranceLayeringLab < "u" && FragranceLayeringLab.registerSallaComponent("salla-fragrance-layering-lab");
export {
  FragranceLayeringLab as default
};
