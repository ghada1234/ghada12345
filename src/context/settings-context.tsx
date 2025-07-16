
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { produce } from 'immer';

export interface Settings {
    profile: {
        name: string;
        weight: string;
        height: string;
        gender: 'male' | 'female';
        avatar: string | null;
        dietaryPreference: string;
        allergies: string;
        likes: string;
        dislikes: string;
    };
    goals: {
        macros: {
            calories: string;
            protein: string;
            carbs: string;
            fats: string;
            fiber: string;
        };
        micros: {
            sugar: string;
            sodium: string;
            potassium: string;
            calcium: string;
            iron: string;
            vitaminC: string;
        };
    };
}

const defaultSettings: Settings = {
    profile: {
        name: "Alex Doe",
        weight: "70",
        height: "175",
        gender: "male",
        avatar: null,
        dietaryPreference: "Healthy, balanced",
        allergies: "None",
        likes: "Chicken, vegetables",
        dislikes: "Excessive sugar"
    },
    goals: {
        macros: {
            calories: "2000",
            protein: "120",
            carbs: "250",
            fats: "70",
            fiber: "30"
        },
        micros: {
            sugar: "50",
            sodium: "2300",
            potassium: "3500",
            calcium: "1000",
            iron: "18",
            vitaminC: "90"
        }
    }
}


interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings> | ((draft: Settings) => void)) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    useEffect(() => {
        try {
            const storedSettings = localStorage.getItem('nutrisnap-settings');
            if (storedSettings) {
                const parsedSettings = JSON.parse(storedSettings);
                // Basic validation to merge default and stored settings
                const mergedSettings = produce(defaultSettings, draft => {
                    if (parsedSettings.profile) {
                        Object.assign(draft.profile, parsedSettings.profile);
                    }
                    if (parsedSettings.goals) {
                         if(parsedSettings.goals.macros) Object.assign(draft.goals.macros, parsedSettings.goals.macros);
                         if(parsedSettings.goals.micros) Object.assign(draft.goals.micros, parsedSettings.goals.micros);
                    }
                });
                setSettings(mergedSettings);
            }
        } catch (error) {
            console.error("Failed to parse settings from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('nutrisnap-settings', JSON.stringify(settings));
        } catch (error) {
            console.error("Failed to save settings to localStorage", error);
        }
    }, [settings]);

    const updateSettings = useCallback((updater: Partial<Settings> | ((draft: Settings) => void)) => {
        if (typeof updater === 'function') {
            setSettings(produce(updater));
        } else {
            setSettings(produce(draft => {
                // Deep merge, simple version
                if (updater.profile) Object.assign(draft.profile, updater.profile);
                if (updater.goals) {
                    if (updater.goals.macros) Object.assign(draft.goals.macros, updater.goals.macros);
                    if (updater.goals.micros) Object.assign(draft.goals.micros, updater.goals.micros);
                }
            }));
        }
    }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
