import { CardProps } from './Card.types';
import * as Styled from './Card.styles';
import { Bounce } from '../../..//animations/Bounce/Bounce';

// Composant carte qui peut optionnellement réagir aux interactions tactiles
export const Card: React.FC<CardProps> = ({ isPressable, onPress, children, style }) => {
  // Encapsule le contenu dans le conteneur stylisé de base
  const content = <Styled.Card style={style}>{children}</Styled.Card>;
  // Si la carte est interactive, on l'enveloppe dans une animation Bounce pour donner un retour visuel au toucher
  return isPressable ? <Bounce onPress={onPress}>{content}</Bounce> : content;
};
