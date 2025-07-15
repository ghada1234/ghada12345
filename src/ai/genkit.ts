import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {configureGenkit} from '@genkit-ai/next';

configureGenkit({
  plugins: [googleAI()],
  // model: 'googleai/gemini-2.0-flash', // This is now the default
});

export const ai = genkit();
