import { createApp } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from 'axios';

loadFonts();

const app = createApp(App);

app.use(vuetify);
app.config.productionTip = false;

const axiosInstance = axios.create({
  withCredentials: true,
});

app.use(store);

// do initialization auth
store.dispatch('auth').then(() => {
  app.component('DatePicker', Datepicker);
  app.use(router);
  app.mount('#app');
});

app.config.globalProperties.$axios = { ...axiosInstance };
// Protection when request to backends meet errors
axios.interceptors.response.use(
  (res) => res,
  async ({ response: { status } }) => {
    // If User is Unauthorize router will logout him by Action
    status === 401 && (await store.dispatch('logout', false));
    // If User used to many request store will clear his data and change status to isLoggedIn: false
    status === 429 && (await store.commit('logout', false));
  },
);
