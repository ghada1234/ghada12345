import {z} from 'zod';

const MealNutrientsSchema = z.object({
  calories: z.number().describe('Estimated total calories for the meal.'),
  protein: z.number().describe('Estimated grams of protein.'),
  carbs: z.number().describe('Estimated grams of carbohydrates.'),
  fats: z.number().describe('Estimated grams of fat.'),
  sugar: z.number().describe('Estimated grams of sugar.'),
  sodium: z.number().describe('Estimated milligrams of sodium.'),
});

const MealSchema = z.object({
    mealType: z.enum(["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]).describe("The type of meal, e.g., Breakfast, Lunch, Dinner."),
    name: z.string().describe('The name of the meal.'),
    description: z.string().describe('A brief, appetizing description of the meal.'),
    ingredients: z.array(z.string()).describe('A list of ingredients needed for the recipe.'),
    instructions: z.array(z.string()).describe('Step-by-step instructions for preparing the recipe.'),
    nutrients: MealNutrientsSchema.describe('The nutritional information for this specific meal.'),
});
export type Meal = z.infer<typeof MealSchema>;

export const GenerateMealPlanInputSchema = z.object({
    remainingCalories: z.number().describe('The target number of calories for the entire day\'s meal plan. The sum of calories for all meals should be close to this value.'),
    dietaryPreference: z.string().optional().describe('Any dietary preferences, e.g., "vegetarian", "low-carb", "healthy", "balanced".'),
    allergies: z.string().optional().describe('A list of allergies to avoid.'),
    likes: z.string().optional().describe('A list of preferred foods or cuisines.'),
    dislikes: z.string().optional().describe('A list of foods or cuisines to avoid.'),
});
export type GenerateMealPlanInput = z.infer<typeof GenerateMealPlanInputSchema>;

export const GenerateMealPlanOutputSchema = z.object({
  meals: z.array(MealSchema).describe('An array of meals for the day. Can contain Breakfast, Lunch, Dinner, Snacks, etc. The number of meals should be appropriate for the remaining calorie budget.'),
});
export type GenerateMealPlanOutput = z.infer<typeof GenerateMealPlanOutputSchema>;
