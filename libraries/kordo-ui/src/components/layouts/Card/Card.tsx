import { useId } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useTheme } from '@emotion/react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { CardProps } from './Card.types';
import * as Styled from './Card.styles';
import { Bounce } from '../../..//animations/Bounce/Bounce';

// Encre vert-noir de la marque, utilisée pour les fondus posés sur les photos
const INK = '#0B1410';

// Fondu sur la photo : part de la transparence et fonce vers le bord où se pose le texte
function Overlay({ side }: { side: 'top' | 'bottom' }) {
  const id = `card-fade-${useId().replace(/:/g, '')}`;
  const bottom = side === 'bottom';
  return (
    <Svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset={bottom ? '0.4' : '0'} stopColor={INK} stopOpacity={bottom ? 0 : 0.6} />
          <Stop offset={bottom ? '1' : '0.5'} stopColor={INK} stopOpacity={bottom ? 0.88 : 0} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

// Composant carte qui peut optionnellement réagir aux interactions tactiles. Avec `image`, la
// photo remplit la carte et reste dans ses coins arrondis ; `overlay` y ajoute un fondu.
export const Card: React.FC<CardProps> = ({
  isPressable,
  onPress,
  children,
  image,
  overlay,
  style,
}) => {
  const theme = useTheme();
  // Encapsule le contenu dans le conteneur stylisé de base
  const content = (
    <Styled.Card style={style}>
      {/* Seule la photo est découpée : un `overflow` sur la carte couperait son ombre sur iOS */}
      {image && (
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              overflow: 'hidden',
              borderRadius: StyleSheet.flatten(style)?.borderRadius ?? theme.borderRadius.card,
            },
          ]}
        >
          <Image source={{ uri: image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          {overlay && <Overlay side={overlay} />}
        </View>
      )}
      {children}
    </Styled.Card>
  );
  // Si la carte est interactive, on l'enveloppe dans une animation Bounce pour donner un retour visuel au toucher
  return isPressable ? <Bounce onPress={onPress}>{content}</Bounce> : content;
};
