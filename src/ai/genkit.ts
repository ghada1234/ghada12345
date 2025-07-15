
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This is the single, simplified configuration for Genkit.
// It relies on the GOOGLE_API_KEY environment variable being set.
export const ai = genkit({
  plugins: [
    googleAI({
      // For local development, create a .env file and add:
      // GOOGLE_API_KEY="your-google-ai-api-key"
      //
      // For production on Vercel, you MUST set the GOOGLE_API_KEY
      // environment variable in your Vercel project settings.
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
