import { describe, it, expect } from 'vitest';
import { translations } from '../translations';

describe('translations', () => {
  it('has en and hi language objects', () => {
    expect(translations.en).toBeDefined();
    expect(translations.hi).toBeDefined();
  });

  it('all English keys exist in Hindi', () => {
    const enKeys = Object.keys(translations.en);
    const hiKeys = Object.keys(translations.hi);
    for (const key of enKeys) {
      expect(hiKeys).toContain(key);
    }
  });

  it('no empty English translation values', () => {
    for (const [key, value] of Object.entries(translations.en)) {
      expect(value, `en.${key} is empty`).toBeTruthy();
      expect(typeof value).toBe('string');
    }
  });

  it('no empty Hindi translation values', () => {
    for (const [key, value] of Object.entries(translations.hi)) {
      expect(value, `hi.${key} is empty`).toBeTruthy();
      expect(typeof value).toBe('string');
    }
  });

  it('contains essential app keys', () => {
    const essentialKeys = ['appName', 'tagline', 'navHome', 'navGuide', 'navAsk', 'navTimeline', 'navStory'];
    for (const key of essentialKeys) {
      expect(translations.en[key], `Missing en.${key}`).toBeDefined();
      expect(translations.hi[key], `Missing hi.${key}`).toBeDefined();
    }
  });

  it('appName is Matdata Mitra in English', () => {
    expect(translations.en.appName).toBe('Matdata Mitra');
  });

  it('appName is Hindi text in Hindi', () => {
    expect(translations.hi.appName).toBe('मतदाता मित्र');
  });

  it('language toggle shows correct opposite', () => {
    expect(translations.en.language).toBe('हिंदी');
    expect(translations.hi.language).toBe('English');
  });
});
