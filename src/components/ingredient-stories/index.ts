import { html, LitElement, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
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
import { parseIngredients, resolveLayout } from './utils.js';
import type { IngredientStory } from './types.js';

export default class IngredientStories extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private selectedId = '';

  private boundLangHandler = () => this.requestUpdate();

  static styles = [sharedSectionCss, componentStyles];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('language-changed', this.boundLangHandler);
    this.ensureSelection();
  }

  disconnectedCallback(): void {
    window.removeEventListener('language-changed', this.boundLangHandler);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) this.ensureSelection();
  }

  private get ingredients(): IngredientStory[] {
    return parseIngredients(this.config?.igs_ingredients);
  }

  private ensureSelection(): void {
    const list = this.ingredients;
    if (!list.some((i) => i.id === this.selectedId)) {
      this.selectedId = list[0]?.id ?? '';
    }
  }

  private get selected(): IngredientStory | null {
    return this.ingredients.find((i) => i.id === this.selectedId) ?? null;
  }

  private select(id: string): void {
    this.selectedId = id;
  }

  private renderBadge(item: IngredientStory) {
    if (item.image) {
      return html`<span class="igs-card__badge">
        <img src=${item.image} alt="" loading="lazy" decoding="async" />
      </span>`;
    }
    const isSicon = item.icon.startsWith('sicon-');
    return html`<span class="igs-card__badge" style=${styleMap({ background: item.color })}>
      ${item.icon
        ? isSicon
          ? html`<span class=${item.icon}></span>`
          : item.icon
        : (item.name || '•').slice(0, 1)}
    </span>`;
  }

  private renderPanel(item: IngredientStory) {
    return html`
      <div class="igs-panel fs-panel fs-fade-swap" id="igs-detail" role="region" aria-live="polite">
        <div class="igs-panel__head">
          ${this.renderBadge(item)}
          <h3 class="fs-panel__title">${item.name || t('مكوّن', 'Ingredient')}</h3>
        </div>
        ${item.story
          ? html`<p class="igs-panel__story fs-panel__desc">${item.story}</p>`
          : item.shortTeaser
            ? html`<p class="igs-panel__story fs-panel__desc">${item.shortTeaser}</p>`
            : nothing}
        <div class="igs-meta">
          ${item.origin
            ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t('الأصل', 'Origin')}</span> ${item.origin}</p>`
            : nothing}
          ${item.character
            ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t('الطابع', 'Character')}</span> ${item.character}</p>`
            : nothing}
          ${item.mood
            ? html`<p class="igs-meta__row"><span class="igs-meta__label">${t('المزاج', 'Mood')}</span> ${item.mood}</p>`
            : nothing}
        </div>
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'igs_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.igs_title as string);
    const desc = localizedString(c.igs_desc as string);
    const ingredients = this.ingredients;
    const layout = resolveLayout(c);
    const selected = this.selected;

    if (!ingredients.length) {
      return html`<div class="fs-empty" role="status">
        ${t(
          'أضف مكونات عطرية من إعدادات العنصر.',
          'Add fragrance ingredients in the element settings.'
        )}
      </div>`;
    }

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('مكتبة المكونات العطرية', 'Fragrance ingredient library')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}

          <div class="igs-layout">
            <div
              class=${classMap({
                'igs-grid': true,
                'igs-grid--list': layout === 'list',
              })}
              role="list"
            >
              ${ingredients.map((item) => {
                const active = item.id === this.selectedId;
                return html`
                  <button
                    type="button"
                    class=${classMap({ 'igs-card': true, 'is-active': active, 'fs-tap': true })}
                    style=${styleMap({ '--ing-color': item.color })}
                    role="listitem"
                    aria-pressed=${active ? 'true' : 'false'}
                    aria-controls="igs-detail"
                    @click=${() => this.select(item.id)}
                  >
                    ${this.renderBadge(item)}
                    <h3 class="igs-card__name">${item.name || t('مكوّن', 'Ingredient')}</h3>
                    ${item.shortTeaser
                      ? html`<p class="igs-card__teaser">${item.shortTeaser}</p>`
                      : nothing}
                  </button>
                `;
              })}
            </div>
            ${selected ? keyed(selected.id, this.renderPanel(selected)) : nothing}
          </div>
          ${renderCommerceOutcome({ config: c, prefix: 'igs_' })}
        </div>
      </section>
    `;
  }
}
