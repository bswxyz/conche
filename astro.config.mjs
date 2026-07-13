import { defineConfig } from 'astro/config';

// GitHub Pages project site: https://bswxyz.github.io/conche/
// Built output goes to ./docs so Pages can serve straight from main + /docs.
export default defineConfig({
  site: 'https://bswxyz.github.io',
  base: '/conche',
  outDir: './docs',
});
