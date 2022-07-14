import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// @TODO - resovle this problem
// eslint-disable-next-line import/no-cycle
import { store } from '@/store';
import MainView from '../views/MainView.vue';
import TariffView from '../views/TariffView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainView,
  },
  {
    path: '/tariff',
    component: TariffView,
  },
  {
    path: '/location',
    component: () => import(/* webpackChunkName: "login" */ '../views/LocationView.vue'),
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/panel',
    component: () => import(/* webpackChunkName: "secure" */ '../views/PanelView.vue'),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: MainView,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requireAuth) {
    try {
      await store.dispatch('auth');
    } catch (e) {
      await store.dispatch('logout', true);
    }
  } else {
    to.path ? '/secure' : isLoggedIn && router.push('/secure');

    // if user is logged redirect him to dashboard page
  }
});

export default router;
