const path = require('path');
const Dotenv = require('dotenv-webpack');

// Config directories
const SRC_DIR = path.join(__dirname, '../src/client');
const OUTPUT_DIR = SRC_DIR + '/dist'

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: OUTPUT_DIR,
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': {
        target: `http://localhost:5000`,
        secure: false,
      },
    },
  },
  plugins: [
    new Dotenv({
      path: './.env.development',
    })
  ],
}