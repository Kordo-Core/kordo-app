import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  useDerivedValue,
  useAnimatedProps,
  cancelAnimation,
} from 'react-native-reanimated';
import { Bar, ProgressBar } from './Loader.styles';
import { useEffect, useState } from 'react';
import * as Styled from './Loader.styles';
import { LoaderProps } from './Loader.types';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '@emotion/react';

// Composant Loader supportant deux variantes : barre de progression et spinner circulaire
export const Loader: React.FC<LoaderProps> = (props) => {
  // Accès au thème pour les couleurs du spinner
  const theme = useTheme();
  // Valeur partagée Reanimated pilotant toutes les animations ; initialisée à 0 ou 1 selon le sens
  const progress = useSharedValue(props.infinite ? 0 : props.reverse ? 1 : 0);
  // Largeur réelle de la barre mesurée via onLayout, nécessaire pour calculer le déplacement en mode infini
  const [width, setWidth] = useState(0);

  // Lance l'animation dès que les paramètres changent :
  // - mode infini : boucle sans fin (avec aller-retour pour la barre, rotation continue pour le spinner)
  // - mode fini : transition unique de 0->1 ou 1->0 selon le sens
  useEffect(() => {
    if (props.infinite) {
      progress.value = withRepeat(
        withTiming(1, { duration: props.duration, easing: Easing.linear }),
        -1,
        props.type === 'bar' ? true : false,
      );
    } else {
      progress.value = withTiming(props.reverse ? 0 : 1, { duration: props.duration });
    }
    // Nettoyage : annule l'animation en cours pour éviter les fuites mémoire au démontage
    return () => {
      cancelAnimation(progress);
    };
  }, [width, props.duration, props.reverse, props.infinite]);

  // Calcul des dimensions du cercle SVG en fonction de la taille demandée
  const size = props.size === 'sm' ? 20 : props.size === 'md' ? 30 : 40;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;

  // Style animé de la barre : translation horizontale en mode infini, mise à l'échelle en mode fini
  const barStyle = useAnimatedStyle(() => {
    if (props.infinite) {
      return {
        transform: [{ translateX: progress.value * (width - width * 0.2) }],
      };
    }
    return { transform: [{ scaleX: progress.value }], transformOrigin: 'left' };
  });

  // Décalage du trait SVG du spinner : fixe à 25% en mode infini, proportionnel à la progression sinon
  const strokeDashoffset = useDerivedValue(() => {
    if (props.infinite) return circumference * 0.25;
    return circumference * (1 - (progress.value * size) / size);
  });

  // Expose le strokeDashoffset comme prop animée pour le cercle SVG natif
  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: strokeDashoffset.value };
  });

  // Rotation continue du conteneur SVG pour l'effet de spinner tournant
  const spinnerStyle = useAnimatedStyle(() => {
    const rotation = `${progress.value * 360}deg`;
    return { transform: [{ rotate: rotation }] };
  });

  return (
    <>
      {props.type === 'bar' && (
        <ProgressBar
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          appearance={props.appearance}
          style={props.style}
        >
          <Bar style={barStyle} infinite={props.infinite ?? false} appearance={props.appearance} />
        </ProgressBar>
      )}

      {props.type === 'spinner' && (
        // La rotation est portée par une vue, et le SVG reste immobile à l'intérieur : le
        // style animé ne doit jamais atteindre un composant react-native-svg (cf. les styles).
        <Styled.SpinnerRotation style={[props.style, spinnerStyle]}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.colors[props.appearance ?? 'primary'].lighter}
              strokeWidth={4}
              fillOpacity={0}
            />
            <Styled.AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={theme.colors[props.appearance ?? 'primary'].base}
              strokeWidth={4}
              strokeDasharray={`${circumference} ${circumference}`}
              animatedProps={animatedProps}
              strokeLinecap="round"
              fillOpacity={0}
            />
          </Svg>
        </Styled.SpinnerRotation>
      )}
    </>
  );
};
