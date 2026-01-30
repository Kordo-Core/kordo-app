import { ListRow } from '../../layouts/ListRow/ListRow';
import { HeaderProps } from './Header.types';
import * as Styled from './Header.styles';

export const Header: React.FC<HeaderProps> = (props) => {
  // Version web simplifiée sans animation smart scroll
  return (
    <Styled.Header>
      <ListRow {...props} />
    </Styled.Header>
  );
};
