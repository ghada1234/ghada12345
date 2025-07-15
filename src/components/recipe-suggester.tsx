"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrainCircuit, Loader2, Salad } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  dietaryRestrictions: z.string().min(2, "Please enter your dietary restrictions."),
  availableIngredients: z.string().min(3, "Please list some available ingredients."),
  cuisinePreferences: z.string().optional(),
});

export function RecipeSuggester() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<SuggestRecipesOutput["recipes"]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryRestrictions: "",
      availableIngredients: "",
      cuisinePreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecipes([]);
    try {
      const result = await handleSuggestRecipes({
        ...values,
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
          <CardTitle>AI Recipe Helper</CardTitle>
        </div>
        <CardDescription>
          Get recipe ideas based on what you have and your diet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Needs</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Vegetarian, Gluten-Free" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuisinePreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Italian, Mexican" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="availableIngredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Ingredients</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., chicken breast, rice, broccoli, soy sauce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                "Suggest Recipes"
              )}
            </Button>
          </form>
        </Form>

        {(isLoading || recipes.length > 0) && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
            {isLoading && (
                <div className="space-y-2">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
