
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { AnalyzeMealOutput } from '@/ai/flows/analyze-meal';

export interface LoggedMeal extends AnalyzeMealOutput {
  id: string;
  date: string; // ISO string for date
  mealType: string;
}

interface MealLogContextType {
  loggedMeals: LoggedMeal[];
  addMeal: (meal: Omit<LoggedMeal, 'id'>) => void;
  getMealsForDate: (date: Date) => LoggedMeal[];
}

const MealLogContext = createContext<MealLogContextType | undefined>(undefined);

export const MealLogProvider = ({ children }: { children: ReactNode }) => {
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);

  useEffect(() => {
    try {
      const storedMeals = localStorage.getItem('nutrisnap-meals');
      if (storedMeals) {
        setLoggedMeals(JSON.parse(storedMeals));
      }
    } catch (error) {
      console.error("Failed to parse meals from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('nutrisnap-meals', JSON.stringify(loggedMeals));
    } catch (error) {
        console.error("Failed to save meals to localStorage", error);
    }
  }, [loggedMeals]);

  const addMeal = (meal: Omit<LoggedMeal, 'id'>) => {
    const newMeal: LoggedMeal = {
      ...meal,
      id: `${meal.date}-${meal.mealName}-${Math.random()}`
    };
    setLoggedMeals(prevMeals => [...prevMeals, newMeal]);
  };

  const getMealsForDate = (date: Date) => {
    const targetDate = date.toISOString().split('T')[0];
    return loggedMeals.filter(meal => meal.date.startsWith(targetDate));
  }

  return (
    <MealLogContext.Provider value={{ loggedMeals, addMeal, getMealsForDate }}>
      {children}
    </MealLogContext.Provider>
  );
};

export const useMealLog = () => {
  const context = useContext(MealLogContext);
  if (context === undefined) {
    throw new Error('useMealLog must be used within a MealLogProvider');
  }
  return context;
};
