import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  base: "/family-prayer-app/",
  plugins: [react()],
});

// export default defineConfig({
//   base: "/family-prayer-app/",
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
