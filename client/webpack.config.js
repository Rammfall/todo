const { resolve, join } = require('path');

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ environment }) => {
  const development = environment === 'development';
  const MiniCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../public/css'
    }
  };

  return merge({
    entry: {
      main: './src/index.js'
    },
    output: {
      filename: '[name][hash].js',
      path: resolve(__dirname, '../public/js')
    },
    mode: environment,
    devtool: development && 'inline-source-maps',
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
          use: [
            development ? 'style-loader' : MiniCssLoader,
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg|woff|woff2)$/,
          use: ['file-loader']
        }
      ]
    },
    devServer: {
      contentBase: join(__dirname, 'assets'),
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3003'
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        title: 'Todores App',
        minify: !development
      })
    ]
  });
};
