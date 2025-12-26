<template>
  <div class="auth-hero">
    <div class="auth-card">
      <div class="d-flex align-items-center mb-2">
        <RouterLink to="/" class="me-2 text-decoration-none text-dark">
          <i class="fa-solid fa-chevron-left"></i>
        </RouterLink>
        <h1 class="auth-title mb-0">Create account</h1>
      </div>
      <p class="auth-subtle">
        Already have an account?
        <RouterLink class="auth-link" to="/login">sign in</RouterLink>
      </p>

      <form @submit.prevent="onSubmit" class="mt-4">
        <input v-model="form.trap" type="text" class="hidden-input" aria-hidden="true" tabindex="-1" autocomplete="off" />

        <div class="mb-3">
          <input v-model="form.full_name" type="text" required class="form-control auth-input" placeholder="Name" />
        </div>
        <div class="mb-3">
          <input v-model="form.email" type="email" required class="form-control auth-input" placeholder="Email or phone" />
        </div>
        <div class="mb-3">
          <input v-model="form.password" type="password" required class="form-control auth-input" placeholder="Password" />
        </div>
        <div class="mb-3">
          <input v-model="form.confirm" type="password" required class="form-control auth-input" placeholder="Confirm password" />
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

        <button :disabled="auth.loading" type="submit" class="auth-btn-primary">
          <span v-if="auth.loading" class="spinner-border spinner-border-sm" role="status"></span>
          <span v-else>Sign up</span>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </button>
      </form>

      <div v-if="message" class="alert alert-success mt-3 mb-0">{{ message }}</div>
      <div v-if="auth.error" class="alert alert-danger mt-3 mb-0">{{ auth.error }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const router = useRouter();
const message = ref('');

const form = reactive({
  full_name: '',
  email: '',
  password: '',
  confirm: '',
  humanAnswer: '',
  trap: ''
});

const onSubmit = async () => {
  message.value = '';
  if (form.password !== form.confirm) {
    message.value = 'Passwords do not match';
    return;
  }
  try {
    await auth.signup({
      full_name: form.full_name,
      email: form.email,
      password: form.password,
      humanAnswer: form.humanAnswer,
      trap: form.trap
    });
    router.push('/app/home');
  } catch (error) {
    // handled in store
  }
};
</script>
