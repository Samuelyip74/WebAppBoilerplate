import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import PasswordResetView from '../views/PasswordResetView.vue';
import TermsView from '../views/TermsView.vue';
import PrivacyView from '../views/PrivacyView.vue';
import SplashView from '../views/SplashView.vue';
import MainApp from '../views/MainApp.vue';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import ProfileView from '../views/ProfileView.vue';
import { useAuthStore } from '../store/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'splash', component: SplashView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/signup', name: 'signup', component: SignupView },
    { path: '/reset-password', name: 'reset-password', component: PasswordResetView },
    { path: '/terms', name: 'terms', component: TermsView },
    { path: '/privacy', name: 'privacy', component: PrivacyView },
    {
      path: '/app',
      component: MainApp,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: { name: 'home' } },
        { path: 'home', name: 'home', component: HomeView },
        { path: 'products', name: 'products', component: ProductView },
        { path: 'profile', name: 'profile', component: ProfileView }
      ]
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.initialized) {
    await authStore.initialize();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if ((to.name === 'login' || to.name === 'signup' || to.name === 'splash') && authStore.isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
