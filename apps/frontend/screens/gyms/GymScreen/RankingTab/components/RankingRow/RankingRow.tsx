import { Image, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import { RankingRowProps } from './RankingRow.types';

// Une ligne de classement (maquette « sport ») : carte de 64 px, rang en chiffre display,
// avatar carré, nom et points, pastille de tendance verte (hausse) ou rouge (baisse).
//
// Inerte volontairement : la CardFrame qui contient la liste est en `pointerEvents="none"`,
// aucun clic ne parvient jusqu'ici. L'ouverture du profil est portée par le tap posé sur le
// ghost scroll, dans RankingTab.
export function RankingRow({ entry }: RankingRowProps) {
  const theme = useTheme();
  const up = entry.trend === 'up';
  const down = entry.trend === 'down';

  return (
    <View
      style={{
        height: 72,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderRadius: theme.borderRadius.card,
        backgroundColor: theme.colors.surface,
        boxShadow: theme.shadows.sm,
      }}
    >
      <Text variant="display" size={24} appearance="gray" style={{ width: 28 }}>
        {entry.rank}
      </Text>
      <Image
        source={{ uri: entry.user.avatarUrl }}
        style={{ width: 42, height: 42, borderRadius: theme.borderRadius.square }}
      />
      <View style={{ flex: 1 }}>
        <Text bold numberOfLines={1}>
          {entry.user.firstName} {entry.user.lastName}
        </Text>
        <Text size="xs" appearance="gray" style={{ fontFamily: theme.fonts.semiBold }}>
          {entry.totalPoints.toLocaleString('fr-FR')} pts
        </Text>
      </View>
      {(up || down) && (
        // Places gagnées ou perdues depuis la période précédente
        <View
          style={{
            height: 28,
            paddingHorizontal: 9,
            borderRadius: 4,
            justifyContent: 'center',
            backgroundColor: up ? theme.colors.soft : theme.colors.error.lighter,
          }}
        >
          <Text
            size="xs"
            extraBold
            style={{ color: up ? theme.colors.secondary.base : theme.colors.error.base }}
          >
            {`${up ? '▲' : '▼'}${(entry.totalPoints % 3) + 1}`}
          </Text>
        </View>
      )}
    </View>
  );
}
