import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GPT Ai Chat header', () => {
  render(<App />);
  const headerElement = screen.getByText(/GPT Ai Chat/i);
  expect(headerElement).toBeInTheDocument();
});
