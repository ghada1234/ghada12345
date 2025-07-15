
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
      "A photo of the meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type AnalyzeMealInput = z.infer<typeof AnalyzeMealInputSchema>;

const AnalyzeMealOutputSchema = z.object({
  mealName: z.string().optional().default('').describe('A descriptive name for the meal.'),
  portionSize: z.string().optional().default('').describe('The estimated portion size of the meal, e.g., "1 cup", "100g", "1 slice".'),
  calories: z.number().optional().default(0).describe('Estimated total calories.'),
  protein: z.number().optional().default(0).describe('Estimated grams of protein.'),
  carbs: z.number().optional().default(0).describe('Estimated grams of carbohydrates.'),
  fats: z.number().optional().default(0).describe('Estimated grams of fat.'),
  sugar: z.number().optional().default(0).describe('Estimated grams of sugar.'),
  sodium: z.number().optional().default(0).describe('Estimated milligrams of sodium.'),
  potassium: z.number().optional().default(0).describe('Estimated milligrams of potassium.'),
  calcium: z.number().optional().default(0).describe('Estimated milligrams of calcium.'),
  iron: z.number().optional().default(0).describe('Estimated milligrams of iron.'),
  vitaminC: z.number().optional().default(0).describe('Estimated milligrams of Vitamin C.'),
  ingredients: z.array(z.string()).optional().default([]).describe('A list of identified ingredients in the meal.'),
  confidence: z.enum(['High', 'Medium', 'Low']).optional().default('Low').describe('The confidence level of the analysis.'),
  feedback: z.string().optional().default('').describe('A brief explanation for the confidence score, highlighting any ambiguities.'),
  error: z.string().optional().describe("An error message if the analysis failed."),
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
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AnalyzeMealInputSchema},
  output: {schema: AnalyzeMealOutputSchema},
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
        }
    ]
  },
  prompt: `You are an expert nutritionist AI with a deep understanding of international cuisines, including Iraqi, Middle Eastern, and Asian dishes.

Analyze the provided meal information (description and/or photo) and provide a detailed and accurate estimate of its nutritional content.

Your response MUST conform to the output JSON schema.
IMPORTANT: You MUST provide a value for the 'portionSize' field (e.g., "1 cup", "250g", "1 serving").
IMPORTANT: You MUST provide a numerical value for every single nutrient field. If a value cannot be accurately determined, you MUST provide an estimate of 0.

Analyze the following meal:
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
        return output!;
    } catch(e) {
        console.error("Error in analyzeMealFlow:", e);
        return {
            error: (e as Error).message,
            mealName: "",
            portionSize: "",
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
            confidence: "Low",
            feedback: "Failed to analyze meal due to an internal error.",
        }
    }
  }
);
