import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';

const renderHeader = () =>
  render(
    <BrowserRouter>
      <SiteHeader />
    </BrowserRouter>
  );

describe('SiteHeader', () => {
  it('renders navigation without extra header action buttons', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: /ian combe/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /mode/i })).not.toBeInTheDocument();
  });
});
