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
import type { GiftSelections, GiftStepKey } from './types.js';
import {
  GIFT_STEPS,
  buildFallbackGiftSummary,
  emptySelections,
  findMatchingRecipe,
  parseBudgets,
  parseNavLabels,
  parseOccasions,
  parsePersons,
  parseRecipes,
  parseStyles,
  resolveBudget,
  resolveOccasion,
  resolvePerson,
  resolveStyle,
} from './utils.js';

export default class SmartGiftBuilder extends LitElement {

  @property({ type: Object })
  config: Record<string, unknown> = {};

  @state() private stepIndex = 0;
  @state() private showResult = false;
  @state() private selections: GiftSelections = emptySelections();

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

  updated(changed: Map<string, unknown>): void {
    if (changed.has('config')) {
      this.stepIndex = 0;
      this.showResult = false;
      this.selections = emptySelections();
    }
  }

  private get persons() {
    return parsePersons(this.config?.sgb_persons);
  }

  private get occasions() {
    return parseOccasions(this.config?.sgb_occasions);
  }

  private get budgets() {
    return parseBudgets(this.config?.sgb_budgets);
  }

  private get styles() {
    return parseStyles(this.config?.sgb_styles);
  }

  private get recipes() {
    return parseRecipes(this.config?.sgb_recipes);
  }

  private get currentStepKey(): GiftStepKey {
    return GIFT_STEPS[this.stepIndex]?.key ?? 'person';
  }

  private canAdvance(): boolean {
    const key = this.currentStepKey;
    if (key === 'person') return !!this.selections.personId || !this.persons.length;
    if (key === 'occasion') return !!this.selections.occasionId || !this.occasions.length;
    if (key === 'budget') return !!this.selections.budgetId || !this.budgets.length;
    if (key === 'style') return !!this.selections.styleId || !this.styles.length;
    return true;
  }

  private goNext(): void {
    if (!this.canAdvance()) return;
    if (this.stepIndex >= GIFT_STEPS.length - 1) {
      this.showResult = true;
      return;
    }
    this.stepIndex += 1;
  }

  private goBack(): void {
    if (this.showResult) {
      this.showResult = false;
      return;
    }
    if (this.stepIndex > 0) this.stepIndex -= 1;
  }

  private reset(): void {
    this.stepIndex = 0;
    this.showResult = false;
    this.selections = emptySelections();
  }

  private get matchedRecipe() {
    return findMatchingRecipe(this.recipes, this.selections);
  }

  private renderPersonCard(item: ReturnType<typeof parsePersons>[number]) {
    const active = this.selections.personId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, personId: item.id };
        }}
      >
        ${item.icon ? html`<span class="sgb-card__icon">${item.icon}</span>` : nothing}
        <span class="sgb-card__name">${item.name}</span>
      </button>
    `;
  }

  private renderOccasionCard(item: ReturnType<typeof parseOccasions>[number]) {
    const active = this.selections.occasionId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, occasionId: item.id };
        }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderBudgetOption(item: ReturnType<typeof parseBudgets>[number]) {
    const active = this.selections.budgetId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-option': true, 'fs-tap': true, 'is-active': active })}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, budgetId: item.id };
        }}
      >
        <span class="sgb-option__label">${item.label}</span>
        ${item.rangeText ? html`<p class="sgb-option__range">${item.rangeText}</p>` : nothing}
      </button>
    `;
  }

  private renderStyleCard(item: ReturnType<typeof parseStyles>[number]) {
    const active = this.selections.styleId === item.id;
    const style: Record<string, string> = item.color ? { '--item-color': item.color } : {};

    return html`
      <button
        type="button"
        class=${classMap({ 'sgb-card': true, 'fs-tap': true, 'is-active': active })}
        style=${styleMap(style)}
        aria-pressed=${active ? 'true' : 'false'}
        @click=${() => {
          this.selections = { ...this.selections, styleId: item.id };
        }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }

  private renderStepBody() {
    const key = this.currentStepKey;
    const stepMeta = GIFT_STEPS[this.stepIndex];

    if (key === 'person') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.persons.length
            ? html`<div class="sgb-grid">${this.persons.map((item) => this.renderPersonCard(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف خيارات الأشخاص من إعدادات العنصر.', 'Add person options in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'occasion') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.occasions.length
            ? html`<div class="sgb-grid">${this.occasions.map((item) => this.renderOccasionCard(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف المناسبات من إعدادات العنصر.', 'Add occasions in element settings.')}
              </div>`}
        </div>
      `;
    }

    if (key === 'budget') {
      return html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.budgets.length
            ? html`<div class="sgb-list">${this.budgets.map((item) => this.renderBudgetOption(item))}</div>`
            : html`<div class="sgb-step__empty">
                ${t('أضف خيارات الميزانية من إعدادات العنصر.', 'Add budget options in element settings.')}
              </div>`}
        </div>
      `;
    }

    return html`
      <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.styles.length
          ? html`<div class="sgb-grid">${this.styles.map((item) => this.renderStyleCard(item))}</div>`
          : html`<div class="sgb-step__empty">
              ${t('أضف أساليب التغليف من إعدادات العنصر.', 'Add presentation styles in element settings.')}
            </div>`}
      </div>
    `;
  }

  private renderResult() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const recipe = this.matchedRecipe;
    const person = resolvePerson(this.persons, this.selections.personId);
    const occasion = resolveOccasion(this.occasions, this.selections.occasionId);
    const budget = resolveBudget(this.budgets, this.selections.budgetId);
    const style = resolveStyle(this.styles, this.selections.styleId);
    const accent = recipe?.boxColor || style?.color || '#9a7b4f';

    const wrapText =
      recipe?.wrapSuggestion ||
      (style?.name
        ? t(`تغليف ${style.name}`, `${style.name} wrapping`)
        : t('تغليف أنيق بشريط ذهبي', 'Elegant wrap with a gold ribbon'));

    const messageText =
      recipe?.message ||
      buildFallbackGiftSummary(person, occasion, budget, style);

    const scentText =
      recipe?.scentCharacter ||
      t('عطر متوازن يناسب ذوق المُهدى إليه', 'A balanced scent suited to the recipient');

    return html`
      <article
        class="sgb-result fs-result"
        style=${styleMap({ '--gift-accent': accent })}
        role="region"
        aria-live="polite"
      >
        <div class="sgb-result__box" aria-hidden="true"></div>
        <h3 class="sgb-result__title">${t('صندوق هديتك', 'Your gift box')}</h3>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('التغليف', 'Wrapping')}</span>
          <p class="sgb-result__text">${wrapText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('رسالة الهدية', 'Gift message')}</span>
          <p class="sgb-result__text">${messageText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t('الطابع العطري', 'Scent character')}</span>
          <p class="sgb-result__text">${scentText}</p>
        </div>

        <div class="fs-actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
          config: c,
          prefix: 'sgb_',
          ready: true,
          matchTags: [
            this.selections.personId,
            this.selections.occasionId,
            this.selections.budgetId,
            this.selections.styleId,
          ],
        })}
      </article>
    `;
  }

  private renderProgress() {
    const total = GIFT_STEPS.length;
    const current = this.showResult ? total : this.stepIndex + 1;
    const percent = Math.round((current / total) * 100);

    return html`
      <div
        class="fs-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${percent}
        aria-label=${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
      >
        <div class="fs-progress__bar">
          <span style=${styleMap({ width: `${percent}%` })}></span>
        </div>
        <p class="fs-progress__label">
          ${t(`الخطوة ${current} من ${total}`, `Step ${current} of ${total}`)}
        </p>
      </div>
    `;
  }

  private renderWizard() {
    const c = this.config || {};
    const labels = parseNavLabels(c);
    const isLast = this.stepIndex >= GIFT_STEPS.length - 1;
    const bodyKey = this.showResult ? 'result' : `step-${this.stepIndex}`;

    return html`
      <div class="sgb-shell">
        ${this.renderProgress()}

        ${keyed(
          bodyKey,
          html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderResult() : this.renderStepBody()}
          </div>`
        )}

        ${this.showResult
          ? nothing
          : html`<div class="fs-nav">
              ${this.stepIndex > 0
                ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>`
                : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${!this.canAdvance() ? 'true' : 'false'}
                title=${!this.canAdvance() ? t('اختر خياراً للمتابعة', 'Choose an option to continue') : ''}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }

  render() {
    const c = this.config || {};
    const theme = readSectionTheme(c, 'sgb_');
    const animate = theme.animate && !prefersReducedMotion();
    const title = localizedString(c.sgb_title as string);
    const desc = localizedString(c.sgb_desc as string);

    return html`
      <section
        class=${classMap({ 'fs-section': true, 'fs-animate': animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t('صندوق الهدية الذكي', 'Smart gift builder')}
      >
        <div class="fs-container">
          ${title || desc
            ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>`
            : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
}
