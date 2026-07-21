import {
  extractImageUrl,
  isDirectMediaUrl,
  normalizeCollection,
  sortByOrder,
  toNumber,
} from '../../utils/helpers.js';
import { localizedString, type LocaleValue } from '../../utils/localizedString.js';
import type { QualityStation } from './types.js';

export function resolveVideoEmbed(url: string): string {
  const trimmed = String(url ?? '').trim();
  if (!trimmed) return '';

  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]+)/i
  );
  if (ytMatch?.[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (isDirectMediaUrl(trimmed)) return trimmed;
  return '';
}

export function parseStations(raw: unknown): QualityStation[] {
  const items = normalizeCollection(raw)
    .map((item, i) => {
      const name = localizedString(item.name as LocaleValue);
      const videoRaw = String(item.video_url ?? item.videoUrl ?? '').trim();
      return {
        id: String(item.id ?? '').trim() || `station-${i + 1}`,
        name,
        shortDesc: localizedString(item.short_desc as LocaleValue),
        detail: localizedString(item.detail as LocaleValue),
        fact: localizedString(item.fact as LocaleValue),
        certificate: localizedString(item.certificate as LocaleValue),
        image: extractImageUrl(item.image),
        videoUrl: resolveVideoEmbed(videoRaw) || videoRaw,
        color: String(item.color ?? '').trim() || '#9a7b4f',
        icon: String(item.icon ?? '').trim(),
        order: toNumber(item.order, i + 1),
      } satisfies QualityStation;
    })
    .filter(
      (station) =>
        station.name ||
        station.shortDesc ||
        station.detail ||
        station.fact ||
        station.image
    );

  return sortByOrder(items, 'order');
}
