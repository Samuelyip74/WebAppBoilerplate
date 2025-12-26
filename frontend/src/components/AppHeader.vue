<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">WebApp Boilerplate</span>
      <div class="d-flex align-items-center gap-3">
        <RouterLink class="text-secondary small" to="/terms">Terms</RouterLink>
        <RouterLink class="text-secondary small" to="/privacy">Privacy</RouterLink>
        <div v-if="auth.isAuthenticated" class="dropdown">
          <button
            class="btn btn-outline-primary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="me-2">{{ auth.user?.full_name || auth.user?.email }}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink class="dropdown-item" to="/app/profile">Profile</RouterLink>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <button class="dropdown-item text-danger" type="button" @click="handleLogout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  router.push({ name: 'login' });
};
</script>