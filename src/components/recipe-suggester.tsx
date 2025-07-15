"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrainCircuit, Loader2, Salad } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { handleSuggestRecipes } from "@/app/actions";
import { type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  dietaryRestrictions: z.string(),
  availableIngredients: z.string(),
  cuisinePreferences: z.string().optional(),
});

export function RecipeSuggester() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<SuggestRecipesOutput["recipes"]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryRestrictions: "healthy",
      availableIngredients: "any",
      cuisinePreferences: "any",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecipes([]);
    try {
      const result = await handleSuggestRecipes({
        dietaryRestrictions: "healthy, balanced",
        availableIngredients: "common ingredients",
        numberOfRecipes: 3,
      });
      setRecipes(result.recipes);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with the recipe suggestion.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <CardTitle>Smart Meal Ideas</CardTitle>
        </div>
        <CardDescription>
          Personalized meal ideas based on your preferences and remaining calories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recipes.length === 0 && !isLoading && (
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">Ready for some inspiration?</p>
             <Button onClick={() => onSubmit({})} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate New Ideas"
              )}
            </Button>
          </div>
        )}
        
        {(isLoading || recipes.length > 0) && (
          <div className="mt-2">
            {isLoading && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="space-y-2 w-full">
                            <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse"></div>
                            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                        </div>
                    </div>
                     <div className="flex items-center space-x-4">
                        <div className="space-y-2 w-full">
                            <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse"></div>
                            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                        </div>
                    </div>
                     <div className="flex items-center space-x-4">
                        <div className="space-y-2 w-full">
                            <div className="h-8 w-1/3 bg-muted rounded-md animate-pulse"></div>
                            <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
                        </div>
                    </div>
                </div>
            )}
            {recipes.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                {recipes.map((recipe, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-base font-medium hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Salad className="h-5 w-5 text-accent" />
                        {recipe.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
                      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                      <p><strong>Dietary Suitability:</strong> {recipe.dietarySuitability}</p>
                      <h4 className="font-semibold text-foreground">Ingredients:</h4>
                      <p>{recipe.ingredients}</p>
                      <h4 className="font-semibold text-foreground">Instructions:</h4>
                      <p className="whitespace-pre-line">{recipe.instructions}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            <div className="mt-6 text-center">
              <Button onClick={() => onSubmit({})} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate New Ideas"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
