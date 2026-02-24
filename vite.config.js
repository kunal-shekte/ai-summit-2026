import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use a dynamic base so GitHub Pages loads assets correctly when the site is
  // served from a repository subpath (e.g. /<user>/<repo>). Local dev keeps '/'.
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  plugins: [react()],
})
