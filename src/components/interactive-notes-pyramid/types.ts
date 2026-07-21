export type NoteLayer = 'top' | 'heart' | 'base';

export interface PyramidNote {
  id: string;
  name: string;
  desc: string;
  icon: string;
  image: string;
  layer: NoteLayer;
}

export interface PyramidTier {
  key: NoteLayer;
  label: string;
  desc: string;
  color: string;
  notes: PyramidNote[];
}
