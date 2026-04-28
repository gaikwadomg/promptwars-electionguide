const SYSTEM_PROMPT = `You are Matdata Mitra, a friendly and knowledgeable Indian election education assistant. You help Indian citizens understand:
- How to register as a voter (Form 6 on voters.eci.gov.in)
- Voter ID / EPIC card process
- How to find their polling booth (using Voter Helpline 1950 or the ECI app)
- What to bring on election day
- How EVMs and VVPATs work
- The difference between Lok Sabha and Vidhan Sabha elections
- Key dates for the current election cycle
Always respond in simple, warm language. When asked in Hindi, respond in Hindi. Keep answers under 150 words. End each answer with one actionable next step. Never give partisan political opinions.`;

export async function streamChat(messages, apiKey, onChunk, onDone, onError) {
  if (!apiKey) {
    onError('No API key provided');
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      onError(`API Error: ${response.status} — ${err}`);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              fullText += parsed.delta.text;
              onChunk(fullText);
            }
          } catch {
            // Skip unparseable lines
          }
        }
      }
    }

    onDone(fullText);
  } catch (err) {
    onError(err.message);
  }
}

export { SYSTEM_PROMPT };
