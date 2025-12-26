<template>
  <div class="row g-4">
    <div class="col-12">
      <div class="card hero-card p-4 bg-white">
        <div class="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <p class="text-muted mb-1">Welcome</p>
            <h2 class="fw-bold mb-2">{{ userName }}</h2>
            <p class="text-secondary mb-0">You're logged in. Explore your products or update your profile.</p>
          </div>
          <RouterLink class="btn btn-outline-primary" to="/app/products">View products</RouterLink>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Profile</h5>
          <p class="text-muted">Review your personal information and update details.</p>
          <RouterLink to="/app/profile" class="btn btn-link px-0">Go to profile</RouterLink>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Products</h5>
          <p class="text-muted">Browse the catalog fetched from the backend API.</p>
          <RouterLink to="/app/products" class="btn btn-link px-0">See products</RouterLink>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Security</h5>
          <p class="text-muted mb-2">JWT access token with automatic refresh via interceptors.</p>
          <span class="badge bg-success">Live</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();
const userName = computed(() => auth.user?.full_name || auth.user?.email || 'User');
</script>