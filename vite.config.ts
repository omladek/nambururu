import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' }),
    stylelint(),
    eslint(),
  ],
})
