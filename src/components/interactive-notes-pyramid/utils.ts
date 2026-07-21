import {
  extractImageUrl,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { NoteLayer, PyramidNote, PyramidTier } from './types.js';

const LAYER_KEYS: NoteLayer[] = ['top', 'heart', 'base'];

const DEFAULT_TIER_LABELS: Record<NoteLayer, string> = {
  top: 'Top',
  heart: 'Heart',
  base: 'Base',
};

export function resolveLayer(raw: unknown, fallback: NoteLayer = 'top'): NoteLayer {
  const value = getRadioValue(raw, fallback).toLowerCase();
  return LAYER_KEYS.includes(value as NoteLayer) ? (value as NoteLayer) : fallback;
}

function parseNote(item: Record<string, unknown>, i: number, fallbackLayer: NoteLayer): PyramidNote | null {
  const name = localizedString(item.name as LocaleValue);
  if (!name) return null;
  return {
    id: String(item.id ?? item.note_id ?? '').trim() || `note-${i + 1}`,
    name,
    desc: localizedString(item.desc as LocaleValue),
    icon: String(item.icon ?? '').trim(),
    image: extractImageUrl(item.image) || extractImageUrl(item.icon),
    layer: resolveLayer(item.layer, fallbackLayer),
  };
}

function parseNotesCollection(raw: unknown): PyramidNote[] {
  return normalizeCollection(raw)
    .map((item, i) => parseNote(item, i, resolveLayer(item.layer)))
    .filter((n): n is PyramidNote => n !== null);
}

function tierFromCollection(
  tierItem: Record<string, unknown>,
  key: NoteLayer,
  config: Record<string, unknown>,
  notesByLayer: Map<NoteLayer, PyramidNote[]>
): PyramidTier {
  const tierKey = String(tierItem.key ?? tierItem.tier ?? tierItem.layer ?? key).toLowerCase();
  const layer = LAYER_KEYS.includes(tierKey as NoteLayer) ? (tierKey as NoteLayer) : key;
  const embeddedNotes = normalizeCollection(tierItem.notes)
    .map((item, i) => parseNote(item, i, layer))
    .filter((n): n is PyramidNote => n !== null);

  const label =
    localizedString(tierItem.label as LocaleValue) ||
    localizedString(config[`inp_${layer}_label`] as LocaleValue) ||
    DEFAULT_TIER_LABELS[layer];

  return {
    key: layer,
    label: label || (layer === 'top' ? 'Top' : layer === 'heart' ? 'Heart' : 'Base'),
    desc: localizedString(tierItem.desc as LocaleValue),
    color:
      String(tierItem.color ?? '').trim() ||
      String(config[`inp_${layer}_color`] ?? '').trim(),
    notes: embeddedNotes.length ? embeddedNotes : notesByLayer.get(layer) || [],
  };
}

export function parsePyramidTiers(config: Record<string, unknown>): PyramidTier[] {
  const tiersRaw = normalizeCollection(config.inp_tiers);
  const flatNotes = parseNotesCollection(config.inp_notes);
  const notesByLayer = new Map<NoteLayer, PyramidNote[]>();

  for (const note of flatNotes) {
    const list = notesByLayer.get(note.layer) || [];
    list.push(note);
    notesByLayer.set(note.layer, list);
  }

  if (tiersRaw.length) {
    return LAYER_KEYS.map((key) => {
      const match =
        tiersRaw.find((t) => {
          const k = String(t.key ?? t.tier ?? t.layer ?? '').toLowerCase();
          return k === key;
        }) || {};
      return tierFromCollection(match, key, config, notesByLayer);
    }).filter((tier) => tier.label || tier.desc || tier.notes.length);
  }

  return LAYER_KEYS.map((key) => {
    const labelRaw = config[`inp_${key}_label`];
    const descRaw = config[`inp_${key}_desc`];
    const label =
      localizedString(labelRaw as LocaleValue) ||
      DEFAULT_TIER_LABELS[key];
    return {
      key,
      label,
      desc: localizedString(descRaw as LocaleValue),
      color: String(config[`inp_${key}_color`] ?? '').trim(),
      notes: notesByLayer.get(key) || [],
    } satisfies PyramidTier;
  }).filter((tier) => tier.label || tier.desc || tier.notes.length);
}

export function hasPyramidContent(tiers: PyramidTier[]): boolean {
  return tiers.some((tier) => tier.notes.length > 0 || tier.label || tier.desc);
}
