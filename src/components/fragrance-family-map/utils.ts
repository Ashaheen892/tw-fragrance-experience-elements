import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { FamilyMapLayout, FragranceFamilyItem } from './types.js';

const LAYOUTS: FamilyMapLayout[] = ['wheel', 'grid'];

export function parseFamilies(raw: unknown): FragranceFamilyItem[] {
  return normalizeCollection(raw)
    .map((item, i) => {
      const name = localizedString(item.name as LocaleValue);
      return {
        id: String(item.id ?? item.family_id ?? '').trim() || `family-${i + 1}`,
        name,
        desc: localizedString(item.desc as LocaleValue),
        color: String(item.color ?? '').trim(),
        icon: String(item.icon ?? '').trim(),
        image: extractImageUrl(item.image),
        link: extractLink(item.link),
      } satisfies FragranceFamilyItem;
    })
    .filter((f) => f.name || f.desc);
}

export function resolveLayout(config: Record<string, unknown>): FamilyMapLayout {
  const value = getRadioValue(config.ffm_layout, 'grid') as FamilyMapLayout;
  return LAYOUTS.includes(value) ? value : 'grid';
}
