import { SectionProps } from './Section.types';
import * as Styled from './Section.styles';

// Bande pleine largeur, bord à bord, qui groupe du contenu vertical pour composer un écran
export const Section: React.FC<SectionProps> = ({ children, gap = 'sm', style }) => (
  <Styled.Section gap={gap} style={style}>
    {children}
  </Styled.Section>
);
