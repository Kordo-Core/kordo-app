import { BlocDetail } from '../../../../fake_data';
import { CardGeometry } from '../utils/CardGeometry.types';

export type BlocsTabProps = {
  gymId: string;
  geometry: CardGeometry;
  onBoulderSelected: (bloc: BlocDetail) => void;
};
