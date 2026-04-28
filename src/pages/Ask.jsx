import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { suggestedQuestions, demoResponses } from '../data/storyChapters';
import { streamChat } from '../api/anthropic';
import ChatMessage from '../components/ChatMessage';

export default function Ask() {
  const { language, t, apiKey, setApiKey } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(!apiKey);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findDemoResponse = (query) => {
    const lower = query.toLowerCase().trim();
    for (const [key, value] of Object.entries(demoResponses)) {
      if (lower.includes(key) || key.includes(lower)) {
        return value;
      }
    }
    // Fuzzy match
    const keywords = {
      'voter id': 'how do i get a voter id',
      'epic': 'how do i get a voter id',
      'register': 'how do i get a voter id',
      'पंजीकरण': 'voter id कैसे बनवाएं',
      'booth': 'where is my polling booth',
      'polling': 'where is my polling booth',
      'बूथ': 'मेरा मतदान केंद्र कहां है',
      'मतदान केंद्र': 'मेरा मतदान केंद्र कहां है',
      'evm': 'what is an evm',
      'machine': 'what is an evm',
      'carry': 'what should i carry to vote',
      'document': 'what should i carry to vote',
      'ले जाएं': 'वोट डालने क्या ले जाएं',
      'lok sabha': 'lok sabha vs vidhan sabha',
      'vidhan sabha': 'lok sabha vs vidhan sabha',
      'लोकसभा': 'लोकसभा vs विधानसभा',
      'विधानसभा': 'लोकसभा vs विधानसभा',
      'nota': language === 'hi' ? 'nota क्या है' : 'what is nota',
    };
    
    for (const [keyword, responseKey] of Object.entries(keywords)) {
      if (lower.includes(keyword)) {
        return demoResponses[responseKey];
      }
    }

    return language === 'en' 
      ? "I'm in demo mode right now! I can answer questions about:\n\n• **Voter ID** — How to register\n• **Polling Booth** — How to find yours\n• **EVM** — How voting machines work\n• **Documents** — What to carry on election day\n• **Lok Sabha vs Vidhan Sabha** — Election types\n• **NOTA** — None of the Above option\n\nTry asking one of these topics! For full AI capabilities, add your Anthropic API key. 🗳️"
      : "मैं अभी डेमो मोड में हूं! मैं इन विषयों पर जवाब दे सकता हूं:\n\n• **Voter ID** — पंजीकरण कैसे करें\n• **मतदान केंद्र** — कैसे खोजें\n• **EVM** — कैसे काम करती है\n• **दस्तावेज़** — क्या ले जाएं\n• **लोकसभा vs विधानसभा** — चुनाव प्रकार\n• **NOTA** — इनमें से कोई नहीं\n\nइनमें से कोई विषय पूछें! पूर्ण AI क्षमताओं के लिए, Anthropic API key जोड़ें। 🗳️";
  };

  const handleSend = async (text = input) => {
    if (!text.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    if (isDemoMode || !apiKey) {
      // Demo mode — simulate streaming
      setIsStreaming(true);
      const response = findDemoResponse(text);
      const assistantMsg = { role: 'assistant', content: '', isStreaming: true };
      setMessages([...newMessages, assistantMsg]);

      // Simulate character-by-character streaming
      let currentText = '';
      for (let i = 0; i < response.length; i++) {
        currentText += response[i];
        const textSnapshot = currentText;
        await new Promise(r => setTimeout(r, 8));
        setMessages([...newMessages, { role: 'assistant', content: textSnapshot, isStreaming: i < response.length - 1 }]);
      }
      setIsStreaming(false);
    } else {
      // Real API call
      setIsStreaming(true);
      const assistantMsg = { role: 'assistant', content: '', isStreaming: true };
      setMessages([...newMessages, assistantMsg]);

      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));

      await streamChat(
        apiMessages,
        apiKey,
        (text) => {
          setMessages([...newMessages, { role: 'assistant', content: text, isStreaming: true }]);
        },
        (finalText) => {
          setMessages([...newMessages, { role: 'assistant', content: finalText, isStreaming: false }]);
          setIsStreaming(false);
        },
        (error) => {
          setMessages([...newMessages, { 
            role: 'assistant', 
            content: `❌ ${error}\n\n${language === 'en' ? 'Try switching to Demo Mode or check your API key.' : 'डेमो मोड पर स्विच करें या API key जांचें।'}`, 
            isStreaming: false 
          }]);
          setIsStreaming(false);
        }
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      setIsDemoMode(false);
      setShowApiKeyInput(false);
      setTempApiKey('');
    }
  };

  return (
    <div className="page ask-page">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <span className="chat-header-icon">🗳️</span>
            <div>
              <h2>{t('chatTitle')}</h2>
              <span className={`chat-mode-badge ${isDemoMode ? 'demo' : 'live'}`}>
                {isDemoMode ? t('demoMode') : 'Live AI'}
              </span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button
              className={`mode-switch-btn ${isDemoMode ? '' : 'active'}`}
              onClick={() => {
                if (!apiKey) {
                  setShowApiKeyInput(true);
                } else {
                  setIsDemoMode(!isDemoMode);
                }
              }}
            >
              {isDemoMode ? '🔑 API' : '📦 Demo'}
            </button>
          </div>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="api-key-panel">
            <p>{t('enterApiKey')}</p>
            <div className="api-key-input-group">
              <input
                type="password"
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
                placeholder={t('apiKeyPlaceholder')}
                className="api-key-input"
              />
              <button onClick={handleSaveApiKey} className="api-key-save">
                ✓
              </button>
            </div>
            <button 
              className="api-key-cancel"
              onClick={() => setShowApiKeyInput(false)}
            >
              {t('close')}
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-welcome">
              <div className="chat-welcome-icon">🗳️</div>
              <p>{t('chatWelcome')}</p>
              {isDemoMode && (
                <p className="chat-demo-note">{t('demoModeDesc')}</p>
              )}
            </div>
          )}
          
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 0 && (
          <div className="suggested-questions">
            {suggestedQuestions[language].map((q, i) => (
              <button
                key={i}
                className="suggestion-chip"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chatPlaceholder')}
            className="chat-input"
            disabled={isStreaming}
          />
          <button 
            onClick={() => handleSend()} 
            className="chat-send-btn"
            disabled={!input.trim() || isStreaming}
          >
            {isStreaming ? (
              <span className="send-spinner">⏳</span>
            ) : (
              <span>➤</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
