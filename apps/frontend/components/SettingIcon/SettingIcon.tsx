import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Icon } from 'kordo-ui';

export type SettingIconTone = 'green' | 'orange' | 'blue' | 'red' | 'neutral';

interface SettingIconProps {
  name: string;
  /** Teinte de la pastille : vert par défaut, rouge pour les actions destructives */
  tone?: SettingIconTone;
}

// Pastille carrée colorée posée à gauche des lignes de réglages (design D).
export const SettingIcon: React.FC<SettingIconProps> = ({ name, tone = 'green' }) => {
  const theme = useTheme();
  const tones: Record<SettingIconTone, { bg: string; fg: string }> = {
    green: { bg: theme.colors.soft, fg: theme.colors.softText },
    orange: { bg: theme.colors.primary.lightest, fg: theme.colors.accentText },
    blue: { bg: theme.colors.info.lighter, fg: theme.colors.info.base },
    red: { bg: theme.colors.error.lighter, fg: theme.colors.error.base },
    neutral: { bg: theme.colors.surfaceAlt, fg: theme.colors.textMuted },
  };
  const { bg, fg } = tones[tone];

  return (
    <View
      style={{
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={name} size="sm" color={fg} />
    </View>
  );
};
