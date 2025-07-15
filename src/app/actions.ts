"use server";

import { suggestRecipes, type SuggestRecipesInput, type SuggestRecipesOutput } from "@/ai/flows/suggest-recipes";

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
