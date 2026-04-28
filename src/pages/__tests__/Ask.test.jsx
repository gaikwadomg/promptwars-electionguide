import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ask from '../Ask';
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

describe('Ask', () => {
  it('renders chat interface', () => {
    const { container } = renderWithProviders(<Ask />);
    const chatContainer = container.querySelector('.chat-container');
    expect(chatContainer).toBeTruthy();
  });

  it('renders chat header with title', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText('Ask Matdata Mitra')).toBeInTheDocument();
  });

  it('shows demo mode badge initially', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText('Demo Mode')).toBeInTheDocument();
  });

  it('shows welcome message when no messages', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText(/Namaste!/)).toBeInTheDocument();
  });

  it('renders suggested questions', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText('How do I get a Voter ID?')).toBeInTheDocument();
    expect(screen.getByText('Where is my polling booth?')).toBeInTheDocument();
    expect(screen.getByText('What is an EVM?')).toBeInTheDocument();
  });

  it('renders input field', () => {
    renderWithProviders(<Ask />);
    const input = screen.getByPlaceholderText('Type your question about elections...');
    expect(input).toBeInTheDocument();
  });

  it('renders send button', () => {
    const { container } = renderWithProviders(<Ask />);
    const sendBtn = container.querySelector('.chat-send-btn');
    expect(sendBtn).toBeTruthy();
  });

  it('send button is disabled when input is empty', () => {
    const { container } = renderWithProviders(<Ask />);
    const sendBtn = container.querySelector('.chat-send-btn');
    expect(sendBtn.disabled).toBe(true);
  });

  it('enables send button when input has text', () => {
    const { container } = renderWithProviders(<Ask />);
    const input = screen.getByPlaceholderText('Type your question about elections...');
    fireEvent.change(input, { target: { value: 'test question' } });
    const sendBtn = container.querySelector('.chat-send-btn');
    expect(sendBtn.disabled).toBe(false);
  });

  it('renders API mode switch button', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText('🔑 API')).toBeInTheDocument();
  });

  it('shows API key input when API button clicked', () => {
    renderWithProviders(<Ask />);
    fireEvent.click(screen.getByText('🔑 API'));
    expect(screen.getByText('Enter API Key')).toBeInTheDocument();
  });

  it('renders demo mode description note', () => {
    renderWithProviders(<Ask />);
    expect(screen.getByText(/No API key/)).toBeInTheDocument();
  });
});
