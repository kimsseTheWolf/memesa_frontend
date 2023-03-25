const { defineConfig } = require('@vue/cli-service')
const AvatarApiHandler = require('./src/js/avatarInfo.js')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#FF9900',
            'link-color': '#FF9900',
            'border-radius-base': '5px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/imgAPI": {
        target: "https://sm.ms/api/v2",
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          "^/imgAPI": ""
        }
      }
    },
    https: false,
  },
})
