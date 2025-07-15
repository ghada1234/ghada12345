'use server';

/**
 * @fileOverview Meal plan generation AI agent.
 *
 * - generateMealPlan - A function that generates a meal plan based on remaining calories and user preferences.
 * - GenerateMealPlanInput - The input type for the generateMealPlan function.
 * - GenerateMealPlanOutput - The return type for the generateMealPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MealNutrientsSchema = z.object({
  calories: z.number().describe('Estimated total calories for the meal.'),
  protein: z.number().describe('Estimated grams of protein.'),
  carbs: z.number().describe('Estimated grams of carbohydrates.'),
  fats: z.number().describe('Estimated grams of fat.'),
  sugar: z.number().describe('Estimated grams of sugar.'),
  sodium: z.number().describe('Estimated milligrams of sodium.'),
});

const MealSchema = z.object({
    name: z.string().describe('The name of the meal.'),
    description: z.string().describe('A brief, appetizing description of the meal.'),
    ingredients: z.array(z.string()).describe('A list of ingredients needed for the recipe.'),
    instructions: z.array(z.string()).describe('Step-by-step instructions for preparing the recipe.'),
    nutrients: MealNutrientsSchema.describe('The nutritional information for this specific meal.'),
});
export type Meal = z.infer<typeof MealSchema>;

export const GenerateMealPlanInputSchema = z.object({
    remainingCalories: z.number().describe('The target number of calories for the entire day\'s meal plan. The sum of calories for breakfast, lunch, and dinner should be close to this value.'),
    dietaryPreference: z.string().optional().describe('Any dietary preferences, e.g., "vegetarian", "low-carb", "healthy", "balanced".'),
    allergies: z.string().optional().describe('A list of allergies to avoid.'),
    likes: z.string().optional().describe('A list of preferred foods or cuisines.'),
    dislikes: z.string().optional().describe('A list of foods or cuisines to avoid.'),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

export const GenerateMealPlanOutputSchema = z.object({
  breakfast: MealSchema.optional().describe('The suggested breakfast meal. This can be omitted if remaining calories are too low.'),
  lunch: MealSchema.optional().describe('The suggested lunch meal. This can be omitted if remaining calories are too low.'),
  dinner: MealSchema.optional().describe('The suggested dinner meal. This can be omitted if remaining calories are too low.'),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;

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
