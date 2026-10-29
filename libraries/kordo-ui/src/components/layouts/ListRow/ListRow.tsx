import * as Styled from './ListRow.styles';
import { ListRowProps } from './ListRow.types';

// Composant ligne de liste avec une disposition en trois colonnes : gauche, texte central, droite
export const ListRow: React.FC<ListRowProps> = (props) => {
  // Le contenu est identique dans les deux variantes ; seul le conteneur change.
  const content = (
    <>
      {/* Colonne gauche optionnelle : sans `left`, on ne réserve pas l'espace pour
          que le texte principal reste collé au bord gauche */}
      {props.left != null && (
        <Styled.LeftWrapper>
          <Styled.Left>{props.left}</Styled.Left>
        </Styled.LeftWrapper>
      )}
      {/* Zone centrale pour afficher le texte principal et secondaire empilés verticalement */}
      <Styled.TextWrapper>
        {props.primaryText}
        {props.secondaryText}
      </Styled.TextWrapper>
      <Styled.Right>{props.right}</Styled.Right>
    </>
  );

  // Ligne cliquable seulement si le parent le demande : sans `onPress`, un simple conteneur,
  // pour ne pas capter les clics destinés aux slots gauche et droit.
  return props.onPress ? (
    <Styled.PressableRow onPress={props.onPress} style={props.style}>
      {content}
    </Styled.PressableRow>
  ) : (
    <Styled.Row style={props.style}>{content}</Styled.Row>
  );
};
