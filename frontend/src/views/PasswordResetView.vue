<template>
  <div class="auth-hero">
    <div class="auth-card">
      <h1 class="auth-title">Reset password</h1>
      <p class="auth-subtle">
        Remembered your password?
        <RouterLink class="auth-link" to="/login">Sign in</RouterLink>
      </p>

      <form @submit.prevent="onSubmit" class="mt-4">
        <input v-model="form.trap" type="text" class="hidden-input" aria-hidden="true" tabindex="-1" autocomplete="off" />

        <div class="mb-3">
          <input v-model="form.email" type="email" required class="form-control auth-input" placeholder="Email" />
        </div>
        <div class="mb-3">
          <input v-model="form.newPassword" type="password" required class="form-control auth-input" placeholder="New password" />
        </div>
        <div class="mb-3">
          <input
            v-model="form.humanAnswer"
            type="text"
            required
            class="form-control auth-input"
            placeholder="Type HUMAN"
            autocomplete="off"
          />
          <div class="form-text">Please type the word HUMAN to continue.</div>
        </div>

        <button :disabled="loading" type="submit" class="auth-btn-primary">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else>Update password</span>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>

      <div v-if="message" class="alert alert-success mt-3 mb-0">{{ message }}</div>
      <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>

      <div class="d-flex justify-content-between mt-4">
        <RouterLink class="auth-subtle" to="/terms">Terms</RouterLink>
        <RouterLink class="auth-subtle" to="/privacy">Privacy</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import api from '../services/api';

const form = reactive({ email: '', newPassword: '', humanAnswer: '', trap: '' });
const loading = ref(false);
const error = ref('');
const message = ref('');

const onSubmit = async () => {
  loading.value = true;
  error.value = '';
  message.value = '';
  try {
    await api.requestPasswordReset(form.email, form.newPassword, form.humanAnswer, form.trap);
    message.value = 'Password updated. You can now login with the new password.';
  } catch (err) {
    error.value = err.response?.data?.detail || 'Unable to reset password';
  } finally {
    loading.value = false;
  }
};
</script>