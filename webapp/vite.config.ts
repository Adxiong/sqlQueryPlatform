/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:25:04
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 03:44:25
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    port: 8000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/, '')
      }
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      { find: /^~antd/, replacement: path.resolve('./', 'node_modules/antd/') },
      { find: '@', replacement: path.resolve('./', 'src') }
      /* {
        '@': path.resolve('./', 'src')
      } */
    ]
  }
})
