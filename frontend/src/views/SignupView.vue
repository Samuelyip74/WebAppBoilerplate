<template>
  <div class="container py-5" style="max-width: 520px;">
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <h2 class="mb-3">Create your account</h2>
        <p class="text-muted">Start with a basic profile. You can update details later.</p>

        <form @submit.prevent="onSubmit" class="mt-3">
          <input v-model="form.trap" type="text" class="d-none" aria-hidden="true" tabindex="-1" autocomplete="off" />
          <div class="mb-3">
            <label class="form-label">Full name</label>
            <input v-model="form.full_name" type="text" required class="form-control" placeholder="Alex Smith" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" required class="form-control" placeholder="you@example.com" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" required class="form-control" placeholder="••••••••" />
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm password</label>
            <input v-model="form.confirm" type="password" required class="form-control" placeholder="Match password" />
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

          <button :disabled="auth.loading" type="submit" class="btn btn-primary w-100">
            <span v-if="auth.loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            Create account
          </button>
        </form>

        <div v-if="message" class="alert alert-success mt-3 mb-0">{{ message }}</div>
        <div v-if="auth.error" class="alert alert-danger mt-3 mb-0">{{ auth.error }}</div>

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
