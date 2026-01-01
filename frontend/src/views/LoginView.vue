<template>
  <div class="auth-hero">
    <div class="auth-card">
      <h1 class="auth-title">Login</h1>
      <p class="auth-subtle">
        Don't have an account?
        <RouterLink class="auth-link" to="/signup">sign up</RouterLink>
      </p>

      <form @submit.prevent="onSubmit" class="mt-4">
        <input v-model="form.trap" type="text" class="hidden-input" aria-hidden="true" tabindex="-1" autocomplete="off" />

        <div class="mb-3">
          <input v-model="form.email" type="email" required class="form-control auth-input" placeholder="Email" />
        </div>
        <div class="mb-3 d-flex align-items-center">
          <input v-model="form.password" type="password" required class="form-control auth-input" placeholder="Password" />
          <RouterLink to="/reset-password" class="ms-2 small auth-link">Forgot</RouterLink>
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
        <div class="form-check mb-3">
          <input v-model="form.rememberMe" class="form-check-input" type="checkbox" id="rememberMe" />
          <label class="form-check-label auth-subtle" for="rememberMe">Remember me</label>
        </div>

        <button :disabled="auth.loading" type="submit" class="auth-btn-primary">
          <span v-if="auth.loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else>Login</span>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>

      <div v-if="auth.error" class="alert alert-danger mt-3 mb-0" role="alert">{{ auth.error }}</div>

      <div class="auth-social-row">
        <button class="auth-social" type="button" aria-label="Sign in with Google" @click="onSocial('google')">
          <i class="fa-brands fa-google"></i>
        </button>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <RouterLink class="auth-subtle" to="/terms">Terms</RouterLink>
        <RouterLink class="auth-subtle" to="/privacy">Privacy</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { signInWithProvider } from '../services/firebase';

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
    // handled in store
  }
};

const onSocial = async (provider) => {
  auth.error = null;
  try {
    const { idToken } = await signInWithProvider(provider);
    await auth.socialLogin({ idToken, provider });
    router.push('/app/home');
  } catch (error) {
    auth.error = error.response?.data?.detail || error.message || 'Social login failed';
  }
};
</script>
