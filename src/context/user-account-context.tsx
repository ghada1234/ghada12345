
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

interface UserAccountContextType {
  isPro: boolean;
  isTrialActive: boolean;
  trialStartDate: Date | null;
  upgradeToPro: () => void;
  startTrial: () => void;
}

const UserAccountContext = createContext<UserAccountContextType | undefined>(undefined);

const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const [isPro, setIsPro] = useState(false);
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const proStatus = localStorage.getItem('nutrisnap-isPro') === 'true';
      const storedTrialStart = localStorage.getItem('nutrisnap-trialStartDate');
      
      setIsPro(proStatus);
      if (storedTrialStart) {
        setTrialStartDate(new Date(storedTrialStart));
      }
    } catch (error) {
      console.error("Failed to parse user account from localStorage", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('nutrisnap-isPro', JSON.stringify(isPro));
      if (trialStartDate) {
        localStorage.setItem('nutrisnap-trialStartDate', trialStartDate.toISOString());
      }
    } catch (error) {
      console.error("Failed to save user account to localStorage", error);
    }
  }, [isPro, trialStartDate]);

  const startTrial = useCallback(() => {
    // Only start the trial if it hasn't been started before
    if (!trialStartDate) {
      const now = new Date();
      setTrialStartDate(now);
    }
  }, [trialStartDate]);

  const upgradeToPro = () => {
    setIsPro(true);
  };

  const isTrialActive = trialStartDate 
    ? (new Date().getTime() - trialStartDate.getTime()) < TRIAL_DURATION_MS
    : false;

  return (
    <UserAccountContext.Provider value={{ isPro, isTrialActive, trialStartDate, upgradeToPro, startTrial }}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = () => {
  const context = useContext(UserAccountContext);
  if (context === undefined) {
    throw new Error('useUserAccount must be used within a UserAccountProvider');
  }
  return context;
};

    