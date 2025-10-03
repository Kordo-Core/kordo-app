export type KordoTheme = {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    error: string;
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
      color50: '#FFFDF7',
      color100: '#FFFBED',
      color200: '#FCF2D2',
      color300: '#FAE7B6',
      color400: '#F7D081',
      color500: '#F3B24E',
      color600: '#DB9840',
      color700: '#B5752B',
      color800: '#91551C',
      color900: '#6E380F',
      color950: '#471F06',
    },
    secondary: {
      color50: '#F5FAF9',
      color100: '#EBF5F3',
      color200: '#CCE6DF',
      color300: '#B2D6CC',
      color400: '#81B8A4',
      color500: '#57987D',
      color600: '#468A6B',
      color700: '#317353',
      color800: '#1F5C3B',
      color900: '#124527',
      color950: '#072B1F',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      grey: '#888888',
    },
    error: '#FF0000',
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
