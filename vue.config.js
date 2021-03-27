module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': './src/views',
        '@': 'src',
      },
    },
  },
  publicPath: "/",
  outputDir: "dist",
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js') // mock数据
  },
};
