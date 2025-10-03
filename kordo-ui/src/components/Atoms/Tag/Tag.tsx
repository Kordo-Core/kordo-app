import { TagProps } from './Tag.types';
import * as Styled from './Tag.style';
import { Text } from '../Text/Text';

export const Tag: React.FC<TagProps> = (props) => {
  return (
    <Styled.Tag appearance={props.appearance} >
      <Text size="md" appearance="white">{props.title}</Text>
    </Styled.Tag>
  );
};
