import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useApp } from '../AppContext';

vi.mock('../../firebase', () => ({ logEvent: vi.fn() }));

function TestConsumer() {
  const { language, setLanguage, selectedState, setSelectedState, gameProgress, addXP, completeChapter, earnBadge, saveQuizScore, getLevel, isChapterUnlocked, t } = useApp();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="state">{selectedState}</span>
      <span data-testid="xp">{gameProgress.xp}</span>
      <span data-testid="badges">{gameProgress.badges.length}</span>
      <span data-testid="chapters">{gameProgress.completedChapters.join(',')}</span>
      <span data-testid="level">{getLevel().level}</span>
      <span data-testid="level-name">{getLevel().name.en}</span>
      <span data-testid="ch1-unlocked">{isChapterUnlocked(1) ? 'yes' : 'no'}</span>
      <span data-testid="ch2-unlocked">{isChapterUnlocked(2) ? 'yes' : 'no'}</span>
      <span data-testid="translation">{t('appName')}</span>
      <button data-testid="set-hi" onClick={() => setLanguage('hi')}>Hindi</button>
      <button data-testid="set-delhi" onClick={() => setSelectedState('delhi')}>Delhi</button>
      <button data-testid="add-xp" onClick={() => addXP(10)}>+10</button>
      <button data-testid="add-xp-30" onClick={() => addXP(30)}>+30</button>
      <button data-testid="complete-1" onClick={() => completeChapter(1)}>Ch1</button>
      <button data-testid="badge" onClick={() => earnBadge({ id: 'test', name: { en: 'Test', hi: 'T' }, emoji: '🏆' })}>Badge</button>
      <button data-testid="quiz" onClick={() => saveQuizScore(1, 3)}>Quiz</button>
    </div>
  );
}

function renderCtx() {
  return render(<AppProvider><TestConsumer /></AppProvider>);
}

describe('AppContext', () => {
  it('provides default language en', () => { renderCtx(); expect(screen.getByTestId('language').textContent).toBe('en'); });
  it('provides default state maharashtra', () => { renderCtx(); expect(screen.getByTestId('state').textContent).toBe('maharashtra'); });
  it('provides default xp 0', () => { renderCtx(); expect(screen.getByTestId('xp').textContent).toBe('0'); });
  it('provides default badges 0', () => { renderCtx(); expect(screen.getByTestId('badges').textContent).toBe('0'); });
  it('toggles language', () => { renderCtx(); act(() => { screen.getByTestId('set-hi').click(); }); expect(screen.getByTestId('language').textContent).toBe('hi'); });
  it('changes state', () => { renderCtx(); act(() => { screen.getByTestId('set-delhi').click(); }); expect(screen.getByTestId('state').textContent).toBe('delhi'); });
  it('adds XP', () => { renderCtx(); act(() => { screen.getByTestId('add-xp').click(); }); expect(screen.getByTestId('xp').textContent).toBe('10'); });
  it('completes chapter adds 20 XP', () => { renderCtx(); act(() => { screen.getByTestId('complete-1').click(); }); expect(screen.getByTestId('xp').textContent).toBe('20'); expect(screen.getByTestId('chapters').textContent).toBe('1'); });
  it('no duplicate chapters', () => { renderCtx(); act(() => { screen.getByTestId('complete-1').click(); }); act(() => { screen.getByTestId('complete-1').click(); }); expect(screen.getByTestId('xp').textContent).toBe('20'); });
  it('earns badges', () => { renderCtx(); act(() => { screen.getByTestId('badge').click(); }); expect(screen.getByTestId('badges').textContent).toBe('1'); });
  it('no duplicate badges', () => { renderCtx(); act(() => { screen.getByTestId('badge').click(); }); act(() => { screen.getByTestId('badge').click(); }); expect(screen.getByTestId('badges').textContent).toBe('1'); });
  it('saves quiz scores', () => { renderCtx(); act(() => { screen.getByTestId('quiz').click(); }); expect(screen.getByTestId('xp')).toBeTruthy(); });
  it('level 1 for 0 XP', () => { renderCtx(); expect(screen.getByTestId('level').textContent).toBe('1'); expect(screen.getByTestId('level-name').textContent).toBe('New Voter'); });
  it('level 2 for 30+ XP', () => { renderCtx(); act(() => { screen.getByTestId('add-xp-30').click(); }); expect(screen.getByTestId('level').textContent).toBe('2'); });
  it('chapter 1 always unlocked', () => { renderCtx(); expect(screen.getByTestId('ch1-unlocked').textContent).toBe('yes'); });
  it('chapter 2 locked by default', () => { renderCtx(); expect(screen.getByTestId('ch2-unlocked').textContent).toBe('no'); });
  it('chapter 2 unlocks after ch1', () => { renderCtx(); act(() => { screen.getByTestId('complete-1').click(); }); expect(screen.getByTestId('ch2-unlocked').textContent).toBe('yes'); });
  it('translates correctly', () => { renderCtx(); expect(screen.getByTestId('translation').textContent).toBe('Matdata Mitra'); });
  it('persists to localStorage', () => { renderCtx(); act(() => { screen.getByTestId('add-xp').click(); }); const saved = JSON.parse(localStorage.getItem('matdata_mitra_progress')); expect(saved.xp).toBe(10); });
  it('throws outside provider', () => { expect(() => render(<TestConsumer />)).toThrow('useApp must be used within AppProvider'); });
});
