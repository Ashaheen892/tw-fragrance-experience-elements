import {
  clamp,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CompassLabels, CompassPoint } from './types.js';

export function parseLabels(config: Record<string, unknown>): CompassLabels {
  return {
    xLeft: localizedString(config.smc_x_left as string) || 'Fresh',
    xRight: localizedString(config.smc_x_right as string) || 'Warm',
    yTop: localizedString(config.smc_y_top as string) || 'Soft',
    yBottom: localizedString(config.smc_y_bottom as string) || 'Strong',
  };
}

export function parsePoints(raw: unknown): CompassPoint[] {
  return normalizeCollection(raw)
    .map((row, index) => ({
      id: `point-${index}`,
      name: localizedString(row.name as string),
      desc: localizedString(row.desc as string),
      x: clamp(toNumber(row.x, 50), 0, 100),
      y: clamp(toNumber(row.y, 50), 0, 100),
      color: localizedString(row.color as string) || '#9a7b4f',
    }))
    .filter((point) => point.name || point.desc);
}
