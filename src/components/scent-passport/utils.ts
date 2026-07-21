import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
  parseTags,
  t,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type {
  CharacterOption,
  NoteOption,
  PassportNavLabels,
  PassportResult,
  PassportSelections,
  StrengthOption,
  TimeOption,
} from './types.js';

function parseIds(raw: unknown): string[] {
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

export function parseNotes(raw: unknown): NoteOption[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.note_id ?? '').trim() || `note-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      color: String(item.color ?? '').trim(),
      icon: String(item.icon ?? '').trim(),
      image: extractImageUrl(item.image) || extractImageUrl(item.icon),
    }))
    .filter((n) => n.name);
}

export function parseStrengths(raw: unknown): StrengthOption[] {
  return normalizeCollection(raw)
    .map((item, i) => {
      const value = String(item.value ?? item.id ?? item.strength_id ?? '').trim();
      return {
        id: String(item.id ?? item.strength_id ?? value).trim() || `strength-${i + 1}`,
        name: localizedString(item.name as LocaleValue),
        desc: localizedString(item.desc as LocaleValue),
        value: value || `strength-${i + 1}`,
      } satisfies StrengthOption;
    })
    .filter((s) => s.name);
}

export function parseTimes(raw: unknown): TimeOption[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.time_id ?? '').trim() || `time-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
    }))
    .filter((t) => t.name);
}

export function parseCharacters(raw: unknown): CharacterOption[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.character_id ?? '').trim() || `character-${i + 1}`,
      name: localizedString(item.name as LocaleValue),
      desc: localizedString(item.desc as LocaleValue),
      color: String(item.color ?? '').trim(),
      icon: String(item.icon ?? '').trim(),
    }))
    .filter((c) => c.name);
}

export function parsePassportResults(raw: unknown): PassportResult[] {
  return normalizeCollection(raw)
    .map((item, i) => ({
      id: String(item.id ?? item.result_id ?? '').trim() || `result-${i + 1}`,
      summary: localizedString(item.summary as LocaleValue),
      characterIds: parseIds(item.character_id ?? item.character_ids),
      tags: parseTags(item.tags),
    }))
    .filter((r) => r.summary || r.characterIds.length || r.tags.length);
}

export function parseNavLabels(config: Record<string, unknown>): PassportNavLabels {
  return {
    next: localizedString(config.spa_next_btn as LocaleValue) || t('التالي', 'Next'),
    back: localizedString(config.spa_back_btn as LocaleValue) || t('السابق', 'Back'),
    see: localizedString(config.spa_see_btn as LocaleValue) || t('اعرض جوازك', 'See your passport'),
    reset: localizedString(config.spa_reset_btn as LocaleValue) || t('ابدأ من جديد', 'Start over'),
    share:
      localizedString(config.spa_share_btn as LocaleValue) ||
      t('نسخ الملخص', 'Copy summary'),
    passportTitle:
      localizedString(config.spa_passport_title as LocaleValue) ||
      t('جوازك العطري', 'Your scent passport'),
    holderLabel:
      localizedString(config.spa_holder_label as LocaleValue) ||
      t('حامل الجواز', 'Passport holder'),
    ctaLabel:
      localizedString(config.spa_cta_label as LocaleValue) ||
      t('استكشف التوصية', 'Explore recommendation'),
  };
}

export function resolveResultLink(config: Record<string, unknown>): string {
  return extractLink(config.spa_result_link);
}

export function findMatchingResult(
  results: PassportResult[],
  characterId: string,
  characterName: string
): PassportResult | null {
  if (!results.length) return null;

  const byCharacter = results.find((r) => r.characterIds.includes(characterId));
  if (byCharacter) return byCharacter;

  const nameToken = characterName.trim().toLowerCase();
  if (nameToken) {
    const byTag = results.find((r) =>
      r.tags.some((tag) => tag.toLowerCase() === nameToken || nameToken.includes(tag.toLowerCase()))
    );
    if (byTag) return byTag;
  }

  return results[0] ?? null;
}

export function buildGeneratedSummary(
  selections: PassportSelections,
  liked: NoteOption[],
  disliked: NoteOption[],
  strength: StrengthOption | null,
  times: TimeOption[],
  character: CharacterOption | null
): string {
  const parts: string[] = [];

  const likedNames = liked.filter((n) => selections.likedIds.includes(n.id)).map((n) => n.name);
  const dislikedNames = disliked
    .filter((n) => selections.dislikedIds.includes(n.id))
    .map((n) => n.name);
  const timeNames = times.filter((t) => selections.timeIds.includes(t.id)).map((t) => t.name);

  if (character?.name) {
    parts.push(
      t(
        `طابعك العطري: ${character.name}.`,
        `Your scent character: ${character.name}.`
      )
    );
  }

  if (likedNames.length) {
    parts.push(
      t(
        `نوتات تحبها: ${likedNames.join('، ')}.`,
        `Notes you love: ${likedNames.join(', ')}.`
      )
    );
  }

  if (dislikedNames.length) {
    parts.push(
      t(
        `تتجنّب: ${dislikedNames.join('، ')}.`,
        `You avoid: ${dislikedNames.join(', ')}.`
      )
    );
  }

  if (strength?.name) {
    parts.push(
      t(
        `التركيز المفضّل: ${strength.name}.`,
        `Preferred intensity: ${strength.name}.`
      )
    );
  }

  if (timeNames.length) {
    parts.push(
      t(
        `أوقات الارتداء: ${timeNames.join('، ')}.`,
        `Wear times: ${timeNames.join(', ')}.`
      )
    );
  }

  if (!parts.length) {
    return t(
      'أكمل اختياراتك لبناء ملفك العطري الشخصي.',
      'Complete your picks to build your personal scent profile.'
    );
  }

  return parts.join(' ');
}

export function buildShareText(
  summary: string,
  selections: PassportSelections,
  liked: NoteOption[],
  disliked: NoteOption[],
  strength: StrengthOption | null,
  times: TimeOption[],
  character: CharacterOption | null,
  passportTitle: string
): string {
  const header = passportTitle || t('جوازك العطري', 'Your scent passport');
  const body = summary || buildGeneratedSummary(selections, liked, disliked, strength, times, character);
  return `${header}\n\n${body}`;
}

export const PASSPORT_STEPS = [
  { key: 'liked' as const, labelAr: 'النوتات المفضّلة', labelEn: 'Liked notes' },
  { key: 'disliked' as const, labelAr: 'نوتات تتجنّبها', labelEn: 'Notes to avoid' },
  { key: 'strength' as const, labelAr: 'قوّة العطر', labelEn: 'Scent strength' },
  { key: 'times' as const, labelAr: 'أوقات الارتداء', labelEn: 'Wear times' },
  { key: 'character' as const, labelAr: 'طابعك العطري', labelEn: 'Scent character' },
];

export function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export function emptySelections(): PassportSelections {
  return {
    likedIds: [],
    dislikedIds: [],
    strengthId: '',
    timeIds: [],
    characterId: '',
  };
}

export function resolveStrength(
  strengths: StrengthOption[],
  strengthId: string
): StrengthOption | null {
  return strengths.find((s) => s.id === strengthId || s.value === strengthId) ?? null;
}

export function resolveCharacter(
  characters: CharacterOption[],
  characterId: string
): CharacterOption | null {
  return characters.find((c) => c.id === characterId) ?? null;
}
