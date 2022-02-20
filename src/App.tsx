import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/slices/themeSlice';
import { getDesignPalette } from './utils/theme';
import TopBar from '#components/TopBar';
import ResourceSelection from '#containers/ResourceSelection';
import { selectResource } from '#store/slices/gameSlice';
import FightPeople from '#containers/FightPeople';

const App = () => {
  const darkMode = useSelector(selectDarkMode);
  const resource = useSelector(selectResource);

  // Update the theme only if the darkMode changes
  const theme = useMemo(() => createTheme(getDesignPalette(darkMode)), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <TopBar />
        {resource === null ? <ResourceSelection /> : null}
        {resource === 'people' ? <FightPeople /> : null}
      </Container>
    </ThemeProvider>
  );
};

export default App;
