import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import {
  prefersReducedMotion,
  readSectionTheme,
  t,
  themeStyleMap,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import { sharedSectionCss } from '../../utils/sharedStyles.js';
import { renderCommerceOutcome } from '../../utils/commerceOutcome.js';
import { componentStyles } from './styles.js';
import { parseRecipes } from './utils.js';
import type { LayeringRecipe } from './types.js';

export default class FragranceLayeringLab extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  private get recipes(): LayeringRecipe[] {
    return parseRecipes(this.config?.fll_recipes);
  }

  private renderFormula(recipe: LayeringRecipe) {
    return html`
      <div class="fll-formula" aria-label=${t('تركيبة الدمج', 'Layering formula')}>
        <span class="fll-note">${recipe.noteA}</span>
        <span class="fll-op">+</span>
        <span class="fll-note">${recipe.noteB}</span>
        ${recipe.noteC
          ? html`
              <span class="fll-op">+</span>
              <span class="fll-note">${recipe.noteC}</span>
            `
          : nothing}
        <span class="fll-op">=</span>
        <span class="fll-result">${recipe.result}</span>
      </div>
    `;
  }

  private renderCard(recipe: LayeringRecipe) {
    const style: Record<string, string> = recipe.color ? { '--recipe-color': recipe.color } : {};

    return html`
      <article class="fll-card" style=${styleMap(style)}>
        ${recipe.title ? html`<h3 class="fll-card__title">${recipe.title}</h3>` : nothing}
        ${this.renderFormula(recipe)}
        <div class="fll-meta">
          ${recipe.occasion
            ? html`<div class="fll-meta__row">
                <span class="fll-meta__label">${t('المناسبة', 'Occasion')}</span>
                <p class="fll-meta__value">${recipe.occasion}</p>
              </div>`
            : nothing}
          ${recipe.howTo
            ? html`<div class="fll-meta__row">
                <span class="fll-meta__label">${t('طريقة الاستخدام', 'How to apply')}</span>
                <p class="fll-meta__value">${recipe.howTo}</p>
              </div>`
            : nothing}
        </div>
      </article>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'fll_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.fll_title as string);
    const desc = localizedString(c.fll_desc as string);
    const recipes = this.recipes;

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مختبر دمج العطور', 'Fragrance layering lab')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          ${recipes.length
            ? html`<div class="fll-grid" role="list">
                ${recipes.map((recipe) => this.renderCard(recipe))}
              </div>`
            : html`<div class="fs-empty" role="status">
                ${t('أضف وصفات دمج من إعدادات العنصر.', 'Add layering recipes in the element settings.')}
              </div>`}
          ${renderCommerceOutcome({ config: c, prefix: 'fll_' })}
        </div>
      </section>
    `;
  }
}
