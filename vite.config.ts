import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
import tailwindcss from "@tailwindcss/vite";

// oxlint-disable-next-line import/exports-last
export default defineConfig({
  plugins: [react(), tailwindcss()],
  fmt: {},
  lint: {
    plugins: ["import", "jsdoc", "jsx-a11y", "oxc", "react", "react-perf", "typescript", "vitest"],
    categories: {
      correctness: "error",
      style: "warn",
    },
    jsPlugins: [
      { name: "boundaries", specifier: "./boundaries.ts" },
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
    ],
    rules: {
      "homebrew/boundaries": "error",
      "vite-plus/prefer-vite-plus-imports": "error",

      "func-style": "off",

      "import/no-namespace": "off",
      "import/group-exports": "off",
      "import/no-named-export": "off",

      "vitest/prefer-importing-vitest-globals": "off",

      "sort-imports": "off",
      "sort-keys": "off",
      "sort-vars": "off",
    },
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: [
      "node_modules",
      "allure-{report,results}",
      "dist",
      "out",
      "build",
      "generated.d.ts",
    ],
  },
  test: {
    globals: true,
    reporters: ["default", "allure-vitest/reporter"],
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});
