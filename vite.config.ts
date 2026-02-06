import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// In dev, rewrite /app SPA routes to serve app.html
function devSpaFallback(): Plugin {
  return {
    name: 'dev-spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url?.startsWith('/app')) {
          const pathname = req.url.split('?')[0]
          const afterBase = pathname.slice(4) // strip '/app'
          // Only rewrite SPA routes — skip files, Vite internals, source
          if (
            !afterBase.includes('.') &&
            !afterBase.startsWith('/@') &&
            !afterBase.startsWith('/node_modules/') &&
            !afterBase.startsWith('/src/')
          ) {
            req.url = '/app/app.html'
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [devSpaFallback(), react()],
  base: '/app/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'app.html',
    },
  },
})
