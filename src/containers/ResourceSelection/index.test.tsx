import * as redux from 'react-redux';
import React from 'react';
import { renderComponent } from '#utils/tests';
import ResourceSelection from '.';
import { screen } from '@testing-library/react';

const useSelectorMock = jest.spyOn(redux, 'useSelector');
const useDispatchMock = jest.spyOn(redux, 'useDispatch');

beforeEach(() => {
  useSelectorMock.mockClear();
  useDispatchMock.mockClear();
});

test('renders resource selection container with logo', () => {
  renderComponent(<ResourceSelection />);
  const title = screen.getByText(/Who fights?/);
  expect(title).toBeInTheDocument();
});

test('renders resource selection container within heading', () => {
  renderComponent(<ResourceSelection />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toBeInTheDocument();
});
