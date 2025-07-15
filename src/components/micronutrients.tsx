import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
        <CardTitle className="text-lg font-medium">Micronutrients</CardTitle>
        <CardDescription>Essential vitamins and minerals.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
        <MicroProgress
          label="Sodium"
          current={micros.sodium.current}
          goal={micros.sodium.goal}
          unit="mg"
        />
        <MicroProgress
          label="Sugar"
          current={micros.sugar.current}
          goal={micros.sugar.goal}
          unit="g"
        />
        <MicroProgress
          label="Potassium"
          current={micros.potassium.current}
          goal={micros.potassium.goal}
          unit="mg"
        />
        <MicroProgress
          label="Vitamin C"
          current={micros.vitaminC.current}
          goal={micros.vitaminC.goal}
          unit="mg"
        />
        <MicroProgress
          label="Calcium"
          current={micros.calcium.current}
          goal={micros.calcium.goal}
          unit="mg"
        />
        <MicroProgress
          label="Iron"
          current={micros.iron.current}
          goal={micros.iron.goal}
          unit="mg"
        />
      </CardContent>
    </Card>
  );
}
