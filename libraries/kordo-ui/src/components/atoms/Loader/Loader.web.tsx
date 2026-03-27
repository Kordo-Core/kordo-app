import * as Styled from './Loader.styles';
import { LoaderProps } from './Loader.types';

// Composant Loader web : délègue toute l'animation aux styles CSS (keyframes)
export const Loader: React.FC<LoaderProps> = (props) => {
  // Traduit la taille logique (sm/md/lg) en pixels pour le spinner SVG
  const size = props.size === 'sm' ? 20 : props.size === 'md' ? 30 : 40;

  return (
    <>
      {props.type === 'bar' && (
        <Styled.ProgressBar appearance={props.appearance}>
          <Styled.Bar
            infinite={props.infinite ?? false}
            appearance={props.appearance}
            reverse={props.reverse}
            duration={props.duration}
          />
        </Styled.ProgressBar>
      )}

      {props.type === 'spinner' && (
        <Styled.Spinner size={size} appearance={props.appearance} style={props.style} />
      )}
    </>
  );
};
