import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap');
          `}
        </style>
        {/* Le thème est utilisé tel quel : les noms de police natifs (Outfit_700Bold) sont
            traduits en famille + graisse par le mock de style, sinon `bold` n'a aucun effet. */}
        <ThemeProvider theme={theme}>
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
