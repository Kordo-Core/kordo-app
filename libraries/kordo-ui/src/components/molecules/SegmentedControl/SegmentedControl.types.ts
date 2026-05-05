import { SizeType } from 'types/theme.types';

export interface SegmentedControlProps {
  /** Array of segment labels */
  segments: { text: string; color?: string }[];
  /** Index of the currently selected segment */
  selectedIndex: number;
  /** Callback function when a segment is selected */
  onSelect: (index: number) => void;
  size?: Exclude<SizeType, 'sm'>;
  borderRadius?: 'rounded' | 'square';
  // TODO: add inverted prop to swap styles
}
