import { normalizeCollection } from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { LayeringRecipe } from './types.js';

export function parseRecipes(raw: unknown): LayeringRecipe[] {
  return normalizeCollection(raw)
    .map((item, i) => {
      const title = localizedString(item.title as LocaleValue);
      const noteA = localizedString(item.note_a as LocaleValue);
      const noteB = localizedString(item.note_b as LocaleValue);
      const result = localizedString(item.result as LocaleValue);
      return {
        id: String(item.id ?? item.recipe_id ?? '').trim() || `recipe-${i + 1}`,
        title,
        noteA,
        noteB,
        noteC: localizedString(item.note_c as LocaleValue),
        result,
        occasion: localizedString(item.occasion as LocaleValue),
        howTo: localizedString(item.how_to as LocaleValue),
        color: String(item.color ?? item.accent_color ?? '').trim(),
      } satisfies LayeringRecipe;
    })
    .filter((r) => r.title || r.noteA || r.noteB || r.result);
}
