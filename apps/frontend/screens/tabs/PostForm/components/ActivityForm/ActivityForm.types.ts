import { DropdownItem } from 'kordo-ui';
import { MediaItem } from '../../PostForm.types';

export interface ActivityFormProps {
  title: string;
  onTitleChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  photos: MediaItem[];
  onAddMedia: () => void;
  gymId: string | null;
  onGymChange: (v: string | null) => void;
  gymItems: DropdownItem[];
  selectedBlocs: string[];
  onBlocsChange: (v: string[]) => void;
  blocItems: DropdownItem[];
  /** Nombre de blocs validés, jamais inférieur au nombre de blocs cochés */
  blocCount: number;
  onBlocCountChange: (v: number) => void;
  /** Palier de couleur du niveau max (0 jaune … 5 violet, -1 : aucun) */
  maxTier: number;
  /** Plancher imposé par le bloc coché le plus dur (-1 : aucun bloc coché) */
  minTier: number;
  onMaxTierChange: (v: number) => void;
  autoVideos: MediaItem[];
  sessionId: string | null;
  onSessionChange: (v: string | null) => void;
  sessionItems: DropdownItem[];
  discipline: string | null;
  onDisciplineChange: (v: string | null) => void;
  shoes: string | null;
  onShoesChange: (v: string | null) => void;
  visibility: string | null;
  onVisibilityChange: (v: string | null) => void;
  likesEnabled: boolean;
  onLikesChange: (v: boolean) => void;
  commentsEnabled: boolean;
  onCommentsChange: (v: boolean) => void;
  includeMeets: boolean;
  onMeetsChange: (v: boolean) => void;
}
