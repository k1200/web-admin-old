module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  chainWebpack: config => {
    //忽略的打包文件
    config.externals({
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT'
    });
    const entry = config.entry('app');
    entry.add('babel-polyfill').end();
    entry.add('classlist-polyfill').end();
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/minx.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_TARGET,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    port: process.env.PORT
  }
};
