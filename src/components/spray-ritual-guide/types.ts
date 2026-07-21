export type RitualIntensity = 'light' | 'daily' | 'strong' | 'event' | 'custom';

export interface SprayZone {
  id: string;
  label: string;
  x: number;
  y: number;
  tip: string;
}

export interface SprayRitual {
  id: string;
  name: string;
  intensity: RitualIntensity;
  intensityLabel: string;
  spraysCount: number;
  zones: string;
  distance: string;
  tips: string;
  color: string;
}
