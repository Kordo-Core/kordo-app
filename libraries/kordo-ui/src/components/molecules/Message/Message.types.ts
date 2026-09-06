import { StyleProp, ViewStyle } from 'react-native';

export interface MessageProps {
  /** `in` = message reçu, gris et à gauche · `out` = message envoyé, coloré et à droite */
  direction: 'in' | 'out';
  /** Texte du message. Pour un média, passer `children` à la place */
  content?: string;
  /** Horodatage affiché sous la bulle, aligné sur son bord extérieur */
  time?: string;
  /** Contenu libre (image, vidéo…). La bulle ne fournit alors que le fond et l'alignement */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
