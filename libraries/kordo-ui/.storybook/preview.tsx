// Installe `globalThis.expo` — dont `SharedObject`, la classe de base des objets natifs
// partagés. L'implémentation web d'expo-video en hérite et lève à l'import sans elle. Sur
// mobile, c'est le runtime Expo qui pose ce global au démarrage de l'application ; ici,
// personne ne le fait, d'où cet appel explicite.
//
// Le nom du module dit « dangerous-internal », mais c'est la seule entrée publiée par
// expo-modules-core pour ce polyfill, et son contenu est écrit pour le web.
import { installExpoGlobalPolyfill } from 'expo-modules-core/src/polyfill/dangerous-internal';

installExpoGlobalPolyfill();

import type { Preview } from '@storybook/react-native-web-vite';
import { Global, ThemeProvider } from '@emotion/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { themes, ThemeMode } from '../src/theme';
import { PHONE_HEIGHT, PHONE_WIDTH } from './PhoneFrame';

// Le thème nomme ses polices comme le fait React Native : une famille par graisse
// (`PlusJakartaSans_700Bold`), là où le navigateur attend une famille et un poids séparés.
// Plutôt que de traduire ces noms au vol, on les déclare tels quels au navigateur, à partir
// des fichiers que kordo-ui embarque (`assets/fonts`) — le thème est donc utilisé sans adaptation.
import Jakarta400 from '../assets/fonts/PlusJakartaSans-Regular.ttf';
import Jakarta500 from '../assets/fonts/PlusJakartaSans-Medium.ttf';
import Jakarta600 from '../assets/fonts/PlusJakartaSans-SemiBold.ttf';
import Jakarta700 from '../assets/fonts/PlusJakartaSans-Bold.ttf';
import Jakarta800 from '../assets/fonts/PlusJakartaSans-ExtraBold.ttf';
import Bricolage800 from '../assets/fonts/BricolageGrotesque-ExtraBold.ttf';

const fontFaces = `
  @font-face { font-family: 'PlusJakartaSans_400Regular'; src: url(${Jakarta400}) format('truetype'); }
  @font-face { font-family: 'PlusJakartaSans_500Medium'; src: url(${Jakarta500}) format('truetype'); }
  @font-face { font-family: 'PlusJakartaSans_600SemiBold'; src: url(${Jakarta600}) format('truetype'); }
  @font-face { font-family: 'PlusJakartaSans_700Bold'; src: url(${Jakarta700}) format('truetype'); }
  @font-face { font-family: 'PlusJakartaSans_800ExtraBold'; src: url(${Jakarta800}) format('truetype'); }
  @font-face { font-family: 'BricolageGrotesque_800ExtraBold'; src: url(${Bricolage800}) format('truetype'); }
`;

// Header, Section, ListRow et Notification lisent les marges de sécurité. Le vrai
// react-native-safe-area-context les mesure au montage et lève tant qu'aucun provider ne les
// fournit ; les métriques sont donc données d'emblée, ce qui évite en prime un rendu
// intermédiaire à zéro. Un navigateur n'a ni encoche ni barre système : les marges sont nulles.
const initialMetrics = {
  frame: { x: 0, y: 0, width: PHONE_WIDTH, height: PHONE_HEIGHT },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const preview: Preview = {
  // Bascule clair / sombre dans la barre d'outils de Storybook
  globalTypes: {
    theme: {
      description: 'Thème Kordo',
      toolbar: {
        title: 'Thème',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      // Thème choisi dans la barre d'outils (clair par défaut)
      const mode = (context.globals.theme ?? 'light') as ThemeMode;
      return (
        <>
          <Global styles={fontFaces} />
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <ThemeProvider theme={themes[mode]}>
              <Story />
            </ThemeProvider>
          </SafeAreaProvider>
        </>
      );
    },
  ],
  parameters: {
    // Le viewport reste proposé dans la barre d'outils pour inspecter n'importe quelle story à
    // la taille d'un téléphone. Ce n'est plus lui qui porte le cadre : celui-ci est un
    // composant à part entière (`PhoneFrame.tsx`, à côté d'ici), ce qui le rend indépendant
    // d'un réglage global que l'utilisateur peut changer et que Storybook mémorise.
    viewport: {
      options: {
        phone: {
          name: 'Phone',
          type: 'mobile',
          styles: { width: `${PHONE_WIDTH}px`, height: `${PHONE_HEIGHT}px` },
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
