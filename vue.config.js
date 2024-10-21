const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/remote-locker-platform/' 
    : '/',
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      '/upload': {
        target: 'https://paste.c-net.org/', 
        changeOrigin: true, 
        pathRewrite: { '^/upload': '' }, 
        secure: false, 
      },
    },
  },
})
