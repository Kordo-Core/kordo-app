import { Feather } from '@expo/vector-icons';
import { theme } from 'theme';

export interface IconProps {
  name: keyof typeof Feather.glyphMap;
  position?: 'left' | 'right';
}
