import { MediaItem } from '../../PostForm.types';

export interface PublicationFormProps {
  title: string;
  onTitleChange: (v: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  photos: MediaItem[];
  onAdd: () => void;
  visibility: string | null;
  onVisibilityChange: (v: string | null) => void;
  likesEnabled: boolean;
  onLikesChange: (v: boolean) => void;
  commentsEnabled: boolean;
  onCommentsChange: (v: boolean) => void;
}
