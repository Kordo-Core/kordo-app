import { TagProps } from './Tag.types';
import * as Styled from './Tag.styles';
import { Text } from '../Text/Text';

// Pastille colorée affichant un court libellé (ex. : difficulté, statut)
export const Tag: React.FC<TagProps> = (props) => {
  return (
    <Styled.Tag appearance={props.appearance}>
      <Text size="md" appearance="white">
        {props.title}
      </Text>
    </Styled.Tag>
  );
};
