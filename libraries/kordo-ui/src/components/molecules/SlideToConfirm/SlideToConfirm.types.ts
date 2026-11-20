import { StyleProp, ViewStyle } from 'react-native';

export interface SlideToConfirmProps {
  /** Libellé affiché dans la piste (en majuscules) */
  label: string;
  /** Libellé affiché une fois l'action confirmée */
  doneLabel?: string;
  /** Appelé quand le curseur atteint le bout de la piste */
  onConfirm: () => void;
  /** Revient à l'état initial après ce délai (ms). 0 = reste confirmé. */
  resetAfter?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
