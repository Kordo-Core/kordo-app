import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const mocksDir = path.resolve(__dirname, '../src/__mocks__');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: [
          // react-native exact → react-native-web
          { find: /^react-native$/, replacement: require.resolve('react-native-web') },
          // react-native/Libraries/* internal paths → empty mock (can't be parsed by esbuild)
          { find: /^react-native\/Libraries\/.*$/, replacement: path.join(mocksDir, 'rn-library.ts') },
          // emotion native → adapter that maps View/Text/etc to HTML elements
          { find: '@emotion/native', replacement: path.join(mocksDir, 'emotion-native.ts') },
          // reanimated exact → our ESM mock (reanimated/mock.js is CJS, doesn't work with Vite)
          { find: /^react-native-reanimated$/, replacement: path.join(mocksDir, 'reanimated.ts') },
          // gesture-handler → mock
          { find: 'react-native-gesture-handler', replacement: path.join(mocksDir, 'gesture-handler.ts') },
          // expo-video → mock (module natif, indisponible sur le web Vite)
          { find: /^expo-video$/, replacement: path.join(mocksDir, 'expo-video.ts') },
          // masked-view → mock
          { find: '@react-native-masked-view/masked-view', replacement: path.join(mocksDir, 'masked-view.ts') },
          // safe-area-context → mock
          { find: 'react-native-safe-area-context', replacement: path.join(mocksDir, 'safe-area-context.ts') },
          // react-native-svg → mock (maps Svg/Path/Circle to HTML SVG elements)
          { find: 'react-native-svg', replacement: path.join(mocksDir, 'react-native-svg.ts') },
        ],
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js'],
      },
      optimizeDeps: {
        include: ['react-native-web'],
        exclude: [
          'react-native-reanimated',
          'react-native-gesture-handler',
          'react-native-safe-area-context',
        ],
      },
    });
  },
};

export default config;
