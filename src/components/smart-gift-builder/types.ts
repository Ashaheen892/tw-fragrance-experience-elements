export interface GiftPerson {
  id: string;
  name: string;
  icon: string;
}

export interface GiftOccasion {
  id: string;
  name: string;
  desc: string;
}

export interface GiftBudget {
  id: string;
  label: string;
  rangeText: string;
}

export interface GiftStyle {
  id: string;
  name: string;
  desc: string;
  color: string;
}

export interface GiftRecipe {
  id: string;
  personIds: string[];
  occasionIds: string[];
  budgetIds: string[];
  styleIds: string[];
  wrapSuggestion: string;
  message: string;
  boxColor: string;
  scentCharacter: string;
}

export interface GiftSelections {
  personId: string;
  occasionId: string;
  budgetId: string;
  styleId: string;
}

export type GiftStepKey = 'person' | 'occasion' | 'budget' | 'style';

export interface GiftNavLabels {
  next: string;
  back: string;
  see: string;
  reset: string;
  ctaLabel: string;
}
