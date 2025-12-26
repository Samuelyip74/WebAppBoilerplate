<template>
  <nav class="bottom-nav">
    <div class="d-flex justify-content-around align-items-center w-100">
      <RouterLink class="nav-link text-center" :class="{ active: isActive('/app/home') }" to="/app/home">
        <span class="nav-icon"><i class="fa-solid fa-house"></i></span>
        <span>Home</span>
      </RouterLink>

      <RouterLink class="nav-link text-center" :class="{ active: isActive('/app/products') }" to="/app/products">
        <span class="nav-icon"><i class="fa-solid fa-box-open"></i></span>
        <span>Products</span>
      </RouterLink>

      <div class="nav-floating">
        <RouterLink class="nav-floating-button" to="/app/home" aria-label="New">
          <i class="fa-solid fa-plus fa-lg"></i>
        </RouterLink>
      </div>

      <RouterLink class="nav-link text-center" :class="{ active: isActive('/app/orders') }" to="/app/orders">
        <span class="nav-icon"><i class="fa-solid fa-receipt"></i></span>
        <span>Orders</span>
      </RouterLink>

      <RouterLink class="nav-link text-center" :class="{ active: isActive('/app/profile') }" to="/app/profile">
        <span class="nav-icon"><i class="fa-solid fa-user"></i></span>
        <span>Profile</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;
</script>
