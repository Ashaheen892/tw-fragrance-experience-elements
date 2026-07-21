import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
  parseTags,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { ScentScene } from './types.js';

export function parseScenes(raw: unknown): ScentScene[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.scene_id ?? '').trim() || `scene-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
      scentCharacter: localizedString(item.scent_character as LocaleValue),
      moodTags: parseTags(item.mood_tags ?? item.tags),
      image: extractImageUrl(item.image) || extractImageUrl(item.bg),
      color: String(item.color ?? '').trim(),
      accent: String(item.accent ?? item.accent_color ?? '').trim(),
      link: extractLink(item.link),
    }))
    .filter((s) => s.name || s.desc || s.image);
}
