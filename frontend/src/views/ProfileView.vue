<template>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <p class="text-muted mb-1">Profile</p>
              <h3 class="fw-bold mb-0">{{ form.full_name || 'Your profile' }}</h3>
            </div>
            <span class="badge bg-primary">Authenticated</span>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Full name</label>
              <input v-model="form.full_name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" disabled />
              <div class="form-text">Email is locked for this boilerplate demo.</div>
            </div>
            <div class="mb-3">
              <label class="form-label">New password</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Leave blank to keep current password" />
            </div>
            <button :disabled="loading" type="submit" class="btn btn-primary">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
              Save changes
            </button>
          </form>

          <div v-if="message" class="alert alert-success mt-3 mb-0">{{ message }}</div>
          <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const loading = ref(false);
const error = ref('');
const message = ref('');

const form = reactive({
  full_name: auth.user?.full_name || '',
  email: auth.user?.email || '',
  password: ''
});

onMounted(async () => {
  try {
    const profile = await auth.fetchProfile();
    form.full_name = profile.full_name;
    form.email = profile.email;
  } catch (err) {
    // ignore on mount, guard handles login
  }
});

const onSubmit = async () => {
  loading.value = true;
  error.value = '';
  message.value = '';
  try {
    const payload = { full_name: form.full_name };
    if (form.password) {
      payload.password = form.password;
    }
    const updated = await api.updateProfile(payload);
    auth.user = updated;
    form.password = '';
    message.value = 'Profile updated';
  } catch (err) {
    error.value = err.response?.data?.detail || 'Unable to update profile';
  } finally {
    loading.value = false;
  }
};
</script>