import { Pressable } from 'react-native';
import { useTheme } from '@emotion/react';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Styled from './Toggle.styles';
import { ToggleProps } from './Toggle.types';
import { getColor } from '../../../utils/getColors';

const DURATION = 180;

// Interrupteur contrôlé : la pastille glisse et la piste change de couleur d'un même mouvement.
// Une seule valeur animée (0 = éteint, 1 = allumé) pilote les deux, ce qui les garde synchrones.
export const Toggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  appearance = 'secondary',
  disabled,
  size = 'md',
  style,
}) => {
  const theme = useTheme();

  const progress = useDerivedValue(
    () => withTiming(value ? 1 : 0, { duration: DURATION }),
    [value],
  );

  // Couleurs lues hors du worklet : il ne capture que des chaînes, pas l'objet thème.
  const trackOff = theme.colors.track;
  const trackOn = getColor(theme, appearance);
  const dims = Styled.SIZES[size];
  const margin = dims.margin;
  const travel = dims.width - dims.knob - margin * 2;

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [trackOff, trackOn]),
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: margin + progress.value * travel }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onChange(!value)}
      style={style}
    >
      <Styled.Track disabled={disabled} size={size} style={trackStyle}>
        <Styled.Knob size={size} style={knobStyle} />
      </Styled.Track>
    </Pressable>
  );
};
