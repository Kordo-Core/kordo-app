import { StyleProp, ViewStyle } from 'react-native';
import { UserPublic } from 'core';

export interface MeetSuggestion {
  user: UserPublic;
  /** Lieu de la rencontre */
  subtitle?: string;
}

export interface MeetSuggestionsProps {
  suggestions: MeetSuggestion[];
  onPressUser?: (user: UserPublic) => void;
  style?: StyleProp<ViewStyle>;
}
