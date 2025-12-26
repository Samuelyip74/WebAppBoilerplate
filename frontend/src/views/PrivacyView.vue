<template>
  <div class="app-shell">
    <AppHeader />
    <div class="auth-hero">
      <div class="legal-card">
        <h2 class="fw-bold mb-3">Privacy Policy</h2>
        <p class="text-muted">
          This template outlines how we collect, use, store, and share information when you use this application.
          Replace placeholder items with your production policies.
        </p>

        <h5 class="mt-4">1. Information we collect</h5>
        <ul class="text-muted">
          <li>Account data you provide (e.g., name, email, password).</li>
          <li>Usage data (e.g., pages visited, device/browser details).</li>
          <li>Support interactions you send us (e.g., messages, attachments).</li>
        </ul>

        <h5 class="mt-3">2. How we use information</h5>
        <ul class="text-muted">
          <li>To create and secure your account and enable authentication.</li>
          <li>To operate and improve features, and personalize your experience.</li>
          <li>To communicate with you about updates, support, and security notices.</li>
          <li>To comply with legal obligations and enforce terms.</li>
        </ul>

        <h5 class="mt-3">3. Data storage and security</h5>
        <ul class="text-muted">
          <li>Passwords are hashed; we never store raw passwords.</li>
          <li>JWT access/refresh tokens are stored locally to keep you signed in.</li>
          <li>"Remember me" stores your credentials locally only if you opt in; disable to remove.</li>
          <li>We use reasonable technical and organizational measures, but no method is 100% secure.</li>
        </ul>

        <h5 class="mt-3">4. Sharing</h5>
        <ul class="text-muted">
          <li>We do not sell personal data.</li>
          <li>We may share with service providers who support the app (e.g., hosting, analytics).</li>
          <li>We may share if required by law or to protect rights, safety, or security.</li>
        </ul>

        <h5 class="mt-3">5. Data retention</h5>
        <ul class="text-muted">
          <li>We keep data while your account is active or as needed for the purposes above.</li>
          <li>We may retain limited data to meet legal, accounting, or security obligations.</li>
        </ul>

        <h5 class="mt-3">6. Your choices</h5>
        <ul class="text-muted">
          <li>You can update profile information in the app.</li>
          <li>You can disable "remember me" to remove stored credentials.</li>
          <li>You may request access, correction, or deletion where applicable.</li>
          <li>You can log out to clear active tokens from the device.</li>
        </ul>

        <h5 class="mt-3">7. Cookies and local storage</h5>
        <ul class="text-muted">
          <li>We use local storage for JWTs and optional remembered credentials.</li>
          <li>We may use cookies or similar technologies for session and analytics.</li>
        </ul>

        <h5 class="mt-3">8. Children</h5>
        <p class="text-muted mb-0">This service is not directed to children under 13 (or applicable minimum age).</p>

        <h5 class="mt-3">9. Changes to this policy</h5>
        <p class="text-muted mb-0">We may update this policy. Significant changes will be communicated through the app or email if available.</p>

        <h5 class="mt-3">10. Contact</h5>
        <p class="text-muted mb-0">For privacy requests or questions, contact us at yourprivacy@example.com.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
</script>