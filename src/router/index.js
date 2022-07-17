import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';
import MainView from '../views/MainView.vue';
import TariffView from '../views/TariffView.vue';
import PanelView from '../views/PanelView.vue';
import LocationView from '../views/LocationView.vue';
import AuthView from '../views/AuthView.vue';

const routes = [
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
    component: LocationView,
  },
  {
    path: '/login',
    component: AuthView,
  },
  {
    path: '/panel',
    component: PanelView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/AdminPanelView.vue'),
    meta: {
      requireAuth: true,
      requireAdmin: true,
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
    to.path ? '/panel' : isLoggedIn && router.push('/panel');

    // if user is logged redirect him to dashboard page
  }
});

export default router;
