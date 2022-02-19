import * as redux from 'react-redux';
import React from 'react';
import { renderComponent } from '#utils/tests';
import TopBar from '.';
import { screen } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

test('renders top bar component with logo', () => {
  renderComponent(<TopBar />);
  const logo = screen.getByTestId('logo');
  expect(logo).toBeInTheDocument();
});

test('renders top bar component with black logo in light mode', () => {
  renderComponent(<TopBar />);
  useSelectorMock.mockReturnValue({ darkMode: false });
  const logo = screen.getByTestId('logo');
  const path = screen.getByTestId('logo-path');
  expect(logo).toBeInTheDocument();
  expect(path).toHaveAttribute('fill', 'black');
});
