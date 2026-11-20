import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { StepperProps } from './Stepper.types';
import { Text } from '../../atoms/Text/Text';
import { motion } from '../../../animations/motion';
import { getOnColor } from '../../../utils/getColors';

const SIZE = 52;

// Compteur « − / + » (design D) : deux boutons carrés arrondis, le « + » en orange. Les bornes
// désactivent le bouton concerné.
export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  decrementLabel = 'Diminuer',
  incrementLabel = 'Augmenter',
  style,
}) => {
  const theme = useTheme();
  const button = (
    label: string,
    a11y: string,
    next: number,
    disabled: boolean,
    accent: boolean,
  ) => (
    <Pressable
      onPress={() => onChange(next)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ disabled }}
      style={({ pressed }) => ({
        width: SIZE,
        height: SIZE,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: accent ? theme.colors.primary.base : theme.colors.surfaceAlt,
        opacity: disabled ? 0.4 : 1,
        transform: [{ scale: pressed ? motion.pressScale : 1 }],
      })}
    >
      <Text
        size={26}
        extraBold
        style={accent ? { color: getOnColor(theme, 'primary') } : undefined}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={[{ flexDirection: 'row', gap: 12 }, style]}>
      {button('−', decrementLabel, Math.max(min, value - step), value <= min, false)}
      {button('+', incrementLabel, Math.min(max, value + step), value >= max, true)}
    </View>
  );
};
