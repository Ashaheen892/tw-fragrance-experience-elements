import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { OccasionGuide } from './types.js';

export function parseOccasions(raw: unknown): OccasionGuide[] {
  return normalizeCollection(raw)
    .map((row, index) => ({
      id: `occasion-${index}`,
      name: localizedString(row.name as string),
      desc: localizedString(row.desc as string),
      scentProfile: localizedString(row.scent_profile as string),
      image: extractImageUrl(row.image),
      color: localizedString(row.color as string) || '#9a7b4f',
      link: extractLink(row.link),
    }))
    .filter((item) => item.name || item.desc || item.scentProfile);
}
