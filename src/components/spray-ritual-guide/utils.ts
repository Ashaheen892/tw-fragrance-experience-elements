import {
  clamp,
  getRadioValue,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { getPageLocale, localizedString } from '../../utils/localizedString.js';
import type { RitualIntensity, SprayRitual, SprayZone } from './types.js';

const INTENSITY_LABELS: Record<
  Exclude<RitualIntensity, 'custom'>,
  { ar: string; en: string }
> = {
  light: { ar: 'خفيف', en: 'Light' },
  daily: { ar: 'يومي', en: 'Daily' },
  strong: { ar: 'قوي', en: 'Strong' },
  event: { ar: 'مناسبة', en: 'Event' },
};

function isEn(): boolean {
  return getPageLocale() === 'en';
}

export function resolveIntensity(raw: unknown): {
  key: RitualIntensity;
  label: string;
} {
  const value = getRadioValue(raw, 'daily').toLowerCase().trim();
  if (value in INTENSITY_LABELS) {
    const key = value as Exclude<RitualIntensity, 'custom'>;
    return { key, label: isEn() ? INTENSITY_LABELS[key].en : INTENSITY_LABELS[key].ar };
  }
  const num = toNumber(value, NaN);
  if (Number.isFinite(num)) {
    return { key: 'custom', label: String(num) };
  }
  return { key: 'daily', label: isEn() ? INTENSITY_LABELS.daily.en : INTENSITY_LABELS.daily.ar };
}

export function parseRituals(raw: unknown): SprayRitual[] {
  return normalizeCollection(raw)
    .map((row, index) => {
      const intensity = resolveIntensity(row.intensity);
      return {
        id: `ritual-${index}`,
        name: localizedString(row.name as string),
        intensity: intensity.key,
        intensityLabel: intensity.label,
        spraysCount: Math.max(0, toNumber(row.sprays_count, 0)),
        zones: localizedString(row.zones as string),
        distance: localizedString(row.distance as string),
        tips: localizedString(row.tips as string),
        color: localizedString(row.color as string) || '#9a7b4f',
      } as SprayRitual;
    })
    .filter((ritual) => ritual.name || ritual.zones || ritual.tips);
}

export function parseZones(raw: unknown): SprayZone[] {
  return normalizeCollection(raw)
    .map((row, index) => ({
      id: `zone-${index}`,
      label: localizedString(row.label as string),
      x: clamp(toNumber(row.x, 50), 0, 100),
      y: clamp(toNumber(row.y, 50), 0, 100),
      tip: localizedString(row.tip as string),
    }))
    .filter((zone) => zone.label || zone.tip);
}
