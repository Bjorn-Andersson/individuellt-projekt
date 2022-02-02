import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    target: 'es2015'
  },
  plugins: [
    VitePWA({
      manifest: {
        background_color: 'white',
        display: 'standalone',
        icons: [
          {
            purpose: 'any',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png'
          }
        ],
        name: 'PokemonWebsiteTestApplikation',
        short_name: 'PokeTest',
        start_url: '.',
        theme_color: '#ff3300'
      },
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            urlPattern: 'https://pokeapi.co/api/v2/pokemon/'
          },
          {
            handler: 'NetworkFirst',
            urlPattern:
              /https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[0-9a-z-_.]+\/?/
          }
        ],
        globPatterns: [
          'assets/**',
          'index.html',
          'manifest.webmanifest',
          'images/**',
          'fonts/**'
        ]
      }
    }),
    vue()
  ]
})
