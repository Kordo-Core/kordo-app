import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

// Hauteur de référence des maquettes : base du calcul du ratio.
const REFERENCE_HEIGHT = 812;
const MIN_SCALE = 0.7;
const MAX_SCALE = 1.15;

/**
 * Ratio vertical de l'écran courant, borné pour éviter les extrêmes.
 * `scaleSize` dimensionne les éléments à taille fixe pour qu'un écran
 * sans scroll tienne exactement dans 100% de la hauteur disponible.
 */
export const useScreenScale = () => {
  const { height } = useWindowDimensions();
  const scale = Math.min(Math.max(height / REFERENCE_HEIGHT, MIN_SCALE), MAX_SCALE);
  const scaleSize = useCallback((size: number) => Math.round(size * scale), [scale]);

  return { scale, scaleSize };
};
