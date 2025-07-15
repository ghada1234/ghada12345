"use server";

import { suggestRecipes, type SuggestRecipesInput, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";
import { analyzeMeal, type AnalyzeMealInput, type AnalyzeMealOutput } from "@/ai/flows/analyze-meal";

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
    throw new Error("Failed to get meal analysis from AI.");
  }
}
