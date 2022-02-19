import React from 'react';
import StarWarsLogo from '#assets/logo/StarWarsLogo';
import DarkModeSwitch from '#components/DarkModeSwitch';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectDarkMode, toggleTheme } from '#store/slices/themeSlice';
import { useAppDispatch } from '#store';

const TopBar = () => {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex">
        <StarWarsLogo fill={darkMode ? 'white' : 'black'} />
      </Box>
      <Box display="flex">
        <DarkModeSwitch
          checked={darkMode}
          toggleCallback={() => dispatch(toggleTheme())}
        />
      </Box>
    </Box>
  );
};

export default TopBar;
