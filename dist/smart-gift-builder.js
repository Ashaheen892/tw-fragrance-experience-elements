var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
import { css, LitElement, nothing, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import { n as normalizeCollection, l as localizedString, t, s as sharedSectionCss, c as renderCommerceOutcome, r as readSectionTheme, p as prefersReducedMotion, b as themeStyleMap } from "./commerceOutcome-DYfJre3y.js";
const componentStyles = css`
  .sgb-shell {
    display: grid;
    gap: clamp(1rem, 2.5vw, 1.35rem);
    max-width: 920px;
    margin-inline: auto;
  }

  .sgb-step {
    display: grid;
    gap: 1rem;
  }

  .sgb-step__title {
    margin: 0;
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: 800;
    text-align: center;
  }

  .sgb-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  @media (min-width: 640px) {
    .sgb-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.75rem;
    }
  }

  .sgb-card {
    display: grid;
    gap: 0.35rem;
    min-height: 96px;
    padding: 0.85rem 0.75rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-card.is-active {
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

  .sgb-card:active {
    transform: translateY(0);
  }

  .sgb-card__icon {
    font-size: 1.35rem;
    line-height: 1;
  }

  .sgb-card__name {
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.35;
  }

  .sgb-card__desc,
  .sgb-card__range {
    margin: 0;
    font-size: 0.74rem;
    color: var(--muted-color, #666666);
    line-height: 1.45;
  }

  .sgb-list {
    display: grid;
    gap: 0.55rem;
  }

  .sgb-option {
    display: grid;
    gap: 0.15rem;
    padding: 0.85rem 1rem;
    border: 1.5px solid var(--border-color, #e6e0d6);
    border-radius: calc(var(--section-radius, 20px) * 0.72);
    background: var(--card-bg, #fff);
    text-align: start;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(90, 70, 40, 0.05);
    transition:
      transform 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      background 0.22s ease;
  }

  .sgb-option:hover {
    transform: translateY(-2px);
    border-color: color-mix(
      in srgb,
      var(--item-color, var(--accent-color, var(--fs-store-primary))) 42%,
      var(--border-color, #e6e0d6)
    );
    box-shadow: 0 10px 24px rgba(90, 70, 40, 0.09);
  }

  .sgb-option.is-active {
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

  .sgb-option:active {
    transform: translateY(0);
  }

  .sgb-option__label {
    font-size: 0.94rem;
    font-weight: 800;
  }

  .sgb-option__range {
    margin: 0;
    font-size: 0.8rem;
    color: var(--muted-color, #666666);
  }

  .sgb-step__empty {
    padding: 1rem;
    border-radius: calc(var(--section-radius, 20px) * 0.7);
    border: 1px dashed var(--border-color, #e6e0d6);
    text-align: center;
    color: var(--muted-color, #666666);
    font-size: 0.88rem;
  }

  .sgb-shell .fs-nav .fs-btn:not(.fs-btn--ghost):disabled {
    opacity: 0.45;
    filter: grayscale(0.12);
    box-shadow: none;
    transform: none;
    cursor: not-allowed;
  }

  .sgb-result {
    padding: 0;
    border-radius: var(--section-radius, 20px);
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 24%, var(--border-color, #e6e0d6));
    box-shadow: 0 14px 36px rgba(90, 70, 40, 0.1);
  }

  .sgb-result__box {
    width: 100%;
    height: 0.55rem;
    border-radius: 999px;
    background: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__title {
    margin: 0;
    font-size: clamp(1.1rem, 2.3vw, 1.4rem);
    font-weight: 800;
  }

  .sgb-result__block {
    display: grid;
    gap: 0.25rem;
    padding: 0.75rem 0.85rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 7%, var(--card-bg, #fff));
    border: 1px solid color-mix(in srgb, var(--gift-accent, var(--accent-color, var(--fs-store-primary))) 16%, var(--border-color, #e6e0d6));
  }

  .sgb-result__label {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: var(--gift-accent, var(--accent-color, var(--fs-store-primary)));
  }

  .sgb-result__text {
    margin: 0;
    line-height: 1.65;
    font-size: 0.92rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .sgb-card,
    .sgb-option {
      transition: none !important;
    }

    .sgb-card:hover,
    .sgb-option:hover {
      transform: none;
    }
  }
`;
function parseMatchIds(raw) {
  if (Array.isArray(raw))
    return raw.map((item) => {
      if (typeof item == "string") return item.trim();
      if (item && typeof item == "object") {
        const obj = item;
        return String(obj.id ?? obj.value ?? obj.key ?? "").trim();
      }
      return "";
    }).filter(Boolean);
  const text = String(raw ?? "").trim();
  return text ? text.split(/[,،|/]/).map((part) => part.trim()).filter(Boolean) : [];
}
__name(parseMatchIds, "parseMatchIds");
function parsePersons(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.person_id ?? "").trim() || `person-${i + 1}`,
    name: localizedString(item.name),
    icon: String(item.icon ?? "").trim()
  })).filter((p) => p.name);
}
__name(parsePersons, "parsePersons");
function parseOccasions(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.occasion_id ?? "").trim() || `occasion-${i + 1}`,
    name: localizedString(item.name),
    desc: localizedString(item.desc)
  })).filter((o) => o.name);
}
__name(parseOccasions, "parseOccasions");
function parseBudgets(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.budget_id ?? "").trim() || `budget-${i + 1}`,
    label: localizedString(item.label) || localizedString(item.name),
    rangeText: localizedString(item.range_text) || localizedString(item.range) || localizedString(item.desc)
  })).filter((b) => b.label);
}
__name(parseBudgets, "parseBudgets");
function parseStyles(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.style_id ?? "").trim() || `style-${i + 1}`,
    name: localizedString(item.name),
    desc: localizedString(item.desc),
    color: String(item.color ?? "").trim()
  })).filter((s) => s.name);
}
__name(parseStyles, "parseStyles");
function parseRecipes(raw) {
  return normalizeCollection(raw).map((item, i) => ({
    id: String(item.id ?? item.recipe_id ?? "").trim() || `recipe-${i + 1}`,
    personIds: parseMatchIds(item.person_id ?? item.person_ids),
    occasionIds: parseMatchIds(item.occasion_id ?? item.occasion_ids),
    budgetIds: parseMatchIds(item.budget_id ?? item.budget_ids),
    styleIds: parseMatchIds(item.style_id ?? item.style_ids),
    wrapSuggestion: localizedString(item.wrap_suggestion),
    message: localizedString(item.message),
    boxColor: String(item.box_color ?? item.color ?? "").trim(),
    scentCharacter: localizedString(item.scent_character)
  })).filter(
    (r) => r.wrapSuggestion || r.message || r.scentCharacter || r.personIds.length || r.occasionIds.length
  );
}
__name(parseRecipes, "parseRecipes");
function parseNavLabels(config) {
  return {
    next: localizedString(config.sgb_next_btn) || t("التالي", "Next"),
    back: localizedString(config.sgb_back_btn) || t("السابق", "Back"),
    see: localizedString(config.sgb_see_btn) || t("اعرض الهدية", "See your gift"),
    reset: localizedString(config.sgb_reset_btn) || t("ابدأ من جديد", "Start over"),
    ctaLabel: localizedString(config.sgb_cta_label) || t("تسوق الآن", "Shop now")
  };
}
__name(parseNavLabels, "parseNavLabels");
function findMatchingRecipe(recipes, selections) {
  if (!recipes.length) return null;
  const { personId, occasionId, budgetId, styleId } = selections, exact = recipes.find((recipe) => {
    const personOk = !recipe.personIds.length || recipe.personIds.includes(personId), occasionOk = !recipe.occasionIds.length || recipe.occasionIds.includes(occasionId), budgetOk = !recipe.budgetIds.length || recipe.budgetIds.includes(budgetId), styleOk = !recipe.styleIds.length || recipe.styleIds.includes(styleId);
    return personOk && occasionOk && budgetOk && styleOk && recipe.personIds.length > 0;
  });
  if (exact) return exact;
  let best = null, bestScore = -1;
  for (const recipe of recipes) {
    let score = 0;
    personId && recipe.personIds.includes(personId) ? score += 4 : recipe.personIds.length || (score += 1), occasionId && recipe.occasionIds.includes(occasionId) ? score += 3 : recipe.occasionIds.length || (score += 1), styleId && recipe.styleIds.includes(styleId) ? score += 2 : recipe.styleIds.length || (score += 1), budgetId && recipe.budgetIds.includes(budgetId) ? score += 2 : recipe.budgetIds.length || (score += 1), score > bestScore && (bestScore = score, best = recipe);
  }
  return best;
}
__name(findMatchingRecipe, "findMatchingRecipe");
function buildFallbackGiftSummary(person, occasion, budget, style) {
  const parts = [];
  return person != null && person.name && parts.push(t(`لـ ${person.name}`, `For ${person.name}`)), occasion != null && occasion.name && parts.push(t(`مناسبة: ${occasion.name}`, `Occasion: ${occasion.name}`)), budget != null && budget.label && parts.push(
    t(
      `الميزانية: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ""}`,
      `Budget: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ""}`
    )
  ), style != null && style.name && parts.push(t(`الأسلوب: ${style.name}`, `Style: ${style.name}`)), parts.length ? parts.join(" · ") : t(
    "اختر التفاصيل لبناء صندوق هدية عطري مخصّص.",
    "Pick details to build a custom fragrance gift box."
  );
}
__name(buildFallbackGiftSummary, "buildFallbackGiftSummary");
const GIFT_STEPS = [
  { key: "person", labelAr: "لمن الهدية؟", labelEn: "Who is it for?" },
  { key: "occasion", labelAr: "المناسبة", labelEn: "Occasion" },
  { key: "budget", labelAr: "الميزانية", labelEn: "Budget" },
  { key: "style", labelAr: "أسلوب التغليف", labelEn: "Presentation style" }
];
function emptySelections() {
  return {
    personId: "",
    occasionId: "",
    budgetId: "",
    styleId: ""
  };
}
__name(emptySelections, "emptySelections");
function resolvePerson(persons, id) {
  return persons.find((p) => p.id === id) ?? null;
}
__name(resolvePerson, "resolvePerson");
function resolveOccasion(occasions, id) {
  return occasions.find((o) => o.id === id) ?? null;
}
__name(resolveOccasion, "resolveOccasion");
function resolveBudget(budgets, id) {
  return budgets.find((b) => b.id === id) ?? null;
}
__name(resolveBudget, "resolveBudget");
function resolveStyle(styles, id) {
  return styles.find((s) => s.id === id) ?? null;
}
__name(resolveStyle, "resolveStyle");
var __defProp2 = Object.defineProperty, __decorateClass = /* @__PURE__ */ __name((decorators, target, key, kind) => {
  for (var result = void 0, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = decorator(target, key, result) || result);
  return result && __defProp2(target, key, result), result;
}, "__decorateClass");
const _SmartGiftBuilder = class _SmartGiftBuilder extends LitElement {
  constructor() {
    super(...arguments), this.config = {}, this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections(), this.boundLangHandler = () => this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("language-changed", this.boundLangHandler);
  }
  disconnectedCallback() {
    window.removeEventListener("language-changed", this.boundLangHandler), super.disconnectedCallback();
  }
  updated(changed) {
    changed.has("config") && (this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections());
  }
  get persons() {
    var _a;
    return parsePersons((_a = this.config) == null ? void 0 : _a.sgb_persons);
  }
  get occasions() {
    var _a;
    return parseOccasions((_a = this.config) == null ? void 0 : _a.sgb_occasions);
  }
  get budgets() {
    var _a;
    return parseBudgets((_a = this.config) == null ? void 0 : _a.sgb_budgets);
  }
  get styles() {
    var _a;
    return parseStyles((_a = this.config) == null ? void 0 : _a.sgb_styles);
  }
  get recipes() {
    var _a;
    return parseRecipes((_a = this.config) == null ? void 0 : _a.sgb_recipes);
  }
  get currentStepKey() {
    var _a;
    return ((_a = GIFT_STEPS[this.stepIndex]) == null ? void 0 : _a.key) ?? "person";
  }
  canAdvance() {
    const key = this.currentStepKey;
    return key === "person" ? !!this.selections.personId || !this.persons.length : key === "occasion" ? !!this.selections.occasionId || !this.occasions.length : key === "budget" ? !!this.selections.budgetId || !this.budgets.length : key === "style" ? !!this.selections.styleId || !this.styles.length : !0;
  }
  goNext() {
    if (this.canAdvance()) {
      if (this.stepIndex >= GIFT_STEPS.length - 1) {
        this.showResult = !0;
        return;
      }
      this.stepIndex += 1;
    }
  }
  goBack() {
    if (this.showResult) {
      this.showResult = !1;
      return;
    }
    this.stepIndex > 0 && (this.stepIndex -= 1);
  }
  reset() {
    this.stepIndex = 0, this.showResult = !1, this.selections = emptySelections();
  }
  get matchedRecipe() {
    return findMatchingRecipe(this.recipes, this.selections);
  }
  renderPersonCard(item) {
    const active = this.selections.personId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ "sgb-card": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, personId: item.id };
    }}
      >
        ${item.icon ? html`<span class="sgb-card__icon">${item.icon}</span>` : nothing}
        <span class="sgb-card__name">${item.name}</span>
      </button>
    `;
  }
  renderOccasionCard(item) {
    const active = this.selections.occasionId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ "sgb-card": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, occasionId: item.id };
    }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderBudgetOption(item) {
    const active = this.selections.budgetId === item.id;
    return html`
      <button
        type="button"
        class=${classMap({ "sgb-option": !0, "fs-tap": !0, "is-active": active })}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, budgetId: item.id };
    }}
      >
        <span class="sgb-option__label">${item.label}</span>
        ${item.rangeText ? html`<p class="sgb-option__range">${item.rangeText}</p>` : nothing}
      </button>
    `;
  }
  renderStyleCard(item) {
    const active = this.selections.styleId === item.id, style = item.color ? { "--item-color": item.color } : {};
    return html`
      <button
        type="button"
        class=${classMap({ "sgb-card": !0, "fs-tap": !0, "is-active": active })}
        style=${styleMap(style)}
        aria-pressed=${active ? "true" : "false"}
        @click=${() => {
      this.selections = { ...this.selections, styleId: item.id };
    }}
      >
        <span class="sgb-card__name">${item.name}</span>
        ${item.desc ? html`<p class="sgb-card__desc">${item.desc}</p>` : nothing}
      </button>
    `;
  }
  renderStepBody() {
    const key = this.currentStepKey, stepMeta = GIFT_STEPS[this.stepIndex];
    return key === "person" ? html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.persons.length ? html`<div class="sgb-grid">${this.persons.map((item) => this.renderPersonCard(item))}</div>` : html`<div class="sgb-step__empty">
                ${t("أضف خيارات الأشخاص من إعدادات العنصر.", "Add person options in element settings.")}
              </div>`}
        </div>
      ` : key === "occasion" ? html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.occasions.length ? html`<div class="sgb-grid">${this.occasions.map((item) => this.renderOccasionCard(item))}</div>` : html`<div class="sgb-step__empty">
                ${t("أضف المناسبات من إعدادات العنصر.", "Add occasions in element settings.")}
              </div>`}
        </div>
      ` : key === "budget" ? html`
        <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
          <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
          ${this.budgets.length ? html`<div class="sgb-list">${this.budgets.map((item) => this.renderBudgetOption(item))}</div>` : html`<div class="sgb-step__empty">
                ${t("أضف خيارات الميزانية من إعدادات العنصر.", "Add budget options in element settings.")}
              </div>`}
        </div>
      ` : html`
      <div class="sgb-step" role="radiogroup" aria-label=${t(stepMeta.labelAr, stepMeta.labelEn)}>
        <h3 class="sgb-step__title">${t(stepMeta.labelAr, stepMeta.labelEn)}</h3>
        ${this.styles.length ? html`<div class="sgb-grid">${this.styles.map((item) => this.renderStyleCard(item))}</div>` : html`<div class="sgb-step__empty">
              ${t("أضف أساليب التغليف من إعدادات العنصر.", "Add presentation styles in element settings.")}
            </div>`}
      </div>
    `;
  }
  renderResult() {
    const c = this.config || {}, labels = parseNavLabels(c), recipe = this.matchedRecipe, person = resolvePerson(this.persons, this.selections.personId), occasion = resolveOccasion(this.occasions, this.selections.occasionId), budget = resolveBudget(this.budgets, this.selections.budgetId), style = resolveStyle(this.styles, this.selections.styleId), accent = (recipe == null ? void 0 : recipe.boxColor) || (style == null ? void 0 : style.color) || "#9a7b4f", wrapText = (recipe == null ? void 0 : recipe.wrapSuggestion) || (style != null && style.name ? t(`تغليف ${style.name}`, `${style.name} wrapping`) : t("تغليف أنيق بشريط ذهبي", "Elegant wrap with a gold ribbon")), messageText = (recipe == null ? void 0 : recipe.message) || buildFallbackGiftSummary(person, occasion, budget, style), scentText = (recipe == null ? void 0 : recipe.scentCharacter) || t("عطر متوازن يناسب ذوق المُهدى إليه", "A balanced scent suited to the recipient");
    return html`
      <article
        class="sgb-result fs-result"
        style=${styleMap({ "--gift-accent": accent })}
        role="region"
        aria-live="polite"
      >
        <div class="sgb-result__box" aria-hidden="true"></div>
        <h3 class="sgb-result__title">${t("صندوق هديتك", "Your gift box")}</h3>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t("التغليف", "Wrapping")}</span>
          <p class="sgb-result__text">${wrapText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t("رسالة الهدية", "Gift message")}</span>
          <p class="sgb-result__text">${messageText}</p>
        </div>

        <div class="sgb-result__block">
          <span class="sgb-result__label">${t("الطابع العطري", "Scent character")}</span>
          <p class="sgb-result__text">${scentText}</p>
        </div>

        <div class="fs-actions">
          <button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.reset}>
            ${labels.reset}
          </button>
        </div>
        ${renderCommerceOutcome({
      config: c,
      prefix: "sgb_",
      ready: !0,
      matchTags: [
        this.selections.personId,
        this.selections.occasionId,
        this.selections.budgetId,
        this.selections.styleId
      ]
    })}
      </article>
    `;
  }
  renderProgress() {
    const total = GIFT_STEPS.length, current = this.showResult ? total : this.stepIndex + 1, percent = Math.round(current / total * 100);
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
  renderWizard() {
    const c = this.config || {}, labels = parseNavLabels(c), isLast = this.stepIndex >= GIFT_STEPS.length - 1, bodyKey = this.showResult ? "result" : `step-${this.stepIndex}`;
    return html`
      <div class="sgb-shell">
        ${this.renderProgress()}

        ${keyed(
      bodyKey,
      html`<div class="fs-fade-swap">
            ${this.showResult ? this.renderResult() : this.renderStepBody()}
          </div>`
    )}

        ${this.showResult ? nothing : html`<div class="fs-nav">
              ${this.stepIndex > 0 ? html`<button type="button" class="fs-btn fs-btn--ghost fs-tap" @click=${this.goBack}>
                    ${labels.back}
                  </button>` : nothing}
              <button
                type="button"
                class="fs-btn fs-tap"
                ?disabled=${!this.canAdvance()}
                aria-disabled=${this.canAdvance() ? "false" : "true"}
                title=${this.canAdvance() ? "" : t("اختر خياراً للمتابعة", "Choose an option to continue")}
                @click=${this.goNext}
              >
                ${isLast ? labels.see : labels.next}
              </button>
            </div>`}
      </div>
    `;
  }
  render() {
    const c = this.config || {}, theme = readSectionTheme(c, "sgb_"), animate = theme.animate && !prefersReducedMotion(), title = localizedString(c.sgb_title), desc = localizedString(c.sgb_desc);
    return html`
      <section
        class=${classMap({ "fs-section": !0, "fs-animate": animate })}
        style=${styleMap(themeStyleMap(theme))}
        aria-label=${title || t("صندوق الهدية الذكي", "Smart gift builder")}
      >
        <div class="fs-container">
          ${title || desc ? html`<div class="fs-header">
                ${title ? html`<h2 class="fs-title">${title}</h2>` : nothing}
                ${desc ? html`<p class="fs-desc">${desc}</p>` : nothing}
              </div>` : nothing}
          ${this.renderWizard()}
        </div>
      </section>
    `;
  }
};
__name(_SmartGiftBuilder, "SmartGiftBuilder"), _SmartGiftBuilder.styles = [sharedSectionCss, componentStyles];
let SmartGiftBuilder = _SmartGiftBuilder;
__decorateClass([
  property({ type: Object })
], SmartGiftBuilder.prototype, "config");
__decorateClass([
  state()
], SmartGiftBuilder.prototype, "stepIndex");
__decorateClass([
  state()
], SmartGiftBuilder.prototype, "showResult");
__decorateClass([
  state()
], SmartGiftBuilder.prototype, "selections");
typeof SmartGiftBuilder < "u" && SmartGiftBuilder.registerSallaComponent("salla-smart-gift-builder");
export {
  SmartGiftBuilder as default
};
