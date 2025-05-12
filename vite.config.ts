import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";
  
  // Security headers for production
  const securityHeaders = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.lovableproject.com https://*.ellowdigitals.me;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
  };

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      allowedHosts: ["da7405f0-30e5-42c0-84c0-542948da552d.lovableproject.com"],
      headers: isDevelopment ? {} : securityHeaders
    },
    plugins: [
      react(),
      isDevelopment && componentTagger(),
      // Compression for production builds
      isProduction && viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      isProduction && viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      // PWA support for offline capabilities and better mobile experience
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'placeholder.svg'],
        manifest: {
          name: 'EllowDigital India',
          short_name: 'EllowDigital',
          description: 'Digital transformation services for businesses in India',
          theme_color: '#FF7517',
          icons: [
            {
              src: '/favicon/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/favicon/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/favicon/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            }
          ],
          screenshots: [
            {
              src: '/favicon/share.jpg',
              sizes: '1200x630',
              type: 'image/jpg',
              form_factor: 'wide',
              label: 'EllowDigital Homepage'
            }
          ],
          categories: ['business', 'productivity', 'web development', 'digital marketing'],
          shortcuts: [
            {
              name: 'Home',
              url: '/',
              icons: [{ src: '/favicon/favicon-32x32.png', sizes: '32x32' }]
            },
            {
              name: 'Contact',
              url: '/#contact',
              icons: [{ src: '/favicon/favicon-32x32.png', sizes: '32x32' }]
            }
          ]
        },
        devOptions: {
          enabled: true
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            }
          ]
        }
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    build: {
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@/components/ui/index'],
            vendor: ['@tanstack/react-query', 'lucide-react', 'framer-motion'],
          },
        },
        // Explicitly mark problematic Node.js modules as external to avoid warnings
        external: [
          'http', 'https', 'url', 'path', 'stream', 'util', 'crypto', 'os', 
          'zlib', 'events', 'assert', 'tty', 'fs'
        ],
      },
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      assetsInlineLimit: 4096, // 4KB
    },
    preview: {
      port: 8080,
      strictPort: true,
      headers: securityHeaders
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    css: {
      devSourcemap: true
    }
  };
});