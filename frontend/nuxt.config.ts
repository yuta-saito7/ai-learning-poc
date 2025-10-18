// Basic Nuxt 3 config for Static Web Apps
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: false, // Static Web Apps用にSSRを無効化
  nitro: { preset: 'static' },
  app: { head: { title: 'AI Learning PoC' } },
  runtimeConfig: {
    public: {
      // Static Web Appsポータルの「構成」>「アプリケーション設定」で設定
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  }
});