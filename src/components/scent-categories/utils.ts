import {
  extractImageUrl,
  extractLink,
  getRadioValue,
  normalizeCollection,
  t,
} from '../../utils/helpers.js';
import { localizedString } from '../../utils/localizedString.js';
import type { CategoryLayout, ScentCategory } from './types.js';

const DEFAULTS: ScentCategory[] = [
  {
    id: 'floral',
    name: t('زهور', 'Floral'),
    description: t('باقات ناعمة وأنيقة', 'Soft elegant bouquets'),
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    color: '#9a7b4f',
    icon: '',
    link: '',
  },
  {
    id: 'woody',
    name: t('خشبي', 'Woody'),
    description: t('دفء الأخشاب والتوابل', 'Warm woods & spice'),
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80',
    color: '#9a7b4f',
    icon: '',
    link: '',
  },
  {
    id: 'oriental',
    name: t('شرقي', 'Oriental'),
    description: t('عنبر ومسك فاخر', 'Amber & luxurious musk'),
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    color: '#9a7b4f',
    icon: '',
    link: '',
  },
  {
    id: 'fresh',
    name: t('منعش', 'Fresh'),
    description: t('حمضيات ونسيم نظيف', 'Citrus & clean breeze'),
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    color: '#9a7b4f',
    icon: '',
    link: '',
  },
];

export function resolveLayout(config: Record<string, unknown>): CategoryLayout {
  const value = getRadioValue(config.scat_layout, 'slider');
  return value === 'grid' ? 'grid' : 'slider';
}

export function parseCategories(raw: unknown): ScentCategory[] {
  const parsed = normalizeCollection(raw)
    .map((row, index) => ({
      id: `category-${index}`,
      name: localizedString(row.name as string) || localizedString(row.title as string),
      description: localizedString(row.description as string),
      image: extractImageUrl(row.image),
      color: localizedString(row.color as string) || '#9a7b4f',
      icon: localizedString(row.icon as string),
      link: extractLink(row.link),
    }))
    .filter((item) => item.name || item.image);

  if (!parsed.length) return DEFAULTS.map((d) => ({ ...d }));
  return parsed.map((item, i) => {
    const d = DEFAULTS[i % DEFAULTS.length];
    return {
      ...item,
      image: item.image || d.image,
      name: item.name || d.name,
      description: item.description || d.description,
    };
  });
}
