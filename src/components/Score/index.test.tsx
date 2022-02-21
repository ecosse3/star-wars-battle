import React from 'react';
import { renderComponent } from '#utils/tests';
import Score from '.';
import { screen } from '@testing-library/react';

test('renders component with 0 points text for all players', () => {
  renderComponent(<Score leftPlayer={0} rightPlayer={0} />);

  const player = screen.getByText(/Player 1/i);
  const points = screen.getAllByRole('heading', {
    level: 4,
    name: /0/i
  });
  expect(player).toBeInTheDocument();
  expect(points).toHaveLength(2);
});

test('renders component with 1 point text for right player', () => {
  renderComponent(<Score leftPlayer={0} rightPlayer={1} />);

  const player = screen.getByText(/Player 1/i);
  const points = screen.getByRole('heading', {
    level: 4,
    name: /1/i
  });
  expect(player).toBeInTheDocument();
  expect(points).toBeInTheDocument();
});
