export interface NoteOption {
  id: string;
  name: string;
  color: string;
  icon: string;
  image: string;
}

export interface StrengthOption {
  id: string;
  name: string;
  desc: string;
  value: string;
}

export interface TimeOption {
  id: string;
  name: string;
}

export interface CharacterOption {
  id: string;
  name: string;
  desc: string;
  color: string;
  icon: string;
}

export interface PassportResult {
  id: string;
  summary: string;
  characterIds: string[];
  tags: string[];
}

export interface PassportSelections {
  likedIds: string[];
  dislikedIds: string[];
  strengthId: string;
  timeIds: string[];
  characterId: string;
}

export type PassportStepKey = 'liked' | 'disliked' | 'strength' | 'times' | 'character';

export interface PassportNavLabels {
  next: string;
  back: string;
  see: string;
  reset: string;
  share: string;
  passportTitle: string;
  holderLabel: string;
  ctaLabel: string;
}
