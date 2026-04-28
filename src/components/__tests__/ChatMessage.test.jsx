import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChatMessage from '../ChatMessage';

describe('ChatMessage', () => {
  it('renders user message with correct class', () => {
    const message = { role: 'user', content: 'Hello', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const msgDiv = container.querySelector('.chat-message');
    expect(msgDiv.className).toContain('user');
  });

  it('renders assistant message with correct class', () => {
    const message = { role: 'assistant', content: 'Hi there!', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const msgDiv = container.querySelector('.chat-message');
    expect(msgDiv.className).toContain('assistant');
  });

  it('displays user avatar for user messages', () => {
    const message = { role: 'user', content: 'Test', isStreaming: false };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('displays bot avatar for assistant messages', () => {
    const message = { role: 'assistant', content: 'Test', isStreaming: false };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('🗳️')).toBeInTheDocument();
  });

  it('renders streaming indicator when isStreaming is true', () => {
    const message = { role: 'assistant', content: 'Loading...', isStreaming: true };
    const { container } = render(<ChatMessage message={message} />);
    const indicator = container.querySelector('.chat-typing-indicator');
    expect(indicator).toBeTruthy();
  });

  it('does not render streaming indicator when isStreaming is false', () => {
    const message = { role: 'assistant', content: 'Done', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const indicator = container.querySelector('.chat-typing-indicator');
    expect(indicator).toBeNull();
  });

  it('renders message content text', () => {
    const message = { role: 'user', content: 'How do I register to vote?', isStreaming: false };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('How do I register to vote?')).toBeInTheDocument();
  });

  it('handles bold text wrapped in **', () => {
    const message = { role: 'assistant', content: '**Important Info**', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const boldElement = container.querySelector('.chat-bold');
    expect(boldElement).toBeTruthy();
    expect(boldElement.textContent).toBe('Important Info');
  });

  it('handles list items starting with bullet', () => {
    const message = { role: 'assistant', content: '• First item', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const listItem = container.querySelector('.chat-list-item');
    expect(listItem).toBeTruthy();
  });

  it('handles inline bold text', () => {
    const message = { role: 'assistant', content: 'This is **bold** text', isStreaming: false };
    const { container } = render(<ChatMessage message={message} />);
    const strong = container.querySelector('strong');
    expect(strong).toBeTruthy();
    expect(strong.textContent).toBe('bold');
  });
});
