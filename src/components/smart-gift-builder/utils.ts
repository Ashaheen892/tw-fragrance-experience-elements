import { extractLink, normalizeCollection, t } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  GiftBudget,
  GiftNavLabels,
  GiftOccasion,
  GiftPerson,
  GiftRecipe,
  GiftSelections,
  GiftStyle,
} from './types.js';

function parseMatchIds(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return String(obj.id ?? obj.value ?? obj.key ?? '').trim();
        }
        return '';
      })
      .filter(Boolean);
  }
  const text = String(raw ?? '').trim();
  if (!text) return [];
  return text
    .split(/[,،|/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function parsePersons(raw: unknown): GiftPerson[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.person_id ?? '').trim() || `person-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      icon: String(item.icon ?? '').trim(),
    }))
    .filter((p) => p.name);
}

export function parseOccasions(raw: unknown): GiftOccasion[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.occasion_id ?? '').trim() || `occasion-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
    }))
    .filter((o) => o.name);
}

export function parseBudgets(raw: unknown): GiftBudget[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.budget_id ?? '').trim() || `budget-${i + 1}`,
      label: localizedString(item.label as LocaleValue) || localizedString(item.name as LocaleValue),
      rangeText:
        localizedString(item.range_text as LocaleValue) ||
        localizedString(item.range as LocaleValue) ||
        localizedString(item.desc as LocaleValue),
    }))
    .filter((b) => b.label);
}

export function parseStyles(raw: unknown): GiftStyle[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.style_id ?? '').trim() || `style-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
      color: String(item.color ?? '').trim(),
    }))
    .filter((s) => s.name);
}

export function parseRecipes(raw: unknown): GiftRecipe[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.recipe_id ?? '').trim() || `recipe-${i + 1}`,
      personIds: parseMatchIds(item.person_id ?? item.person_ids),
      occasionIds: parseMatchIds(item.occasion_id ?? item.occasion_ids),
      budgetIds: parseMatchIds(item.budget_id ?? item.budget_ids),
      styleIds: parseMatchIds(item.style_id ?? item.style_ids),
      wrapSuggestion: localizedString(item.wrap_suggestion as LocaleValue),
      message: localizedString(item.message as LocaleValue),
      boxColor: String(item.box_color ?? item.color ?? '').trim(),
      scentCharacter: localizedString(item.scent_character as LocaleValue),
    }))
    .filter(
      (r) =>
        r.wrapSuggestion ||
        r.message ||
        r.scentCharacter ||
        r.personIds.length ||
        r.occasionIds.length
    );
}

export function parseNavLabels(config: Record<string, unknown>): GiftNavLabels {
  return {
    next: localizedString(config.sgb_next_btn as LocaleValue) || t('التالي', 'Next'),
    back: localizedString(config.sgb_back_btn as LocaleValue) || t('السابق', 'Back'),
    see: localizedString(config.sgb_see_btn as LocaleValue) || t('اعرض الهدية', 'See your gift'),
    reset: localizedString(config.sgb_reset_btn as LocaleValue) || t('ابدأ من جديد', 'Start over'),
    ctaLabel:
      localizedString(config.sgb_cta_label as LocaleValue) ||
      t('استكشف التوصية', 'Explore recommendation'),
  };
}

export function resolveResultLink(config: Record<string, unknown>): string {
  return extractLink(config.sgb_result_link);
}

export function findMatchingRecipe(
  recipes: GiftRecipe[],
  selections: GiftSelections
): GiftRecipe | null {
  if (!recipes.length) return null;

  const { personId, occasionId, budgetId, styleId } = selections;

  const exact = recipes.find((recipe) => {
    const personOk = !recipe.personIds.length || recipe.personIds.includes(personId);
    const occasionOk = !recipe.occasionIds.length || recipe.occasionIds.includes(occasionId);
    const budgetOk = !recipe.budgetIds.length || recipe.budgetIds.includes(budgetId);
    const styleOk = !recipe.styleIds.length || recipe.styleIds.includes(styleId);
    return personOk && occasionOk && budgetOk && styleOk && recipe.personIds.length > 0;
  });
  if (exact) return exact;

  let best: GiftRecipe | null = null;
  let bestScore = -1;

  for (const recipe of recipes) {
    let score = 0;
    if (personId && recipe.personIds.includes(personId)) score += 4;
    else if (!recipe.personIds.length) score += 1;

    if (occasionId && recipe.occasionIds.includes(occasionId)) score += 3;
    else if (!recipe.occasionIds.length) score += 1;

    if (styleId && recipe.styleIds.includes(styleId)) score += 2;
    else if (!recipe.styleIds.length) score += 1;

    if (budgetId && recipe.budgetIds.includes(budgetId)) score += 2;
    else if (!recipe.budgetIds.length) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = recipe;
    }
  }

  return best;
}

export function buildFallbackGiftSummary(
  person: GiftPerson | null,
  occasion: GiftOccasion | null,
  budget: GiftBudget | null,
  style: GiftStyle | null
): string {
  const parts: string[] = [];

  if (person?.name) {
    parts.push(t(`لـ ${person.name}`, `For ${person.name}`));
  }
  if (occasion?.name) {
    parts.push(t(`مناسبة: ${occasion.name}`, `Occasion: ${occasion.name}`));
  }
  if (budget?.label) {
    parts.push(
      t(
        `الميزانية: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ''}`,
        `Budget: ${budget.label}${budget.rangeText ? ` (${budget.rangeText})` : ''}`
      )
    );
  }
  if (style?.name) {
    parts.push(t(`الأسلوب: ${style.name}`, `Style: ${style.name}`));
  }

  if (!parts.length) {
    return t(
      'اختر التفاصيل لبناء صندوق هدية عطري مخصّص.',
      'Pick details to build a custom fragrance gift box.'
    );
  }

  return parts.join(' · ');
}

export const GIFT_STEPS = [
  { key: 'person' as const, labelAr: 'لمن الهدية؟', labelEn: 'Who is it for?' },
  { key: 'occasion' as const, labelAr: 'المناسبة', labelEn: 'Occasion' },
  { key: 'budget' as const, labelAr: 'الميزانية', labelEn: 'Budget' },
  { key: 'style' as const, labelAr: 'أسلوب التغليف', labelEn: 'Presentation style' },
];

export function emptySelections(): GiftSelections {
  return {
    personId: '',
    occasionId: '',
    budgetId: '',
    styleId: '',
  };
}

export function resolvePerson(persons: GiftPerson[], id: string): GiftPerson | null {
  return persons.find((p) => p.id === id) ?? null;
}

export function resolveOccasion(occasions: GiftOccasion[], id: string): GiftOccasion | null {
  return occasions.find((o) => o.id === id) ?? null;
}

export function resolveBudget(budgets: GiftBudget[], id: string): GiftBudget | null {
  return budgets.find((b) => b.id === id) ?? null;
}

export function resolveStyle(styles: GiftStyle[], id: string): GiftStyle | null {
  return styles.find((s) => s.id === id) ?? null;
}
