export interface CardProps {
  /** Content rendered inside the card */
  children: React.ReactNode;
  /** Callback fired when the card is pressed (only active when `isPressable` is true) */
  onPress?: () => void;
  /** Enables bounce animation and press interaction */
  isPressable?: boolean;
}
