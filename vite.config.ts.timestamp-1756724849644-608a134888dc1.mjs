// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  define: {
    global: "globalThis"
  },
  optimizeDeps: {
    include: ["@tensorflow/tfjs"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "client", "src"),
      "@shared": path.resolve(__vite_injected_original_dirname, "shared"),
      "@assets": path.resolve(__vite_injected_original_dirname, "attached_assets")
    }
  },
  root: path.resolve(__vite_injected_original_dirname, "client"),
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "tensorflow": ["@tensorflow/tfjs"]
        }
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgIHByb2Nlc3MuZW52LlJFUExfSUQgIT09IHVuZGVmaW5lZFxuICAgICAgPyBbXG4gICAgICAgICAgYXdhaXQgaW1wb3J0KFwiQHJlcGxpdC92aXRlLXBsdWdpbi1jYXJ0b2dyYXBoZXJcIikudGhlbigobSkgPT5cbiAgICAgICAgICAgIG0uY2FydG9ncmFwaGVyKCksXG4gICAgICAgICAgKSxcbiAgICAgICAgXVxuICAgICAgOiBbXSksXG4gIF0sXG4gIGRlZmluZToge1xuICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ0B0ZW5zb3JmbG93L3RmanMnXVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgXCJjbGllbnRcIiwgXCJzcmNcIiksXG4gICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKGltcG9ydC5tZXRhLmRpcm5hbWUsIFwic2hhcmVkXCIpLFxuICAgICAgXCJAYXNzZXRzXCI6IHBhdGgucmVzb2x2ZShpbXBvcnQubWV0YS5kaXJuYW1lLCBcImF0dGFjaGVkX2Fzc2V0c1wiKSxcbiAgICB9LFxuICB9LFxuICByb290OiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgXCJjbGllbnRcIiksXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBwYXRoLnJlc29sdmUoaW1wb3J0Lm1ldGEuZGlybmFtZSwgXCJkaXN0L3B1YmxpY1wiKSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgJ3RlbnNvcmZsb3cnOiBbJ0B0ZW5zb3JmbG93L3RmanMnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBmczoge1xuICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgZGVueTogW1wiKiovLipcIl0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLEdBQUksUUFBUSxJQUFJLGFBQWEsZ0JBQzdCLFFBQVEsSUFBSSxZQUFZLFNBQ3BCO0FBQUEsTUFDRSxNQUFNLE9BQU8sa0NBQWtDLEVBQUU7QUFBQSxRQUFLLENBQUMsTUFDckQsRUFBRSxhQUFhO0FBQUEsTUFDakI7QUFBQSxJQUNGLElBQ0EsQ0FBQztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsa0JBQWtCO0FBQUEsRUFDOUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFxQixVQUFVLEtBQUs7QUFBQSxNQUN0RCxXQUFXLEtBQUssUUFBUSxrQ0FBcUIsUUFBUTtBQUFBLE1BQ3JELFdBQVcsS0FBSyxRQUFRLGtDQUFxQixpQkFBaUI7QUFBQSxJQUNoRTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU0sS0FBSyxRQUFRLGtDQUFxQixRQUFRO0FBQUEsRUFDaEQsT0FBTztBQUFBLElBQ0wsUUFBUSxLQUFLLFFBQVEsa0NBQXFCLGFBQWE7QUFBQSxJQUN2RCxhQUFhO0FBQUEsSUFDYixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixjQUFjLENBQUMsa0JBQWtCO0FBQUEsUUFDbkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxNQUNSLE1BQU0sQ0FBQyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
