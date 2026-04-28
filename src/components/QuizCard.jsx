import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function QuizCard({ quiz, chapterId, onComplete }) {
  const { language, addXP, t } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showXPAnimation, setShowXPAnimation] = useState(false);

  const question = quiz[currentQuestion];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
      addXP(10);
      setShowXPAnimation(true);
      setTimeout(() => setShowXPAnimation(false), 1500);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setFinished(true);
      onComplete(score + (isCorrect ? 1 : 0));
    }
  };

  if (finished) {
    return (
      <div className="quiz-complete">
        <div className="quiz-complete-icon">🎉</div>
        <h3>{t('completed')}!</h3>
        <p className="quiz-score">
          {score + (isCorrect ? 1 : 0)}/{quiz.length} {language === 'en' ? 'correct' : 'सही'}
        </p>
      </div>
    );
  }

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <h3>{t('quizTitle')}</h3>
        <span className="quiz-progress">{currentQuestion + 1}/{quiz.length}</span>
      </div>
      
      <p className="quiz-question">{question.question[language]}</p>
      
      <div className="quiz-options">
        {question.options[language].map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`quiz-option ${
              selected === i 
                ? i === question.correctIndex 
                  ? 'correct' 
                  : 'wrong'
                : selected !== null && i === question.correctIndex
                  ? 'correct'
                  : ''
            } ${selected !== null ? 'disabled' : ''}`}
            disabled={selected !== null}
          >
            <span className="quiz-option-letter">{String.fromCharCode(65 + i)}</span>
            {option}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          <p>{isCorrect ? t('quizCorrect') : t('quizWrong')}</p>
          <button onClick={handleNext} className="quiz-next-btn">
            {currentQuestion < quiz.length - 1 ? t('nextQuestion') : t('finishChapter')}
          </button>
        </div>
      )}

      {showXPAnimation && (
        <div className="xp-popup-animation">+10 XP ⭐</div>
      )}
    </div>
  );
}
