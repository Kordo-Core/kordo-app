import { DropdownItem } from 'kordo-ui';

export interface NowFormProps {
  gymId: string | null;
  onGymChange: (v: string | null) => void;
  gymItems: DropdownItem[];
  visibility: string | null;
  onVisibilityChange: (v: string | null) => void;
}
