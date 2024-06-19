import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  dts: true,
  entry: ['src/*.{ts,tsx}'],
});
