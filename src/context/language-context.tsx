
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

type Translations = typeof en;

interface LanguageContextType {
  language: 'en' | 'ar';
  translations: Translations;
  setLanguage: (language: 'en' | 'ar') => void;
  direction: 'ltr' | 'rtl';
}

const translations = { en, ar };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<'en' | 'ar'>('en');

  const setLanguage = (lang: 'en' | 'ar') => {
    setLanguageState(lang);
  };

  const currentTranslations = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, translations: currentTranslations, setLanguage, direction }}>
      <div dir={direction}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
