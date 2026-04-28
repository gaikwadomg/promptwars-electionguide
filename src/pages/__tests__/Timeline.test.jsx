import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Timeline from '../Timeline';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>
  );
}

describe('Timeline', () => {
  it('renders timeline title', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
  });

  it('renders timeline subtitle', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('Key milestones in the election cycle')).toBeInTheDocument();
  });

  it('renders state info panel', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('State Election Info')).toBeInTheDocument();
  });

  it('renders CEO contact info', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('Chief Electoral Officer')).toBeInTheDocument();
  });

  it('renders voter helpline section', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('Voter Helpline')).toBeInTheDocument();
  });

  it('renders SVEEP campaign info', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('SVEEP Campaign')).toBeInTheDocument();
  });

  it('renders constituencies info', () => {
    renderWithProviders(<Timeline />);
    expect(screen.getByText('Constituencies')).toBeInTheDocument();
  });

  it('renders timeline milestone cards', () => {
    const { container } = renderWithProviders(<Timeline />);
    const milestones = container.querySelectorAll('.timeline-milestone');
    expect(milestones.length).toBeGreaterThan(0);
  });

  it('renders timeline markers', () => {
    const { container } = renderWithProviders(<Timeline />);
    const markers = container.querySelectorAll('.timeline-marker');
    expect(markers.length).toBeGreaterThan(0);
  });

  it('renders state selector in state info panel', () => {
    renderWithProviders(<Timeline />);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
  });
});
