import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from '../../atoms/Text/Text';

export interface DateSealProps {
  /** Jour, par exemple « 29 » */
  day: string;
  /** Mois abrégé, par exemple « OCT » */
  month: string;
  /** Couleur de l'encre */
  color: string;
  /** Inclinaison du cachet (défaut « -9deg ») */
  rotate?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE = 50;

// Cachet rond à double cercle : le jour en grand, le mois dessous.
export const DateSeal: React.FC<DateSealProps> = ({
  day,
  month,
  color,
  rotate = '-9deg',
  style,
}) => {
  const theme = useTheme();
  // Dans le thème clair, le fond crème évoque le papier
  const background = theme.mode === 'dark' ? theme.colors.surface : '#FFFFFF';
  return (
    <View
      accessibilityLabel={`${day} ${month}`}
      style={[
        {
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          borderWidth: 2,
          borderColor: color,
          backgroundColor: background,
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0px 4px 10px rgba(${theme.colors.scrim}, 0.24)`,
          transform: [{ rotate }],
        },
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          right: 2,
          bottom: 2,
          borderRadius: SIZE / 2,
          borderWidth: 1,
          borderColor: color,
        }}
      />
      <Text variant="display" size={22} style={{ color, lineHeight: 19 }}>
        {day}
      </Text>
      <Text extraBold size={8} style={{ color, lineHeight: 9, letterSpacing: 0.7 }}>
        {month}
      </Text>
    </View>
  );
};
