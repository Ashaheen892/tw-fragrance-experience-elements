import {
  extractImageUrl,
  extractLink,
  normalizeCollection,
  toNumber,
  t,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { PromoBanner } from './types.js';

const DEFAULTS: PromoBanner[] = [
  {
    id: 'launch',
    heading: t('إصدار محدود', 'Limited edition'),
    subheading: t('عطور الموسم بتركيبة فاخرة', 'Seasonal scents in a luxurious blend'),
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1400&q=80',
    ctaLabel: t('اكتشف المجموعة', 'Explore collection'),
    ctaLink: '',
    overlayOpacity: 45,
  },
  {
    id: 'gift',
    heading: t('هدايا عطرية', 'Scented gifts'),
    subheading: t('اختيارات أنيقة لكل مناسبة', 'Elegant picks for every occasion'),
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=80',
    ctaLabel: t('تسوّق الهدايا', 'Shop gifts'),
    ctaLink: '',
    overlayOpacity: 45,
  },
];

export function parseBanners(raw: unknown): PromoBanner[] {
  const parsed = normalizeCollection(raw)
    .map((row, index) => ({
      id: `banner-${index}`,
      heading: localizedString(row.heading as string) || localizedString(row.title as string),
      subheading: localizedString(row.subheading as string),
      image: extractImageUrl(row.image),
      ctaLabel: localizedString(row.cta_label as string),
      ctaLink: extractLink(row.cta_link ?? row.link),
      overlayOpacity: Math.max(0, Math.min(100, toNumber(row.overlay_opacity, 45))),
    }))
    .filter((item) => item.image || item.heading);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      heading: item.heading || d.heading,
      subheading: item.subheading || d.subheading,
      ctaLabel: item.ctaLabel || d.ctaLabel,
    };
  });
}
