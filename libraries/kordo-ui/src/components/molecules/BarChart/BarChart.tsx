import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { BarChartProps } from './BarChart.types';
import { Text } from '../../atoms/Text/Text';

const STAGGER = 40;

// Une barre qui pousse depuis zéro, puis suit sa nouvelle hauteur quand les données changent
function Bar({
  height,
  width,
  color,
  delay,
  radius,
}: {
  height: number;
  width: number | '100%';
  color: string;
  delay: number;
  radius: number;
}) {
  const h = useSharedValue(0);
  useEffect(() => {
    h.value = withDelay(
      delay,
      withTiming(height, { duration: 500, easing: Easing.bezier(0.2, 0, 0, 1) }),
    );
  }, [h, height, delay]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[{ width, borderRadius: radius, backgroundColor: color }, style]} />;
}

// Histogramme vertical (design D) : barres arrondies qui poussent à l'apparition, une barre mise
// en avant en orange, valeur et libellés optionnels. Sert au héros des stats, aux mini-barres de
// la semaine et aux petites tendances.
export const BarChart: React.FC<BarChartProps> = ({
  data,
  height,
  barWidth = 22,
  gap = 4,
  spread,
  fill,
  barRadius,
  minBarHeight = 4,
  highlightIndex,
  onSelect,
  showValue,
  showLabels,
  colors,
  tone = 'dark',
  delay = 0,
  unit = '',
  style,
}) => {
  const theme = useTheme();
  const light = tone === 'light';
  const max = Math.max(1, ...data.map((d) => d.value));
  const barColor = colors?.bar ?? (light ? 'rgba(255,255,255,0.55)' : theme.colors.secondary.base);
  const emptyColor = colors?.empty ?? (light ? 'rgba(255,255,255,0.15)' : theme.colors.border);
  const highlightColor = colors?.highlight ?? theme.colors.primary.base;
  const textAppearance = light ? 'white' : 'gray';

  return (
    <View
      accessibilityRole={onSelect ? undefined : 'image'}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: spread ? 'space-between' : 'flex-start',
          gap: spread && !fill ? 0 : gap,
        },
        style,
      ]}
    >
      {data.map((d, i) => {
        const on = i === highlightIndex;
        const bar = (
          <Bar
            height={Math.max(minBarHeight, (d.value / max) * height)}
            width={fill ? '100%' : barWidth}
            radius={barRadius ?? Math.min(3, barWidth / 2)}
            delay={delay + i * STAGGER}
            color={on ? highlightColor : d.value ? barColor : emptyColor}
          />
        );
        const a11y = `${d.label ? `${d.label} : ` : ''}${d.value}${unit ? ` ${unit}` : ''}`;
        const column = (
          <>
            {showValue && (
              <Text
                size={fill ? 11 : 'xs'}
                extraBold
                appearance={light ? 'white' : 'black'}
                style={{ opacity: on ? 1 : 0 }}
              >
                {d.value}
              </Text>
            )}
            {bar}
            {showLabels && (
              <Text
                size={fill ? 11 : 'xs'}
                bold
                appearance={textAppearance}
                // Libellés vert très pâle sur le dégradé vert, en clair comme en sombre
                style={fill && light ? { color: theme.colors.soft } : { opacity: light ? 0.7 : 1 }}
              >
                {d.label}
              </Text>
            )}
          </>
        );
        const columnStyle = {
          alignItems: 'center' as const,
          gap: 6,
          flex: spread || fill ? 1 : undefined,
        };
        return onSelect ? (
          <Pressable
            key={i}
            onPress={() => onSelect(i)}
            accessibilityRole="button"
            accessibilityLabel={a11y}
            accessibilityState={{ selected: on }}
            style={columnStyle}
          >
            {column}
          </Pressable>
        ) : (
          <View key={i} accessibilityLabel={a11y} style={columnStyle}>
            {column}
          </View>
        );
      })}
    </View>
  );
};
