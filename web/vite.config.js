import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The preview is served through a public proxy, so the dev server must accept the
// proxied Host header (sandbox id rotates, hence the wildcard) and must never be
// reachable from anywhere else.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
const allowedHosts = ['localhost', '127.0.0.1']
if (sandboxDomain) allowedHosts.push(`.${sandboxDomain}`)
for (const extra of (process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS || '').split(',')) {
  if (extra.trim()) allowedHosts.push(extra.trim())
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts,
    // Polling keeps hot reload working across the Docker bind mount.
    watch: { usePolling: true, interval: 600 },
    // Single origin: the API is reached through this dev server.
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: { outDir: 'dist', sourcemap: false },
  define: {
    __PREVIEW_MODE__: JSON.stringify(previewMode),
  },
})
