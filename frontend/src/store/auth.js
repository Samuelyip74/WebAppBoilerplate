import { defineStore } from 'pinia';
import api from '../services/api';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const REMEMBERED_CREDS_KEY = 'rememberedCredentials';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    rememberMe: false,
    rememberedCredentials: null,
    initialized: false,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken)
  },
  actions: {
    async initialize() {
      const storedAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
      const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
      const remembered = localStorage.getItem(REMEMBERED_CREDS_KEY);

      if (remembered) {
        this.rememberedCredentials = JSON.parse(remembered);
        this.rememberMe = true;
      }

      if (storedAccess && storedRefresh) {
        this.accessToken = storedAccess;
        this.refreshToken = storedRefresh;
        api.setTokens(storedAccess, storedRefresh);
        try {
          await this.fetchProfile();
        } catch (error) {
          this.logout();
        }
      }
      this.initialized = true;
    },

    async login({ email, password, rememberMe }) {
      this.loading = true;
      this.error = null;
      try {
        const data = await api.login(email, password);
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.user = data.user;
        this.rememberMe = rememberMe;

        api.setTokens(data.access_token, data.refresh_token);
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);

        if (rememberMe) {
          const creds = { email, password };
          this.rememberedCredentials = creds;
          localStorage.setItem(REMEMBERED_CREDS_KEY, JSON.stringify(creds));
        } else {
          localStorage.removeItem(REMEMBERED_CREDS_KEY);
          this.rememberedCredentials = null;
        }
        return data;
      } catch (error) {
        this.error = error.response?.data?.detail || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async signup(payload) {
      this.loading = true;
      this.error = null;
      try {
        const data = await api.signup(payload);
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.user = data.user;

        api.setTokens(data.access_token, data.refresh_token);
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
        return data;
      } catch (error) {
        this.error = error.response?.data?.detail || 'Signup failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
      const profile = await api.getProfile();
      this.user = profile;
      return profile;
    },

    async refreshTokens() {
      if (!this.refreshToken) return null;
      const data = await api.refresh(this.refreshToken);
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token ?? this.refreshToken;
      api.setTokens(this.accessToken, this.refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, this.accessToken);
      if (data.refresh_token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
      }
      return data;
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.loading = false;
      api.clearTokens();
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }
});
