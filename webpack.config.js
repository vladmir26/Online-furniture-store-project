const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        hot: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
       path: path.resolve(__dirname, 'dist'),
       clean: true,
       filename: '[name].[contenthash].js',

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.pug'),
        }),
        new MiniCssExtractPlugin({
           filename: '[name].[contenthash].css',
        })
    ],
    module: {
        rules: [
        {
        test: /\.pug$/,
        loader: 'pug-loader',
        },
        {
        test: /\.(c|sa|sc)ss$/i,
              use: [ 
              {
               loader: "pug-loader",
              },
               devMode ? "style-loader" : MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader"
            ],
            }
        ]
    }
}