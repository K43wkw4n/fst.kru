import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { env } from "process";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "../api/api/wwwroot",
  },
  // server: {
  //   port: parseInt(env.VITE_REACT_APP_API_URL) || 7203,
  // },
});
