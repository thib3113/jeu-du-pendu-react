const path = require('path');

const config = {
    devtool  : 'eval',
    entry    : path.resolve(__dirname, '..', 'src', 'index.js'),
    output   : {
        path    : path.resolve(__dirname, '..', 'dev'),
        filename: 'bundle.js'
    },
    module   : {
        rules: [
            {
                test      : /\.js$/, use: [
                    {
                        loader : 'babel-loader',
                        options: {
                            plugins: ["react-hot-loader/babel"]
                        }
                    }
                ], exclude: /node_modules/
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}
        ]
    },
    devServer: {
        index      : "index.html",
        contentBase: path.join(__dirname, "..", "dev"),
        compress   : true,
        port       : 8080
    }
};

module.exports = config;