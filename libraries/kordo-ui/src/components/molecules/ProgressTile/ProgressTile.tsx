import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { ProgressTileProps } from './ProgressTile.types';
import { Text } from '../../atoms/Text/Text';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { motion } from '../../../animations/motion';

// Une barre commencée reste visible, même à 1 bloc sur 24
const MIN_VISIBLE = 0.08;

// Tuile de progression posée sur une carte verte : pastille de couleur, compteur et barre.
// Sélectionnable, elle sert de filtre ; elle reste claire sur le vert dans les deux thèmes.
export const ProgressTile: React.FC<ProgressTileProps> = ({
  label,
  color,
  value,
  selected = false,
  onPress,
  accessibilityLabel,
  style,
}) => {
  const theme = useTheme();
  const white = theme.colors.neutral.white;
  const dark = '#0B1410';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [
        {
          flex: 1,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: 10,
          gap: 6,
          borderRadius: 6,
          backgroundColor: selected ? white : 'rgba(255, 255, 255, 0.14)',
          transform: [{ scale: pressed ? motion.pressScale : 1 }],
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: color,
            borderWidth: selected ? 0 : 1,
            borderColor: 'rgba(255, 255, 255, 0.55)',
          }}
        />
        <Text size="xs" extraBold numberOfLines={1} style={{ color: selected ? dark : white }}>
          {label}
        </Text>
      </View>
      <ProgressBar
        value={value > 0 ? Math.max(MIN_VISIBLE, value) : 0}
        height={4}
        duration={400}
        color={selected ? '#00845A' : theme.colors.primary.base}
        trackColor={selected ? '#E7EBE9' : 'rgba(255, 255, 255, 0.2)'}
      />
    </Pressable>
  );
};
