import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import XPBar from '../XPBar';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('XPBar', () => {
  it('renders XP count', () => {
    renderWithProvider(<XPBar />);
    const xpCount = document.querySelector('.xp-count');
    expect(xpCount).toBeTruthy();
    expect(xpCount.textContent).toContain('0');
    expect(xpCount.textContent).toContain('XP');
  });

  it('renders level badge', () => {
    renderWithProvider(<XPBar />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders level name', () => {
    renderWithProvider(<XPBar />);
    expect(screen.getByText('New Voter')).toBeInTheDocument();
  });

  it('renders XP bar track', () => {
    const { container } = renderWithProvider(<XPBar />);
    const track = container.querySelector('.xp-bar-track');
    expect(track).toBeTruthy();
  });

  it('shows details when showDetails is true', () => {
    renderWithProvider(<XPBar showDetails={true} />);
    expect(screen.getByText(/Day Streak/)).toBeInTheDocument();
    expect(screen.getByText(/Badges/)).toBeInTheDocument();
    expect(screen.getByText(/Chapters/)).toBeInTheDocument();
  });

  it('does not show details when showDetails is false', () => {
    const { container } = renderWithProvider(<XPBar showDetails={false} />);
    const details = container.querySelector('.xp-details');
    expect(details).toBeNull();
  });

  it('renders fire emoji for streak', () => {
    renderWithProvider(<XPBar showDetails={true} />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders badge emoji for badges count', () => {
    renderWithProvider(<XPBar showDetails={true} />);
    expect(screen.getByText('🏅')).toBeInTheDocument();
  });
});
