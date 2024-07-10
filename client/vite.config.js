import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Proxy API requests to the backend server
      "/uploads": "http://localhost:5000", // Proxy upload requests to the backend server
    },
  },
});
