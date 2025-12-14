import { LayoutChangeEvent } from 'react-native';
import { ListRowProps } from '../../layouts/ListRow/ListRow.types';

export interface HeaderProps extends ListRowProps {
  smart?: boolean;
  scrollY?: number;
  onLayout?: (event: LayoutChangeEvent) => void; // <-- ajouter cette ligne

  //TODO
  // Ici tu peux rajouter des props spécifiques si un jour tu en as besoin
  // mais pour l’instant… rien.
}
