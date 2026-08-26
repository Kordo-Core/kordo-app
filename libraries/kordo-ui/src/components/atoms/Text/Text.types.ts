import { Text as ReactText, TextProps as ReactTextProps } from 'react-native';

import {
  AppearanceType,
  ExtendedSizeType,
  NeutralType,
  StatusType,
} from '../../..//types/theme.types';

export interface TextProps extends ReactTextProps {
  children: React.ReactNode;
  /**
   * Nœud sous-jacent, pour le mesurer ou lui donner le focus. React 19 passe `ref` comme une
   * prop ordinaire aux composants fonction : le `{...props}` du composant suffit à la
   * transmettre jusqu'au `Text` de react-native, il n'y a rien de plus à câbler.
   */
  ref?: React.Ref<React.ComponentRef<typeof ReactText>>;
  appearance?: AppearanceType | NeutralType | StatusType;
  size?: ExtendedSizeType | number;
  bold?: boolean;
  extraBold?: boolean;
}
