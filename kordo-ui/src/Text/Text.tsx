import { TextProps } from "./Text.types";
import * as Styled from './Text.style';

export const Text: React.FC<TextProps>= (props) => {
    return <Styled.Text appearance={props.appearance} size={props.size} bold={props.bold}>{props.children}</Styled.Text>;
}