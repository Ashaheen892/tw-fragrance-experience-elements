import {
  extractImageUrl,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { IngredientLayout, IngredientStory } from './types.js';

export function resolveLayout(config: Record<string, unknown>): IngredientLayout {
  const value = getRadioValue(config.igs_layout, 'grid');
  return value === 'list' ? 'list' : 'grid';
}

export function parseIngredients(raw: unknown): IngredientStory[] {
  return normalizeCollection(raw)
    .map((row, index) => ({
      id: `ingredient-${index}`,
      name: localizedString(row.name as string),
      shortTeaser: localizedString(row.short_teaser as string),
      story: localizedString(row.story as string),
      origin: localizedString(row.origin as string),
      character: localizedString(row.character as string),
      mood: localizedString(row.mood as string),
      image: extractImageUrl(row.image),
      color: localizedString(row.color as string) || '#9a7b4f',
      icon: localizedString(row.icon as string),
    }))
    .filter(
      (item) =>
        item.name ||
        item.shortTeaser ||
        item.story ||
        item.image
    );
}
