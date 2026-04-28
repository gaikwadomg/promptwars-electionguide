import { useApp } from '../context/AppContext';
import { timelineData } from '../data/timeline';
import { states } from '../data/states';
import TricolorBand from '../components/TricolorBand';
import StateSelector from '../components/StateSelector';

export default function Timeline() {
  const { language, selectedState, t } = useApp();
  const stateInfo = states[selectedState];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#138808';
      case 'voting': return '#000080';
      case 'upcoming': return '#FF9933';
      default: return '#5C5C5C';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return t('completedStatus');
      case 'voting': return t('votingDay');
      case 'upcoming': return t('upcoming');
      default: return status;
    }
  };

  const renderTimeline = (timelineKey) => {
    const timeline = timelineData[timelineKey];
    return (
      <div className="timeline-section" key={timelineKey}>
        <h2 className="timeline-section-title">{timeline.title[language]}</h2>
        <div className="timeline-track">
          {timeline.milestones.map((milestone, idx) => (
            <div 
              key={milestone.id}
              className={`timeline-milestone ${milestone.status}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="timeline-marker-col">
                <div 
                  className="timeline-marker"
                  style={{ background: getStatusColor(milestone.status) }}
                >
                  <span>{milestone.icon}</span>
                </div>
                {idx < timeline.milestones.length - 1 && (
                  <div 
                    className="timeline-line"
                    style={{ background: getStatusColor(milestone.status) }}
                  ></div>
                )}
              </div>
              <div className="timeline-content-card">
                <div className="timeline-date-badge" style={{ color: getStatusColor(milestone.status) }}>
                  {milestone.date}
                </div>
                <h3>{milestone.title[language]}</h3>
                <p>{milestone.description[language]}</p>
                <span 
                  className="timeline-status-tag"
                  style={{ 
                    background: getStatusColor(milestone.status) + '20',
                    color: getStatusColor(milestone.status),
                  }}
                >
                  {getStatusLabel(milestone.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page timeline-page">
      <div className="timeline-header">
        <h1>{t('timelineTitle')}</h1>
        <p>{t('timelineSubtitle')}</p>
      </div>

      <TricolorBand />

      {renderTimeline('lokSabha')}
      {renderTimeline('stateAssembly')}

      {/* State Info Panel */}
      <div className="state-info-panel">
        <TricolorBand />
        <h2>{t('stateInfoTitle')}</h2>
        <StateSelector compact={true} />
        
        <div className="state-info-grid">
          <div className="state-info-card">
            <span className="state-info-icon">👤</span>
            <div>
              <span className="state-info-label">{t('ceoContact')}</span>
              <span className="state-info-value">{stateInfo.ceo[language]}</span>
              <span className="state-info-meta">{stateInfo.ceoContact}</span>
            </div>
          </div>
          
          <div className="state-info-card">
            <span className="state-info-icon">📞</span>
            <div>
              <span className="state-info-label">{t('voterHelpline')}</span>
              <span className="state-info-value">{stateInfo.voterHelpline}</span>
              <a href={stateInfo.website} target="_blank" rel="noopener noreferrer" className="state-info-link">
                {language === 'en' ? 'Visit Website' : 'वेबसाइट देखें'} →
              </a>
            </div>
          </div>
          
          <div className="state-info-card">
            <span className="state-info-icon">📊</span>
            <div>
              <span className="state-info-label">{t('sveepStatus')}</span>
              <span className="state-info-value">{stateInfo.sveepStatus[language]}</span>
            </div>
          </div>

          <div className="state-info-card">
            <span className="state-info-icon">🗳️</span>
            <div>
              <span className="state-info-label">{language === 'en' ? 'Constituencies' : 'निर्वाचन क्षेत्र'}</span>
              <span className="state-info-value">
                {language === 'en' 
                  ? `${stateInfo.totalConstituencies} Parliament · ${stateInfo.assemblySeats} Assembly`
                  : `${stateInfo.totalConstituencies} संसदीय · ${stateInfo.assemblySeats} विधानसभा`
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
