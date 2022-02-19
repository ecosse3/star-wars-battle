import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import DarkModeSwitch from '.';
import { renderComponent } from '#utils/tests';

test('renders dark mode component', () => {
  renderComponent(<DarkModeSwitch checked toggleCallback={jest.fn()} />);

  const inputElement = screen.getByRole('checkbox') as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
});

test('toggles switch', () => {
  const { getByRole } = renderComponent(
    <DarkModeSwitch checked toggleCallback={jest.fn()} />
  );

  getByRole('checkbox').click();
  fireEvent.change(getByRole('checkbox'), { target: { checked: '' } });
  expect(getByRole('checkbox')).toHaveProperty('checked', false);

  fireEvent.change(getByRole('checkbox'), { target: { checked: 'checked' } });
  expect(getByRole('checkbox')).toHaveProperty('checked', true);
});
