import { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { LevelPyramidProps } from './LevelPyramid.types';
import { Text } from '../../atoms/Text/Text';

// Une marche de la pyramide : barre centrée de 26 px dont la largeur suit le nombre de blocs
function Step({ ratio, color, delay }: { ratio: number; color: string; delay: number }) {
  const width = useSharedValue(0);
  useEffect(() => {
    width.value = withDelay(
      delay,
      withTiming(ratio, { duration: 900, easing: Easing.bezier(0.2, 0, 0, 1) }),
    );
  }, [width, ratio, delay]);
  const style = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Animated.View style={[{ height: 26, borderRadius: 3, backgroundColor: color }, style]} />
    </View>
  );
}

// Pyramide de niveaux (maquette « sport ») : une ligne par niveau, cotation en chiffre display,
// barre centrée proportionnelle au plus grand total, nombre de blocs à droite.
export const LevelPyramid: React.FC<LevelPyramidProps> = ({ levels, minRatio = 0.08, style }) => {
  const theme = useTheme();
  const max = Math.max(1, ...levels.map((l) => l.count));
  return (
    <View style={[{ gap: 10 }, style]}>
      {levels.map((level, i) => (
        <View
          key={level.label}
          accessibilityLabel={`${level.label} : ${level.count} blocs`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
        >
          <Text variant="display" size={19} style={{ width: 30 }}>
            {level.label}
          </Text>
          <Step
            ratio={Math.max(minRatio, level.count / max)}
            color={level.color ?? theme.colors.secondary.base}
            delay={i * 80}
          />
          <Text size="sm" extraBold style={{ width: 34, textAlign: 'right' }}>
            {level.count}
          </Text>
        </View>
      ))}
    </View>
  );
};
