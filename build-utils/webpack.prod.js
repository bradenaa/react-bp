const path = require('path');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Config directories
const SRC_DIR = path.join(__dirname, '../src/client');
const OUTPUT_DIR = SRC_DIR + '/dist'

console.log('\n ====>', SRC_DIR);
console.log('\n =====> ', OUTPUT_DIR);

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new Dotenv({
      path: './.env.production',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|mp4)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
        },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre',
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${SRC_DIR}/postcss.config.js`,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
};
