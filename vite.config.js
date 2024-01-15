import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {}
// })

// import basicSsl from "@vitejs/plugin-basic-ssl";
// import react from "@vitejs/plugin-react";

// export default {
//   server: { https: false },
//   plugins: [react()],
// };

// ^ old commented code here

export default defineConfig({
  server: { https: true }, // Not needed for Vite 5+
  plugins: [mkcert(), react()],
});
