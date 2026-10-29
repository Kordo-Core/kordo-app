import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useTheme } from '@emotion/react';
import { Text } from '../Text/Text';

export interface LogoProps {
  /** Côté du symbole en pixels */
  size?: number;
  /** Affiche le mot « kordo » à droite du symbole */
  withWordmark?: boolean;
  /**
   * - `brand` (défaut) : carré vert, K blanc
   * - `light` : carré blanc, K vert — sur une photo ou un fond foncé
   */
  variant?: 'brand' | 'light';
  /** Couleur du mot « kordo » (texte principal du thème par défaut) */
  wordmarkColor?: string;
}

// Logo Kordo du design D : carré arrondi, K tracé, point orange (la prise).
export const Logo: React.FC<LogoProps> = ({
  size = 52,
  withWordmark = false,
  variant = 'brand',
  wordmarkColor,
}) => {
  const theme = useTheme();
  const bg = variant === 'light' ? '#FFFFFF' : theme.colors.secondary.base;
  const stroke = variant === 'light' ? '#2F6B55' : '#FFFFFF';

  const mark = (
    <Svg width={size} height={size} viewBox="0 0 64 64" accessibilityLabel="Kordo">
      <Rect width={64} height={64} rx={20} fill={bg} />
      <Path d="M23 18v28" stroke={stroke} strokeWidth={6.5} strokeLinecap="round" />
      <Path
        d="M42 18L30 32l12 14"
        stroke={stroke}
        strokeWidth={6.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={44} cy={32} r={4.8} fill={theme.colors.primary.base} />
    </Svg>
  );

  if (!withWordmark) return mark;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: size * 0.25 }}>
      {mark}
      <Text
        style={{
          fontFamily: theme.fonts.display,
          fontSize: size * 0.65,
          letterSpacing: -0.8,
          color: wordmarkColor ?? theme.colors.text,
        }}
      >
        kordo
      </Text>
    </View>
  );
};
