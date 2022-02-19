import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

export const getDesignPalette = (darkMode: boolean) => ({
  palette: {
    mode: darkMode ? ('dark' as PaletteMode) : ('light' as PaletteMode),
    ...(darkMode
      ? {
          // palette values for dark mode
          text: {
            primary: '#fff',
            secondary: grey[500]
          }
        }
      : {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800]
          }
        })
  }
});
