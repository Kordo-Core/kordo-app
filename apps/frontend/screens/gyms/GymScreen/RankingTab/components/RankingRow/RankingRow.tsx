import { Image, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text } from 'kordo-ui';
import { RankingRowProps } from './RankingRow.types';

// Une ligne de classement (design D) : rang en chiffre display, avatar carré arrondi, nom et
// points, pastille de tendance verte (hausse) ou rouge (baisse).
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        height: 66,
        paddingHorizontal: theme.spacing.md + 2,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        boxShadow: theme.shadows.sm,
      }}
    >
      <Text variant="display" size={20} appearance="gray" style={{ width: 30 }}>
        {String(entry.rank).padStart(2, '0')}
      </Text>
      <Image
        source={{ uri: entry.user.avatarUrl }}
        style={{ width: 42, height: 42, borderRadius: 14 }}
      />
      <View style={{ flex: 1 }}>
        <Text bold numberOfLines={1}>
          {entry.user.firstName} {entry.user.lastName}
        </Text>
        <Text size="xs" bold appearance="gray">
          {entry.totalPoints.toLocaleString('fr-FR')} pts
        </Text>
      </View>
      {(up || down) && (
        <View
          style={{
            height: 28,
            paddingHorizontal: 9,
            borderRadius: 10,
            justifyContent: 'center',
            backgroundColor: up ? theme.colors.soft : theme.colors.error.lighter,
          }}
        >
          <Text
            size="xs"
            extraBold
            style={{ color: up ? theme.colors.softText : theme.colors.error.base }}
          >
            {up ? '▲' : '▼'}
          </Text>
        </View>
      )}
    </View>
  );
}
