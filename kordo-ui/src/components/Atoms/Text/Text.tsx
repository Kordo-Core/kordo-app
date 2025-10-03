import { TextProps } from './Text.types';
import * as Styled from './Text.style';

export const Text: React.FC<TextProps> = (props) => {
  return <Styled.Text {...props}>{props.children}</Styled.Text>;
};
