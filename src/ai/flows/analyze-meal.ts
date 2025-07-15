
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
  confidence: z.enum(['High', 'Medium', 'Low']).describe('The confidence level of the analysis.'),
  feedback: z.string().describe('A brief explanation for the confidence score, highlighting any ambiguities.'),
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
  prompt: `You are an expert nutritionist AI. Your task is to analyze the provided meal information and estimate its nutritional content.

You will be given either a text description, a photo, or both. The photo might be of a meal, or it could be a product's barcode.
If a barcode is provided, identify the product and retrieve its nutritional information. Otherwise, use all available information to identify the meal and its components.

Analyze the meal or product and provide the following estimations:
- A descriptive name for the meal or product.
- Total calories.
- Grams of protein.
- Grams of carbohydrates.
- Grams of fat.

Crucially, you must also assess your confidence in this analysis. The confidence level can be 'High', 'Medium', or 'Low'.
- 'High' confidence means the meal is simple, clear, and portion sizes are obvious, or a barcode was successfully identified.
- 'Medium' confidence means there is some ambiguity, like complex ingredients or unclear portion sizes.
- 'Low' confidence means the image is blurry, the description is vague, or the meal is very complex and difficult to analyze accurately.

Provide a brief 'feedback' string explaining your confidence level. For example, if confidence is 'Medium', you might say "Portion size is an estimate," or if 'Low', "Image is blurry and some ingredients are not identifiable."

Source Information:
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
    const {output} = await prompt(input);
    return output!;
  }
);
