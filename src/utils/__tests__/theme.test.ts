import { getDesignPalette } from '#utils/theme';
import { grey } from '@mui/material/colors';

test('palette mode to be light when darkMode argument is false', () => {
  const palette = getDesignPalette(false);
  expect(palette).toMatchObject({ palette: { mode: 'light' } });
});

test('palette mode to be dark when darkMode argument is true', () => {
  const palette = getDesignPalette(true);
  expect(palette).toMatchObject({ palette: { mode: 'dark' } });
});

test('white primary text color in dark mode', () => {
  const palette = getDesignPalette(true);
  expect(palette).toMatchObject({ palette: { text: { primary: '#fff' } } });
});

test('grey 900 primary text color in light mode', () => {
  const palette = getDesignPalette(false);
  expect(palette).toMatchObject({ palette: { text: { primary: grey[900] } } });
});
