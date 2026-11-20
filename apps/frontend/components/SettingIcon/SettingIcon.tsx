import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Icon, Text } from 'kordo-ui';

export type SettingIconTone = 'green' | 'orange' | 'blue' | 'red' | 'neutral';

interface SettingIconProps {
  name?: string;
  /** Signe à afficher à la place d'une icône (« @ ») */
  glyph?: string;
  /** Barre l'icône d'un trait (fonction coupée) */
  struck?: boolean;
  /** Teinte de la pastille : vert par défaut, rouge pour les actions destructives */
  tone?: SettingIconTone;
  /** Côté de la pastille, en px (défaut 38) */
  size?: number;
}

// Pastille carrée colorée posée à gauche des lignes de réglages (design D).
export const SettingIcon: React.FC<SettingIconProps> = ({
  name,
  glyph,
  struck,
  tone = 'green',
  size = 38,
}) => {
  const theme = useTheme();
  const tones: Record<SettingIconTone, { bg: string; fg: string }> = {
    green: { bg: theme.colors.soft, fg: theme.colors.softText },
    orange: { bg: theme.colors.primary.lighter, fg: theme.colors.accentText },
    blue: { bg: theme.colors.info.lighter, fg: theme.colors.info.base },
    red: { bg: theme.colors.error.lighter, fg: theme.colors.error.base },
    neutral: { bg: theme.colors.surfaceAlt, fg: theme.colors.text },
  };
  const { bg, fg } = tones[tone];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 5,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {glyph ? (
        <Text size="lg" extraBold style={{ color: fg }}>
          {glyph}
        </Text>
      ) : (
        name && <Icon name={name} size="sm" color={fg} />
      )}
      {struck && (
        <View
          style={{
            position: 'absolute',
            width: 24,
            height: 2,
            borderRadius: 1,
            backgroundColor: fg,
            transform: [{ rotate: '45deg' }],
          }}
        />
      )}
    </View>
  );
};
