import { Easing } from 'react-native-reanimated';

/**
 * Jetons de mouvement du design D (section « 05 · Mouvement » du design system).
 * Courbes en reanimated : pour l'API Animated de React Native (transitions de navigation),
 * reprendre les mêmes coefficients avec `Easing.bezier` de 'react-native'.
 */
export const MOTION_CURVES = {
  /** Pression, glissements d'indicateurs */
  standard: [0.2, 0, 0, 1],
  /** Entrée : glissé + fondu */
  enter: [0.05, 0.7, 0.1, 1],
  /** Rebond : validation, likes */
  spring: [0.34, 1.56, 0.64, 1],
  /** Glisser (slide-to-publish) */
  slide: [0.65, 0, 0.35, 1],
} as const;

export const motion = {
  easing: {
    standard: Easing.bezier(...MOTION_CURVES.standard),
    enter: Easing.bezier(...MOTION_CURVES.enter),
    spring: Easing.bezier(...MOTION_CURVES.spring),
    slide: Easing.bezier(...MOTION_CURVES.slide),
  },
  duration: {
    press: 140,
    enter: 500,
    spring: 450,
    slide: 700,
  },
  /** Ressort amorti : suit le doigt sans rebond visible (indicateurs, pastilles) */
  glide: { damping: 26, stiffness: 320, mass: 0.9 },
  /** Ressort de pression : retour vif après un appui */
  press: { damping: 18, stiffness: 420, mass: 0.6 },
  /** Échelle au toucher */
  pressScale: 0.95,
} as const;
