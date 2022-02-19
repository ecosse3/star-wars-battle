import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, createTheme, ThemeProvider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDarkMode } from './store/slices/themeSlice';
import { getDesignPalette } from './utils/theme';
import TopBar from '#components/TopBar';

const App = () => {
  const darkMode = useSelector(selectDarkMode);

  // Update the theme only if the darkMode changes
  const theme = useMemo(() => createTheme(getDesignPalette(darkMode)), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <TopBar />
        >
          Learn React
        </a>
      </header>
    </div>
      </Container>
    </ThemeProvider>
  );
};

export default App;
