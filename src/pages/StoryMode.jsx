import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { storyChapters, badges } from '../data/storyChapters';
import QuizCard from '../components/QuizCard';
import XPBar from '../components/XPBar';
import TricolorBand from '../components/TricolorBand';

export default function StoryMode() {
  const { language, t, gameProgress, isChapterUnlocked, completeChapter, earnBadge, saveQuizScore } = useApp();
  const [activeChapter, setActiveChapter] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [readComplete, setReadComplete] = useState(false);

  const handleStartChapter = (chapter) => {
    setActiveChapter(chapter);
    setShowQuiz(false);
    setReadComplete(false);
  };

  const handleFinishReading = () => {
    setReadComplete(true);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score) => {
    if (activeChapter) {
      saveQuizScore(activeChapter.id, score);
      completeChapter(activeChapter.id);
      
      // Check for badge
      const badge = badges.find(b => b.requiredChapter === activeChapter.id);
      if (badge) {
        setTimeout(() => earnBadge(badge), 500);
      }
    }
  };

  const handleBackToList = () => {
    setActiveChapter(null);
    setShowQuiz(false);
    setReadComplete(false);
  };

  // Chapter Detail View
  if (activeChapter) {
    return (
      <div className="page story-page">
        <button className="back-button" onClick={handleBackToList}>
          ← {t('back')}
        </button>
        
        <div className="chapter-detail">
          <div className="chapter-detail-header" style={{ borderColor: activeChapter.color }}>
            <span className="chapter-detail-icon">{activeChapter.icon}</span>
            <div>
              <span className="chapter-number">
                {language === 'en' ? `Chapter ${activeChapter.id}` : `अध्याय ${activeChapter.id}`}
              </span>
              <h1>{activeChapter.title[language]}</h1>
              <p>{activeChapter.subtitle[language]}</p>
            </div>
          </div>

          <div className="chapter-content">
            {activeChapter.content[language].map((section, i) => (
              <div 
                key={i} 
                className="chapter-section"
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  borderLeftColor: activeChapter.color 
                }}
              >
                <h3>{section.heading}</h3>
                <p>{section.text}</p>
              </div>
            ))}
          </div>

          {!showQuiz && !gameProgress.completedChapters.includes(activeChapter.id) && (
            <button 
              className="chapter-action-btn"
              onClick={handleFinishReading}
              style={{ background: activeChapter.color }}
            >
              {language === 'en' ? '✅ I\'ve Read This — Start Quiz!' : '✅ मैंने पढ़ लिया — क्विज़ शुरू करें!'}
            </button>
          )}

          {showQuiz && (
            <div className="chapter-quiz-section">
              <TricolorBand />
              <QuizCard 
                quiz={activeChapter.quiz} 
                chapterId={activeChapter.id}
                onComplete={handleQuizComplete}
              />
            </div>
          )}

          {gameProgress.completedChapters.includes(activeChapter.id) && !showQuiz && (
            <div className="chapter-completed-badge">
              <span>✅</span>
              <p>{t('completed')} — {gameProgress.quizScores[activeChapter.id] || 0}/{activeChapter.quiz.length} {language === 'en' ? 'quiz score' : 'क्विज़ स्कोर'}</p>
            </div>
          )}

          {/* XP Reward Display */}
          <div className="chapter-xp-reward">
            <span>🎯 {language === 'en' ? 'Chapter Reward' : 'अध्याय पुरस्कार'}: +{activeChapter.xpReward} XP</span>
            {activeChapter.badge && (
              <span>🏅 {language === 'en' ? 'Badge' : 'बैज'}: {activeChapter.badge.emoji} {activeChapter.badge.name[language]}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Chapter List View
  return (
    <div className="page story-page">
      <div className="story-header">
        <h1>{t('storyTitle')}</h1>
        <p>{t('storySubtitle')}</p>
      </div>

      <XPBar showDetails={true} />

      <div className="story-progress-map">
        {/* Story Path Connector */}
        <div className="story-path-line"></div>
        
        {storyChapters.map((chapter, idx) => {
          const isUnlocked = isChapterUnlocked(chapter.id);
          const isCompleted = gameProgress.completedChapters.includes(chapter.id);
          
          return (
            <div
              key={chapter.id}
              className={`story-chapter-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`}
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              <div 
                className="chapter-node-marker"
                style={{ 
                  background: isCompleted 
                    ? '#138808' 
                    : isUnlocked 
                      ? chapter.color 
                      : '#ccc' 
                }}
              >
                {isCompleted ? '✓' : isUnlocked ? chapter.id : '🔒'}
              </div>
              
              <div className="chapter-node-card">
                <div className="chapter-node-icon">{chapter.icon}</div>
                <div className="chapter-node-info">
                  <span className="chapter-node-number">
                    {language === 'en' ? `Chapter ${chapter.id}` : `अध्याय ${chapter.id}`}
                  </span>
                  <h3>{chapter.title[language]}</h3>
                  <p>{chapter.subtitle[language]}</p>
                  {isCompleted && (
                    <span className="chapter-node-score">
                      ✅ {gameProgress.quizScores[chapter.id] || 0}/{chapter.quiz.length}
                    </span>
                  )}
                </div>
                
                {isUnlocked && !isCompleted && (
                  <button 
                    className="chapter-start-btn"
                    onClick={() => handleStartChapter(chapter)}
                    style={{ background: chapter.color }}
                  >
                    {t('startChapter')}
                  </button>
                )}
                {isCompleted && (
                  <button 
                    className="chapter-start-btn review"
                    onClick={() => handleStartChapter(chapter)}
                  >
                    {language === 'en' ? 'Review' : 'समीक्षा'}
                  </button>
                )}
                {!isUnlocked && (
                  <span className="chapter-locked-text">{t('chapterLocked')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
