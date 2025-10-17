// Basic Nuxt 3 config for Static Web Apps
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,
  nitro: { preset: 'static' },
  app: { head: { title: 'AI Learning PoC' } },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  }
});