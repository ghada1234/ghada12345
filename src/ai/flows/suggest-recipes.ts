'use server';

/**
 * @fileOverview Recipe suggestion AI agent.
 *
 * - suggestRecipes - A function that suggests recipes based on dietary restrictions and available ingredients.
 * - SuggestRecipesInput - The input type for the suggestRecipes function.
 * - SuggestRecipesOutput - The return type for the suggestRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesInputSchema = z.object({
  dietaryRestrictions: z
    .string()
    .describe('Any dietary restrictions the user has, such as vegetarian, vegan, gluten-free, etc.'),
  availableIngredients: z
    .string()
    .describe('A list of ingredients the user has available, separated by commas.'),
  cuisinePreferences: z
    .string()
    .optional()
    .describe('Optional preferences for cuisine types, such as Italian, Mexican, etc.'),
  numberOfRecipes: z
    .number()
    .optional()
    .default(3)
    .describe('The number of recipes to suggest, defaults to 3.'),
});
export type SuggestRecipesInput = z.infer<typeof SuggestRecipesInputSchema>;

const SuggestRecipesOutputSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string().describe('The name of the recipe.'),
      ingredients: z.string().describe('A list of ingredients needed for the recipe.'),
      instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
      cuisine: z.string().describe('The type of cuisine the recipe belongs to.'),
      dietarySuitability: z
        .string()
        .describe('Explanation of how the recipe fits the specified dietary restrictions.'),
    })
  ),
});
export type SuggestRecipesOutput = z.infer<typeof SuggestRecipesOutputSchema>;

export async function suggestRecipes(input: SuggestRecipesInput): Promise<SuggestRecipesOutput> {
  return suggestRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesPrompt',
  input: {schema: SuggestRecipesInputSchema},
  output: {schema: SuggestRecipesOutputSchema},
  prompt: `You are a recipe suggestion AI. Given the user's dietary restrictions, available ingredients, and cuisine preferences, you will suggest recipes that align with their needs.

  Dietary Restrictions: {{{dietaryRestrictions}}}
  Available Ingredients: {{{availableIngredients}}}
  Cuisine Preferences: {{{cuisinePreferences}}}
  Number of Recipes: {{{numberOfRecipes}}}

  Suggest recipes using only the ingredients listed as available.
  Each recipe should include the name, ingredients, instructions, the cuisine it belongs to, and an explanation of how it fits the specified dietary restrictions.
  Return the recipes in JSON format.
  `,
});

const suggestRecipesFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFlow',
    inputSchema: SuggestRecipesInputSchema,
    outputSchema: SuggestRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
