import { describe, it, expect, vi, beforeEach } from 'vitest';
import { streamChat, SYSTEM_PROMPT } from '../anthropic';

describe('anthropic API', () => {
  it('exports SYSTEM_PROMPT string', () => {
    expect(typeof SYSTEM_PROMPT).toBe('string');
    expect(SYSTEM_PROMPT.length).toBeGreaterThan(0);
  });

  it('SYSTEM_PROMPT mentions Matdata Mitra', () => {
    expect(SYSTEM_PROMPT).toContain('Matdata Mitra');
  });

  it('SYSTEM_PROMPT mentions voter registration', () => {
    expect(SYSTEM_PROMPT).toContain('voter');
  });

  it('calls onError when no API key is provided', async () => {
    const onChunk = vi.fn();
    const onDone = vi.fn();
    const onError = vi.fn();
    await streamChat([], '', onChunk, onDone, onError);
    expect(onError).toHaveBeenCalledWith('No API key provided');
    expect(onChunk).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();
  });

  it('calls onError when API key is null', async () => {
    const onError = vi.fn();
    await streamChat([], null, vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith('No API key provided');
  });

  it('calls onError when API key is undefined', async () => {
    const onError = vi.fn();
    await streamChat([], undefined, vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith('No API key provided');
  });

  it('calls onError on network failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const onError = vi.fn();
    await streamChat([{ role: 'user', content: 'hi' }], 'test-key', vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith('Network error');
    vi.restoreAllMocks();
  });

  it('calls onError on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    });
    const onError = vi.fn();
    await streamChat([{ role: 'user', content: 'hi' }], 'bad-key', vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('401'));
    vi.restoreAllMocks();
  });

  it('sends correct request format', async () => {
    const mockReader = {
      read: vi.fn()
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: { getReader: () => mockReader },
    });
    const onDone = vi.fn();
    await streamChat([{ role: 'user', content: 'test' }], 'key-123', vi.fn(), onDone, vi.fn());
    
    const fetchCall = global.fetch.mock.calls[0];
    expect(fetchCall[0]).toBe('https://api.anthropic.com/v1/messages');
    const body = JSON.parse(fetchCall[1].body);
    expect(body.system).toBe(SYSTEM_PROMPT);
    expect(body.messages).toEqual([{ role: 'user', content: 'test' }]);
    expect(body.stream).toBe(true);
    expect(fetchCall[1].headers['x-api-key']).toBe('key-123');
    vi.restoreAllMocks();
  });
});
