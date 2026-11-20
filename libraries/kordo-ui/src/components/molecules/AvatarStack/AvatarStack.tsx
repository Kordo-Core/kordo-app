import { Image, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@emotion/react';

export interface AvatarStackProps {
  /** Photos affichées, de gauche à droite */
  uris: (string | undefined)[];
  /** Côté d'un avatar, en px (défaut 30) */
  size?: number;
  /** Bord qui détache les avatars les uns des autres : la couleur du fond */
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
}

// Avatars carrés arrondis qui se chevauchent.
export const AvatarStack: React.FC<AvatarStackProps> = ({
  uris,
  size = 30,
  borderColor,
  style,
}) => {
  const theme = useTheme();
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      {uris.map((uri, i) => (
        <Image
          key={`${uri}-${i}`}
          source={{ uri }}
          style={{
            width: size,
            height: size,
            borderRadius: Math.round(size * 0.14),
            borderWidth: 2,
            borderColor: borderColor ?? theme.colors.surface,
            marginLeft: i === 0 ? 0 : -Math.round(size / 3),
            backgroundColor: theme.colors.surfaceAlt,
          }}
        />
      ))}
    </View>
  );
};
