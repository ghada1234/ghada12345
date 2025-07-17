
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrainCircuit, Loader2, Salad, Flame, CheckCircle, Info } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useMealLog } from "@/context/meal-log-context";
import { handleGenerateMealPlan } from "@/app/actions";
import { type GenerateMealPlanOutput } from "@/ai/flows/generate-meal-plan";
import { type Meal } from "@/ai/flows/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";

const NutrientRow = ({ label, value, unit }: { label: string; value: number | undefined; unit: string; }) => {
    if (value === undefined) return null;
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value.toFixed(value > 10 ? 0 : 1)} {unit}</span>
        </div>
    );
};

const MealCard = ({ meal }: { meal: Meal }) => {
    const { translations } = useLanguage();

    if (!meal) {
        return null;
    }

    const mealTypeKey = meal.mealType.toLowerCase() as keyof typeof translations.addFood.mealTypes;
    const localizedMealType = translations.addFood.mealTypes[mealTypeKey] || meal.mealType;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-semibold text-primary">{localizedMealType}</p>
                        <CardTitle className="text-xl mt-1">{meal.name}</CardTitle>
                        <CardDescription>{meal.description}</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary flex items-center gap-1">
                            <Flame className="h-6 w-6" />
                            {meal.nutrients.calories.toFixed(0)}
                        </p>
                        <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="nutrients">
                        <AccordionTrigger>{translations.mealPlanner.nutrients.title}</AccordionTrigger>
                        <AccordionContent>
                             <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                               <NutrientRow label={translations.addFood.analysisResult.protein} value={meal.nutrients.protein} unit="g" />
                               <NutrientRow label={translations.addFood.analysisResult.carbs} value={meal.nutrients.carbs} unit="g" />
                               <NutrientRow label={translations.addFood.analysisResult.fats} value={meal.nutrients.fats} unit="g" />
                               <NutrientRow label={translations.addFood.analysisResult.sugar} value={meal.nutrients.sugar} unit="g" />
                               <NutrientRow label={translations.addFood.analysisResult.sodium} value={meal.nutrients.sodium} unit="mg" />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ingredients">
                        <AccordionTrigger>{translations.dashboard.recipeSuggester.ingredients}</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-5 space-y-1">
                                {meal.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="instructions">
                        <AccordionTrigger>{translations.dashboard.recipeSuggester.instructions}</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal pl-5 space-y-2">
                                {meal.instructions.map((step, index) => <li key={index}>{step}</li>)}
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default function MealPlannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<GenerateMealPlanOutput | null>(null);
  const { translations } = useLanguage();
  const { getMealsForDate } = useMealLog();
  const { settings } = useSettings();
  const { toast } = useToast();

  const calorieGoal = useMemo(() => parseFloat(settings.goals.macros.calories) || 2000, [settings.goals.macros.calories]);

  const caloriesConsumed = useMemo(() => {
    const todaysMeals = getMealsForDate(new Date());
    return todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
  }, [getMealsForDate]);

  const remainingCalories = useMemo(() => calorieGoal - caloriesConsumed, [calorieGoal, caloriesConsumed]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setMealPlan(null);
    try {
        if(remainingCalories < 100) {
            toast({
                variant: "destructive",
                title: translations.mealPlanner.error.lowCalTitle,
                description: translations.mealPlanner.error.lowCalDescription,
            })
            setIsLoading(false);
            return;
        }
        const result = await handleGenerateMealPlan({ 
            remainingCalories,
            dietaryPreference: settings.profile.dietaryPreference,
            allergies: settings.profile.allergies,
            likes: settings.profile.likes,
            dislikes: settings.profile.dislikes,
        });
        setMealPlan(result);

    } catch (error) {
        toast({
            variant: "destructive",
            title: translations.mealPlanner.error.lowCalTitle,
            description: (error as Error).message,
        });
    }
    finally {
      setIsLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
        {[1,2,3].map(i => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        ))}
    </div>
  )

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">{translations.mealPlanner.title}</h1>
          <p className="text-muted-foreground mt-2">
            {translations.mealPlanner.subtitle}
          </p>
        </div>

        <Card className="w-full bg-muted/30">
          <CardHeader>
            <CardTitle>{translations.mealPlanner.statusCard.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold">{calorieGoal}</p>
                <p className="text-sm text-muted-foreground">{translations.mealPlanner.statusCard.goal}</p>
            </div>
            <div className="text-2xl font-light text-muted-foreground">-</div>
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-destructive">{caloriesConsumed.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">{translations.mealPlanner.statusCard.consumed}</p>
            </div>
            <div className="text-2xl font-light text-muted-foreground">=</div>
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-primary">{remainingCalories.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">{translations.mealPlanner.statusCard.remaining}</p>
            </div>
            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <BrainCircuit className="mr-2" />}
                    {isLoading ? translations.mealPlanner.loadingText : translations.mealPlanner.generateButton}
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            {translations.mealPlanner.adjustGoals.text}
            <Link href="/profile" className="underline text-primary hover:text-primary/80">
                {translations.mealPlanner.adjustGoals.link}
            </Link>
          </p>
        </div>
        
        {isLoading && <LoadingSkeleton />}
        
        {mealPlan && mealPlan.meals && (
            <div className="space-y-6">
                <div className="text-center p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                    <CheckCircle className="mx-auto h-8 w-8 mb-2" />
                    <h3 className="font-semibold">{translations.mealPlanner.planGeneratedTitle}</h3>
                </div>
                {mealPlan.meals.length > 0 ? (
                    mealPlan.meals.map((meal, index) => <MealCard key={index} meal={meal} />)
                ) : (
                     <Card>
                        <CardContent className="text-center text-muted-foreground py-8">
                             <Info className="mx-auto h-8 w-8 mb-2" />
                            <p>{translations.mealPlanner.notEnoughCalories}</p>
                        </CardContent>
                     </Card>
                )}
            </div>
        )}

      </div>
    </main>
  );
}
