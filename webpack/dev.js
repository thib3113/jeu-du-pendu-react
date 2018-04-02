const path = require('path');

const config = {
    devtool  : 'eval',
    entry    : path.resolve(__dirname, '..', 'src', 'index.js'),
    output   : {
        path    : path.resolve(__dirname, '..', 'public'),
        filename: 'bundle.js'
    },
    module   : {
        rules: [
            {
                test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    devServer: {
        index      : "index.html",
        contentBase: path.join(__dirname, "..", "public"),
        compress   : true,
        port       : 8080
    }
};

module.exports = config;