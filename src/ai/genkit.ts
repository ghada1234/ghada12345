import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit();

export function configureGenkit_private_DoNotUse() {
  genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.0-flash',
  });
}
