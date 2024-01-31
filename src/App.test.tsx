import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryCalculator from './calculator/DeliveryCalculator';

test('Tests whether default fee is €12.00', () => {
  render(<DeliveryCalculator />);
  
  const button = screen.getByText(/Calculate delivery price/i);

  fireEvent.click(button);
  const output = screen.getByText(/Delivery price: €12.00/i);
  expect(output).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});