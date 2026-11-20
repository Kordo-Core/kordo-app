import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { ThemeMode, themes } from '../theme';

type ThemeModeContextValue = {
  /** Thème actif */
  mode: ThemeMode;
  /** Change de thème : tout l'arbre se re-rend avec les nouveaux jetons */
  setMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  setMode: () => {},
});

interface KordoThemeProviderProps {
  children: React.ReactNode;
  /** Thème au démarrage. Clair par défaut. */
  initialMode?: ThemeMode;
}

/**
 * Fournit le thème Kordo (clair ou sombre) à emotion et expose de quoi le changer.
 * Remplace le `ThemeProvider` d'emotion à la racine de l'application.
 */
export const KordoThemeProvider: React.FC<KordoThemeProviderProps> = ({
  children,
  initialMode = 'light',
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

/** Lit et change le thème actif (écran Apparence). */
export const useThemeMode = () => useContext(ThemeModeContext);
