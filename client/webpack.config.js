const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../public'),
    filename: 'js/[name].js'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '**': {
        target: 'http://localhost:3001',
        secure: false
      }
    }
    // host: '3001'
  },
  mode: 'development' || process.env.env,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'assets/index.html'),
      filename: 'index.html'
    })
  ]
};
