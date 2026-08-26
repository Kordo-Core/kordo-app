import { Input } from 'kordo-ui';
import * as Styled from './SearchToolbar.styles';
import { SearchToolbarProps } from './SearchToolbar.types';

// Barre de recherche commune aux quatre onglets : chaque onglet garde sa propre saisie et
// filtre ses données lui-même, seul l'habillage est partagé.
export const SearchToolbar: React.FC<SearchToolbarProps> = ({ value, onChange, placeholder }) => (
  <Styled.Toolbar>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      leftIcon={{ name: 'search' }}
    />
  </Styled.Toolbar>
);
