import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: false, // Disable react-docgen to avoid issues with react-native
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          '@emotion/native': '@emotion/styled',
        },
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js'],
      },
      optimizeDeps: {
        include: ['react-native-web'],
      },
    });
  },
};

export default config;
