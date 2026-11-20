import { ReactNode } from 'react';
import { BlocDetail } from '../../../../fake_data';

export type BlocsTabProps = {
  gymId: string;
  /** En-tête de la page salle, identique sur Classement et Les blocs */
  header: ReactNode;
  onBoulderSelected: (bloc: BlocDetail) => void;
};
