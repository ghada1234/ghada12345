
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";

interface MicroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

function MicroProgress({ label, current, goal, unit }: MicroProgressProps) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="text-muted-foreground">{`${current.toFixed(1)} / ${goal} ${unit}`}</span>
      </div>
      <Progress value={percentage} aria-label={`${label} progress`} className="h-2" />
    </div>
  );
}

export function Micronutrients() {
  const { translations } = useLanguage();
  const { getMealsForDate } = useMealLog();

  const todaysMeals = getMealsForDate(new Date());

  const totals = useMemo(() => {
      return todaysMeals.reduce((acc, meal) => {
          acc.sodium += meal.sodium;
          acc.sugar += meal.sugar;
          acc.potassium += meal.potassium;
          acc.vitaminC += meal.vitaminC;
          acc.calcium += meal.calcium;
          acc.iron += meal.iron;
          return acc;
      }, { sodium: 0, sugar: 0, potassium: 0, vitaminC: 0, calcium: 0, iron: 0 });
  }, [todaysMeals]);

  const goals = {
    sodium: 2300,
    sugar: 50,
    potassium: 3500,
    vitaminC: 90,
    calcium: 1000,
    iron: 18,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{translations.dashboard.micros.title}</CardTitle>
        <CardDescription>{translations.dashboard.micros.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
        <MicroProgress
          label={translations.dashboard.micros.sodium}
          current={totals.sodium}
          goal={goals.sodium}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.sugar}
          current={totals.sugar}
          goal={goals.sugar}
          unit="g"
        />
        <MicroProgress
          label={translations.dashboard.micros.potassium}
          current={totals.potassium}
          goal={goals.potassium}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.vitaminC}
          current={totals.vitaminC}
          goal={goals.vitaminC}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.calcium}
          current={totals.calcium}
          goal={goals.calcium}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.iron}
          current={totals.iron}
          goal={goals.iron}
          unit="mg"
        />
      </CardContent>
    </Card>
  );
}
