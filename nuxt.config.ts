// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint','@nuxtjs/tailwindcss', '@pinia/nuxt','@sidebase/nuxt-auth','@nuxt/test-utils/module'],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'google',
      addDefaultCallbackUrl: true,
    },
  },
})