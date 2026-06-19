import { Text, Icon, theme } from 'kordo-ui';
import * as Styled from './TrophyShelf.styles';
import { TrophyShelfProps } from './TrophyShelf.types';

const TROPHY_SLOT_COUNT = 4;

// Affiche les emplacements de trophées (visuel uniquement, aucune donnée réelle pour l'instant).
export const TrophyShelf: React.FC<TrophyShelfProps> = ({ title }) => {
  return (
    <Styled.Container>
      <Text bold>{title}</Text>
      <Styled.Slots>
        {Array.from({ length: TROPHY_SLOT_COUNT }, (_, i) => (
          <Styled.Slot key={i} />
        ))}
      </Styled.Slots>
      <Styled.Separator />
      <Styled.Footer>
        <Text>Tout les trophées</Text>
        <Icon name="chevron-right" size="md" color={theme.colors.neutral.gray.base} />
      </Styled.Footer>
    </Styled.Container>
  );
};
