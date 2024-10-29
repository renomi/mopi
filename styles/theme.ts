const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  brand50: '#EDF8F480',
  brand100: '#E2F3EE',
  brand200: '#C1E6DA',
  brand300: '#9DD8C5',
  brand400: '#6DC5A9',
  brand500: '#45AC8B',
  brand600: '#3F9C7F',
  brand700: '#388A70',
  brand800: '#2D715B',
  brand900: '#225444',

  blu50: '#EDEFF7',
  blu100: '#dbe0f0',
  blu200: '#b7c0e1',
  blu300: '#94a1d1',
  blu400: '#7082c2',
  blu500: '#4d63b3',
  blu600: '#3d4f8f',
  blu700: '#2e3b6b',
  blu800: '#1e2748',
  blu900: '#0f1424',

  angry50: '#F8EDF080',
  angry100: '#F6E9ED',
  angry200: '#EBCCD6',
  angry300: '#DDABBB',
  angry400: '#CC8098',
  angry500: '#AC4566',
  angry600: '#993D5A',
  angry700: '#83354D',
  angry800: '#742F45',
  angry900: '#50202F',

  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',
} as const;

const sharedColors = {
  white: '#fff',
  fog: '##edededb8',
};

export const lightTheme = {
  colors: {
    ...sharedColors,
    palette,
    background: '#f8fafc',
    text: '#000',
  },
  spacing: {
    xxxs: 2,
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  typography: {
    normal: 'Onest-Regular',
    medium: 'Onest-Medium',
    bold: 'Onest-Bold',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 20,
  },
} as const;
