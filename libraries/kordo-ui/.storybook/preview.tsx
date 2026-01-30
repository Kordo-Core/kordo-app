import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/theme';

// Web theme with correct font family names
const webTheme = {
  ...theme,
  fonts: {
    regular: '"Outfit", sans-serif',
    medium: '"Outfit", sans-serif',
    bold: '"Outfit", sans-serif',
  },
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap');
          `}
        </style>
        <ThemeProvider theme={webTheme}>
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
