import { View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Header, IconButton, Text } from 'kordo-ui';
import { ScreenHeaderProps } from './ScreenHeader.types';

// Marge verticale propre à la rangée du `Header` (paddingVertical de sa Row)
const ROW_PADDING = 6;

// En-tête standard des sous-écrans (maquette « sport ») : rangée de 48 px (bouton retour
// carré, surtitre en petites majuscules, actions à droite) à 14 px sous la zone sûre, puis le
// grand titre display avec 4 px de retrait. `gap` est l'écart vertical entre les blocs de
// l'écran : il sépare la rangée du titre, le titre du contenu fixe et l'en-tête de la suite.
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  eyebrow,
  subtitle,
  onBack,
  backIcon = 'ChevronLeftRegular',
  right,
  titleAside,
  children,
  style,
  topGap = 8,
  gap = 10,
}) => {
  const theme = useTheme();
  const hasRow = !!(onBack || eyebrow || right);

  return (
    // Bas de l’en-tête : la rangée apporte déjà 6 px, le reste complète `gap`
    <Header style={[{ paddingBottom: Math.max(0, gap - ROW_PADDING) }, style]} topGap={topGap}>
      <View>
        {hasRow && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              minHeight: 48,
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
        )}
        {!!title && (
          // Bloc titre de la maquette : 4 px de retrait, 2 px en bas, sous-titre compris
          <View
            style={{
              marginTop: hasRow ? gap : 0,
              paddingTop: 4,
              paddingHorizontal: 4,
              paddingBottom: 2,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: theme.spacing.sm,
              }}
            >
              <Text variant="display" size="lg">
                {title}
              </Text>
              {titleAside}
            </View>
            {!!subtitle && (
              <Text appearance="gray" size={14} style={{ lineHeight: 20.3, marginTop: 8 }}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
        {children && <View style={{ marginTop: hasRow || title ? gap : 0 }}>{children}</View>}
      </View>
    </Header>
  );
};
