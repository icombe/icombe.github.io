import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';
import { AchievementProvider } from '../context/AchievementContext';

const renderWithProviders = (component: React.ReactElement) => {
  const mockShowAchievement = vi.fn();
  return render(
    <BrowserRouter>
      <AchievementProvider showAchievementPopup={mockShowAchievement}>
        {component}
      </AchievementProvider>
    </BrowserRouter>
  );
};

describe('Footer', () => {
  it('renders the name', () => {
    renderWithProviders(<Footer />);
    
    const nameElements = screen.getAllByText(/Ian Combe/i);
    expect(nameElements.length).toBeGreaterThan(0);
  });

  it('renders quick links section', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
  });

  it('renders social links section', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByText(/Connect/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithProviders(<Footer />);
    
    const links = ['About', 'Projects', 'Contact'];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders social media links', () => {
    renderWithProviders(<Footer />);
    
    expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    renderWithProviders(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
