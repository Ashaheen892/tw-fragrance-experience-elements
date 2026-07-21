import {
  extractImageUrl,
  getRadioValue,
  normalizeCollection,
  t,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { BeforeAfterSlide, SplitDirection } from './types.js';

const DEFAULTS: BeforeAfterSlide[] = [
  {
    id: 'layering',
    beforeImage:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: t('قبل', 'Before'),
    afterLabel: t('بعد', 'After'),
    caption: t('طبقة عطرية أغنى', 'Richer scent layering'),
  },
  {
    id: 'evolution',
    beforeImage:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80',
    beforeLabel: t('افتتاحية', 'Opening'),
    afterLabel: t('قاعدة', 'Base'),
    caption: t('تطور الرائحة عبر الساعات', 'Scent evolution over hours'),
  },
];

export function resolveDirection(config: Record<string, unknown>): SplitDirection {
  const value = getRadioValue(config.sba_direction, 'vertical');
  return value === 'horizontal' ? 'horizontal' : 'vertical';
}

export function parseSlides(raw: unknown): BeforeAfterSlide[] {
  const parsed = normalizeCollection(raw)
    .map((row, index) => ({
      id: `slide-${index}`,
      beforeImage: extractImageUrl(row.before_image),
      afterImage: extractImageUrl(row.after_image),
      beforeLabel: localizedString(row.before_label as string) || '',
      afterLabel: localizedString(row.after_label as string) || '',
      caption: localizedString(row.caption as string),
    }))
    .filter((item) => item.beforeImage || item.afterImage || item.caption);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      beforeImage: item.beforeImage || d.beforeImage,
      afterImage: item.afterImage || d.afterImage,
      beforeLabel: item.beforeLabel || d.beforeLabel,
      afterLabel: item.afterLabel || d.afterLabel,
      caption: item.caption || d.caption,
    };
  });
}
