import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizCard from '../QuizCard';
import { AppProvider } from '../../context/AppContext';

vi.mock('../../firebase', () => ({
  logEvent: vi.fn(),
}));

const mockQuiz = [
  {
    question: { en: 'What is the minimum voting age?', hi: 'न्यूनतम मतदान आयु क्या है?' },
    options: {
      en: ['16 years', '18 years', '21 years', '25 years'],
      hi: ['16 वर्ष', '18 वर्ष', '21 वर्ष', '25 वर्ष'],
    },
    correctIndex: 1,
  },
  {
    question: { en: 'Which form for voter registration?', hi: 'पंजीकरण फॉर्म कौन सा?' },
    options: {
      en: ['Form 1', 'Form 6', 'Form 8', 'Form 10'],
      hi: ['फॉर्म 1', 'फॉर्म 6', 'फॉर्म 8', 'फॉर्म 10'],
    },
    correctIndex: 1,
  },
];

function renderWithProvider(ui) {
  return render(<AppProvider>{ui}</AppProvider>);
}

describe('QuizCard', () => {
  it('renders question text', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    expect(screen.getByText('What is the minimum voting age?')).toBeInTheDocument();
  });

  it('renders all options', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    expect(screen.getByText('16 years')).toBeInTheDocument();
    expect(screen.getByText('18 years')).toBeInTheDocument();
    expect(screen.getByText('21 years')).toBeInTheDocument();
    expect(screen.getByText('25 years')).toBeInTheDocument();
  });

  it('shows progress indicator', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('highlights correct answer on selection', () => {
    const onComplete = vi.fn();
    const { container } = renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    // Select the correct answer (index 1)
    fireEvent.click(screen.getByText('18 years'));
    
    const correctOption = container.querySelector('.quiz-option.correct');
    expect(correctOption).toBeTruthy();
  });

  it('highlights wrong answer on incorrect selection', () => {
    const onComplete = vi.fn();
    const { container } = renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    // Select wrong answer (index 0)
    fireEvent.click(screen.getByText('16 years'));
    
    const wrongOption = container.querySelector('.quiz-option.wrong');
    expect(wrongOption).toBeTruthy();
  });

  it('shows correct feedback on right answer', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByText('18 years'));
    expect(screen.getByText('Correct! +10 XP')).toBeInTheDocument();
  });

  it('shows wrong feedback on incorrect answer', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByText('16 years'));
    expect(screen.getByText('Not quite. Try again!')).toBeInTheDocument();
  });

  it('advances to next question on click', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByText('18 years'));
    fireEvent.click(screen.getByText('Next Question'));
    
    // Should now show question 2
    expect(screen.getByText('Which form for voter registration?')).toBeInTheDocument();
    expect(screen.getByText('2/2')).toBeInTheDocument();
  });

  it('shows completion state after last question', () => {
    const onComplete = vi.fn();
    renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    // Answer Q1
    fireEvent.click(screen.getByText('18 years'));
    fireEvent.click(screen.getByText('Next Question'));
    
    // Answer Q2
    fireEvent.click(screen.getByText('Form 6'));
    fireEvent.click(screen.getByText('Finish Chapter'));
    
    // Should show completion
    expect(screen.getByText('Completed!')).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalled();
  });

  it('disables options after selection', () => {
    const onComplete = vi.fn();
    const { container } = renderWithProvider(<QuizCard quiz={mockQuiz} chapterId={1} onComplete={onComplete} />);
    
    fireEvent.click(screen.getByText('18 years'));
    
    const disabledOptions = container.querySelectorAll('.quiz-option.disabled');
    expect(disabledOptions.length).toBeGreaterThan(0);
  });
});
