import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../BottomNav';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>
  );
}

describe('BottomNav', () => {
  it('renders all 5 navigation items', () => {
    renderWithProviders(<BottomNav />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Story')).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
    expect(screen.getByText('Ask AI')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });

  it('renders navigation icons', () => {
    renderWithProviders(<BottomNav />);
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('📖')).toBeInTheDocument();
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('🤖')).toBeInTheDocument();
    expect(screen.getByText('📅')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    renderWithProviders(<BottomNav />, { route: '/' });
    const navElement = screen.getByText('Home').closest('a');
    expect(navElement.className).toContain('active');
  });

  it('renders as nav element', () => {
    const { container } = renderWithProviders(<BottomNav />);
    const nav = container.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.className).toContain('bottom-nav');
  });
});
