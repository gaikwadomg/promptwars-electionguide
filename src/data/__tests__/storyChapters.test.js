import { describe, it, expect } from 'vitest';
import { storyChapters, badges, guideSteps, suggestedQuestions, demoResponses } from '../storyChapters';

describe('storyChapters', () => {
  it('has 5 chapters', () => {
    expect(storyChapters.length).toBe(5);
  });

  it('chapters have sequential IDs', () => {
    storyChapters.forEach((ch, i) => {
      expect(ch.id).toBe(i + 1);
    });
  });

  it('each chapter has required fields', () => {
    for (const ch of storyChapters) {
      expect(ch.title).toBeDefined();
      expect(ch.title.en).toBeTruthy();
      expect(ch.title.hi).toBeTruthy();
      expect(ch.subtitle).toBeDefined();
      expect(ch.subtitle.en).toBeTruthy();
      expect(ch.subtitle.hi).toBeTruthy();
      expect(ch.icon).toBeTruthy();
      expect(ch.xpReward).toBeGreaterThan(0);
      expect(ch.color).toBeTruthy();
    }
  });

  it('each chapter has bilingual content', () => {
    for (const ch of storyChapters) {
      expect(ch.content.en.length).toBeGreaterThan(0);
      expect(ch.content.hi.length).toBeGreaterThan(0);
      expect(ch.content.en.length).toBe(ch.content.hi.length);
    }
  });

  it('each chapter has quiz with proper structure', () => {
    for (const ch of storyChapters) {
      expect(ch.quiz.length).toBeGreaterThan(0);
      for (const q of ch.quiz) {
        expect(q.question.en).toBeTruthy();
        expect(q.question.hi).toBeTruthy();
        expect(q.options.en.length).toBe(4);
        expect(q.options.hi.length).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('content sections have heading and text', () => {
    for (const ch of storyChapters) {
      for (const section of ch.content.en) {
        expect(section.heading).toBeTruthy();
        expect(section.text).toBeTruthy();
      }
    }
  });
});

describe('badges', () => {
  it('has at least 3 badges', () => {
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('each badge has required fields', () => {
    for (const b of badges) {
      expect(b.id).toBeTruthy();
      expect(b.name.en).toBeTruthy();
      expect(b.name.hi).toBeTruthy();
      expect(b.emoji).toBeTruthy();
      expect(b.requiredChapter).toBeGreaterThan(0);
    }
  });
});

describe('guideSteps', () => {
  it('has 5 steps', () => {
    expect(guideSteps.length).toBe(5);
  });

  it('each step has required fields', () => {
    for (const s of guideSteps) {
      expect(s.id).toBeGreaterThan(0);
      expect(s.icon).toBeTruthy();
      expect(s.title.en).toBeTruthy();
      expect(s.title.hi).toBeTruthy();
      expect(s.description.en).toBeTruthy();
      expect(s.description.hi).toBeTruthy();
    }
  });
});

describe('suggestedQuestions', () => {
  it('has en and hi arrays', () => {
    expect(Array.isArray(suggestedQuestions.en)).toBe(true);
    expect(Array.isArray(suggestedQuestions.hi)).toBe(true);
  });

  it('has same number of questions in both languages', () => {
    expect(suggestedQuestions.en.length).toBe(suggestedQuestions.hi.length);
  });

  it('has at least 5 suggestions per language', () => {
    expect(suggestedQuestions.en.length).toBeGreaterThanOrEqual(5);
  });
});

describe('demoResponses', () => {
  it('has responses for common questions', () => {
    expect(demoResponses['how do i get a voter id']).toBeTruthy();
    expect(demoResponses['where is my polling booth']).toBeTruthy();
    expect(demoResponses['what is an evm']).toBeTruthy();
    expect(demoResponses['what is nota']).toBeTruthy();
  });

  it('responses are non-empty strings', () => {
    for (const [key, value] of Object.entries(demoResponses)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(10);
    }
  });
});
