import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 8080

// Landing page — static files from root
app.use('/', express.static(__dirname, { index: 'index.html' }))

// React SPA — built assets
app.use('/app', express.static(join(__dirname, 'dist'), { index: false }))

// SPA fallback — serve app.html for all /app/* routes
app.get('/app/*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'app.html'))
})
app.get('/app', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'app.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
