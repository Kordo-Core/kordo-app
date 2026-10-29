import { SharedValue } from 'react-native-reanimated';
import { RankingEntry } from '../../../../../../fake_data';
import { CardGeometry } from '../../../utils/CardGeometry.types';

export type PodiumStep = { entry: RankingEntry; bar: number; delay: number; label: string };

export type PodiumProps = {
  podium: PodiumStep[];
  scrollY: SharedValue<number>;
  geometry: CardGeometry;
};
