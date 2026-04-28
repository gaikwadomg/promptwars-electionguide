import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AshokaChakra from '../components/AshokaChakra';
import TricolorBand from '../components/TricolorBand';
import StateSelector from '../components/StateSelector';
import XPBar from '../components/XPBar';

export default function Home() {
  const navigate = useNavigate();
  const { language, t, gameProgress } = useApp();

  const modes = [
    { 
      key: 'story', 
      icon: '📖', 
      label: 'modeStory', 
      desc: 'modeStoryDesc', 
      path: '/story',
      gradient: 'linear-gradient(135deg, #FF9933 0%, #ffb366 100%)',
      badge: gameProgress.completedChapters.length > 0 
        ? `${gameProgress.completedChapters.length}/5` 
        : null,
    },
    { 
      key: 'ask', 
      icon: '🤖', 
      label: 'modeAsk', 
      desc: 'modeAskDesc', 
      path: '/ask',
      gradient: 'linear-gradient(135deg, #000080 0%, #1a1a99 100%)',
    },
    { 
      key: 'guide', 
      icon: '📋', 
      label: 'modeGuide', 
      desc: 'modeGuideDesc', 
      path: '/guide',
      gradient: 'linear-gradient(135deg, #138808 0%, #1aa80a 100%)',
    },
    { 
      key: 'timeline', 
      icon: '📅', 
      label: 'modeTimeline', 
      desc: 'modeTimelineDesc', 
      path: '/timeline',
      gradient: 'linear-gradient(135deg, #5C5C5C 0%, #7a7a7a 100%)',
    },
  ];

  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-chakra-container">
          <AshokaChakra size={80} spinning={true} />
        </div>
        <h1 className="hero-title">
          <span className="hero-title-primary">{t('appName')}</span>
          <span className="hero-title-secondary">{t('appNameHindi')}</span>
        </h1>
        <p className="hero-tagline">
          {language === 'en' ? (
            <>
              <span className="tagline-hindi">आपका वोट, आपका हक़</span>
              <span className="tagline-english">{t('tagline')}</span>
            </>
          ) : (
            <>
              <span className="tagline-hindi">{t('tagline')}</span>
              <span className="tagline-english">{t('taglineHindi')}</span>
            </>
          )}
        </p>
        <TricolorBand />
      </section>

      {/* Gamification Dashboard */}
      {gameProgress.xp > 0 && (
        <section className="dashboard-section">
          <XPBar showDetails={true} />
        </section>
      )}

      {/* State Selector */}
      <section className="state-section">
        <StateSelector />
      </section>

      {/* Mode Selection */}
      <section className="modes-section">
        <h2 className="section-title">
          {language === 'en' ? 'Choose Your Path' : 'अपना रास्ता चुनें'} 🚀
        </h2>
        <div className="modes-grid">
          {modes.map((mode, idx) => (
            <button
              key={mode.key}
              className="mode-card"
              onClick={() => navigate(mode.path)}
              style={{ 
                '--card-gradient': mode.gradient,
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="mode-card-icon">{mode.icon}</div>
              <div className="mode-card-content">
                <h3>{t(mode.label)}</h3>
                <p>{t(mode.desc)}</p>
              </div>
              {mode.badge && (
                <span className="mode-card-badge">{mode.badge}</span>
              )}
              <div className="mode-card-arrow">→</div>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📞</span>
            <span className="stat-value">1950</span>
            <span className="stat-label">{language === 'en' ? 'Voter Helpline' : 'मतदाता हेल्पलाइन'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌐</span>
            <span className="stat-value">eci.gov.in</span>
            <span className="stat-label">{language === 'en' ? 'ECI Website' : 'ECI वेबसाइट'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📱</span>
            <span className="stat-value">{language === 'en' ? 'Voter App' : 'वोटर ऐप'}</span>
            <span className="stat-label">{language === 'en' ? 'Download Now' : 'अभी डाउनलोड करें'}</span>
          </div>
        </div>
      </section>

      {/* Badges Display */}
      {gameProgress.badges.length > 0 && (
        <section className="badges-display-section">
          <h3>{t('badgesLabel')} {language === 'en' ? 'Earned' : 'अर्जित'}</h3>
          <div className="badges-row">
            {gameProgress.badges.map(badge => (
              <div key={badge.id} className="badge-item-small">
                <span className="badge-emoji">{badge.emoji}</span>
                <span className="badge-name">{badge.name[language]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <TricolorBand />
    </div>
  );
}
