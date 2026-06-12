import { ComposedGesture } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';
import { BlocRow, RowStatus } from '../../utils/BlocRow.types';
import { CardGeometry } from '../../../utils/CardGeometry.types';

export type UseBlocSwipeParams = {
  blocsData: BlocRow[];
  scrollY: SharedValue<number>;
  geometry: CardGeometry;
  innerScroll: number;
  screenWidth: number;
  onSelect: (id: string) => void; // tap sur une ligne fermée → sélection du bloc (par id)
};

export type UseBlocSwipeReturn = {
  gesture: ComposedGesture;
  statuses: Record<string, RowStatus>;
  onRowLayout: (key: string, height: number) => void;
  getInitialOffset: (id: string) => number; // offset initial (miroir JS, lisible au render)
  activeId: SharedValue<string>;
  activeDragX: SharedValue<number>;
  register: (id: string, sv: SharedValue<number>) => void;
  unregister: (id: string) => void;
};
