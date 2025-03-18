import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "@tanstack/react-start/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json", "../../packages/ui/tsconfig.json"],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: "app",
        },
        {
          find: "@doctero/ui",
          replacement: "../../packages/ui/src",
        },
      ],
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".css"],
    },
    ssr: {
      noExternal: ["@doctero/ui"],
      optimizeDeps: {
        include: ["@doctero/ui"],
      },
      target: "node",
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    optimizeDeps: {
      include: ["@doctero/ui"],
      exclude: [],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/, /@doctero\/ui/],
        sourceMap: true,
      },
      rollupOptions: {
        external: ["vinxi"],
        output: {
          manualChunks: {
            ui: ["@doctero/ui"],
          },
        },
      },
    },
  },
})
