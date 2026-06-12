import * as Styled from './ListRow.styles';
import { ListRowProps } from './ListRow.types';

// Composant ligne de liste avec une disposition en trois colonnes : gauche, texte central, droite
export const ListRow: React.FC<ListRowProps> = (props) => {
  return (
    <Styled.Row>
      <Styled.LeftWrapper>
        <Styled.Left>{props.left}</Styled.Left>
      </Styled.LeftWrapper>
      {/* Zone centrale pour afficher le texte principal et secondaire empilés verticalement */}
      <Styled.TextWrapper>
        {props.primaryText}
        {props.secondaryText}
      </Styled.TextWrapper>
      <Styled.Right>{props.right}</Styled.Right>
    </Styled.Row>
  );
};
