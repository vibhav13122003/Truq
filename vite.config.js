import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Or your chosen framework plugin
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})