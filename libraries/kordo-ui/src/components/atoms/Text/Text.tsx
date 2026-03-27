import { TextProps } from './Text.types';
import * as Styled from './Text.styles';

// Composant typographique de base qui transmet toutes les props de style au composant stylisé
export const Text: React.FC<TextProps> = (props) => {
  return <Styled.Text {...props}>{props.children}</Styled.Text>;
};
