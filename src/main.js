import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import i18n from './locales';
import pinia from './stores';
import * as Sentry from '@sentry/vue';

import dayjs from './helpers/dayjs';




const app = createApp(App);

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_DSN || null,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
  integrations: [
    Sentry.browserTracingIntegration({router}),
  ],

  sampleRate: import.meta.env.VITE_SENTRY_SAMPLE_RATE || false,
  tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || false,
});

app.config.globalProperties.$dayjs = dayjs;

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount('#app');
