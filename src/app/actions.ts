"use server";

import { suggestRecipes, type SuggestRecipesInput, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";
import { analyzeMeal, type AnalyzeMealInput, type AnalyzeMealOutput } from "@/ai/flows/analyze-meal";
import { generateMealPlan, type GenerateMealPlanInput, type GenerateMealPlanOutput } from "@/ai/flows/generate-meal-plan";

export async function handleSuggestRecipes(
  input: SuggestRecipesInput
): Promise<SuggestRecipesOutput> {
  try {
    const result = await suggestRecipes(input);
    return result;
  } catch (error) {
    console.error("Error suggesting recipes:", error);
    throw new Error("Failed to get recipe suggestions from AI.");
  }
}

export async function handleAnalyzeMeal(
  input: AnalyzeMealInput
): Promise<AnalyzeMealOutput> {
  try {
    const result = await analyzeMeal(input);
    return result;
  } catch (error) {
    console.error("Error analyzing meal:", error);
    // Construct a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to get meal analysis from AI: ${errorMessage}`);
  }
}

export async function handleGenerateMealPlan(
    input: GenerateMealPlanInput
): Promise<GenerateMealPlanOutput> {
    try {
        const result = await generateMealPlan(input);
        return result;
    } catch (error) {
        console.error("Error generating meal plan:", error);
        throw new Error("Failed to get meal plan from AI.");
    }
}
