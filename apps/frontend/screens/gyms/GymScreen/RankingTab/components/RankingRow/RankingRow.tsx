import { Icon, ListRow, Text, UserInfo, theme } from 'kordo-ui';
import { RankingRowProps } from './RankingRow.types';

// Une ligne de classement : rang, utilisateur + points, tendance (hausse / baisse)
export function RankingRow({ entry }: RankingRowProps) {
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
