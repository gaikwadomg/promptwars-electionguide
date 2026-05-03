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
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      onError(`API Error: ${response.status} — ${err.error || err}`);
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
