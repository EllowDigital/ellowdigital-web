
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const isProd = mode === "production";

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      allowedHosts: ["da7405f0-30e5-42c0-84c0-542948da552d.lovableproject.com"],
    },

    preview: {
      port: 8080,
      strictPort: true,
    },

    plugins: [
      react(),
      isDev && componentTagger(),
      isProd && viteCompression({ algorithm: "gzip", ext: ".gz" }),
      isProd && viteCompression({ algorithm: "brotliCompress", ext: ".br" }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "masked-icon.svg",
        ],
        manifest: {
          name: "EllowDigital India",
          short_name: "EllowDigital",
          description: "Digital transformation services for businesses in India",
          theme_color: "#FF7517",
          icons: [
            {
              src: "/favicon/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/favicon/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/favicon/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        stream: "stream-browserify",
        buffer: "buffer",
        util: "util",
        process: "process/browser",
      },
    },

    build: {
      sourcemap: false,
      minify: "terser",
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [
          inject({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
            global: "rollup-plugin-node-polyfills/polyfills/global",
            util: "util",
          }),
        ],
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            ui: ["@/components/ui/index"],
            vendor: ["@tanstack/react-query", "lucide-react", "framer-motion"],
          },
        },
      },
    },

    define: {
      "process.env": {},
      global: "window",
    },

    optimizeDeps: {
      include: ["buffer", "process/browser", "util", "stream-browserify"],
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
  };
});
