import { Input } from 'kordo-ui';
import { SearchToolbarProps } from './SearchToolbar.types';

// Barre de recherche commune aux écrans qui filtrent une liste : chacun garde sa propre saisie
// et filtre ses données lui-même, seul l'habillage de l'input est partagé.
// L'espacement autour appartient au conteneur — une `Section` ou la barre de l'écran — pour
// que la barre s'aligne sur la liste qu'elle filtre.
export const SearchToolbar: React.FC<SearchToolbarProps> = ({ value, onChange, placeholder }) => (
  <Input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    leftIcon={{ name: 'search' }}
  />
);
