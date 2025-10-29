export type KordoTheme = {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    success: { base: string; lighter: string };
    error: { base: string; lighter: string };
    warning: { base: string; lighter: string };
    info: { base: string; lighter: string };
  };
  spacing: Record<string, number>;
  fontSizes: Record<string, number>;
  iconSizes: Record<string, number>;
  borderRadius: Record<string, number>;
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
};

export const theme: KordoTheme = {
  colors: {
    primary: {
      lightest: '#FFFDF7',
      lighter: '#fcead2ff',
      light: '#F7D081',
      base: '#F3B24E',
      dark: '#DB9840',
      darker: '#91551C',
      darkest: '#471F06',
    },
    secondary: {
      lightest: '#F5FAF9',
      lighter: '#CCE6DF',
      light: '#81B8A4',
      base: '#57987D',
      dark: '#468A6B',
      darker: '#1F5C3B',
      darkest: '#072B1F',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      grey: '#888888',
    },
    success: {
      base: '#57987D',
      lighter: '#E6F4EA',
    },
    error: {
      base: '#FF0000',
      lighter: '#FDECEA',
    },
    warning: {
      base: '#F3B24E',
      lighter: '#FFF4E5',
    },
    info: {
      base: '#2196F3',
      lighter: '#E8F3FD',
    },
  },
  spacing: { sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 },
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24, xxl: 32 },
  iconSizes: { md: 20, lg: 30 },
  borderRadius: { md: 8, rounded: 100 },
  fonts: {
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    bold: 'Outfit_700Bold',
  },
};
