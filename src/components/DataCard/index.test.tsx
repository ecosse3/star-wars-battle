import React from 'react';
import { screen } from '@testing-library/react';
import DataCard from '.';
import { renderComponent } from '#utils/tests';

test('renders dark mode component', () => {
  renderComponent(
    <DataCard isWinner={false}>
      <h1>Testing...</h1>
    </DataCard>
  );

  const heading = screen.getByText(/Testing.../);
  expect(heading).toBeInTheDocument();
});
