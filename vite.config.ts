import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      allowedHosts: ["da7405f0-30e5-42c0-84c0-542948da552d.lovableproject.com"],
    },
    plugins: [react(), isDevelopment && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
