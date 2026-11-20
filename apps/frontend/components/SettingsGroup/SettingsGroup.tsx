import { Children, Fragment, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';

interface SettingsGroupProps {
  /** Surtitre posé au-dessus de la carte */
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Marge verticale ajoutée autour de chaque ligne (défaut 2 : lignes de 62 px) */
  rowPadding?: number;
  /** Marge horizontale des lignes (défaut 14 ; 16 pour les lignes sans icône) */
  rowPaddingHorizontal?: number;
  /** Départ du filet séparateur depuis le bord gauche (défaut 64 : après l'icône) */
  separatorInset?: number;
}

// Groupe de réglages (design D) : surtitre au-dessus, puis une carte dont les lignes sont
// séparées par un filet qui démarre après la pastille d'icône et va jusqu'au bord.
export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  children,
  style,
  rowPadding = 2,
  rowPaddingHorizontal = 14,
  separatorInset = 64,
}) => {
  const theme = useTheme();
  const items = Children.toArray(children).filter(Boolean);

  return (
    <View style={[{ gap: theme.spacing.sm, marginHorizontal: 14 }, style]}>
      {!!title && (
        <Text variant="eyebrow" size={12} style={{ marginHorizontal: 6, marginTop: 10 }}>
          {title}
        </Text>
      )}
      <View
        style={{
          borderRadius: theme.borderRadius.card,
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.sm,
          overflow: 'hidden',
        }}
      >
        {items.map((child, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <View
                style={{
                  height: 1,
                  marginLeft: separatorInset,
                  backgroundColor: theme.colors.border,
                }}
              />
            )}
            {/* Ligne de la maquette : 12 px × 14 px de marge (10 viennent de la ligne) */}
            <View style={{ paddingHorizontal: rowPaddingHorizontal, paddingVertical: rowPadding }}>
              {child}
            </View>
          </Fragment>
        ))}
      </View>
    </View>
  );
};
