<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card hero-card p-4 bg-white">
          <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between">
            <div class="mb-3 mb-lg-0">
              <p class="text-uppercase text-primary fw-semibold small mb-2">Welcome</p>
              <h1 class="fw-bold mb-3">Your starter Vue + FastAPI app</h1>
              <p class="text-secondary mb-4">
                JWT auth with auto-refresh, Bootstrap UI, and API-ready pages out of the box.
              </p>
              <div class="d-flex gap-2">
                <RouterLink class="btn btn-primary" to="/signup">Get started</RouterLink>
                <RouterLink class="btn btn-outline-secondary" to="/login">Log in</RouterLink>
              </div>
            </div>
            <div class="text-center text-lg-end">
              <i class="fa-solid fa-rocket fa-3x text-primary mb-3"></i>
              <div class="small text-muted">Fast to start. Easy to extend.</div>
            </div>
          </div>
        </div>
        <div class="row g-3 mt-3">
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h6 class="fw-bold"><i class="fa-solid fa-right-to-bracket me-2 text-primary"></i>Authentication</h6>
                <p class="text-muted small mb-0">Signup, login, profile, and password reset wired to FastAPI JWT endpoints.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h6 class="fw-bold"><i class="fa-solid fa-arrows-rotate me-2 text-primary"></i>Token refresh</h6>
                <p class="text-muted small mb-0">Axios interceptors refresh access tokens automatically with the refresh token.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h6 class="fw-bold"><i class="fa-solid fa-mobile-screen-button me-2 text-primary"></i>Mobile-ready</h6>
                <p class="text-muted small mb-0">Bottom navigation for home, products, and profile—good for responsive use.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
