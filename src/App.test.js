import { render, screen } from '@testing-library/react';
import App from './App';

jest.setTimeout(3000)
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Draft Card/i);
  expect(linkElement).toBeInTheDocument();
});
