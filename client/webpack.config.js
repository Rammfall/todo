const { resolve, join } = require('path');
const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const environment = process.env.environment || 'development';
const assetPath = process.env.assetPath || '../public';

module.exports = env => {
  const miniCssExtractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../public/css/',
      hmr: process.env.NODE_ENV === 'development'
    }
  };
  console.log(env !== undefined && env.environment !== 'development');

  return merge({
    entry: './src/index.js',
    output: {
      path: resolve(__dirname, '../public'),
      filename: 'js/[name].[hash].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'assets/index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new DefinePlugin({
        'process.env.host': process.env.frontHost,
        'process.env.assetPath': assetPath
      })
    ],
    devServer: {
      contentBase: join(__dirname, 'assets'),
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          secure: false
        }
      }
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
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.scss$/,
          use: [
            env !== undefined && env.environment !== 'development'
              ? miniCssExtractLoader
              : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|j?g|svg|gif|woff|woff2)?$/,
          use: 'file-loader'
        }
      ]
    },
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
              beautify: false
            }
          },
          extractComments: false
        })
      ],
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
      }
    }
  });
};
