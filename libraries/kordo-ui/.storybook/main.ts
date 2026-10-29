import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { mergeConfig } from 'vite';
import { fileURLToPath } from 'url';

// La racine est en `"type": "module"` : Storybook charge cette config en ESM, où `__dirname`
// n'existe pas.
const here = (file: string) => fileURLToPath(new URL(file, import.meta.url));

// Le framework react-native-web-vite fait lui-même l'essentiel : alias `react-native` →
// `react-native-web`, résolution des extensions `.web.tsx`, et surtout Babel à la place
// d'esbuild — c'est lui qui permet de consommer les librairies natives publiées en Flow/JSX
// au lieu d'en réécrire un substitut.
//
// Ne restent ici que les choix propres à ce Storybook : le cadre téléphone.
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      pluginReactOptions: {
        // `modulesToTranspile` n'est pas utilisable ici : le framework en tire la règle
        // `/node_modules/(?!<paquet>|…)/`, or pnpm range les paquets sous
        // `node_modules/.pnpm/<paquet>@<version>/node_modules/<paquet>/`. La première
        // occurrence de `/node_modules/` est suivie de `.pnpm`, la règle exclut donc le
        // fichier avant d'atteindre le nom du paquet, et Babel ne le voit jamais.
        //
        // D'où cette règle posée directement : n'écarter de node_modules que les chemins qui
        // ne mènent à aucun paquet React Native, quel que soit le nombre de niveaux.
        exclude: [/node_modules\/(?!.*(react-native|@react-native|expo|@expo))/],
        babel: {
          // Reanimated 4 délègue ses worklets à react-native-worklets ; le plugin exposé par
          // reanimated lui-même n'est qu'un ré-export de celui-ci.
          //
          // `disableSourceMaps` n'est pas un détail de confort : pour cartographier un
          // worklet, le plugin relit le fichier source sur le disque à partir du nom que lui
          // passe Vite — query `?v=` comprise — et échoue en ENOENT sur tout node_modules.
          // Sans cette option, react-native-worklets ne peut pas être transpilé du tout, et
          // son auto-test de démarrage (`initializeRNRuntime`) lève « Failed to create a
          // worklet ».
          plugins: [['react-native-worklets/plugin', { disableSourceMaps: true }]],
        },
      },
    },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: [
          // Contrôle de version de Reanimated : il lit un package.json par `require`, ce qui
          // n'existe pas dans un navigateur (cf. le fichier de remplacement, à côté d'ici).
          {
            find: /^react-native-reanimated\/scripts\/validate-worklets-version$/,
            replacement: here('reanimated-worklets-version.ts'),
          },
        ],
      },
      optimizeDeps: {
        // Seul react-native-worklets échappe au pré-bundling. Son `initializeRNRuntime` crée
        // un worklet témoin pour vérifier que Babel est bien passé ; pré-bundlé par esbuild,
        // il court-circuite la chaîne de plugins et lève « Failed to create a worklet ».
        //
        // Reanimated, lui, livre ses worklets déjà transformés et n'a rien à y gagner. L'en
        // exclure coûtait cher : privé de la conversion CommonJS d'esbuild, son contrôle de
        // version ne s'importait plus, et le `require()` de `webUtils.web.js` — écrit pour
        // Metro — échouait en silence dans un `try/catch`, laissant les utilitaires de style
        // à `undefined`. Il fallait alors remplacer ces deux fichiers à la main.
        exclude: ['react-native-worklets'],
      },
    }),
};

export default config;
