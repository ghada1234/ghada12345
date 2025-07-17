
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";
import { useSettings } from "@/context/settings-context";

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
  const { settings } = useSettings();

  const todaysMeals = getMealsForDate(new Date());

  const totals = useMemo(() => {
    return todaysMeals.reduce((acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fats += meal.fats;
        // You might need to add fiber to your AnalyzeMealOutput if it's not there
        // acc.fiber += meal.fiber || 0; 
        acc.sugar += meal.sugar;
        acc.sodium += meal.sodium;
        acc.potassium += meal.potassium;
        acc.calcium += meal.calcium;
        acc.iron += meal.iron;
        acc.vitaminC += meal.vitaminC;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, sodium: 0, potassium: 0, calcium: 0, iron: 0, vitaminC: 0 });
  }, [todaysMeals]);
  
  const goals = useMemo(() => ({
    calories: parseFloat(settings.goals.macros.calories) || 2000,
    protein: parseFloat(settings.goals.macros.protein) || 120,
    carbs: parseFloat(settings.goals.macros.carbs) || 250,
    fats: parseFloat(settings.goals.macros.fats) || 70,
    fiber: parseFloat(settings.goals.macros.fiber) || 30,
  }), [settings.goals.macros]);

  const microGoals = useMemo(() => ({
    sugar: parseFloat(settings.goals.micros.sugar) || 50,
    sodium: parseFloat(settings.goals.micros.sodium) || 2300,
    potassium: parseFloat(settings.goals.micros.potassium) || 3500,
    calcium: parseFloat(settings.goals.micros.calcium) || 1000,
    iron: parseFloat(settings.goals.micros.iron) || 18,
    vitaminC: parseFloat(settings.goals.micros.vitaminC) || 90,
  }), [settings.goals.micros]);

  const handleShare = () => {
    const macrosTitle = translations.dashboard.macros.title.toUpperCase();
    const microsTitle = translations.dashboard.micros.title.toUpperCase();

    const message = `📊 *My Daily Nutrition Summary*

*${macrosTitle}*
🔥 ${translations.dashboard.macros.calories}: ${totals.calories.toFixed(0)} / ${goals.calories} kcal
💪 ${translations.dashboard.macros.protein}: ${totals.protein.toFixed(0)} / ${goals.protein}g
🍞 ${translations.dashboard.macros.carbs}: ${totals.carbs.toFixed(0)} / ${goals.carbs}g
🥑 ${translations.dashboard.macros.fats}: ${totals.fats.toFixed(0)} / ${goals.fats}g

*${microsTitle}*
🍯 ${translations.dashboard.micros.sugar}: ${totals.sugar.toFixed(1)} / ${microGoals.sugar}g
🧂 ${translations.dashboard.micros.sodium}: ${totals.sodium.toFixed(0)} / ${microGoals.sodium}mg
🍌 ${translations.dashboard.micros.potassium}: ${totals.potassium.toFixed(0)} / ${microGoals.potassium}mg
🦴 ${translations.dashboard.micros.calcium}: ${totals.calcium.toFixed(0)} / ${microGoals.calcium}mg
⚡ ${translations.dashboard.micros.iron}: ${totals.iron.toFixed(1)} / ${microGoals.iron}mg
🍊 ${translations.dashboard.micros.vitaminC}: ${totals.vitaminC.toFixed(1)} / ${microGoals.vitaminC}mg

📱 Tracked with ${translations.appName} - Your AI nutrition companion! 🤖✨`;

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
          label={translations.profilePage.macros.calories.label}
          current={totals.calories}
          goal={goals.calories}
          unit="kcal"
        />
        <MacroProgress
          label={translations.profilePage.macros.protein.label}
          current={totals.protein}
          goal={goals.protein}
          unit="g"
        />
        <MacroProgress
          label={translations.profilePage.macros.carbs.label}
          current={totals.carbs}
          goal={goals.carbs}
          unit="g"
        />
        <MacroProgress
          label={translations.profilePage.macros.fats.label}
          current={totals.fats}
          goal={goals.fats}
          unit="g"
        />
        <MacroProgress
          label={translations.profilePage.macros.fiber.label}
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
