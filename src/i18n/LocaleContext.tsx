'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { detectLocaleFromGeo } from './geo';

export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

const STORAGE_KEY = 'locale';

function readStoredLocale(): Locale | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'ar' ? saved : null;
  } catch {
    return null;
  }
}

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Static export renders English; the stored choice or geo-IP takes over on mount.
  const [locale, setLocaleState] = useState<Locale>('en');
  const userPickedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const stored = readStoredLocale();
    if (stored) userPickedRef.current = true;
    const resolve = stored
      ? Promise.resolve(stored)
      : detectLocaleFromGeo({ navigatorLanguage: navigator.language });
    resolve
      .then((next) => {
        if (cancelled || (!stored && userPickedRef.current)) return;
        setLocaleState(next);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    userPickedRef.current = true;
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore private-mode failures
    }
  }, []);

  const toggleLocale = useCallback(() => setLocale(locale === 'en' ? 'ar' : 'en'), [locale, setLocale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir: locale === 'ar' ? 'rtl' : 'ltr', setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}

/**
 * Pick the copy for the active locale. Components keep their own `{ en, ar }`
 * copy object next to the markup; `ar` must mirror the shape of `en`.
 */
export function useCopy<T>(copy: { en: T; ar: T }): T {
  return copy[useLocale().locale];
}
