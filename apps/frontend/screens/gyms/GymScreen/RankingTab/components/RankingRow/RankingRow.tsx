import { useTheme } from '@emotion/react';
import { Icon, ListRow, Text, UserInfo } from 'kordo-ui';
import { RankingRowProps } from './RankingRow.types';

// Une ligne de classement : rang, utilisateur + points, tendance (hausse / baisse)
export function RankingRow({ entry }: RankingRowProps) {
  const theme = useTheme();
  return (
    <ListRow
      left={
        <Text size="lg" bold>
          {String(entry.rank).padStart(2, '0')}
        </Text>
      }
      primaryText={
        <UserInfo
          user={entry.user}
          // Inerte volontairement : la CardFrame qui contient la liste est en
          // `pointerEvents="none"`, aucun clic ne parvient jusqu'ici. L'ouverture du profil
          // est portee par le tap pose sur le ghost scroll, dans RankingTab.
          onPressUser={() => {}}
          tertiaryText={
            <Text appearance="primary" bold>
              {entry.totalPoints} pts
            </Text>
          }
        />
      }
      right={
        entry.trend === 'up' ? (
          <Icon name="TriangleUpFilled" size="lg" color={theme.colors.success.base} />
        ) : entry.trend === 'down' ? (
          <Icon name="TriangleDownFilled" size="lg" color={theme.colors.error.base} />
        ) : null
      }
    />
  );
}
