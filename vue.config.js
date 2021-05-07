const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': './src/views',
        '@': 'src',
      },
    },
    plugins: [
      new CompressionWebpackPlugin({
      filename: '[path].gz[query]', // 提示 compression-webpack-plugin@3.0.0的话asset改为filename
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
      })
    ]
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
