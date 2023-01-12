const path = require('path');
const fs = require('fs.promises');
const mode = process.env.NODE_ENV || 'development'; 

const devMode = mode === 'development';

const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    devServer: {
        port: 3000,
        open: true,
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
       path: path.resolve(__dirname, 'dist'),
       clean: true,
       filename: '[name].[contenthash].js',
       assetModuleFilename: 'assets/[name][ext]'

    },
   
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
}