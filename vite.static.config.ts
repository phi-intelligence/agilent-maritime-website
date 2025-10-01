import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "static-build"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ['react', 'react-dom', 'wouter'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip']
        }
      }
    },
    // Optimize for static hosting
    assetsInlineLimit: 4096, // Inline small assets
    chunkSizeWarningLimit: 1000, // Warn for large chunks
  },
  // Amplify-specific configurations
  base: '/', // Base path for static hosting
  define: {
    // Define environment variables for build
    'process.env.VITE_S3_BUCKET_NAME': JSON.stringify(process.env.VITE_S3_BUCKET_NAME || ''),
    'process.env.VITE_AWS_REGION': JSON.stringify(process.env.VITE_AWS_REGION || 'us-east-1'),
    'process.env.VITE_DYNAMODB_TABLE_NAME': JSON.stringify(process.env.VITE_DYNAMODB_TABLE_NAME || ''),
  },
});

