import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StateSelector from '../StateSelector';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('StateSelector', () => {
  it('renders dropdown with state options', () => {
    renderWithProvider(<StateSelector />);
    const select = screen.getByRole('combobox');
    expect(select).toBeTruthy();
  });

  it('shows Select Your State label by default', () => {
    renderWithProvider(<StateSelector />);
    expect(screen.getByText('Select Your State')).toBeInTheDocument();
  });

  it('hides label when compact is true', () => {
    renderWithProvider(<StateSelector compact={true} />);
    expect(screen.queryByText('Select Your State')).toBeNull();
  });

  it('renders multiple state options', () => {
    renderWithProvider(<StateSelector />);
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);
  });

  it('has Maharashtra selected by default', () => {
    renderWithProvider(<StateSelector />);
    const select = screen.getByRole('combobox');
    expect(select.value).toBe('maharashtra');
  });

  it('changes value on selection', () => {
    renderWithProvider(<StateSelector />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'delhi' } });
    expect(select.value).toBe('delhi');
  });

  it('applies compact class when compact prop is true', () => {
    const { container } = renderWithProvider(<StateSelector compact={true} />);
    const wrapper = container.querySelector('.state-selector');
    expect(wrapper.className).toContain('compact');
  });
});
