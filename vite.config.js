import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { fileURLToPath, URL } from 'node:url';

// Built to static files and served by the breakaway dev server at /fx-editor/, so every path in the
// build is relative (`base: './'`). `public/static` is copied as is (default bundle, logo).
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      // ONE Vue: element-ui's CommonJS `require('vue')` would otherwise get a second copy (its
      // dialogs and notifications then mount nothing).
      { find: /^vue$/, replacement: 'vue/dist/vue.runtime.esm.js' },
      // webpack's `~package/...` in scss imports
      { find: /^~(.*)$/, replacement: '$1' },
    ],
    // The sources import components and modules without extensions.
    extensions: ['.mjs', '.js', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      // element-ui's theme variables use pre-module sass; don't drown the build in warnings.
      scss: { quietDeps: true, silenceDeprecations: ['import', 'global-builtin', 'slash-div', 'color-functions', 'function-units', 'legacy-js-api'] },
    },
  },
  server: { port: 8080 },
  build: {
    outDir: 'dist',
    assetsDir: 'static/assets',
    chunkSizeWarningLimit: 2500,
    // The build is committed into the boxplay repo (dev server), so keep it small and stable: ONE
    // script (pixi's lazy-loaded renderers inlined) and no content hashes in file names, so a
    // redeploy modifies the same few files instead of deleting and adding new ones. The dev server
    // revalidates on every request, so there is no stale cache to bust.
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'static/assets/[name].js',
        assetFileNames: 'static/assets/[name][extname]',
      },
    },
  },
});
