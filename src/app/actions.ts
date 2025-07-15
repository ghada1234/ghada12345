
"use server";

import { suggestRecipes, type SuggestRecipesInput, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";
import { handleAnalyzeMeal as handleAnalyzeMealFlow, type AnalyzeMealInput, type AnalyzeMealOutput } from "@/ai/flows/analyze-meal";
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
  return handleAnalyzeMealFlow(input);
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
