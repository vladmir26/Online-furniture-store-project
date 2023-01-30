const webpack = require('webpack');
const fs = require('fs.promises');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


const config = {
  mode: 'development',
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js"
  },
  plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new ESLintPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };


  module.exports = config;
   