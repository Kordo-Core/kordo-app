import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Header, IconButton, Text } from 'kordo-ui';
import { ScreenHeaderProps } from './ScreenHeader.types';

// En-tête standard des écrans du design D : bouton retour carré, surtitre en petites
// majuscules, actions à droite, puis le grand titre display. Remplace l'ancien header blanc
// à titre centré.
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  eyebrow,
  subtitle,
  onBack,
  backIcon = 'ArrowLeftRegular',
  right,
  children,
  style,
}) => {
  const theme = useTheme();

  return (
    <Header style={style}>
      <View style={{ gap: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.sm + 2,
            minHeight: 44,
          }}
        >
          {onBack && (
            <IconButton
              icon={backIcon}
              onPress={onBack}
              accessibilityLabel={backIcon === 'DismissRegular' ? 'Fermer' : 'Retour'}
            />
          )}
          <Text variant="eyebrow" numberOfLines={1} style={{ flex: 1 }}>
            {eyebrow ?? ''}
          </Text>
          {right}
        </View>
        {!!title && (
          <Text variant="display" size="lg" style={{ paddingHorizontal: 2 }}>
            {title}
          </Text>
        )}
        {!!subtitle && (
          <Text appearance="gray" size="sm" style={{ lineHeight: 20, paddingHorizontal: 2 }}>
            {subtitle}
          </Text>
        )}
        {children}
      </View>
    </Header>
  );
};
