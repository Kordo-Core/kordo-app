import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

// Dimensions de la piste et de la pastille, par taille. Le déplacement de la pastille en
// découle : width - knob - 2 × margin. `md` : réglages ; `sm` : option compacte d'un formulaire.
export const SIZES = {
  md: { width: 52, height: 32, knob: 26, margin: 3 },
  sm: { width: 36, height: 22, knob: 16, margin: 3 },
} as const;

export type ToggleSize = keyof typeof SIZES;

export const Track = styled(Animated.View)<{ disabled?: boolean; size: ToggleSize }>((props) => ({
  width: SIZES[props.size].width,
  height: SIZES[props.size].height,
  borderRadius: props.theme.borderRadius.rounded,
  justifyContent: 'center',
  opacity: props.disabled ? 0.5 : 1,
}));

// Pastille couleur carte (blanche en clair, sombre en sombre) cernée d'un filet de 1 px
export const Knob = styled(Animated.View)<{ size: ToggleSize }>((props) => ({
  width: SIZES[props.size].knob,
  height: SIZES[props.size].knob,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.surface,
  boxShadow: `inset 0px 0px 0px 1px ${props.theme.colors.border}`,
}));
