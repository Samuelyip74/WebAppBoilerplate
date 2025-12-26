<template>
  <div class="app-shell bg-light">
    <AppHeader />
    <main class="content-wrapper container mb-5">
      <router-view />
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import BottomNav from '../components/BottomNav.vue';
</script>