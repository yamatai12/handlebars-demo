import { defineConfig } from "vite";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import checker from "vite-plugin-checker";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  resolve: {
    alias: {
      "@": root,
    },
  },
  publicDir,
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname,"manifest.json"),
          dest: outDir,
        },
      ],
    }),
    checker({
      typescript: {
        tsconfigPath: resolve(__dirname,"tsconfig.json"),
      },
    }),
  ],
  build: {
    outDir,
    sourcemap: "inline",
    minify: false,
    rollupOptions: {
      input: {
        content_scripts: resolve(root, "index.ts"),
      },
      watch: {
        include: ["src/**", "vite.config.ts"],
        exclude: ["node_modules/**"],
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
