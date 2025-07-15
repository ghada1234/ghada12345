import { UtensilsCrossed } from "lucide-react";
import { MealEntry } from "./meal-entry";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 sm:px-6 lg:px-8 backdrop-blur">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">NutriSnap</h1>
      </div>
      <div className="ml-auto">
        <MealEntry />
      </div>
    </header>
  );
}
