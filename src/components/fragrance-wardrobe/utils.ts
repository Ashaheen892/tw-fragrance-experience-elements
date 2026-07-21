import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
  sortByOrder,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { WardrobeSlot } from './types.js';

export function parseSlots(raw: unknown): WardrobeSlot[] {
  const items = normalizeCollection(raw)
    .map((item, i) => {
      const name = localizedString(item.name as LocaleValue);
      return {
        id: String(item.id ?? '').trim() || `slot-${i + 1}`,
        name,
        desc: localizedString(item.desc as LocaleValue),
        icon: String(item.icon ?? '').trim(),
        image: extractImageUrl(item.image),
        color: String(item.color ?? '').trim() || '#9a7b4f',
        link: extractLink(item.link),
        order: toNumber(item.order, i + 1),
      } satisfies WardrobeSlot;
    })
    .filter((slot) => slot.name || slot.desc || slot.image);

  return sortByOrder(items, 'order');
}
