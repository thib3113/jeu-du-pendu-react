const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackConfig = new HtmlWebpackPlugin({
                                                    template: path.resolve(__dirname, "..", "public", "index.html"),
                                                    filename: "index.html",
                                                    inject  : "body"
                                                });

const config = {
    devtool     : 'source-map',
    entry       : path.resolve(__dirname, '..', 'src', 'index.js'),
    output      : {
        path    : path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                                   cache    : true,
                                   parallel : true,
                                   sourceMap: true // set to true if you want JS source maps
                               }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module      : {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader : "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]

            }
        ]
    },
    plugins     : [
        ...(process.env.NODE_ENV !== 'production' ? [new webpack.HotModuleReplacementPlugin()] : []),
        new webpack.DefinePlugin({
                                     'process.env.NODE_ENV': JSON.stringify('production')
                                 }),
        new MiniCssExtractPlugin({
                                     filename     : "[name].css",
                                     chunkFilename: "[id].css"
                                 }),
        HtmlWebpackConfig,
        new CopyWebpackPlugin([ {
            from: path.resolve(__dirname, '..', 'public', 'dict.json'),
            to: path.resolve(__dirname, '..', 'build', 'dict.json')
        } ])
    ]
};

module.exports = config;