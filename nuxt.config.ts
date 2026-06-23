// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['lenis/nuxt'],
  sourcemap: {
    client: 'hidden',
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'SOURCEMAP_BROKEN') {
            return
          }

          warn(warning)
        },
      },
    },
  },
  css: [
    '~/assets/styles/reset.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/article.css',
    '~/assets/styles/global.css',
    'lenis/dist/lenis.css',
  ],
  app: {
    head: {
      title: 'Дизайн-система «Центр-инвест»',
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('ci-ds-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.dataset.theme='dark'}}catch(e){}})();`,
          tagPosition: 'head',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})
