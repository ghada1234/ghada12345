
'use server';

/**
 * @fileOverview Meal plan generation AI agent.
 *
 * - generateMealPlan - A function that generates a meal plan based on remaining calories and user preferences.
 */

import {ai} from '@/ai/genkit';
import { GenerateMealPlanInputSchema, GenerateMealPlanOutputSchema, type GenerateMealPlanInput, type GenerateMealPlanOutput } from './types';


export async function generateMealPlan(input: GenerateMealPlanInput): Promise<GenerateMealPlanOutput> {
  return generateMealPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMealPlanPrompt',
  input: {schema: GenerateMealPlanInputSchema},
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are a world-class AI nutritionist. Your task is to create a one-day meal plan (breakfast, lunch, and dinner) based on the user's remaining calorie target and preferences.

**Constraint Checklist & Confidence Score:**
1.  **Calorie Target Adherence:** The combined calories of all suggested meals MUST be within 10% of the provided 'remainingCalories'.
2.  **Preference Integration:** You MUST adhere to all dietary preferences, allergies, likes, and dislikes.
3.  **Completeness:** You MUST provide all fields for each meal: name, description, ingredients, instructions, and all nutrient estimates.
4.  **Meal Distribution:** Distribute the calories logically across the meals (e.g., breakfast < lunch/dinner). If the total remaining calories are very low (e.g., under 500), you might only suggest one or two smaller meals instead of three. Omit meals if they don't make sense for the calorie budget. For example, if remaining calories is 400, just suggest one meal for dinner.

**User Preferences:**
*   **Target Total Calories for the Plan:** {{{remainingCalories}}} kcal
*   **Dietary Preference:** {{{dietaryPreference}}}
*   **Allergies to Avoid:** {{{allergies}}}
*   **Likes:** {{{likes}}}
*   **Dislikes:** {{{dislikes}}}

Generate the complete meal plan. For each meal, provide a detailed recipe including a list of ingredients and step-by-step instructions. Also, provide a nutritional breakdown for each meal.
`,
});

const generateMealPlanFlow = ai.defineFlow(
  {
    name: 'generateMealPlanFlow',
    inputSchema: GenerateMealPlanInputSchema,
    outputSchema: GenerateMealPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
