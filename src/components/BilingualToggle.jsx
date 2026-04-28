import { useApp } from '../context/AppContext';

export default function BilingualToggle() {
  const { language, setLanguage, t } = useApp();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="bilingual-toggle"
      aria-label="Toggle language"
    >
      <span className={`toggle-option ${language === 'en' ? 'active' : ''}`}>EN</span>
      <span className="toggle-divider">|</span>
      <span className={`toggle-option ${language === 'hi' ? 'active' : ''}`}>हि</span>
    </button>
  );
}
