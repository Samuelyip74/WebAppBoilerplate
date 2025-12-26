<template>
  <div class="container py-5" style="max-width: 500px;">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <h2 class="mb-3">Reset password</h2>
        <p class="text-muted">Enter your email and a new password.</p>

        <form @submit.prevent="onSubmit" class="mt-3">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" required class="form-control" placeholder="you@example.com" />
          </div>
          <div class="mb-3">
            <label class="form-label">New password</label>
            <input v-model="form.newPassword" type="password" required class="form-control" placeholder="••••••••" />
          </div>
          <button :disabled="loading" type="submit" class="btn btn-primary w-100">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            Update password
          </button>
        </form>

        <div v-if="message" class="alert alert-success mt-3 mb-0">{{ message }}</div>
        <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>

        <div class="d-flex justify-content-between mt-3 text-muted small">
          <RouterLink to="/login">Back to login</RouterLink>
          <RouterLink to="/terms">Terms</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import api from '../services/api';

const form = reactive({ email: '', newPassword: '' });
const loading = ref(false);
const error = ref('');
const message = ref('');

const onSubmit = async () => {
  loading.value = true;
  error.value = '';
  message.value = '';
  try {
    await api.requestPasswordReset(form.email, form.newPassword);
    message.value = 'Password updated. You can now login with the new password.';
  } catch (err) {
    error.value = err.response?.data?.detail || 'Unable to reset password';
  } finally {
    loading.value = false;
  }
};
</script>