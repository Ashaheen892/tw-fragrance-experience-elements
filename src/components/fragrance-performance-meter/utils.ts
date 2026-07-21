import {
  clamp,
  getRadioValue,
  normalizeCollection,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import {
  FIXED_METRIC_KEYS,
  type FixedMetricKey,
  type MeterStyle,
  type PerformanceMetric,
} from './types.js';

const STYLES: MeterStyle[] = ['bars', 'rings'];

const DEFAULT_LABELS: Record<FixedMetricKey, { ar: string; en: string }> = {
  longevity: { ar: 'الثبات', en: 'Longevity' },
  sillage: { ar: 'الأريج المحيط', en: 'Sillage' },
  projection: { ar: 'الانتشار', en: 'Projection' },
  sweetness: { ar: 'الحلاوة', en: 'Sweetness' },
  freshness: { ar: 'الانتعاش', en: 'Freshness' },
  warmth: { ar: 'الدفء', en: 'Warmth' },
};

export function resolveMeterStyle(config: Record<string, unknown>): MeterStyle {
  const value = getRadioValue(config.fpm_style, 'bars') as MeterStyle;
  return STYLES.includes(value) ? value : 'bars';
}

function metricValue(raw: unknown): number {
  return clamp(toNumber(raw, 0), 0, 100);
}

export function parseMetrics(config: Record<string, unknown>): PerformanceMetric[] {
  const collection = normalizeCollection(config.fpm_metrics);
  if (collection.length) {
    return collection
      .map((item, i) => {
        const label = localizedString(item.label as LocaleValue);
        const value = metricValue(item.value);
        return {
          id: String(item.id ?? item.metric_id ?? '').trim() || `metric-${i + 1}`,
          label,
          value,
          color: String(item.color ?? '').trim(),
        } satisfies PerformanceMetric;
      })
      .filter((m) => m.label || m.value > 0);
  }

  return FIXED_METRIC_KEYS.flatMap((key) => {
    const fieldValue = config[`fpm_${key}`];
    const value = metricValue(fieldValue);
    const labelRaw = config[`fpm_${key}_label`];
    const customLabel = localizedString(labelRaw as LocaleValue);
    if (value <= 0 && !customLabel && fieldValue == null) return [];
    return [
      {
        id: key,
        label: customLabel || DEFAULT_LABELS[key].ar,
        value,
        color: String(config[`fpm_${key}_color`] ?? '').trim(),
      } satisfies PerformanceMetric,
    ];
  });
}

export function hasMetrics(metrics: PerformanceMetric[]): boolean {
  return metrics.length > 0;
}

export function ringDashOffset(value: number, radius = 42): string {
  const circumference = 2 * Math.PI * radius;
  const filled = (value / 100) * circumference;
  return String(circumference - filled);
}

export function ringCircumference(radius = 42): number {
  return 2 * Math.PI * radius;
}
