import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "@tanstack/react-start/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tailwindcss(),
    ],
    optimizeDeps: {
      exclude: ["@tanstack/react-router-devtools"],
    },
  },
  tsr: {
    // https://github.com/TanStack/router/discussions/2863#discussioncomment-12458714
    appDirectory: "./app",
  },
  // https://react.dev/learn/react-compiler
  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19",
          },
        ],
      ],
    },
  },
})
