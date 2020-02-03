const path = require('path');
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Config directories
const SRC_DIR = path.join(__dirname, '../src/client');
const OUTPUT_DIR = SRC_DIR + '/dist'

console.log('\n ====>', SRC_DIR);
console.log('\n =====> ', OUTPUT_DIR);

module.exports = {
  entry: [`${SRC_DIR}/index.js`],
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "airbnb"
            ],
          }
        }],
      },
      {
        test: /\.(jpe?g|png|gif|ttf|svg|mp4)(\?[a-z0-9=.]+)?$/,
        use: [{ loader: 'file-loader' }],
        include: [SRC_DIR],
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/templates/index.html`,
      filename: `${OUTPUT_DIR}/index.html`,
    }),
    new CleanWebpackPlugin(),
  ],
};