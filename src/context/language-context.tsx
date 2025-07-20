
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
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const currentTranslations = translations[language];
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, translations: currentTranslations, setLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  // Provide a default structure for translations during prerendering or if context is somehow missing.
  // This prevents crashes when accessing nested properties before the context is fully available.
  if (context === undefined) {
    // Return a default translations object with the expected nested structure but empty values
    return {
      language: 'en' as 'en' | 'ar', // Default language
      translations: {
        settings: {
          title: '',
          subtitle: '',
          account: {
            title: '',
            managePayments: '',
          },
          profile: {
            title: '',
            avatar: '',
            uploadButton: '',
            name: '',
            namePlaceholder: '',
            weight: '',
            height: '',
            bmi: '',
            gender: {
              title: '',
              male: '',
              female: '',
            },
            dietaryPreference: '',
            dietaryPreferencePlaceholder: '',
            allergies: '',
            allergiesPlaceholder: '',
            likes: '',
            likesPlaceholder: '',
            dislikes: '',
            dislikesPlaceholder: '',
            notApplicable: '',
          },
          macros: { title: '', calories: { label: '', unit: '' }, protein: { label: '', unit: '' }, carbs: { label: '', unit: '' }, fats: { label: '', unit: '' }, fiber: { label: '', unit: '' } },
          micros: { title: '', sugar: { label: '', unit: '' }, sodium: { label: '', unit: '' }, potassium: { label: '', unit: '' }, calcium: { label: '', unit: '' }, iron: { label: '', unit: '' }, vitaminC: { label: '', unit: '' } },
          toast: { success: { title: '', description: '' } },
          saveButton: '',
        },
      },
      setLanguage: () => {}, // No-op function
      direction: 'ltr' as 'ltr' | 'rtl', // Default direction
    };
  }
  return context;
};
