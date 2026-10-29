import { DropdownItem } from 'kordo-ui';
import { MediaItem } from '../../PostForm.types';

export interface ActivityFormProps {
  title: string;
  onTitleChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  gymId: string | null;
  onGymChange: (v: string | null) => void;
  gymItems: DropdownItem[];
  selectedBlocs: string[];
  onBlocsChange: (v: string[]) => void;
  blocItems: DropdownItem[];
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
