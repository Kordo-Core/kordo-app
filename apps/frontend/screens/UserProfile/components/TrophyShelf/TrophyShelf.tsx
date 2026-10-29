import { Pressable, View } from 'react-native';
import { useTheme } from '@emotion/react';
import { Text, Icon } from 'kordo-ui';
import * as Styled from './TrophyShelf.styles';
import { TrophyShelfProps } from './TrophyShelf.types';

// Trophées affichés sur l'étagère (données fictives tant que l'API des trophées n'existe pas)
const TROPHIES = [
  { name: 'Globetrotter', icon: 'location', earned: true },
  { name: 'Tarzan', icon: 'RewardRegular', earned: true },
  { name: 'Arkose Fan', icon: 'StarRegular', earned: true },
  { name: 'Strong', icon: 'TrophyRegular', earned: false },
];

// Étagère de trophées (design D) : tuiles orangées pour les trophées obtenus, grisées sinon.
export const TrophyShelf: React.FC<TrophyShelfProps> = ({ title, onPressAll }) => {
  const theme = useTheme();
  const earned = TROPHIES.filter((t) => t.earned).length;
  return (
    <Styled.Container>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text variant="eyebrow">{title}</Text>
        <Text size="xs" extraBold appearance="primary">
          {earned} / 12
        </Text>
      </View>
      <Styled.Slots>
        {TROPHIES.map((t) => (
          <View key={t.name} style={{ alignItems: 'center', gap: 6, opacity: t.earned ? 1 : 0.5 }}>
            <Styled.Slot earned={t.earned}>
              <Icon
                name={t.icon}
                size={24}
                color={t.earned ? theme.colors.accentText : theme.colors.textMuted}
              />
            </Styled.Slot>
            <Text size="xs" bold>
              {t.name}
            </Text>
          </View>
        ))}
      </Styled.Slots>
      <Pressable onPress={onPressAll}>
        <Styled.Footer>
          <Text bold>Tous les trophées</Text>
          <Icon name="chevron-right" size="md" color={theme.colors.textMuted} />
        </Styled.Footer>
      </Pressable>
    </Styled.Container>
  );
};
