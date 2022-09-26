import { render, screen } from '@testing-library/react';
import SocialNetworkApp from "./App";

test('renders learn react link', () => {
  render(<SocialNetworkApp />);
  const div = screen.getByRole(/main/i);
  expect(div).toBeInTheDocument();
});
