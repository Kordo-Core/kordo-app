import * as Styled from './ScreenLayout.styles';
import { ScreenLayoutProps } from './ScreenLayout.types';

// Coquille commune à tous les écrans : la couleur de fond de page du thème (design D :
// fond neutre uni, clair ou sombre). Le header et le conteneur de défilement restent propres à
// chaque écran — ils divergent trop (header intelligent, liste virtualisée, pile de cartes,
// onglets) pour être imposés ici.
export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => (
  <Styled.Container>{children}</Styled.Container>
);
