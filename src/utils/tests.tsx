import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

interface IChildrenProp {
  children: React.ReactNode;
}

const MockTheme = ({ children }: IChildrenProp) => {
  const theme = createTheme({});
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const renderComponent = (children: React.ReactNode) =>
  render(<MockTheme>{children}</MockTheme>);
