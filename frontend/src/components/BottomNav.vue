<template>
  <nav class="bottom-nav fixed-bottom py-2">
    <div class="nav nav-pills nav-fill">
      <RouterLink class="nav-link" :class="{ active: isActive('/app/home') }" to="/app/home">
        <i class="fa-solid fa-house me-1"></i> Home
      </RouterLink>
      <RouterLink class="nav-link" :class="{ active: isActive('/app/products') }" to="/app/products">
        <i class="fa-solid fa-box-open me-1"></i> Products
      </RouterLink>
      <RouterLink class="nav-link" :class="{ active: isActive('/app/profile') }" to="/app/profile">
        <i class="fa-solid fa-user me-1"></i> Profile
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;
</script>
