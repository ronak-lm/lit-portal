import { resolve } from "path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

import * as packageJson from "./package.json";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    dts({
      include: ["src/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "LitPortal",
      formats: ["es", "umd"],
      fileName: (format) => `lit-portal.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
