import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BadgePopup from '../BadgePopup';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('BadgePopup', () => {
  it('does not render when no badge popup is active', () => {
    const { container } = renderWithProvider(<BadgePopup />);
    expect(container.querySelector('.badge-popup-overlay')).toBeNull();
  });

  it('renders without crashing', () => {
    const { container } = renderWithProvider(<BadgePopup />);
    expect(container).toBeTruthy();
  });
});
