import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import Svg, { Path } from 'react-native-svg';
import { TrophyBadgeProps } from './TrophyBadge.types';

// Arrondis de la maquette « sport » : 6 px (52) et 8 px (58)
const SIZES = { md: { box: 52, radius: 6 }, lg: { box: 58, radius: 8 } };

// Pastille d'un trophée (design D) : icône au trait dans un carré arrondi, orangé si le trophée
// est obtenu, gris sinon.
export const TrophyBadge: React.FC<TrophyBadgeProps> = ({ icon, earned, size = 'md', style }) => {
  const theme = useTheme();
  const { box, radius } = SIZES[size];
  return (
    <View
      style={[
        {
          width: box,
          height: box,
          borderRadius: radius,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: earned ? theme.colors.primary.lighter : theme.colors.surfaceAlt,
        },
        style,
      ]}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d={icon}
          stroke={earned ? theme.colors.accentText : theme.colors.textMuted}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
