import { StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';

// Grand titre display sur deux lignes, la seconde en vert (écrans d'accès : « Mot de passe
// oublié ? », « Ta salle principale »…).
export const TwoToneTitle: React.FC<{
  first: string;
  second: string;
  align?: 'left' | 'center';
  style?: StyleProp<TextStyle>;
}> = ({ first, second, align = 'left', style }) => {
  const theme = useTheme();
  return (
    <Text variant="display" size="lg" style={[{ textAlign: align }, style]}>
      {first}
      {'\n'}
      <Text variant="display" size="lg" style={{ color: theme.colors.softText }}>
        {second}
      </Text>
    </Text>
  );
};
