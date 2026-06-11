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
    
    expect(screen.getByText(/Full-Stack Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Developer/i)).toBeInTheDocument();
  });

  it('renders the two-sentence summary', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/recently graduated with a computer science degree/i)).toBeInTheDocument();
    expect(screen.getByText(/clean interfaces, smooth user flows, and efficient workflows/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
  });
});
