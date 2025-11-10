import { CardProps } from './Card.types';
import * as Styled from './Card.styles';
import { Bounce } from '../../..//animations/Bounce/Bounce';

export const Card: React.FC<CardProps> = ({ isPressable, onPress, children }) => {
  const content = <Styled.Card>{children}</Styled.Card>;
  return isPressable ? <Bounce onPress={onPress}>{content}</Bounce> : content;
};
