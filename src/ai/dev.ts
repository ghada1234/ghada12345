import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-recipes.ts';
import '@/ai/flows/analyze-meal.ts';
import '@/ai/flows/generate-meal-plan.ts';
