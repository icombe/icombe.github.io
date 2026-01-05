import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

describe('LandingPage', () => {
  it('renders the name correctly', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    // The name is in an h1 element, check for the heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Ian');
    expect(heading.textContent).toContain('Combe');
  });

  it('renders the role title', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Computer Science Student/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Crafting digital experiences/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/View Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });
});
