
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MealEntry } from "./meal-entry";
import { useLanguage } from "@/context/language-context";

export function TodaysLog() {
  const { translations } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.dashboard.todaysLog.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground space-y-4 py-12">
        <p>{translations.dashboard.todaysLog.noFood}</p>
        <p>{translations.dashboard.todaysLog.prompt}</p>
        <MealEntry />
      </CardContent>
    </Card>
  );
}
