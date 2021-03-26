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
};
