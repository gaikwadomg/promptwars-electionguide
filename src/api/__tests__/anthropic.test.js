import { describe, it, expect, vi } from 'vitest';
import { streamChat, SYSTEM_PROMPT } from '../anthropic';

describe('anthropic API proxy', () => {
  it('exports SYSTEM_PROMPT string', () => {
    expect(typeof SYSTEM_PROMPT).toBe('string');
    expect(SYSTEM_PROMPT.length).toBeGreaterThan(0);
  });

  it('SYSTEM_PROMPT mentions Matdata Mitra', () => {
    expect(SYSTEM_PROMPT).toContain('Matdata Mitra');
  });

  it('calls onError on network failure', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const onError = vi.fn();
    await streamChat([{ role: 'user', content: 'hi' }], 'ignored-key', vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith('Network error');
    vi.restoreAllMocks();
  });

  it('calls onError on non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ error: 'Unauthorized key' }),
    });
    const onError = vi.fn();
    await streamChat([{ role: 'user', content: 'hi' }], 'ignored-key', vi.fn(), vi.fn(), onError);
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('401'));
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('Unauthorized key'));
    vi.restoreAllMocks();
  });

  it('sends correct request format to proxy', async () => {
    const mockReader = {
      read: vi.fn()
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      body: { getReader: () => mockReader },
    });
    const onDone = vi.fn();
    await streamChat([{ role: 'user', content: 'test' }], 'ignored-key', vi.fn(), onDone, vi.fn());
    
    const fetchCall = global.fetch.mock.calls[0];
    expect(fetchCall[0]).toBe('/api/chat');
    const body = JSON.parse(fetchCall[1].body);
    expect(body.systemPrompt).toBe(SYSTEM_PROMPT);
    expect(body.messages).toEqual([{ role: 'user', content: 'test' }]);
    vi.restoreAllMocks();
  });
});
