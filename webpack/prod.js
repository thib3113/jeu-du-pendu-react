const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
                                              filename: "[name].[contenthash].css",
                                              disable: process.env.NODE_ENV === "development"
                                          });

const config = {
    devtool  : 'source-map',
    entry    : path.resolve(__dirname, '..', 'src', 'index.js'),
    output   : {
        path    : path.resolve(__dirname, '..', 'public'),
        filename: 'bundle.js'
    },
    module   : {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    devServer: {
        index      : "index.html",
        contentBase: path.join(__dirname, "..", "public"),
        compress   : true,
        port       : 8080
    },
    plugins: [
        extractSass
    ]
};

module.exports = config;