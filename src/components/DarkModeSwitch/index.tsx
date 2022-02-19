import React from 'react';
import { Switcher } from './index.styles';

interface IProps {
  checked: boolean;
  toggleCallback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DarkModeSwitch = ({ checked, toggleCallback }: IProps) => {
  return (
    <Switcher
      inputProps={{ 'aria-label': 'controlled' }}
      checked={checked}
      onChange={toggleCallback}
    />
  );
};

export default DarkModeSwitch;
