<template>
  <div class="app-shell">
    <AppHeader />
    <div class="auth-hero">
      <div class="legal-card">
        <h2 class="fw-bold mb-3">Terms and Conditions</h2>
        <p class="text-muted">
          This template sets out the rules for using this application. Replace placeholders with your production policies.
        </p>

        <h5 class="mt-4">1. Acceptance of terms</h5>
        <p class="text-muted">
          By accessing or using the service, you agree to these terms and any referenced policies.
        </p>

        <h5 class="mt-3">2. Accounts and security</h5>
        <ul class="text-muted">
          <li>You’re responsible for maintaining the confidentiality of your login and activity under your account.</li>
          <li>Passwords are hashed; tokens are stored locally to keep you signed in.</li>
          <li>Notify us immediately of any unauthorized access.</li>
        </ul>

        <h5 class="mt-3">3. Acceptable use</h5>
        <ul class="text-muted">
          <li>Do not misuse the service, interfere with others, or attempt unauthorized access.</li>
          <li>No illegal, harmful, or infringing content or activity.</li>
          <li>Respect rate limits and security controls.</li>
        </ul>

        <h5 class="mt-3">4. Content</h5>
        <ul class="text-muted">
          <li>You retain rights to your content but grant us a license to operate the service.</li>
          <li>You’re responsible for ensuring you have rights to the content you submit.</li>
        </ul>

        <h5 class="mt-3">5. Service changes and availability</h5>
        <ul class="text-muted">
          <li>We may update, suspend, or discontinue features with or without notice.</li>
          <li>We aim for reasonable uptime but do not guarantee uninterrupted service.</li>
        </ul>

        <h5 class="mt-3">6. Payment (if applicable)</h5>
        <p class="text-muted mb-0">
          Insert your pricing, billing, and refund terms if you offer paid plans.
        </p>

        <h5 class="mt-3">7. Third-party services</h5>
        <p class="text-muted mb-0">
          The service may link to or rely on third-party services; their terms and privacy policies govern their use.
        </p>

        <h5 class="mt-3">8. Data and privacy</h5>
        <p class="text-muted mb-0">
          See the Privacy Policy for how we collect, use, and protect data.
        </p>

        <h5 class="mt-3">9. Disclaimers</h5>
        <p class="text-muted mb-0">
          Service is provided “as is” without warranties. Use at your own risk.
        </p>

        <h5 class="mt-3">10. Limitation of liability</h5>
        <p class="text-muted mb-0">
          To the maximum extent permitted by law, our liability is limited to the amount you paid (if any) for the service in the prior 12 months.
        </p>

        <h5 class="mt-3">11. Indemnity</h5>
        <p class="text-muted mb-0">
          You agree to indemnify and hold us harmless from claims arising from your use or violation of these terms.
        </p>

        <h5 class="mt-3">12. Termination</h5>
        <p class="text-muted mb-0">
          We may suspend or terminate access for violations. You may stop using the service at any time.
        </p>

        <h5 class="mt-3">13. Governing law</h5>
        <p class="text-muted mb-0">
          Insert your governing law and jurisdiction here.
        </p>

        <h5 class="mt-3">14. Changes to terms</h5>
        <p class="text-muted mb-0">
          We may update these terms; material changes will be communicated in the app or via email if available.
        </p>

        <h5 class="mt-3">15. Contact</h5>
        <p class="text-muted mb-0">
          For questions about these terms, contact us at yourlegal@example.com.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
</script>