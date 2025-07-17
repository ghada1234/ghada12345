
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

interface UserAccountContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  signup: () => void;
  isPro: boolean;
  isTrialActive: boolean;
  trialStartDate: Date | null;
  upgradeToPro: () => void;
  startTrial: () => void;
  paymentsActive: boolean;
}

const UserAccountContext = createContext<UserAccountContextType | undefined>(undefined);

const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
export const ACTIVATION_DATE = new Date('2025-08-01');

export const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);

  const paymentsActive = new Date() >= ACTIVATION_DATE;

  // Load state from localStorage on initial mount
  useEffect(() => {
    if (!paymentsActive) {
      setIsPro(true);
      return;
    }
    try {
      const authStatus = localStorage.getItem('nutrisnap-isAuthenticated') === 'true';
      const proStatus = localStorage.getItem('nutrisnap-isPro') === 'true';
      const storedTrialStart = localStorage.getItem('nutrisnap-trialStartDate');
      
      setIsAuthenticated(authStatus);
      setIsPro(proStatus);
      if (storedTrialStart) {
        setTrialStartDate(new Date(storedTrialStart));
      }
    } catch (error) {
      console.error("Failed to parse user account from localStorage", error);
    }
  }, [paymentsActive]);

  const login = () => {
      setIsAuthenticated(true);
      localStorage.setItem('nutrisnap-isAuthenticated', 'true');
  };

  const logout = () => {
      setIsAuthenticated(false);
      // Don't log out of pro status if payments are not active yet
      if (paymentsActive) {
        setIsPro(false);
        setTrialStartDate(null);
        localStorage.setItem('nutrisnap-isAuthenticated', 'false');
        localStorage.removeItem('nutrisnap-isPro');
        localStorage.removeItem('nutrisnap-trialStartDate');
      } else {
         localStorage.setItem('nutrisnap-isAuthenticated', 'false');
      }
  }

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!paymentsActive) return;

    try {
      localStorage.setItem('nutrisnap-isPro', JSON.stringify(isPro));
      if (trialStartDate) {
        localStorage.setItem('nutrisnap-trialStartDate', trialStartDate.toISOString());
      }
    } catch (error) {
      console.error("Failed to save user account to localStorage", error);
    }
  }, [isPro, trialStartDate, paymentsActive]);

  const startTrial = useCallback(() => {
    if (!paymentsActive || trialStartDate) return;
    
    const now = new Date();
    setTrialStartDate(now);
    localStorage.setItem('nutrisnap-trialStartDate', now.toISOString());
  }, [trialStartDate, paymentsActive]);

  const signup = () => {
    setIsAuthenticated(true);
    localStorage.setItem('nutrisnap-isAuthenticated', 'true');
    startTrial();
  };

  const upgradeToPro = () => {
    if (!paymentsActive) return;
    setIsPro(true);
  };
  
  const isTrialActive = paymentsActive && trialStartDate ? (new Date().getTime() - trialStartDate.getTime()) < TRIAL_DURATION_MS : false;

  const effectiveIsPro = !paymentsActive || isPro;

  return (
    <UserAccountContext.Provider value={{ 
        isAuthenticated, 
        login, 
        logout, 
        signup, 
        isPro: effectiveIsPro, 
        isTrialActive, 
        trialStartDate, 
        upgradeToPro, 
        startTrial,
        paymentsActive
    }}>
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
