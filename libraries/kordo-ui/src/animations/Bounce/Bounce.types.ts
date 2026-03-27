export interface BounceProps {
  children: React.ReactNode;
  /** Target scale when pressed (0.8 = strong, 1 = no effect) */
  scaleTo?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Callback fired on press */
  onPress?: () => void;
  /** Custom styles applied to the wrapper */
  style?: any;
  /** Disables interaction and animation */
  disabled?: boolean;
}
