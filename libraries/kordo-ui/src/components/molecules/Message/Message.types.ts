import { StyleProp, ViewStyle } from 'react-native';

export interface MessageProps {
  /** `in` = message reçu, gris et à gauche · `out` = message envoyé, coloré et à droite */
  direction: 'in' | 'out';
  /** Texte du message. Pour un média, passer `children` à la place */
  content?: string;
  /** Horodatage affiché sous la bulle, aligné sur son bord extérieur */
  time?: string;
  /** Le message suivant vient du même auteur : coins vifs aussi en haut, côté émetteur */
  continued?: boolean;
  /** Affiche le petit cœur accroché à la bulle */
  liked?: boolean;
  /** Double tap sur la bulle */
  onLike?: () => void;
  /** Contenu libre (image, vidéo…). La bulle ne fournit alors que le fond et l'alignement */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
