
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
}

const UserAccountContext = createContext<UserAccountContextType | undefined>(undefined);

const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const UserAccountProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(true); // Grant Pro access by default
  const [trialStartDate, setTrialStartDate] = useState<Date | null>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const authStatus = localStorage.getItem('nutrisnap-isAuthenticated') === 'true';
      // const proStatus = localStorage.getItem('nutrisnap-isPro') === 'true';
      const storedTrialStart = localStorage.getItem('nutrisnap-trialStartDate');
      
      setIsAuthenticated(authStatus);
      // setIsPro(proStatus); // Pro is always true now
      if (storedTrialStart) {
        setTrialStartDate(new Date(storedTrialStart));
      }
    } catch (error) {
      console.error("Failed to parse user account from localStorage", error);
    }
  }, []);

  const login = () => {
      setIsAuthenticated(true);
      localStorage.setItem('nutrisnap-isAuthenticated', 'true');
  };

  const logout = () => {
      setIsAuthenticated(false);
      localStorage.setItem('nutrisnap-isAuthenticated', 'false');
      // Optional: clear other user data on logout
      // localStorage.removeItem('nutrisnap-isPro');
      // localStorage.removeItem('nutrisnap-trialStartDate');
      // setIsPro(false);
      // setTrialStartDate(null);
  }

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      // localStorage.setItem('nutrisnap-isPro', JSON.stringify(isPro));
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
      localStorage.setItem('nutrisnap-trialStartDate', now.toISOString());
    }
  }, [trialStartDate]);

  const signup = () => {
    setIsAuthenticated(true);
    localStorage.setItem('nutrisnap-isAuthenticated', 'true');
    startTrial();
  };

  const upgradeToPro = () => {
    // setIsPro(true); // Already Pro
  };

  // Trial is always active since all features are enabled
  const isTrialActive = true;

  return (
    <UserAccountContext.Provider value={{ isAuthenticated, login, logout, signup, isPro, isTrialActive, trialStartDate, upgradeToPro, startTrial }}>
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
