import { useApp } from '../context/AppContext';

export default function XPBar({ showDetails = false }) {
  const { gameProgress, getLevel, language, t } = useApp();
  const level = getLevel();
  const maxXP = 150;
  const percentage = Math.min((gameProgress.xp / maxXP) * 100, 100);

  return (
    <div className="xp-bar-container">
      <div className="xp-bar-header">
        <div className="xp-level">
          <span className="xp-level-badge">{level.level}</span>
          <span className="xp-level-name">{level.name[language]}</span>
        </div>
        <span className="xp-count">{gameProgress.xp} {t('xpLabel')}</span>
      </div>
      <div className="xp-bar-track">
        <div 
          className="xp-bar-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="xp-bar-shine"></div>
        </div>
      </div>
      {showDetails && (
        <div className="xp-details">
          <div className="xp-detail-item">
            <span className="xp-detail-icon">🔥</span>
            <span>{gameProgress.streak} {t('streakLabel')}</span>
          </div>
          <div className="xp-detail-item">
            <span className="xp-detail-icon">🏅</span>
            <span>{gameProgress.badges.length} {t('badgesLabel')}</span>
          </div>
          <div className="xp-detail-item">
            <span className="xp-detail-icon">📚</span>
            <span>{gameProgress.completedChapters.length}/5 {language === 'en' ? 'Chapters' : 'अध्याय'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
