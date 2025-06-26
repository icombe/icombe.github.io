import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the hero section with name and title', () => {
    render(<Hero />);
    expect(screen.getByText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Web Developer & Software Engineer/i)).toBeInTheDocument();
  });
});