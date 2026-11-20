import { ComposedGesture } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';
import { BlocDetail } from '../../../../../../fake_data';
import { RowStatus } from '../../utils/BlocRow.types';

export type BlocSwipeRowProps = {
  id: string;
  detail: BlocDetail;
  status: RowStatus;
  gesture: ComposedGesture; // glisser et toucher, propres à la ligne
  getInitialOffset: (id: string) => number; // offset initial au montage (miroir JS)
  activeId: SharedValue<string>;
  activeDragX: SharedValue<number>;
  register: (id: string, sv: SharedValue<number>) => void;
  unregister: (id: string) => void;
};
