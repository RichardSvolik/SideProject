// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     server: {port: 3000, https: true}
// })

import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'

export default {
  // server: { https: true },
  plugins: [
    basicSsl(),
    react(),
  ]
}