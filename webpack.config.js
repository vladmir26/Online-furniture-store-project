const webpack = require('webpack');
const fs = require('fs.promises');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const config = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].index.js"
  },
  plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  };

  module.exports = config;
   