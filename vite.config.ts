import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'
import preact from '@preact/preset-vite'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    preact(),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    stylelint(),
    eslint(),
  ],
})
