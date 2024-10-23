// plugins/sentry.client.js

import * as Sentry from '@sentry/vue'; 
import { Integrations } from '@sentry/tracing';

export default ({ app, router }) => {
  Sentry.init({
    Vue: app, // Use the app instance for Vue integration
    dsn: process.env.SENTRY_DSN || 'YOUR_SENTRY_DSN', // Replace with your DSN
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router), // Correctly handle router instrumentation
        tracingOrigins: ['localhost', /^\//], // Adjust tracing origins if needed
      }),
    ],
    tracesSampleRate: 1.0, // Adjust the sample rate based on your needs
  });
};
