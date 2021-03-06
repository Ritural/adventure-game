const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map', // Sets up sourcemaps to be used in the browser
  devServer: {
    contentBase: './dist', // Where the build files are located
    open: false, // Doesn't open a new tab every time you start the dev server
    historyApiFallback: true,
    publicPath: '/',
    disableHostCheck: true,
  }
});
