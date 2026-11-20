import { KordoTheme } from '../theme';

/**
 * Fonds « doux » partagés par `Tag` et `Button`, en plus des couleurs pleines du thème :
 * - `soft` : vert pâle, texte vert (filtre actif, tendance en hausse)
 * - `softError` : rouge pâle, texte rouge (tendance en baisse)
 * - `surface` : blanc de carte, texte principal (posé sur le fond de page)
 * - `muted` : gris clair, texte atténué (étiquette neutre)
 * - `glass` : voile blanc translucide, texte blanc (posé sur une photo ou le héros vert)
 */
export const SURFACE_TONES = ['soft', 'softError', 'surface', 'muted', 'glass'] as const;
export type SurfaceTone = (typeof SURFACE_TONES)[number];

export const isSurfaceTone = (value: string | undefined): value is SurfaceTone =>
  !!value && (SURFACE_TONES as readonly string[]).includes(value);

// Fond et couleur du contenu (texte, icône) d'un fond doux
export const getToneColors = (
  theme: KordoTheme,
  tone: SurfaceTone,
): { background: string; content: string } => {
  switch (tone) {
    case 'soft':
      return { background: theme.colors.soft, content: theme.colors.softText };
    case 'softError':
      return { background: theme.colors.error.lighter, content: theme.colors.error.base };
    case 'surface':
      return { background: theme.colors.surface, content: theme.colors.text };
    case 'muted':
      return { background: theme.colors.surfaceAlt, content: theme.colors.textMuted };
    case 'glass':
      return { background: 'rgba(255, 255, 255, 0.16)', content: theme.colors.neutral.white };
  }
};
