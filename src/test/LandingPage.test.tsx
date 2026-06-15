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
    
    expect(screen.getByText(/Ian/i)).toBeInTheDocument();
    expect(screen.getByText(/Combe/i)).toBeInTheDocument();
    expect(screen.getByText(/2026 edition/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Passionate about solving tough problems across the whole stack/i
    );
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
    
    expect(screen.getByText(/computer science graduate looking for a software role/i)).toBeInTheDocument();
    expect(screen.getByText(/clean interfaces, smooth user flows, and efficient workflows/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    expect(screen.getAllByText(/Resume/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Project portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/View projects/i)).toBeInTheDocument();
    expect(screen.getAllByText(/GitHub/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/LinkedIn/i).length).toBeGreaterThan(0);
  });
});
