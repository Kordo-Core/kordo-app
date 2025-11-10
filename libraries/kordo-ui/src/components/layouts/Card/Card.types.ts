export interface CardProps {
  /** Contenu de la carte */
  children: React.ReactNode;
  onPress?: () => void;
  isPressable?: boolean;
}
