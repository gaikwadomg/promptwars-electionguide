import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { guideSteps } from '../data/storyChapters';
import TricolorBand from '../components/TricolorBand';

export default function Guide() {
  const { language, t } = useApp();
  const [expandedStep, setExpandedStep] = useState(null);

  return (
    <div className="page guide-page">
      <div className="guide-header">
        <h1>{t('guideTitle')}</h1>
        <p>{t('guideSubtitle')}</p>
      </div>
      
      <TricolorBand />

      <div className="guide-steps">
        {guideSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`guide-step-card ${expandedStep === step.id ? 'expanded' : ''}`}
            style={{ animationDelay: `${idx * 0.12}s` }}
            onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
          >
            <div className="guide-step-header">
              <div className="guide-step-number">
                <span>{t('step')} {step.id}</span>
              </div>
              <div className="guide-step-icon">{step.icon}</div>
              <div className="guide-step-title-group">
                <h3>{step.title[language]}</h3>
                <span className="guide-step-subtitle">
                  {step.subtitle[language]}
                </span>
              </div>
              <span className={`guide-step-chevron ${expandedStep === step.id ? 'open' : ''}`}>
                ▾
              </span>
            </div>

            {expandedStep === step.id && (
              <div className="guide-step-body">
                <p>{step.description[language]}</p>
                {step.link && (
                  <a 
                    href={step.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="guide-action-link"
                    onClick={e => e.stopPropagation()}
                  >
                    {step.action[language]} →
                  </a>
                )}
                {!step.link && (
                  <div className="guide-ready-badge">
                    🎉 {step.action[language]}
                  </div>
                )}
              </div>
            )}

            {/* Progress connector */}
            {idx < guideSteps.length - 1 && (
              <div className="guide-step-connector">
                <div className="connector-line"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <TricolorBand />
    </div>
  );
}
