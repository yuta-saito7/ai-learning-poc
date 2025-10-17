export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    }
  },

  // Azure Static Web Apps 用設定
  nitro: {
    preset: 'azure'
  },

  // PoC用: 認証なしでアクセス可能
  ssr: true
})