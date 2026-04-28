import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <AppProvider>{ui}</AppProvider>
    </MemoryRouter>
  );
}

describe('Home', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders hero section with app name', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Matdata Mitra')).toBeInTheDocument();
  });

  it('renders Hindi app name', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('मतदाता मित्र')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Your Vote, Your Right')).toBeInTheDocument();
  });

  it('renders AshokaChakra component', () => {
    const { container } = renderWithProviders(<Home />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('renders all 4 mode cards', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Story Mode')).toBeInTheDocument();
    expect(screen.getByText('Ask a Question')).toBeInTheDocument();
    expect(screen.getByText('Step-by-Step Guide')).toBeInTheDocument();
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
  });

  it('renders mode descriptions', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Learn through an interactive journey')).toBeInTheDocument();
    expect(screen.getByText('Chat with Matdata Mitra AI')).toBeInTheDocument();
    expect(screen.getByText('Quick voting guide in 5 steps')).toBeInTheDocument();
    expect(screen.getByText('Key dates & milestones')).toBeInTheDocument();
  });

  it('navigates to /story when Story Mode card is clicked', () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText('Story Mode'));
    expect(mockNavigate).toHaveBeenCalledWith('/story');
  });

  it('navigates to /ask when Ask card is clicked', () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText('Ask a Question'));
    expect(mockNavigate).toHaveBeenCalledWith('/ask');
  });

  it('navigates to /guide when Guide card is clicked', () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText('Step-by-Step Guide'));
    expect(mockNavigate).toHaveBeenCalledWith('/guide');
  });

  it('navigates to /timeline when Timeline card is clicked', () => {
    renderWithProviders(<Home />);
    fireEvent.click(screen.getByText('Election Timeline'));
    expect(mockNavigate).toHaveBeenCalledWith('/timeline');
  });

  it('renders voter helpline info', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('1950')).toBeInTheDocument();
    expect(screen.getByText('Voter Helpline')).toBeInTheDocument();
  });

  it('renders ECI website info', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('eci.gov.in')).toBeInTheDocument();
  });

  it('renders Choose Your Path section title', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Choose Your Path/)).toBeInTheDocument();
  });

  it('renders state selector', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText('Select Your State')).toBeInTheDocument();
  });
});
