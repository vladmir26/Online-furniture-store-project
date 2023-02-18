const webpack = require('webpack');
const fs = require('fs.promises');
const TerserPlugin = require("terser-webpack-plugin");
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


  
  module.exports = {
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  };
  module.exports = config;
   