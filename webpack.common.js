const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const VERSION = JSON.stringify(require('./package.json').version);

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].chunk',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      state: path.resolve(__dirname, 'src/state'),
      pages: path.resolve(__dirname, 'src/pages'),
      maps: path.resolve(__dirname, 'src/maps'),
      styles: path.resolve(__dirname, 'src/styles'),
      types: path.resolve(__dirname, 'src/types'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      assets: path.resolve(__dirname, 'src/assets'),
      utilities: path.resolve(__dirname, 'src/utilities'),
      game: path.resolve(__dirname, 'src/game'),
      public: path.resolve(__dirname, 'public/'),
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', '.png']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
              importLoaders: true,
            }
          },
          {
            loader: 'postcss-loader', // 3. Adds CSS prefixes
            options: {
              sourceMap: true
            }
          },
          // "resolve-url-loader", // Resolves relative paths in url() statements
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        type: 'javascript/auto',
        test: /\.(json)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'raw-loader'
      },
      {
        // Other images may change so we might need to include a hash
        test: /\.(png|jpg|gif|ico|svg)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // This can be changed to include [hash:8], (:8 should restrict it to 8 characters)
              name: '[path][name].[ext]',
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin generates a dynamic index.html file which inserts all our script tags declared above in entry
      template: './src/index.html', // You can add [chunkhash] to the index.html file as well
      filename: 'index.html', // Output filename
      inject: 'body', // Where the scripts will be inserted (concat with what's already in body)
      files: {
        // Require manifest first as it includes webpack file references
        js: ['dist/index.js']
      }
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      // chunkFilename: "[id].css"
    }),

    new webpack.DefinePlugin({
      VERSION,
      IS_DEV: !isProduction
    })
  ]
};
