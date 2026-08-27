import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

// Dimensions de la piste et de la pastille. Le déplacement de la pastille en découle :
// TRACK_WIDTH - KNOB_SIZE - 2 × KNOB_MARGIN.
export const TRACK_WIDTH = 52;
export const TRACK_HEIGHT = 30;
export const KNOB_SIZE = 24;
export const KNOB_MARGIN = 3;

export const Track = styled(Animated.View)<{ disabled?: boolean }>((props) => ({
  width: TRACK_WIDTH,
  height: TRACK_HEIGHT,
  borderRadius: props.theme.borderRadius.rounded,
  justifyContent: 'center',
  opacity: props.disabled ? 0.5 : 1,
}));

export const Knob = styled(Animated.View)((props) => ({
  width: KNOB_SIZE,
  height: KNOB_SIZE,
  borderRadius: props.theme.borderRadius.rounded,
  backgroundColor: props.theme.colors.neutral.white,
  boxShadow: props.theme.shadows.md,
}));
