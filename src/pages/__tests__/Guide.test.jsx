import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Guide from '../Guide';
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

describe('Guide', () => {
  it('renders guide title', () => {
    renderWithProviders(<Guide />);
    expect(screen.getByText('Your 5-Step Voting Guide')).toBeInTheDocument();
  });

  it('renders guide subtitle', () => {
    renderWithProviders(<Guide />);
    expect(screen.getByText('From registration to casting your vote')).toBeInTheDocument();
  });

  it('renders all 5 guide steps', () => {
    renderWithProviders(<Guide />);
    expect(screen.getByText('Register as a Voter')).toBeInTheDocument();
    expect(screen.getByText('Verify Your Registration')).toBeInTheDocument();
    expect(screen.getByText('Find Your Polling Booth')).toBeInTheDocument();
    expect(screen.getByText('Carry Your Documents')).toBeInTheDocument();
    expect(screen.getByText('Cast Your Vote!')).toBeInTheDocument();
  });

  it('renders step numbers', () => {
    renderWithProviders(<Guide />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 4')).toBeInTheDocument();
    expect(screen.getByText('Step 5')).toBeInTheDocument();
  });

  it('renders step icons', () => {
    renderWithProviders(<Guide />);
    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('📍')).toBeInTheDocument();
    expect(screen.getByText('🪪')).toBeInTheDocument();
    expect(screen.getByText('🗳️')).toBeInTheDocument();
  });

  it('expands step on click to show description', () => {
    renderWithProviders(<Guide />);
    const step1 = screen.getByText('Register as a Voter').closest('.guide-step-card');
    fireEvent.click(step1);
    
    expect(screen.getByText(/Visit voters.eci.gov.in/)).toBeInTheDocument();
  });

  it('collapses step when clicked again', () => {
    renderWithProviders(<Guide />);
    const step1 = screen.getByText('Register as a Voter').closest('.guide-step-card');
    
    // Click to expand
    fireEvent.click(step1);
    expect(screen.getByText(/Visit voters.eci.gov.in/)).toBeInTheDocument();
    
    // Click to collapse
    fireEvent.click(step1);
    expect(screen.queryByText(/Visit voters.eci.gov.in/)).not.toBeInTheDocument();
  });

  it('shows action link in expanded step', () => {
    renderWithProviders(<Guide />);
    const step1 = screen.getByText('Register as a Voter').closest('.guide-step-card');
    fireEvent.click(step1);
    
    expect(screen.getByText(/Go to voters.eci.gov.in/)).toBeInTheDocument();
  });
});
