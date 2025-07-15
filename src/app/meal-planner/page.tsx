
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2 } from "lucide-react";

export default function MealPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

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
          <h1 className="text-3xl font-bold tracking-tight">Meal Planner</h1>
          <p className="text-muted-foreground mt-2">
            Generate personalized daily meal plans with our AI.
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Meal Plan</CardTitle>
            <CardDescription>
                {mealPlan ? "Here is your personalized meal plan." : "Click the button to generate a new meal plan."}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            {isLoading ? (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p>Generating your meal plan...</p>
                </div>
            ) : !mealPlan ? (
              <div className="text-center">
                  <p className="text-muted-foreground mb-4">Ready to plan your day?</p>
                <Button onClick={handleGenerate}>
                  <BrainCircuit className="mr-2" />
                  Generate Meal Plan
                </Button>
              </div>
            ) : (
                // This is where the generated meal plan would be displayed.
                <div>
                    <p>Meal plan content goes here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
