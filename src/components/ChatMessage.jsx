export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-message-avatar">
        {isUser ? '👤' : '🗳️'}
      </div>
      <div className="chat-message-bubble">
        <div className="chat-message-content">
          {message.content.split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="chat-bold">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('- ') || line.startsWith('• ')) {
              return <p key={i} className="chat-list-item">• {line.slice(2)}</p>;
            }
            if (line.match(/^\d+\.\s/)) {
              return <p key={i} className="chat-list-item">{line}</p>;
            }
            if (line.trim() === '') return <br key={i} />;
            // Handle inline bold
            const parts = line.split(/(\*\*.*?\*\*)/);
            return (
              <p key={i}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j}>{part.replace(/\*\*/g, '')}</strong>;
                  }
                  return <span key={j}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
        {message.isStreaming && (
          <span className="chat-typing-indicator">
            <span></span><span></span><span></span>
          </span>
        )}
      </div>
    </div>
  );
}
