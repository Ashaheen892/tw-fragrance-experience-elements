import {
  extractImageUrl,
  getRadioValue,
  normalizeCollection,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { TimelineLayout, TimelineStage } from './types.js';

export function resolveLayout(config: Record<string, unknown>): TimelineLayout {
  const value = getRadioValue(config.set_layout, 'horizontal');
  return value === 'vertical' ? 'vertical' : 'horizontal';
}

export function parseStages(raw: unknown): TimelineStage[] {
  return normalizeCollection(raw)
    .map((row, index) => ({
      id: `stage-${index}`,
      label: localizedString(row.label as string),
      timeLabel: localizedString(row.time_label as string),
      desc: localizedString(row.desc as string),
      color: localizedString(row.color as string) || '#9a7b4f',
      image: extractImageUrl(row.image),
    }))
    .filter((stage) => stage.label || stage.timeLabel || stage.desc);
}
