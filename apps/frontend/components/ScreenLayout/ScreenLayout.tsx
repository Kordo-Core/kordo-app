import { useWindowDimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import * as Styled from './ScreenLayout.styles';
import { ScreenLayoutProps } from './ScreenLayout.types';

const TOPO_URI =
  'https://res.cloudinary.com/dqmegz5dn/image/upload/v1781135028/topo-primary-dark_wdsvmf.svg';

// Coquille commune à tous les écrans : le fond topo plein écran et la couleur de page.
// Le header et le conteneur de défilement restent propres à chaque écran — ils divergent
// trop (header intelligent, liste virtualisée, pile de cartes, onglets) pour être imposés ici.
export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  const { height } = useWindowDimensions();

  return (
    <Styled.Container>
      <Styled.Background pointerEvents="none">
        <SvgUri
          width={height}
          height={height}
          uri={TOPO_URI}
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </Styled.Background>

      {children}
    </Styled.Container>
  );
};
