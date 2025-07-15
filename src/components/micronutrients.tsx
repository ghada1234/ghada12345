
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/language-context";

interface MicroProgressProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

function MicroProgress({ label, current, goal, unit }: MicroProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);
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
  const micros = {
    sodium: { current: 0, goal: 2300 },
    sugar: { current: 0, goal: 50 },
    potassium: { current: 0, goal: 3500 },
    vitaminC: { current: 0, goal: 90 },
    calcium: { current: 0, goal: 1000 },
    iron: { current: 0, goal: 18 },
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
          current={micros.sodium.current}
          goal={micros.sodium.goal}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.sugar}
          current={micros.sugar.current}
          goal={micros.sugar.goal}
          unit="g"
        />
        <MicroProgress
          label={translations.dashboard.micros.potassium}
          current={micros.potassium.current}
          goal={micros.potassium.goal}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.vitaminC}
          current={micros.vitaminC.current}
          goal={micros.vitaminC.goal}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.calcium}
          current={micros.calcium.current}
          goal={micros.calcium.goal}
          unit="mg"
        />
        <MicroProgress
          label={translations.dashboard.micros.iron}
          current={micros.iron.current}
          goal={micros.iron.goal}
          unit="mg"
        />
      </CardContent>
    </Card>
  );
}
