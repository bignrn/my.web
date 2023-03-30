const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData:
          `@import "@/assets/scss/style.scss";`
      }
    },
  },
})

module.exports = {
  outputDir: 'docs',
  assetsDir: './',
  publicPath: '/my.web',
}