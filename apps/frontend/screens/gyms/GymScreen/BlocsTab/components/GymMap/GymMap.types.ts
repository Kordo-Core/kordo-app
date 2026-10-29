import { Sector } from '../../../../../../fake_data';

export interface GymMapProps {
  sectors: Sector[];
  selectedSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
  /** Filtre par couleur de prise affiché sous le plan (design D) */
  grades?: GradeChip[];
  onSelectGrade?: (index: number | null) => void;
}

export interface GradeChip {
  label: string;
  color: string;
  count: number;
  selected: boolean;
}
