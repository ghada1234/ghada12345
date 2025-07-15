
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
  model: 'googleai/gemini-2.0-flash-preview',
  input: {schema: GenerateMealPlanInputSchema},
  output: {schema: GenerateMealPlanOutputSchema},
  prompt: `You are a world-class AI nutritionist. Your task is to create a one-day meal plan based on the user's remaining calorie target and preferences.

**Constraint Checklist & Confidence Score:**
1.  **Calorie Target Adherence:** The combined calories of all suggested meals MUST be within 10% of the provided 'remainingCalories'.
2.  **Preference Integration:** You MUST adhere to all dietary preferences, allergies, likes, and dislikes.
3.  **Completeness:** You MUST provide all fields for each meal: name, description, ingredients, instructions, mealType, and all nutrient estimates. For any nutrient you cannot determine, you MUST use a value of 0.
4.  **Meal Distribution:** Distribute the calories logically across meals. If the total remaining calories are very low (e.g., under 500), you might only suggest one or two smaller meals (like just 'Dinner' or 'Snack'). You can include 'Breakfast', 'Lunch', 'Dinner', 'Snack', or 'Dessert'. Omit meal types if they don't make sense for the calorie budget.

**User Preferences:**
*   **Target Total Calories for the Plan:** {{{remainingCalories}}} kcal
*   **Dietary Preference:** {{{dietaryPreference}}}
*   **Allergies to Avoid:** {{{allergies}}}
*   **Likes:** {{{likes}}}
*   **Dislikes:** {{{dislikes}}}

Generate a list of meals for the day. For each meal, provide a detailed recipe including a list of ingredients, step-by-step instructions, the assigned mealType, and a nutritional breakdown.
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
