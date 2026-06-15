export type KordoTheme = {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: {
      white: string;
      black: string;
      gray: Record<string, string>;
    };
    success: { base: string; lighter: string };
    error: { base: string; lighter: string };
    warning: { base: string; lighter: string };
    info: { base: string; lighter: string };
    boulderGrade: Record<string, string>;
  };
  spacing: Record<string, number>;
  fontSizes: Record<string, number>;
  iconSizes: Record<string, number>;
  avatarSizes: Record<string, number>;
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
      lightest: '#fffef5',
      lighter: 'rgb(247, 219, 180)',
      light: '#F7D081',
      base: '#F3B24E',
      dark: '#DB9840',
      darker: '#91551C',
      darkest: '#471F06',
    },
    secondary: {
      lightest: '#f2fcfa',
      lighter: '#bce3d9',
      light: '#81B8A4',
      base: '#57987D',
      dark: '#468A6B',
      darker: '#1F5C3B',
      darkest: '#072B1F',
    },
    neutral: {
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        light: '#dadadaff',
        base: '#888888',
      },
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
    boulderGrade: {
      yellow: '#f3e34eff',
      green: '#27AE60',
      blue: '#2F80ED',
      red: '#EC3463',
      black: '#000000',
      purple: '#9B51E0',
    },
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 32 },
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24, xxl: 32 },
  iconSizes: { sm: 20, md: 24, lg: 32 },
  avatarSizes: { sm: 38, md: 50, lg: 72 },
  borderRadius: { square: 8, rounded: 100 },
  fonts: {
    regular: 'Outfit_400Regular',
    medium: 'Outfit_500Medium',
    bold: 'Outfit_700Bold',
  },
};
