'use strict';

const webpack = require('webpack');
const Extract = require('extract-text-webpack-plugin');
const path = require('path');

const JSDIR = path.join(__dirname, 'src');
const JSOUT = path.join(__dirname, 'dist');

const extractCss = new Extract('styles.css');
let cssLoader;
let sourcemap;
let plugins = [
  extractCss,
  //new webpack.NoEmitOnErrorsPlugin(),
];

if (process.env.ENV === 'production') {
  cssLoader = extractCss.extract([
    'css-loader',
    'sass-loader'
  ]);
  sourcemap = 'source-map';
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
} else {
  cssLoader = 'style-loader!css-loader!sass-loader';
  sourcemap = 'inline-source-map';
}


module.exports = {
  entry: path.join(JSDIR, 'app.js'),
  output: {
    path: JSOUT,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: cssLoader,
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot|woff2?)(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /fonts\/.*\.svg(\?v=.*)?$/,
        loader: 'file-loader',
        query: {
          name: '../fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        query: {
          name: '../images/[name].[ext]'
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /node_modules/
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  plugins: plugins,
  stats: {
    colors: true
  },
  devtool: sourcemap
};
