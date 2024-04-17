import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/css/main.css';

import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

import { createI18n } from 'vue-i18n';
import { pt_BR } from './locales/pt_BR';
import { en_US } from './locales/en_US';
import { es_ES } from './locales/es_ES';

const vuetify = createVuetify({
  components,
  directives,
});

const languages = {
  pt_BR,
  en_US,
  es_ES,
};

const i18n = createI18n({
  locale: 'pt_BR',
  fallbackLocale: 'pt_BR',
  messages: languages,
});

createApp(App).use(router).use(i18n).use(vuetify).mount('#app');
