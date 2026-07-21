export type SplitDirection = 'vertical' | 'horizontal';

export interface BeforeAfterSlide {
  id: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}
