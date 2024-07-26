import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';



const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'auth.register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'auth.login',
      component: () => import('../views/auth/Login.vue'),
    },
  ],
});

export default router;
