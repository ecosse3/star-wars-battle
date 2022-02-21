import * as redux from 'react-redux';
import React from 'react';
import { renderComponent } from '#utils/tests';
import PlayAgainOrSwitch from '.';
import { screen } from '@testing-library/react';

const useDispatchMock = jest.spyOn(redux, 'useDispatch');

beforeEach(() => {
  useDispatchMock.mockClear();
});

test('renders component with Play again button', () => {
  renderComponent(<PlayAgainOrSwitch onPlayAgainCallback={() => {}} />);
  const button = screen.getByRole('button', {
    name: /Play again/i
  });
  expect(button).toBeInTheDocument();
});

test('renders component with Switch resource button', () => {
  renderComponent(<PlayAgainOrSwitch onPlayAgainCallback={() => {}} />);
  const button = screen.getByRole('button', {
    name: /Switch resource/i
  });
  expect(button).toBeInTheDocument();
});
