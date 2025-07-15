
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
});
export type AnalyzeMealOutput = z.infer<typeof AnalyzeMealOutputSchema>;

export async function handleAnalyzeMeal(input: AnalyzeMealInput): Promise<AnalyzeMealOutput> {
  return analyzeMeal(input);
}

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
  prompt: `You are an expert nutritionist AI with a deep understanding of international cuisines, including Iraqi, Middle Eastern, and Asian dishes.

Analyze the provided meal information (description and/or photo) and provide a detailed and accurate estimate of its nutritional content in JSON format.

Your response MUST conform to the following JSON schema:
\`\`\`json
{
  "type": "object",
  "properties": {
    "mealName": { "type": "string", "description": "A descriptive name for the meal." },
    "calories": { "type": "number", "description": "Estimated total calories." },
    "protein": { "type": "number", "description": "Estimated grams of protein." },
    "carbs": { "type": "number", "description": "Estimated grams of carbohydrates." },
    "fats": { "type": "number", "description": "Estimated grams of fat." },
    "sugar": { "type": "number", "description": "Estimated grams of sugar." },
    "sodium": { "type": "number", "description": "Estimated milligrams of sodium." },
    "potassium": { "type": "number", "description": "Estimated milligrams of potassium." },
    "calcium": { "type": "number", "description": "Estimated milligrams of calcium." },
    "iron": { "type": "number", "description": "Estimated milligrams of iron." },
    "vitaminC": { "type": "number", "description": "Estimated milligrams of Vitamin C." },
    "ingredients": { "type": "array", "items": { "type": "string" }, "description": "A list of identified ingredients in the meal." },
    "confidence": { "type": "string", "enum": ["High", "Medium", "Low"], "description": "The confidence level of the analysis." },
    "feedback": { "type": "string", "description": "A brief explanation for the confidence score, highlighting any ambiguities." }
  },
  "required": ["mealName", "calories", "protein", "carbs", "fats", "sugar", "sodium", "potassium", "calcium", "iron", "vitaminC", "ingredients", "confidence", "feedback"]
}
\`\`\`

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
    const {output} = await prompt(input);
    return output!;
  }
);
