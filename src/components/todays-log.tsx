
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "./ui/badge";

export function TodaysLog() {
  const { translations } = useLanguage();
  const { getMealsForDate } = useMealLog();
  const todaysMeals = getMealsForDate(new Date());

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{translations.dashboard.todaysLog.title}</CardTitle>
         <Link href="/add-food">
            <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> {translations.dashboard.todaysLog.addMeal}
            </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {todaysMeals.length === 0 ? (
          <div className="text-center text-muted-foreground space-y-4 py-12">
            <p>{translations.dashboard.todaysLog.noFood}</p>
            <p>{translations.dashboard.todaysLog.prompt}</p>
            <Link href="/add-food">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> {translations.dashboard.todaysLog.addMeal}
                </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {todaysMeals.map(meal => (
                <div key={meal.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">{meal.mealName}</p>
                        <p className="text-sm text-muted-foreground">{meal.calories.toFixed(0)} kcal</p>
                    </div>
                    <Badge variant="secondary">{translations.addFood.mealTypes[meal.mealType as keyof typeof translations.addFood.mealTypes]}</Badge>
                </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
