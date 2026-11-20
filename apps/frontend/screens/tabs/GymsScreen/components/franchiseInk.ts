import { ThemeMode } from 'kordo-ui';

const INKS: Record<string, { light: string; dark: string }> = {
  Arkose: { light: '#00845A', dark: '#00A36F' },
  'Climb Up': { light: '#1F5BFF', dark: '#5C8CFF' },
  "Block'Out": { light: '#D7263D', dark: '#FF4D63' },
  Murmur: { light: '#B24A00', dark: '#FF9A4D' },
  'Petites Pierres': { light: '#7A4FB5', dark: '#7A4FB5' },
};

// Couleur d'encre d'une franchise : cachets du passeport et dates de la timeline
export const franchiseInk = (shortName: string, mode: ThemeMode) =>
  (INKS[shortName] ?? INKS.Arkose)[mode];
