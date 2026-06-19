import { MediaItem } from '../../PostForm.types';

export interface MediaSliderProps {
  media: MediaItem[];
  onAdd?: () => void;
}
