import { LayoutChangeEvent } from 'react-native';
import { ListRowProps } from '../../layouts/ListRow/ListRow.types';

export interface HeaderProps extends ListRowProps {
  /**
   * When true, the header hides on scroll down and reappears on scroll up.
   * Requires `scrollY` to be provided.
   */
  smart?: boolean;
  /** Current scroll position in pixels, used by the smart hide/show logic */
  scrollY?: number;
  /** Callback fired after the header’s layout is measured (native only) */
  onLayout?: (event: LayoutChangeEvent) => void;
}
