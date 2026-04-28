import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BilingualToggle from '../BilingualToggle';
import { AppProvider } from '../../context/AppContext';

// Mock firebase to avoid initialization issues in tests
vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('BilingualToggle', () => {
  it('renders toggle button with EN and Hindi options', () => {
    renderWithProvider(<BilingualToggle />);
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('हि')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    renderWithProvider(<BilingualToggle />);
    expect(screen.getByLabelText('Toggle language')).toBeInTheDocument();
  });

  it('toggles language on click', () => {
    renderWithProvider(<BilingualToggle />);
    const button = screen.getByLabelText('Toggle language');
    
    // Initially EN should be active
    const enSpan = screen.getByText('EN');
    expect(enSpan.className).toContain('active');
    
    // Click to switch to Hindi
    fireEvent.click(button);
    
    const hiSpan = screen.getByText('हि');
    expect(hiSpan.className).toContain('active');
  });
});
