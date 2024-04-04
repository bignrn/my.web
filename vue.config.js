const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData:
          `@import 
          "@/assets/scss/style.scss",
          "@/assets/scss/base.scss",
          "@/assets/scss/color.scss";`
      }
    },
  },
})
