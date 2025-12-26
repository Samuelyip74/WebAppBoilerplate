<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <p class="text-muted mb-1">Catalog</p>
        <h3 class="fw-bold">Products</h3>
      </div>
      <button class="btn btn-outline-secondary" type="button" @click="loadProducts" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
        Refresh
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="products.length === 0 && !loading" class="alert alert-info">
      No products yet. Try seeding data in the backend.
    </div>

    <div class="row g-3">
      <div v-for="product in products" :key="product.id" class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="text-muted">{{ product.description }}</p>
            <div class="fw-bold">${{ product.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';

const products = ref([]);
const loading = ref(false);
const error = ref('');

const loadProducts = async () => {
  loading.value = true;
  error.value = '';
  try {
    products.value = await api.fetchProducts();
  } catch (err) {
    error.value = err.response?.data?.detail || 'Unable to load products';
  } finally {
    loading.value = false;
  }
};

onMounted(loadProducts);
</script>