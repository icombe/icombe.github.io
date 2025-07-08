import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the hero section with name and title', () => {
    render(<Hero />);
    expect(screen.getByText(/Ian Combe/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer & Computer Science Student/i)).toBeInTheDocument();
  });
});