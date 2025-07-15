import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Beef, Wheat, Droplets } from "lucide-react";

interface MacroProgressProps {
  icon: React.ReactNode;
  label: string;
  current: number;
  goal: number;
  unit: string;
}

function MacroProgress({ icon, label, current, goal, unit }: MacroProgressProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="text-muted-foreground">{`${current} / ${goal} ${unit}`}</span>
      </div>
      <Progress value={percentage} aria-label={`${label} progress`} />
    </div>
  );
}

export function DailyMacros() {
  const macros = {
    calories: { current: 1250, goal: 2000 },
    protein: { current: 80, goal: 120 },
    carbs: { current: 150, goal: 250 },
    fats: { current: 40, goal: 60 },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Daily Goals</CardTitle>
        <CardDescription>Your nutritional progress for today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MacroProgress
          icon={<Flame className="h-4 w-4 text-orange-500" />}
          label="Calories"
          current={macros.calories.current}
          goal={macros.calories.goal}
          unit="kcal"
        />
        <MacroProgress
          icon={<Beef className="h-4 w-4 text-red-500" />}
          label="Protein"
          current={macros.protein.current}
          goal={macros.protein.goal}
          unit="g"
        />
        <MacroProgress
          icon={<Wheat className="h-4 w-4 text-yellow-500" />}
          label="Carbs"
          current={macros.carbs.current}
          goal={macros.carbs.goal}
          unit="g"
        />
        <MacroProgress
          icon={<Droplets className="h-4 w-4 text-blue-500" />}
          label="Fats"
          current={macros.fats.current}
          goal={macros.fats.goal}
          unit="g"
        />
      </CardContent>
    </Card>
  );
}
