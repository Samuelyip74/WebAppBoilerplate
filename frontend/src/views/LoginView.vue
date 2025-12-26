<template>
  <div class="container py-5" style="max-width: 500px;">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <h2 class="mb-3">Welcome back</h2>
        <p class="text-muted">Sign in to continue to your dashboard.</p>

        <form @submit.prevent="onSubmit" class="mt-3">
          <input v-model="form.trap" type="text" class="d-none" aria-hidden="true" tabindex="-1" autocomplete="off" />
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" required class="form-control" placeholder="you@example.com" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" required class="form-control" placeholder="••••••••" />
          </div>
          <div class="mb-3">
            <label class="form-label">Human check</label>
            <input
              v-model="form.humanAnswer"
              type="text"
              required
              inputmode="text"
              autocomplete="off"
              class="form-control"
              placeholder="Type HUMAN"
            />
            <div class="form-text">Please type the word HUMAN to continue.</div>
          </div>
          <div class="form-check mb-3">
            <input v-model="form.rememberMe" class="form-check-input" type="checkbox" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">Remember me</label>
          </div>

          <button :disabled="auth.loading" type="submit" class="btn btn-primary w-100">
            <span v-if="auth.loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            Login
          </button>
        </form>

        <div v-if="auth.error" class="alert alert-danger mt-3 mb-0" role="alert">{{ auth.error }}</div>

        <div class="d-flex justify-content-between mt-3 text-muted small">
          <RouterLink to="/signup">Create account</RouterLink>
          <RouterLink to="/reset-password">Forgot password?</RouterLink>
        </div>
        <div class="d-flex justify-content-between mt-2 text-muted small">
          <RouterLink to="/terms">Terms</RouterLink>
          <RouterLink to="/privacy">Privacy</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
  humanAnswer: '',
  trap: ''
});

onMounted(() => {
  if (auth.rememberedCredentials) {
    form.email = auth.rememberedCredentials.email;
    form.password = auth.rememberedCredentials.password;
    form.rememberMe = true;
  }
});

const onSubmit = async () => {
  try {
    await auth.login({ ...form });
    const redirect = route.query.redirect || '/app/home';
    router.push(redirect);
  } catch (error) {
    // error is handled in store
  }
};
</script>
