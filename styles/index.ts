import { UnistylesRegistry } from 'react-native-unistyles';

import { breakpoints } from './breakpoints';
import { lightTheme } from './theme';

type AppBreakpoints = typeof breakpoints;

type AppThemes = {
  light: typeof lightTheme;
};

// override library types
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    // register other themes with unique names
  })
  .addConfig({
    initialTheme: 'light',
  });
