import { Sector } from '../../../../../../fake_data';

export interface GymMapProps {
  sectors: Sector[];
  selectedSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
}
