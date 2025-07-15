
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

interface MacroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  className?: string;
}

function MacroProgress({ label, current, goal, unit, className }: MacroProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{`${current} / ${goal} ${unit}`}</span>
      </div>
      <Progress value={percentage} aria-label={`${label} progress`} className={className} />
    </div>
  );
}

export function DailyMacros() {
  const { translations } = useLanguage();
  const macros = {
    calories: { current: 0, goal: 2000 },
    protein: { current: 0, goal: 120 },
    carbs: { current: 0, goal: 250 },
    fats: { current: 0, goal: 70 },
    fiber: { current: 0, goal: 30 },
  };

  const handleShare = () => {
    const message = `📊 *My Daily Nutrition Goals*

🔥 ${translations.dashboard.macros.calories}: ${macros.calories.current} / ${macros.calories.goal} kcal
💪 ${translations.dashboard.macros.protein}: ${macros.protein.current} / ${macros.protein.goal}g
🍞 ${translations.dashboard.macros.carbs}: ${macros.carbs.current} / ${macros.carbs.goal}g
🥑 ${translations.dashboard.macros.fats}: ${macros.fats.current} / ${macros.fats.goal}g

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
          current={macros.calories.current}
          goal={macros.calories.goal}
          unit="kcal"
        />
        <MacroProgress
          label={translations.dashboard.macros.protein}
          current={macros.protein.current}
          goal={macros.protein.goal}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.carbs}
          current={macros.carbs.current}
          goal={macros.carbs.goal}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.fats}
          current={macros.fats.current}
          goal={macros.fats.goal}
          unit="g"
        />
        <MacroProgress
          label={translations.dashboard.macros.fiber}
          current={macros.fiber.current}
          goal={macros.fiber.goal}
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
