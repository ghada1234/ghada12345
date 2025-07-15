
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function MealPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const { translations } = useLanguage();

  const handleGenerate = () => {
    setIsLoading(true);
    // In a real app, you would call your AI service here.
    // For now, we just simulate a loading state.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.mealPlanner.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.mealPlanner.subtitle}
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{translations.mealPlanner.cardTitle}</CardTitle>
            <CardDescription>
                {mealPlan ? translations.mealPlanner.cardDescriptionGenerated : translations.mealPlanner.cardDescriptionPrompt}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isLoading ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>{translations.mealPlanner.loadingText}</p>
                </div>
            ) : !mealPlan ? (
              <div className="text-center">
                  <p className="text-muted-foreground mb-4">{translations.mealPlanner.prompt}</p>
                <Button onClick={handleGenerate}>
                  <BrainCircuit className="mr-2" />
                  {translations.mealPlanner.generateButton}
                </Button>
              </div>
            ) : (
                // This is where the generated meal plan would be displayed.
                <div>
                    <p>{translations.mealPlanner.contentPlaceholder}</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
