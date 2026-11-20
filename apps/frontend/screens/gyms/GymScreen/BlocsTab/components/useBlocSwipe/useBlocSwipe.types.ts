import { ComposedGesture } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';
import { RowStatus } from '../../utils/BlocRow.types';

export type UseBlocSwipeParams = {
  initialValidated: Set<string>; // blocs déjà validés à l'arrivée sur la page
  screenWidth: number;
  onSelect: (id: string) => void; // tap sur une ligne fermée → sélection du bloc (par id)
  onStatusChange?: (id: string, status: RowStatus) => void;
};

export type UseBlocSwipeReturn = {
  gestureFor: (id: string) => ComposedGesture; // glisser et toucher, propres à chaque ligne
  statuses: Record<string, RowStatus>;
  getInitialOffset: (id: string) => number; // offset initial (miroir JS, lisible au render)
  activeId: SharedValue<string>;
  activeDragX: SharedValue<number>;
  register: (id: string, sv: SharedValue<number>) => void;
  unregister: (id: string) => void;
};
