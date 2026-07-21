export type TimelineLayout = 'horizontal' | 'vertical';

export interface TimelineStage {
  id: string;
  label: string;
  timeLabel: string;
  desc: string;
  color: string;
  image: string;
}
