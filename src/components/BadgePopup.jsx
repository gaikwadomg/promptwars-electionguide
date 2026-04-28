import { useApp } from '../context/AppContext';

export default function BadgePopup() {
  const { showBadgePopup, setShowBadgePopup, language, t } = useApp();

  if (!showBadgePopup) return null;

  return (
    <div className="badge-popup-overlay" onClick={() => setShowBadgePopup(null)}>
      <div className="badge-popup" onClick={e => e.stopPropagation()}>
        <div className="badge-popup-glow"></div>
        <div className="badge-popup-emoji">{showBadgePopup.emoji}</div>
        <h2>{t('badgeEarned')}</h2>
        <h3>{showBadgePopup.name[language]}</h3>
        <p>{showBadgePopup.description?.[language] || t('congratulations')}</p>
        <button 
          className="badge-popup-close"
          onClick={() => setShowBadgePopup(null)}
        >
          {t('close')} ✨
        </button>
      </div>
    </div>
  );
}
