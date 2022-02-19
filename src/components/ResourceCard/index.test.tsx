import React from 'react';
import { renderComponent } from '#utils/tests';
import ResourceCard from '.';
import { screen } from '@testing-library/react';

test('renders resource card component name', () => {
  renderComponent(<ResourceCard image="path/to/img" name="People" onClick={jest.fn()} />);
  const resourceName = screen.getByText('People');
  expect(resourceName).toBeInTheDocument();
});

test('renders resource card component name within heading', () => {
  renderComponent(<ResourceCard image="path/to/img" name="People" onClick={jest.fn()} />);
  const heading = screen.getByRole('heading', { level: 6 });
  expect(heading).toBeInTheDocument();
});
