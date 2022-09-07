
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  // ...
  plugins: [
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
        // directives: true,
        // version: "2.1.5",
      })],
    }),
  ],
  server: {
    port: 3000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    hmr:true,//开启热更新，代码更改自动刷新页面
    // 代理
    proxy: {
      '/api': {
        target: 'http://192.168.1.203:8888/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }, transpileDependencies: [
    'vuetify'
  ],
  output:{
    filename:'assets/js1/[name]-[hash].js',
    chunkFilename:''
  }
})