import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StoryMode from '../StoryMode';
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

describe('StoryMode', () => {
  it('renders story header with title', () => {
    renderWithProviders(<StoryMode />);
    expect(screen.getByText('Your Democratic Journey')).toBeInTheDocument();
  });

  it('renders story subtitle', () => {
    renderWithProviders(<StoryMode />);
    expect(screen.getByText('Complete chapters to earn XP and badges')).toBeInTheDocument();
  });

  it('renders all 5 chapters', () => {
    renderWithProviders(<StoryMode />);
    expect(screen.getByText('Your Democratic Identity')).toBeInTheDocument();
    expect(screen.getByText('Know Your Arena')).toBeInTheDocument();
    expect(screen.getByText('Machines of Democracy')).toBeInTheDocument();
    expect(screen.getByText('Mission Polling Day')).toBeInTheDocument();
    expect(screen.getByText('Beyond the Vote')).toBeInTheDocument();
  });

  it('renders chapter numbers', () => {
    renderWithProviders(<StoryMode />);
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter 2')).toBeInTheDocument();
    expect(screen.getByText('Chapter 3')).toBeInTheDocument();
    expect(screen.getByText('Chapter 4')).toBeInTheDocument();
    expect(screen.getByText('Chapter 5')).toBeInTheDocument();
  });

  it('first chapter is unlocked with Start button', () => {
    renderWithProviders(<StoryMode />);
    const startButtons = screen.getAllByText('Start Chapter');
    expect(startButtons.length).toBeGreaterThan(0);
  });

  it('shows locked text for chapters after chapter 1', () => {
    renderWithProviders(<StoryMode />);
    const lockedTexts = screen.getAllByText('Complete previous chapter to unlock');
    expect(lockedTexts.length).toBeGreaterThan(0);
  });

  it('renders chapter icons', () => {
    renderWithProviders(<StoryMode />);
    expect(screen.getByText('🪪')).toBeInTheDocument();
    expect(screen.getByText('🏛️')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
    expect(screen.getByText('🌟')).toBeInTheDocument();
  });

  it('renders XPBar component', () => {
    const { container } = renderWithProviders(<StoryMode />);
    const xpBar = container.querySelector('.xp-bar-container');
    expect(xpBar).toBeTruthy();
  });

  it('renders story path line', () => {
    const { container } = renderWithProviders(<StoryMode />);
    const pathLine = container.querySelector('.story-path-line');
    expect(pathLine).toBeTruthy();
  });
});
