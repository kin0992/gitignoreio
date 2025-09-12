import { defineConfig } from "tsup";

export default defineConfig({
  banner: {
    js: "#!/usr/bin/env node",
  },
  define: {
    __CLI_VERSION__: `"${process.env.npm_package_version || "0.0.0"}"`,
  },
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  outDir: "bin",
  clean: true,
  minify: false,
  sourcemap: true,
  tsconfig: "./tsconfig.json",
});
