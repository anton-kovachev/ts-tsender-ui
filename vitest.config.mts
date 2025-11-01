import { defineConfig } from "vitest/config";
// @ts-ignore - vite-tsconfig-paths types issue
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  test: {
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
});
