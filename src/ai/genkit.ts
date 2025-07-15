'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {configureGenkit} from '@genkit-ai/next';

configureGenkit({
  plugins: [
    googleAI({
      // You must set the GOOGLE_API_KEY environment variable.
      //
      // For local development, you can create a .env file in the root of your
      // project and add the following line:
      //
      // GOOGLE_API_KEY="your-google-ai-api-key"
      //
      // For production deployment on Vercel, you must set the GOOGLE_API_KEY
      // environment variable in your Vercel project settings.
    }),
  ],
  // This is required to allow the Next.js dev server to accept requests from
  // the Firebase Studio environment.
  allowedCorsOrigins: ['*.cloudworkstations.dev'],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit();
