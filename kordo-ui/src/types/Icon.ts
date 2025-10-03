import { FontAwesome } from '@expo/vector-icons';
import { theme } from 'theme';

export interface IconProps {
  name: keyof typeof FontAwesome.glyphMap;
  position?: 'left' | 'right';
}
