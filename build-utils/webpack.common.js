/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Config directories
const SOURCE_DIR = path.resolve(__dirname, '../src');
const OUTPUT_DIR = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    main: `${SOURCE_DIR}/index.js`,
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules|server)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env', 'airbnb'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|ttf|svg|mp4)(\?[a-z0-9=.]+)?$/,
        use: [{ loader: 'file-loader' }],
        include: [SOURCE_DIR],
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SOURCE_DIR}/templates/index.html`,
      filename: `${OUTPUT_DIR}/index.html`,
    }),
    new CleanWebpackPlugin(),
  ],
};
