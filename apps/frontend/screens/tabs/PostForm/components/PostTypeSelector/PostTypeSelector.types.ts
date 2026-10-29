import { PostType } from '../../PostForm.types';

export interface PostTypeSelectorProps {
  value: PostType;
  onChange: (type: PostType) => void;
}

export interface PostTypeDefinition {
  key: PostType;
  label: string;
  icon: string;
}
