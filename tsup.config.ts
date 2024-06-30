import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
});
