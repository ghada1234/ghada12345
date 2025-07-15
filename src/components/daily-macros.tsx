import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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
  const macros = {
    calories: { current: 0, goal: 2000 },
    protein: { current: 0, goal: 120 },
    carbs: { current: 0, goal: 250 },
    fats: { current: 0, goal: 70 },
    fiber: { current: 0, goal: 30 },
  };

  const handleShare = () => {
    const message = `Check out my daily nutrition goals on NutriSnap!\nCalories: ${macros.calories.current}/${macros.calories.goal} kcal\nProtein: ${macros.protein.current}/${macros.protein.goal}g\nCarbs: ${macros.carbs.current}/${macros.carbs.goal}g\nFats: ${macros.fats.current}/${macros.fats.goal}g`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Macronutrients</CardTitle>
        <CardDescription>Your main energy sources for today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MacroProgress
          label="Calories"
          current={macros.calories.current}
          goal={macros.calories.goal}
          unit="kcal"
        />
        <MacroProgress
          label="Protein"
          current={macros.protein.current}
          goal={macros.protein.goal}
          unit="g"
        />
        <MacroProgress
          label="Carbs"
          current={macros.carbs.current}
          goal={macros.carbs.goal}
          unit="g"
        />
        <MacroProgress
          label="Fats"
          current={macros.fats.current}
          goal={macros.fats.goal}
          unit="g"
        />
        <MacroProgress
          label="Fiber"
          current={macros.fiber.current}
          goal={macros.fiber.goal}
          unit="g"
        />
      </CardContent>
       <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleShare}>
          Share on WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
}
