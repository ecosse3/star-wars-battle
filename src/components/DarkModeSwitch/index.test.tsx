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
  renderComponent(<DarkModeSwitch checked toggleCallback={jest.fn()} />);

  const checkbox = screen.getByRole('checkbox');

  checkbox.click();
  fireEvent.change(checkbox, { target: { checked: '' } });
  expect(checkbox).toHaveProperty('checked', false);

  fireEvent.change(checkbox, { target: { checked: 'checked' } });
  expect(checkbox).toHaveProperty('checked', true);
});
