import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from '@rollup/plugin-eslint'
// import { babel } from '@rollup/plugin-babel'
import strip from '@rollup/plugin-strip'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx|vue)' }), enforce: 'pre' },
    strip({
      labels: ['unittest'],
      include: ['**/*.ts', '**/*.tsx']
    })
    // babel({
    //   extensions: ['.ts', '.tsx'],
    //   configFile: path.resolve(__dirname, 'babel.config.js'),
    //   babelHelpers: 'bundled'
    // })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      }
    ]
  },
  server: {
    port: 8080
  }
})
