import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.ts"],
      rollupTypes: true,
    }),
  ],
  build: {
    minify: true,
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "YoshinaniFormSchema",
      formats: ["es"],
      fileName: "yoshinani-form-schema",
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
});
