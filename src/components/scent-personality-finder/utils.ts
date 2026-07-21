import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { ScentPersonality } from './types.js';

export function parsePersonalities(raw: unknown): ScentPersonality[] {
  return normalizeCollection(raw)
    .map((item, i) => {
      const name = localizedString(item.name as LocaleValue);
      return {
        id: String(item.id ?? item.personality_id ?? '').trim() || `personality-${i + 1}`,
        name,
        desc: localizedString(item.desc as LocaleValue),
        icon: String(item.icon ?? '').trim(),
        image: extractImageUrl(item.image) || extractImageUrl(item.icon),
        color: String(item.color ?? '').trim(),
        resultFamily: localizedString(item.result_family as LocaleValue),
        resultDesc: localizedString(item.result_desc as LocaleValue),
        link: extractLink(item.link),
      } satisfies ScentPersonality;
    })
    .filter((p) => p.name || p.desc);
}
