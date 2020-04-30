const { resolve } = require('path');

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ environment }) => {
  return merge({
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: '[name][hash].js',
      path: resolve(__dirname, '../public')
    },
    mode: environment,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          // include: '/src/',
          use: [
            // MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      })
    ]
  });
};
