<template>
  <header class="app-toolbar">
    <h1 class="app-toolbar-title">WebApp Boilerplate</h1>
    <div class="app-toolbar-actions">
      <button v-if="auth.isAuthenticated" class="app-toolbar-action-btn" type="button" @click="handleLogout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>
  </header>
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
