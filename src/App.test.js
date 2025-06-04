import { render, screen } from '@testing-library/react';
import App from './App';

test('renders signup form by default', () => {
  render(<App />);
  const signupButton = screen.getByRole('button', { name: /sign up/i });
  expect(signupButton).toBeInTheDocument();
});
