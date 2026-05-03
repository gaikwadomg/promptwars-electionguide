import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { logEvent } from '../firebase';

const AppContext = createContext();

const STORAGE_KEY = 'matdata_mitra_progress';
const API_KEY_STORAGE = 'matdata_mitra_api_key';

const defaultProgress = {
  completedChapters: [],
  xp: 0,
  badges: [],
  quizScores: {},
  streak: 0,
  lastVisit: null,
};

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProgress, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return { ...defaultProgress };
}

function loadApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [selectedState, setSelectedStateState] = useState('maharashtra');
  const [gameProgress, setGameProgress] = useState(loadProgress);
  const [apiKey, setApiKeyState] = useState(loadApiKey);
  const [showBadgePopup, setShowBadgePopup] = useState(null);

  // Update streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGameProgress(prev => {
      const lastVisit = prev.lastVisit;
      if (lastVisit === today) return prev;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = lastVisit === yesterday.toDateString();
      
      return {
        ...prev,
        streak: isConsecutive ? prev.streak + 1 : 1,
        lastVisit: today,
      };
    });
  }, []);

  // Persist progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameProgress));
  }, [gameProgress]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    logEvent('language_changed', { language: lang });
  };

  const setSelectedState = (state) => {
    setSelectedStateState(state);
    logEvent('state_selected', { state });
  };

  const setApiKey = (key) => {
    setApiKeyState(key);
    localStorage.setItem(API_KEY_STORAGE, key);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const addXP = (amount) => {
    setGameProgress(prev => ({ ...prev, xp: prev.xp + amount }));
    logEvent('xp_gained', { amount });
  };

  const completeChapter = (chapterId) => {
    setGameProgress(prev => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      return {
        ...prev,
        completedChapters: [...prev.completedChapters, chapterId],
        xp: prev.xp + 20,
      };
    });
    logEvent('chapter_completed', { chapter_id: chapterId });
  };

  const earnBadge = (badge) => {
    setGameProgress(prev => {
      if (prev.badges.find(b => b.id === badge.id)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badge],
      };
    });
    setShowBadgePopup(badge);
    logEvent('badge_earned', { badge_id: badge.id, badge_name: badge.name?.en || badge.id });
  };

  const saveQuizScore = (chapterId, score) => {
    setGameProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [chapterId]: score },
    }));
    logEvent('quiz_completed', { chapter_id: chapterId, score });
  };

  const getLevel = () => {
    const xp = gameProgress.xp;
    if (xp >= 150) return { level: 5, name: { en: 'Election Expert', hi: 'चुनाव विशेषज्ञ' } };
    if (xp >= 100) return { level: 4, name: { en: 'Democracy Champion', hi: 'लोकतंत्र चैंपियन' } };
    if (xp >= 60) return { level: 3, name: { en: 'Informed Citizen', hi: 'जागरूक नागरिक' } };
    if (xp >= 30) return { level: 2, name: { en: 'Eager Learner', hi: 'उत्सुक शिक्षार्थी' } };
    return { level: 1, name: { en: 'New Voter', hi: 'नया मतदाता' } };
  };

  const isChapterUnlocked = (chapterId) => {
    if (chapterId === 1) return true;
    return gameProgress.completedChapters.includes(chapterId - 1);
  };

  const value = {
    language, setLanguage,
    selectedState, setSelectedState,
    gameProgress, setGameProgress,
    apiKey, setApiKey,
    showBadgePopup, setShowBadgePopup,
    t,
    addXP,
    completeChapter,
    earnBadge,
    saveQuizScore,
    getLevel,
    isChapterUnlocked,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
