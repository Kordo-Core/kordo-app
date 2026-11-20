import { StyleProp, ViewStyle } from 'react-native';

export interface LiveBadgeProps {
  /** Texte de la pastille, par exemple « 47 en séance » */
  label: string;
  style?: StyleProp<ViewStyle>;
}
