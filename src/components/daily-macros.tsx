
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";

interface MacroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  className?: string;
}

function MacroProgress({ label, current, goal, unit, className }: MacroProgressProps) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{`${current.toFixed(0)} / ${goal} ${unit}`}</span>
      </div>
      <Progress value={percentage} aria-label={`${label} progress`} className={className} />
    </div>
  );
}

export function DailyMacros() {
  const { translations } = useLanguage();
  const { getMealsForDate } = useMealLog();

  const todaysMeals = getMealsForDate(new Date());

  const totals = useMemo(() => {
    return todaysMeals.reduce((acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fats += meal.fats;
        // You might need to add fiber to your AnalyzeMealOutput if it's not there
        // acc.fiber += meal.fiber || 0; 
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
  }, [todaysMeals]);
  
  // These should eventually come from user settings
  const goals = {
    calories: 2000,
    protein: 120,
    carbs: 250,
    fats: 70,
    fiber: 30
  };

  const handleShare = () => {
    const message = `📊 *My Daily Nutrition Goals*

🔥 ${translations.dashboard.macros.calories}: ${totals.calories.toFixed(0)} / ${goals.calories} kcal
💪 ${translations.dashboard.macros.protein}: ${totals.protein.toFixed(0)} / ${goals.protein}g
🍞 ${translations.dashboard.macros.carbs}: ${totals.carbs.toFixed(0)} / ${goals.carbs}g
🥑 ${translations.dashboard.macros.fats}: ${totals.fats.toFixed(0)} / ${goals.fats}g

📱 Tracked with NutriSnap - Your AI nutrition companion! 🤖✨`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{translations.dashboard.macros.title}</CardTitle>
        <CardDescription>{translations.dashboard.macros.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MacroProgress
          label={translations.dashboard.macros.calories}
          current={totals.calories}
          goal={goals.calories}
          unit="kcal"
        />
        <MacroProgress
          label={translations.dashboard.macros.protein}
          current={totals.protein}
          goal={goals.protein}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.carbs}
          current={totals.carbs}
          goal={goals.carbs}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.fats}
          current={totals.fats}
          goal={goals.fats}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.fiber}
          current={totals.fiber}
          goal={goals.fiber}
          unit="g"
        />
      </CardContent>
       <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleShare}>
          {translations.dashboard.macros.share}
        </Button>
      </CardFooter>
    </Card>
  );
}
