export type MeterStyle = 'bars' | 'rings';

export interface PerformanceMetric {
  id: string;
  label: string;
  value: number;
  color: string;
}

export const FIXED_METRIC_KEYS = [
  'longevity',
  'sillage',
  'projection',
  'sweetness',
  'freshness',
  'warmth',
] as const;

export type FixedMetricKey = (typeof FIXED_METRIC_KEYS)[number];
