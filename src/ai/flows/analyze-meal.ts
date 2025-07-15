
'use server';

/**
 * @fileOverview A meal analysis AI agent.
 *
 * - analyzeMeal - A function that analyzes a meal from a description or photo.
 * - AnalyzeMealInput - The input type for the analyzeMeal function.
 * - AnalyzeMealOutput - The return type for the analyzeMeal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMealInputSchema = z.object({
  description: z
    .string()
    .optional()
    .describe('A text description of the meal.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMealInput = z.infer<typeof AnalyzeMealInputSchema>;

const AnalyzeMealOutputSchema = z.object({
  mealName: z.string().describe('A descriptive name for the meal.'),
  calories: z.number().describe('Estimated total calories.'),
  protein: z.number().describe('Estimated grams of protein.'),
  carbs: z.number().describe('Estimated grams of carbohydrates.'),
  fats: z.number().describe('Estimated grams of fat.'),
  sugar: z.number().describe('Estimated grams of sugar.'),
  sodium: z.number().describe('Estimated milligrams of sodium.'),
  potassium: z.number().describe('Estimated milligrams of potassium.'),
  calcium: z.number().describe('Estimated milligrams of calcium.'),
  iron: z.number().describe('Estimated milligrams of iron.'),
  vitaminC: z.number().describe('Estimated milligrams of Vitamin C.'),
  ingredients: z.array(z.string()).describe('A list of identified ingredients in the meal.'),
  confidence: z.enum(['High', 'Medium', 'Low']).describe('The confidence level of the analysis.'),
  feedback: z.string().describe('A brief explanation for the confidence score, highlighting any ambiguities.'),
  error: z.string().optional().describe('An optional error message if the analysis failed.'),
});
export type AnalyzeMealOutput = z.infer<typeof AnalyzeMealOutputSchema>;

export async function analyzeMeal(input: AnalyzeMealInput): Promise<AnalyzeMealOutput> {
  if (!input.description && !input.photoDataUri) {
    throw new Error('Either a description or a photo must be provided.');
  }
  return analyzeMealFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMealPrompt',
  input: {schema: AnalyzeMealInputSchema},
  output: {schema: AnalyzeMealOutputSchema},
  prompt: `You are an expert nutritionist AI with a specialization in global cuisines, including a deep understanding of Middle Eastern, Indian, and Iraqi dishes. Your task is to analyze the provided meal information and provide a detailed and accurate estimate of its nutritional content, including both macronutrients and key micronutrients.

Follow these steps for your analysis:
1.  **Identify the Meal:** First, identify the meal and all its individual components from the provided description and/or photo. If a barcode is visible in the photo, prioritize identifying the product from the barcode. Be specific, especially with regional dishes (e.g., 'Iraqi Dolma', 'Chicken Biryani', 'Hummus with Tahini').
2.  **List Ingredients:** Based on your identification, create a list of all the ingredients present in the meal.
3.  **Estimate Portion Sizes:** For each component, estimate the portion size in grams or other standard units. Be realistic.
4.  **Calculate Nutritional Information:** Based on the identified ingredients and their estimated portion sizes, calculate the total nutritional content for the entire meal. Provide estimations for:
    *   Macronutrients: Calories, Protein, Carbohydrates, Fats.
    *   Micronutrients: Sugar, Sodium, Potassium, Calcium, Iron, and Vitamin C.
    *   **CRITICAL RULE**: You MUST provide a numerical value for every single nutrient field. If a value cannot be accurately determined, you MUST provide an estimate of 0 and set the confidence to 'Low'. DO NOT use 'N/A', strings, or leave any field blank. For example, if you are unsure about the vitamin C content of a cooked meal, you MUST output 0 for vitaminC.
5.  **Assess Confidence:** Critically evaluate the quality of the input and the certainty of your analysis. Assign a confidence score ('High', 'Medium', or 'Low') based on the following criteria:
    *   **High:** The image is clear, the meal is simple with distinct ingredients, and portion sizes are unambiguous (e.g., a single apple, a standard can of soda, a clearly labeled product). Or, a barcode was successfully identified.
    *   **Medium:** There is some ambiguity. The meal might be complex, some ingredients may be obscured, or portion sizes are difficult to estimate precisely (e.g., a bowl of pasta with a mixed sauce, a large salad with many toppings, a mixed plate of various items).
    *   **Low:** The input is very unclear. The image may be blurry or poorly lit, the description vague, or the meal is exceptionally complex, making an accurate analysis very difficult (e.g., a blurry photo of a casserole, a description like "had some soup").
6.  **Provide Feedback:** Write a brief, helpful 'feedback' message explaining your confidence rating. This should clearly state what made the analysis difficult, if anything. For example: "Confidence is Medium because the exact portion size of the rice is an estimate." or "Confidence is High as the product was clearly identified from the barcode."

Source Information to Analyze:
{{#if description}}
Description: {{{description}}}
{{/if}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}
`,
});

const analyzeMealFlow = ai.defineFlow(
  {
    name: 'analyzeMealFlow',
    inputSchema: AnalyzeMealInputSchema,
    outputSchema: AnalyzeMealOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error("AI model returned an empty output.");
      }
      return output;
    } catch (error: any) {
        console.error("Error in analyzeMealFlow:", error);
        // Return a structured error within the valid output schema.
        return {
            mealName: "Analysis Failed",
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            sugar: 0,
            sodium: 0,
            potassium: 0,
            calcium: 0,
            iron: 0,
            vitaminC: 0,
            ingredients: [],
            confidence: 'Low',
            feedback: 'The AI model could not process the request. This may be due to a temporary issue with the AI service or a problem with the input data.',
            error: error.message || 'An unexpected error occurred during analysis.',
        };
    }
  }
);
