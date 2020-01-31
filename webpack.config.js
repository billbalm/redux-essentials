const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'production';
const SOURCE_PATH = path.resolve(__dirname, 'lib');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  context: SOURCE_PATH,
  devtool: 'source-map',
  entry: ['./index.mjs'],
  mode: NODE_ENV,
  module: {
    rules: [
      {
        include: [SOURCE_PATH],
        loader: 'babel-loader',
        test: /\.m?js$/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: OUTPUT_PATH,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.json'],
  },
  target: 'node',
};
