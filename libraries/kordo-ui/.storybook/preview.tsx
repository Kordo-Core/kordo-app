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
import { theme } from '../src/theme';
import { PHONE_HEIGHT, PHONE_WIDTH } from './PhoneFrame';

// Le thème nomme ses polices comme le fait React Native : une famille par graisse
// (`Outfit_700Bold`), là où le navigateur attend une famille et un poids séparés. Plutôt que
// de traduire ces noms au vol, on les déclare tels quels au navigateur, à partir des fichiers
// que l'application embarque déjà — le thème est donc utilisé sans adaptation.
import Outfit400 from '@expo-google-fonts/outfit/400Regular/Outfit_400Regular.ttf';
import Outfit500 from '@expo-google-fonts/outfit/500Medium/Outfit_500Medium.ttf';
import Outfit700 from '@expo-google-fonts/outfit/700Bold/Outfit_700Bold.ttf';

const fontFaces = `
  @font-face { font-family: 'Outfit_400Regular'; src: url(${Outfit400}) format('truetype'); }
  @font-face { font-family: 'Outfit_500Medium';  src: url(${Outfit500}) format('truetype'); }
  @font-face { font-family: 'Outfit_700Bold';    src: url(${Outfit700}) format('truetype'); }
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
  decorators: [
    (Story) => (
      <>
        <Global styles={fontFaces} />
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </SafeAreaProvider>
      </>
    ),
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
