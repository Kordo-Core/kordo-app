import * as Styled from './ListRow.styles';
import { Text } from '../../atoms/Text/Text';
import { ListRowProps } from './ListRow.types';

export const ListRow: React.FC<ListRowProps> = (props) => {
  return (
    <Styled.Row>
      <Styled.Left>{props.left}</Styled.Left>
      <Styled.TextWrapper>
        {props.primaryText}
        {props.secondaryText}
      </Styled.TextWrapper>
      <Styled.Right>{props.right}</Styled.Right>
    </Styled.Row>
  );
};
